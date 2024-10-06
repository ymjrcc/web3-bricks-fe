'use client'
import { useEffect, useMemo, useState } from "react";
import { parseEther, formatUnits } from "viem";
import toast from "react-hot-toast";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Link, Button, Input, DatePicker, Code, Chip, Tooltip
} from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { useAccount, useReadContracts, useWaitForTransactionReceipt } from 'wagmi';
import { useWriteCrowdFund, useReadCrowdFund, crowdFundAbi, useReadCfToken, useWriteCfToken } from "@/utils/contracts";
import clsx from "clsx";
import { BadgeDollarSign } from "lucide-react";

const contractAddress = '0xE2a72525Dc19E416382F142b8d4650cFa102838E' as const
const erc20Address = '0x4A6490eb1d5ebFE42AAe0bea56d9Ba4e67A3d4d0' as const

const info = [
  { key: 'Name', value: 'Crowd Fund' },
  { key: 'Description', value: 'Crowd fund ERC20 token. You can create a campaign and users can pledge, transferring their token to a campaign.' },
  { key: 'Crowd Fund', value: contractAddress, href: `https://sepolia.etherscan.io/address/${contractAddress}` },
  { key: 'CFT (ERC20)', value: erc20Address, href: `https://sepolia.etherscan.io/address/${erc20Address}` },
]

const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

