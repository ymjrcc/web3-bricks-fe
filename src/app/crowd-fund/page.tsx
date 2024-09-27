'use client'
import { useEffect, useMemo, useState } from "react";
import { parseEther, formatUnits } from "viem";
import toast from "react-hot-toast";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Link, Button, Input, DatePicker, Code
 } from "@nextui-org/react";
 import { now, getLocalTimeZone } from "@internationalized/date";
 import { useReadContracts, useWaitForTransactionReceipt } from 'wagmi';
import { useWriteCrowdFund, useReadCrowdFund, crowdFundAbi } from "@/utils/contracts";

const contractAddress = '0x0165878a594ca255338adfa4d48449f69242eb8f' as const
const erc20Address = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const

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
  const [goal, setGoal] = useState('')
  const [rows, setRows] = useState<any[]>([])
  const [startTime, setStartTime] = useState(now(getLocalTimeZone()).add({hours: 1}))
  const [endTime, setEndTime] = useState(now(getLocalTimeZone()).add({hours: 1, weeks: 1}))
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: hash, writeContractAsync: writeCrowdFund, isPending } = useWriteCrowdFund()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

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
    if(list.length > 0) {
      refetchCampaigns()
    }
  }, [list])

  useEffect(() => {
    const _rows = campaigns?.map((campaign: any, index: number) => {
      if(campaign.status === 'success' && campaign.result) {
        return {
          id: index + 1,
          creator: campaign.result[0],
          goal: formatUnits(campaign.result[1], 18),
          pledged: formatUnits(campaign.result[2], 18),
          claimed: campaign.result[5],
        }
      }
      return null
    }).filter((row) => row !== null)
    setRows(_rows || [])
  }, [campaigns])

  useEffect(() => {
    if(!isPending) {
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
    },{
      onSuccess: (data) => {
        console.log('success', data)
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
    setStartTime(now(getLocalTimeZone()).add({hours: 1}))
    setEndTime(now(getLocalTimeZone()).add({hours: 1, weeks: 1}))
    onOpen()
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
                    ? <a href={href} target="_blank" className="text-blue-600 underline underline-offset-2">{value}</a>
                    : value
                }
              </div>
            </li>
          ))
        }
      </ul>
      <div className="flex justify-between items-center">
        <div className='text-xl font-bold  text-gray-400 mb-2 mt-4'>Campaigns List:</div>
        <Button size="sm" color="primary" variant="flat" onClick={onCreate}>Create New Campaign</Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Creator</TableColumn>
          <TableColumn>Goal</TableColumn>
          <TableColumn>Pledged Amount</TableColumn>
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
                <TableCell>{row.claimed.toString()}</TableCell>
                <TableCell>
                  <Link href={`/crowd-fund/${row.id}`}>Detail</Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
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