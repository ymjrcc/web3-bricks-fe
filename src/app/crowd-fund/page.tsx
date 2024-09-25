'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link } from "@nextui-org/react";

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as const
const erc20Address = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const

const info = [
  { key: 'Name', value: 'Crowd Fund' },
  { key: 'Description', value: 'Crowd fund ERC20 token. You can create a campaign and users can pledge, transferring their token to a campaign.' },
  { key: 'Crowd Fund', value: contractAddress, href: `https://sepolia.etherscan.io/address/${contractAddress}` },
  { key: 'CFT (ERC20)', value: erc20Address, href: `https://sepolia.etherscan.io/address/${erc20Address}` },
]

const Page = () => {
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
      <div className='text-xl font-bold  text-gray-400 mb-2 mt-4'>Crowd Fund List:</div>
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
    </>
  )
}

export default Page