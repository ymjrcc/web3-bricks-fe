'use client'
import { 
  Breadcrumbs, BreadcrumbItem, Card, CardHeader, CardBody, Divider, Progress, Button, Code,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
} from "@nextui-org/react";
import { useWriteCrowdFund, useReadCrowdFund, crowdFundAbi } from "@/utils/contracts";
import { useEffect, useState } from "react";
import { formatUnits, parseAbiItem, parseEther } from "viem";
import { useAccount, usePublicClient, useWaitForTransactionReceipt } from "wagmi";
import toast from "react-hot-toast";

const contractAddress = '0x0165878a594ca255338adfa4d48449f69242eb8f' as const
const erc20Address = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const

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

  const { address} = useAccount()
  const { data: hash, writeContractAsync: writeCrowdFund, isPending } = useWriteCrowdFund()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const [currentAction, setCurrentAction] = useState<'pledge' | 'claim' | 'refund' | 'unpledge'>('pledge')
  const [logs, setLogs] = useState<any[]>([])
  const publicClient = usePublicClient()

  const { data: campaign, refetch: refetchCampaign } = useReadCrowdFund({
    address: contractAddress,
    functionName: 'campaigns',
    args: [BigInt(params.id)]
  })

  const onPledge = async () => {
    setCurrentAction('pledge')
    await writeCrowdFund({
      address: contractAddress,
      functionName: 'pledge',
      args: [BigInt(params.id), parseEther('1')]
    },{
      onSuccess: () => {
        toast.success('Pledged successfully')
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
      fromBlock: BigInt(0),
      toBlock: 'latest'
    })
    setLogs(_logs)
    console.log(_logs);
  }

  useEffect(() => {
    getLogs()
  }, [campaign, isSuccess])

  useEffect(() => {
    if(isSuccess) {
      refetchCampaign()
    }
  }, [isSuccess])

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
            <div className="text-xl text-orange-400">Duration Time</div>
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
              onClick={onPledge}
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
              >Claim</Button>
              <Button 
                color="default" variant="flat" size="sm"
                onClick={onRefund}
                isLoading={(isPending || isLoading) && currentAction === 'refund'}
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
            <div>{campaign?.[5] ? 'Claimed' : 'Not Claimed'}</div>
          </CardBody>
        </Card>
        
      </div>

      <div className='text-xl font-bold  text-gray-400 mb-2 mt-6'>Pledge Records:</div>
      <Table aria-label="Pledge records table">
        <TableHeader>
          <TableColumn>Pledger Address</TableColumn>
          <TableColumn>Pledge Time</TableColumn>
          <TableColumn>Amount (CWT)</TableColumn>
          {/* <TableColumn>Action</TableColumn> */}
        </TableHeader>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>
                <Code>{log.args.caller}</Code>
              </TableCell>
              <TableCell>{formatTimestamp(parseInt(log.blockTimestamp.slice(2),16))}</TableCell>
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

    </>
  )
}

export default Page