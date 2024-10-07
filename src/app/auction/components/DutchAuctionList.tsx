'use client'
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Code, Link } from "@nextui-org/react";
import { formatUnits, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";

const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

const DutchAuctionList = ({ contractAddress }: { contractAddress: `0x${string}` }) => {

  const publicClient = usePublicClient()
  const [createdLogs, setCreatedLogs] = useState<any[]>([])

  const getCreatedLogs = async () => {
    if (!publicClient) return
    const _createdLogs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event AuctionCreated(uint256 indexed id, address indexed seller, uint256 startPrice, uint32 endAt)'),
      fromBlock: BigInt(0),
      toBlock: 'latest'
    })

    console.log(_createdLogs)

    const _successfulLogs = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem('event AuctionSuccessful(uint256 indexed id, address indexed buyer, uint256 dealPrice)'),
      fromBlock: BigInt(0),
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
  }, [publicClient])

  return (
    <Table aria-label="Auction logs">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Seller</TableColumn>
        <TableColumn>Start Price (ETH)</TableColumn>
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
            <TableCell>{log.startPrice}</TableCell>
            <TableCell>{log.endAt}</TableCell>
            <TableCell>{log.successful ? 'Successful' : 'Pending'}</TableCell>
            <TableCell>
              <Link href={`/auction/dutch/${log.id}`}>
                <Button color="warning" variant="flat" size="sm">
                  Detail
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DutchAuctionList