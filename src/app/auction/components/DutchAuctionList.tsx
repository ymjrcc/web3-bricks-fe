'use client'
import { useEffect, useState } from "react";
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Button, Code, Link, 
  Input
} from "@nextui-org/react";
import { formatUnits, parseAbiItem, parseEther } from "viem";
import { usePublicClient, useWaitForTransactionReceipt } from "wagmi";
import { useWriteDutchAuction, useWriteYmnftApprove } from "@/utils/contracts";
import toast from "react-hot-toast";

const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

const DutchAuctionList = ({ contractAddress }: { contractAddress: `0x${string}` }) => {

  const publicClient = usePublicClient()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [createdLogs, setCreatedLogs] = useState<any[]>([])
  const [showDays, setShowDays] = useState(true)

  const [nftAddress, setNftAddress] = useState('0x8d840b8dCe62Bb60C6C38cf44e8A5fE5a70a5b23')
  const [tokenId, setTokenId] = useState('')
  const [startPrice, setStartPrice] = useState('')
  const [endPrice, setEndPrice] = useState('')
  const [duration, setDuration] = useState('')

  const { data: hash, writeContractAsync: writeDutchAuction, isPending } = useWriteDutchAuction()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: tokenHash, writeContractAsync: writeTokenApprove, isPending: isTokenPending } = useWriteYmnftApprove()
  const { isLoading: isTokenLoading, isSuccess: isTokenSuccess } = useWaitForTransactionReceipt({ hash: tokenHash });
  
  const onSubmit = async () => {
    console.log(nftAddress, tokenId, startPrice, endPrice, duration)
    const _duration = showDays ? Number(duration) * 24 * 60 * 60 : Number(duration) * 60 * 60
    const _hash = await writeDutchAuction({
      address: contractAddress,
      functionName: 'createAuction',
      args: [
        nftAddress as `0x${string}`, 
        BigInt(tokenId), 
        parseEther(startPrice), 
        parseEther(endPrice), 
        _duration
      ]
    }, {
      onSuccess: () => {
        toast.success('Auction created successfully')
        setNftAddress('')
        setTokenId('')
        setStartPrice('')
        setEndPrice('')
        setDuration('')
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
    console.log(_hash)
  }

  const onApprove = async () => {
    const _hash = await writeTokenApprove({
      address: nftAddress as `0x${string}`,
      args: [
        contractAddress,
        BigInt(tokenId)
      ]
    }, {
      onSuccess: () => {
        toast.success('Approved successfully')
      },
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      }
    })
    console.log(_hash)
  }

  const getCreatedLogs = async () => {
    if (!publicClient) return
    const _createdLogs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event AuctionCreated(uint256 indexed id, address indexed seller, uint256 startPrice, uint32 endAt)'),
      fromBlock: BigInt(6836747),
      toBlock: 'latest'
    })

    console.log(_createdLogs)

    const _successfulLogs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event AuctionSuccessful(uint256 indexed id, address indexed buyer, uint256 dealPrice)'),
      fromBlock: BigInt(6836747),
      toBlock: 'latest'
    })

    const _updatedCreatedLogs = _createdLogs.map((createdLog) => {
      const _successfulLog = _successfulLogs.find((successfulLog) => successfulLog?.args?.id?.toString() === createdLog?.args?.id?.toString())
      return {
        id: createdLog.args.id?.toString(),
        seller: createdLog.args.seller,
        startPrice: createdLog.args.startPrice && formatUnits(createdLog.args.startPrice, 18),
        endAt: new Date(Number(createdLog.args.endAt) * 1000).toLocaleString(),
        successful: !!_successfulLog,
        dealPrice: _successfulLog?.args?.dealPrice ? formatUnits(_successfulLog.args.dealPrice, 18) : '-',
      }
    })

    console.log(_updatedCreatedLogs)

    setCreatedLogs(_updatedCreatedLogs)
  }

  useEffect(() => {
    getCreatedLogs()
  }, [publicClient, isSuccess])

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          color="warning"
          variant="flat"
          onClick={onOpen}
        >
          Create Auction
        </Button>
      </div>
      <Table aria-label="Auction logs">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Seller</TableColumn>
          <TableColumn>Start Price</TableColumn>
          <TableColumn>Deal Price</TableColumn>
          <TableColumn>End At</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {createdLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.id}</TableCell>
              <TableCell>
                <Code>{formatAddress(log.seller)}</Code>
              </TableCell>
              <TableCell>{log.startPrice} ETH</TableCell>
              <TableCell>{log.dealPrice === '-' ? '-' : `${log.dealPrice} ETH`}</TableCell>
              <TableCell>{log.endAt}</TableCell>
              <TableCell>
                {log.successful ? (
                  <span className="text-green-500 font-semibold">Successful</span>
                ) : (
                  <span className="text-orange-500 font-semibold">Pending</span>
                )}
              </TableCell>
              <TableCell>
                <Link href={`/auction/dutch/${log.id}?contract=${contractAddress}`} className="text-orange-500" underline="hover">
                  Detail
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Auction</ModalHeader>
              <ModalBody>
                <Input size="sm"
                  label="NFT Address"
                  placeholder="0x"
                  value={nftAddress}
                  onChange={(e) => setNftAddress(e.target.value)}
                />
                <div className="flex gap-2 items-center">
                  <Input size="sm"
                    label="Token ID"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                  />
                  <Button 
                    color="success" variant="flat" className="w-40"
                    isDisabled={!nftAddress || !tokenId}
                    isLoading={isTokenLoading || isTokenPending}
                    onClick={onApprove}
                  >Approve</Button>
                </div>
                <Input size="sm"
                  label="Start Price (ETH)"
                  value={startPrice}
                  onChange={(e) => setStartPrice(e.target.value)}
                />
                <Input size="sm"
                  label="End Price (ETH)"
                  value={endPrice}
                  onChange={(e) => setEndPrice(e.target.value)}
                />
                <div className="flex gap-2 items-center">
                  <Input size="sm"
                    label={`Duration (${showDays ? 'days' : 'hours'})`}
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <Button 
                    color="default" 
                    className="w-40" 
                    onClick={() => setShowDays(!showDays)}
                  >
                    Toggle To {showDays ? 'Hours' : 'Days'}
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" 
                  onPress={onSubmit}
                  isDisabled={!nftAddress || !tokenId || !startPrice || !endPrice || !duration}
                  isLoading={isLoading || isPending}
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

export default DutchAuctionList