const Page = () => {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [goal, setGoal] = useState('')
  const [rows, setRows] = useState<any[]>([])
  const [startTime, setStartTime] = useState(now(getLocalTimeZone()).add({ hours: 1 }))
  const [endTime, setEndTime] = useState(now(getLocalTimeZone()).add({ hours: 1, weeks: 1 }))
  const { address } = useAccount()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: hash, writeContractAsync: writeCrowdFund, isPending } = useWriteCrowdFund()
  const { data: hashCfToken, writeContractAsync: writeCfToken, isPending: isPendingCfToken } = useWriteCfToken()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { isLoading: isLoadingCfToken, isSuccess: isSuccessCfToken } = useWaitForTransactionReceipt({ hash: hashCfToken });

  const { data: balance, refetch: refetchBalance } = useReadCfToken({
    address: erc20Address,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  })

  const formatBalance = useMemo(() => {
    let formatBalance = balance ? (Number(balance) / (10 ** 18)).toString() : '0'
    if(Math.abs(Math.round(Number(formatBalance)) - Number(formatBalance)) < 0.000001) {
      formatBalance = Math.round(Number(formatBalance)).toString()
    } else {
      formatBalance = Number(formatBalance).toFixed(6)
    }
    return formatBalance
  }, [balance])

  const { data: count, refetch: refetchCount } = useReadCrowdFund({
    address: contractAddress,
    functionName: 'count',
  })

  const list = useMemo(() => {
    const _list = Array.from({ length: Number(count) || 0 }, (_, i) => i + 1)
    return _list
  }, [count])

  const { data: campaigns, refetch: refetchCampaigns } = useReadContracts({
    contracts: list.map((id) => ({
      address: contractAddress,
      functionName: 'campaigns',
      abi: crowdFundAbi,
      args: [BigInt(id)]
    }))
  })

  useEffect(() => {
    if (list.length > 0) {
      refetchCampaigns()
    }
  }, [list])

  useEffect(() => {
    if (isSuccessCfToken) {
      refetchBalance()
    }
  }, [isSuccessCfToken])

  useEffect(() => {
    const _rows = campaigns?.map((campaign: any, index: number) => {
      if (campaign.status === 'success' && campaign.result) {
        const startTime = Number(campaign.result[3]) * 1000
        const endTime = Number(campaign.result[4]) * 1000
        let status = 'Not Started'
        if (currentTime >= startTime && currentTime < endTime) {
          status = 'In Progress'
        } else if (currentTime >= endTime) {
          status = 'Ended'
        }
        return {
          id: index + 1,
          creator: campaign.result[0],
          goal: formatUnits(campaign.result[1], 18),
          pledged: formatUnits(campaign.result[2], 18),
          claimed: campaign.result[5],
          status
        }
      }
      return null
    }).filter((row) => row !== null)
    setRows(_rows || [])
  }, [campaigns])

  useEffect(() => {
    if (!isPending) {
      refetchCount()
    }
  }, [isPending])

  const onLaunch = async () => {

    const _goal = parseEther(goal)
    const _startTime = Math.round(new Date(startTime.toAbsoluteString()).getTime() / 1000)
    const _endTime = Math.round(new Date(endTime.toAbsoluteString()).getTime() / 1000)

    await writeCrowdFund({
      address: contractAddress,
      functionName: 'launch',
      args: [_goal, _startTime, _endTime],
    }, {
      onSuccess: (data) => {
        toast.success('Launch success')
        onClose()
      },
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      }
    })
  }

  const onCreate = () => {
    setGoal('')
    setStartTime(now(getLocalTimeZone()).add({ hours: 1 }))
    setEndTime(now(getLocalTimeZone()).add({ hours: 1, weeks: 1 }))
    onOpen()
  }

  const onMint = async () => {
    if (!address) {
      toast.error('Please connect wallet first')
      return
    }
    await writeCfToken({
      address: erc20Address,
      functionName: 'mint',
      args: [address as `0x${string}`, parseEther('1000')],
    }, {
      onSuccess: (data) => {
        toast.success('Mint success')
      },
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      }
    })
  }

  return (
    <>
      <ul className="bg-gray-50 rounded-xl px-4 py-2 mb-4">
        {
          info.map(({ key, value, href }) => (
            <li key={key} className="border-b border-gray-100 flex mb-2">
              <div className="w-40 text-gray-400">{key}</div>
              <div className="flex-1">
                {
                  href
                    ? <a href={href} target="_blank" className="text-orange-600 underline underline-offset-2">{value}</a>
                    : value
                }
              </div>
            </li>
          ))
        }
      </ul>
      <div className="flex justify-between items-center">
        <div className='text-xl font-bold  text-gray-400 mb-2 mt-4'>Campaigns List:</div>
        <Button size="sm" color="warning" variant="flat" onClick={onCreate}>Create New Campaign</Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Creator</TableColumn>
          <TableColumn>Goal</TableColumn>
          <TableColumn>Pledged Amount</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Claimed</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell><Code>{formatAddress(row.creator)}</Code></TableCell>
                <TableCell>{row.goal}</TableCell>
                <TableCell>{row.pledged}</TableCell>
                <TableCell>
                  <Chip className={clsx(
                    row.status === 'Not Started' && 'bg-gray-100',
                    row.status === 'In Progress' && 'bg-green-100',
                    row.status === 'Ended' && 'bg-red-100'
                  )}>
                    {row.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  {
                    row.status === 'Ended' ?
                      <span className={clsx(row.claimed && 'text-green-500 font-bold')}>{row.claimed ? 'Yes' : 'No'}</span>
                      : '-'
                  }
                </TableCell>
                <TableCell>
                  <Link href={`/crowd-fund/${row.id}`} className="text-orange-500" underline="hover">Detail</Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <div className='text-xl font-bold  text-gray-400 mb-2 mt-8'>CFT Token:</div>
      <div className="flex items-center">
        <Input 
          isReadOnly label='balance' variant="bordered"
          value={formatBalance}
          endContent={<BadgeDollarSign className='text-amber-500'/>}
          size="sm"
          className="max-w-xs mr-4"
        />
        <Tooltip content="Get 1000 CWToken for free!" color="primary" placement="bottom-start">
          <Button 
            color="primary" variant="flat" onClick={onMint}
            isLoading={isLoadingCfToken || isPendingCfToken}
          >Faucet</Button>
        </Tooltip>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Campaign</ModalHeader>
              <ModalBody>
                <Input
                  type="number" variant="bordered" label="Goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
                <DatePicker
                  label="Start Time"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  value={startTime}
                  onChange={(date) => setStartTime(date)}
                />
                <DatePicker
                  label="End Time"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  value={endTime}
                  onChange={(date) => setEndTime(date)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary" onPress={onLaunch}
                  isLoading={isPending || isLoading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Page