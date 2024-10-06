'use client'
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Code, Badge, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { formatUnits, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";

const dutchAuctionAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as const

const info = [
  { key: 'Name', value: 'Auction' },
  { key: 'Description', value: 'This is an auction contract that enables various auction operations.' },
  { key: 'Dutch Auction', value: dutchAuctionAddress, href: `https://sepolia.etherscan.io/address/${dutchAuctionAddress}` },
]

const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

const Page = () => {

  const publicClient = usePublicClient()
  const [createdLogs, setCreatedLogs] = useState<any[]>([])
  
  const getCreatedLogs = async () => {
    if(!publicClient) return
    const _createdLogs = await publicClient.getLogs({
      address: dutchAuctionAddress,
      event: parseAbiItem('event AuctionCreated(uint256 indexed id, address indexed seller, uint256 startPrice, uint32 endAt)'),
      fromBlock: BigInt(0),
      toBlock: 'latest'
    })

    const _successfulLogs = await publicClient.getLogs({
      address: dutchAuctionAddress,
      event: parseAbiItem('event AuctionSuccessful(uint256 indexed id, address indexed buyer, uint256 dealPrice)'),
      fromBlock: BigInt(0),
      toBlock: 'latest'
    })

    const _updatedCreatedLogs = _createdLogs.map((createdLog) => {
      const _successfulLog = _successfulLogs.find((successfulLog) => successfulLog?.args?.id?.toString() === createdLog?.args?.id?.toString())
      return {
        ...createdLog,
        successful: !!_successfulLog,
        dealPrice: _successfulLog ? _successfulLog.args.dealPrice : null
      }
    })

    console.log(_updatedCreatedLogs)
    
    setCreatedLogs(_createdLogs)
  }

  useEffect(() => {
    getCreatedLogs()
  }, [publicClient])

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

      <Tabs aria-label="Options">
        <Tab key="dutch-auction" title="Dutch Auction">
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
                  <TableCell>{log.args.id.toString()}</TableCell>
                  <TableCell>
                    <Code>{formatAddress(log.args.seller)}</Code>
                  </TableCell>
                  <TableCell>
                    {formatUnits(log.args.startPrice, 18)}
                  </TableCell>
                  <TableCell>{new Date(Number(log.args.endAt) * 1000).toLocaleString()}</TableCell>
                  <TableCell>
                    TODO
                  </TableCell>
                  <TableCell>
                    <Button color="warning" variant="flat" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Tab>
        <Tab key="english-auction" title="English Auction"></Tab>
      </Tabs>
    </>
  )
}

export default Page