'use client'
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Breadcrumbs, BreadcrumbItem, Card, CardHeader, CardBody, Divider, Progress, Button, Code, Input, Chip,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
} from "@nextui-org/react";
import { useWriteCrowdFund, useReadCrowdFund, crowdFundAbi, useReadCfToken } from "@/utils/contracts";
import { useEffect, useMemo, useState } from "react";
import { formatUnits, parseAbiItem, parseEther, parseSignature } from "viem";
import { useAccount, usePublicClient, useWaitForTransactionReceipt, useBlock, useChainId, useSignTypedData } from "wagmi";
import toast from "react-hot-toast";

const contractAddress = '0xE2a72525Dc19E416382F142b8d4650cFa102838E' as const
const erc20Address = '0x4A6490eb1d5ebFE42AAe0bea56d9Ba4e67A3d4d0' as const

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // 将秒转换为毫秒
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

const Page = ({ params }: { params: { id: string } }) => {

  const publicClient = usePublicClient()
  const { address }: any = useAccount()
  const chainId = useChainId()
  const { signTypedDataAsync } = useSignTypedData();
  const { data: blockInfo } = useBlock()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: hash, writeContractAsync: writeCrowdFund, isPending } = useWriteCrowdFund()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [currentAction, setCurrentAction] = useState<'pledge' | 'claim' | 'refund' | 'unpledge'>('pledge')
  const [logs, setLogs] = useState<any[]>([])
  const [pledgeAmount, setPledgeAmount] = useState<string>('')

  const { data: nonce, refetch: refetchNonce } = useReadCfToken({ 
    address: erc20Address,
    functionName: 'nonces',
    args: [address]
  })

  const { data: campaign, refetch: refetchCampaign } = useReadCrowdFund({
    address: contractAddress,
    functionName: 'campaigns',
    args: [BigInt(params.id)]
  })

  const signToPermit = async () => {
    await refetchNonce()
    const domain = {
      name: 'CFToken',
      version: '1',
      chainId: chainId,
      verifyingContract: erc20Address
    }
    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ]
    }
    const value = parseEther(pledgeAmount)
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20)
    const message = {
      owner: address,
      spender: contractAddress,
      value: value,
      nonce: nonce,
      deadline: deadline
    }
    const signHash = await signTypedDataAsync({
      primaryType: 'Permit',
      domain,
      types,
      message
    })
    const signatureData = parseSignature(signHash)
    return {
      ...signatureData,
      deadline
    }
  }

  const onPledge = async () => {
    const result: any = await signToPermit()
    setCurrentAction('pledge')
    await writeCrowdFund({
      address: contractAddress,
      functionName: 'permitPledge',
      args: [
        BigInt(params.id), 
        parseEther(pledgeAmount),
        result.deadline,
        result.v, result.r, result.s
      ]
    },{
      onSuccess: () => {
        toast.success('Pledged successfully')
        setPledgeAmount('')
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

  const onClaim = async () => {
    setCurrentAction('claim')
    await writeCrowdFund({
      address: contractAddress,
      functionName: 'claim',
      args: [BigInt(params.id)]
    },{
      onSuccess: () => {
        toast.success('Claimed successfully')
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

  const onRefund = async () => {
    setCurrentAction('refund')
    await writeCrowdFund({
      address: contractAddress,
      functionName: 'refund',
      args: [BigInt(params.id)]
    },{
      onSuccess: () => {
        toast.success('Refunded successfully')
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

  const onUnpledge = async (amount: bigint) => {
    setCurrentAction('unpledge')
    await writeCrowdFund({
      address: contractAddress,
      functionName: 'unpledge',
      args: [BigInt(params.id), amount]
    },{
      onSuccess: () => {
        toast.success('Unpledged successfully')
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

  const getLogs = async () => {
    if(!publicClient) return
    const _logs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event Pledge(uint256 indexed id, address indexed caller, uint256 amount)'),
      args: {
        id: BigInt(params.id)
      },
      fromBlock: BigInt(6780435),
      toBlock: 'latest'
    })
    console.log(_logs);
    
    setLogs(_logs)
  }

  useEffect(() => {
    getLogs()
  }, [campaign, isSuccess])

  useEffect(() => {
    if(isSuccess) {
      refetchCampaign()
      refetchNonce()
    }
  }, [isSuccess])

  const isOnDuration = useMemo(() => {
    if(!campaign) return false
    const startTime = Number(campaign[3])
    const endTime = Number(campaign[4])
    const now = Date.now() / 1000
    return now >= startTime && now <= endTime
  }, [campaign])

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/crowd-fund">Crowd Fund</BreadcrumbItem>
        <BreadcrumbItem>Campaign</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex mt-4 gap-4">
        <Card className="flex-1">
          <CardHeader>
            <div className="text-xl text-orange-400">Campaign ID</div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>{params.id}</div>
          </CardBody>
        </Card>
        <Card className="flex-[3]">
          <CardHeader>
            <div className="text-xl text-orange-400 mr-4">Duration Time</div>
            <TimeStatus start={Number(campaign?.[3])} end={Number(campaign?.[4])} />
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              {campaign?.[3] ? formatTimestamp(Number(campaign[3])) : 'N/A'}
              <span className="mx-2">——</span>
              {campaign?.[4] ? formatTimestamp(Number(campaign[4])) : 'N/A'}
            </div>
          </CardBody>
        </Card>
        <Card className="flex-[3]">
          <CardHeader className="flex justify-between">
            <div className="text-xl text-orange-400">Pledged Amount</div>
            <Button 
              color="primary" variant="flat" size="sm" 
              onClick={onOpen}
              isDisabled={!isOnDuration}
              isLoading={(isPending || isLoading) && currentAction === 'pledge'}
            >Pledge</Button>
          </CardHeader>
          <Divider />
          <CardBody>
            <Progress
              label={`${formatUnits(campaign?.[2] || BigInt(0), 18)} CWT`}
              size="sm"
              value={Number(campaign?.[2])}
              maxValue={Number(campaign?.[1])}
              color="warning"
              showValueLabel={true}
            />
          </CardBody>
        </Card>
      </div>
      <div className="flex mt-4 gap-4">
        <Card className="flex-[2]">
          <CardHeader className="flex justify-between">
            <div className="text-xl text-orange-400">Creator Address</div>
            <div className="flex items-center">
              <Button 
                color="success" variant="flat" className="mr-2" size="sm"
                onClick={onClaim}
                isLoading={(isPending || isLoading) && currentAction === 'claim'}
                isDisabled={isOnDuration || campaign?.[5] === true}
              >Claim</Button>
              <Button 
                color="default" variant="flat" size="sm"
                onClick={onRefund}
                isLoading={(isPending || isLoading) && currentAction === 'refund'}
                isDisabled={isOnDuration || campaign?.[5] === true}
              >Refund</Button>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              <Code>{campaign?.[0]}</Code>
            </div>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <div className="text-xl text-orange-400">Goal Amount</div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>{formatUnits(campaign?.[1] || BigInt(0), 18)} CWT</div>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <div className="text-xl text-orange-400">Claimed Or Not</div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>{
              campaign?.[5] ? 
                <Chip className="bg-green-100">Claimed</Chip> : 
                <Chip className="bg-gray-100">Not Claimed</Chip>
            }</div>
          </CardBody>
        </Card>
        
      </div>

      <div className='text-xl font-bold  text-gray-400 mb-2 mt-6'>Pledged Records:</div>
      <Table aria-label="Pledge records table">
        <TableHeader>
          <TableColumn>Pledger Address</TableColumn>
          {/* <TableColumn>Pledged Time</TableColumn> */}
          <TableColumn>Amount (CWT)</TableColumn>
          {/* <TableColumn>Action</TableColumn> */}
        </TableHeader>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>
                <Code>{log.args.caller}</Code>
              </TableCell>
              {/* <TableCell>{formatTimestamp(parseInt(log.blockTimestamp.slice(2),16))}</TableCell> */}
              <TableCell>{formatUnits(log.args.amount, 18)}</TableCell>
              {/* <TableCell>
                {
                  log.args.caller === address ? (
                    <Button 
                      color="warning" variant="flat" size="sm"
                      isLoading={(isPending || isLoading) && currentAction === 'unpledge'}
                      onClick={() => onUnpledge(log.args.amount)}
                    >Unpledge</Button>
                  ) : '-'
                }
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Pledge</ModalHeader>
              <ModalBody>
                <Input 
                  type="number" variant="bordered" label="Pledge Amount (CWT)" 
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" onPress={onPledge}
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

const TimeStatus = ({ start, end }: { start: number; end: number }) => {
  const [currentTime, setCurrentTime] = useState(Date.now() / 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now() / 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const status = useMemo(() => {
    if (currentTime < start) {
      return <Chip className="bg-gray-100">Not Started</Chip>;
    } else if (currentTime >= start && currentTime <= end) {
      return <Chip className="bg-green-100">In Progress</Chip>;
    } else {
      return <Chip className="bg-red-100">Ended</Chip>;
    }
  }, [currentTime, start, end]);

  return status;
};