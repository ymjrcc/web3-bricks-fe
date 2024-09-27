'use client'
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Link, Button, Input, DatePicker
 } from "@nextui-org/react";
 import { now, getLocalTimeZone } from "@internationalized/date";
import { useWriteCrowdFund, useReadCrowdFund } from "@/utils/contracts";

const contractAddress = '0x0165878a594ca255338adfa4d48449f69242eb8f' as const
const erc20Address = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const

const info = [
  { key: 'Name', value: 'Crowd Fund' },
  { key: 'Description', value: 'Crowd fund ERC20 token. You can create a campaign and users can pledge, transferring their token to a campaign.' },
  { key: 'Crowd Fund', value: contractAddress, href: `https://sepolia.etherscan.io/address/${contractAddress}` },
  { key: 'CFT (ERC20)', value: erc20Address, href: `https://sepolia.etherscan.io/address/${erc20Address}` },
]

const Page = () => {
  const [goal, setGoal] = useState('')
  const [startTime, setStartTime] = useState(now(getLocalTimeZone()).add({hours: 1}))
  const [endTime, setEndTime] = useState(now(getLocalTimeZone()).add({hours: 1, weeks: 1}))
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: hash, writeContractAsync: writeCrowdFund, isPending } = useWriteCrowdFund()
  const { data: campaigns } = useReadCrowdFund({
    address: contractAddress,
    functionName: 'campaigns',
    args: [BigInt(1)]
  })

  useEffect(() => {
    console.log('Campaigns:', campaigns)
  }, [campaigns])

  const onLaunch = async () => {

    const _goal = parseEther(goal)
    const _startTime = Math.round(new Date(startTime.toAbsoluteString()).getTime() / 1000)
    const _endTime = Math.round(new Date(endTime.toAbsoluteString()).getTime() / 1000)

    await writeCrowdFund({
      address: contractAddress,
      functionName: 'launch',
      args: [_goal, _startTime, _endTime],
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
                    ? <a href={href} target="_blank" className="text-blue-600 underline underline-offset-2">{value}</a>
                    : value
                }
              </div>
            </li>
          ))
        }
      </ul>
      <div className="flex justify-between items-center">
        <div className='text-xl font-bold  text-gray-400 mb-2 mt-4'>Crowd Fund List:</div>
        <Button size="sm" color="primary" variant="flat" onClick={onOpen}>Launch New Crowd Fund</Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Creator</TableColumn>
          <TableColumn>Goal</TableColumn>
          <TableColumn>Pledged Amount</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>
              <Link href="/crowd-fund/1">Detail</Link>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
            <TableCell>Paused</TableCell>
            <TableCell>Paused</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
            <TableCell>Vacation</TableCell>
            <TableCell>Vacation</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Launch New Crowd Fund</ModalHeader>
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
                  isLoading={isPending}
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