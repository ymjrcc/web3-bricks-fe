'use client'

import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"

const rows = [
  {
    key: "1",
    hash: "Tony Reichert",
    to: "CEO",
    value: "Active",
    confirmed: "4/5"
  },
  {
    key: "2",
    hash: "Zoey Lang",
    to: "Technical Lead",
    value: "Paused",
    confirmed: "4/5"
  },
  {
    key: "3",
    hash: "Jane Fisher",
    to: "Senior Developer",
    value: "Active",
    confirmed: "4/5"
  },
  {
    key: "4",
    hash: "William Howard",
    to: "Community Manager",
    value: "Vacation",
    confirmed: "4/5"
  },
];

const columns = [
  {
    key: "hash",
    label: "Transation Hash",
  },
  {
    key: "to",
    label: "To",
  },
  {
    key: "value",
    label: "Value",
  },
  {
    key: "confirmed",
    label: "Confirmed",
  },
  {
    key: "actions",
    label: "Actions",
  }
];

const Page = () => {
  const info = [
    { key: 'Name', value: 'Multi-Sig Wallet' },
    { key: 'Description', value: 'This is a Multi-Sig Wallet' },
    { key: 'Contract Address', value: '0x' },
    { key: 'Source Code', value: 'https://github.com' },

  ]
  return (
    <>
      <ul className="bg-gray-50 rounded-xl px-4 py-2 mb-4">
        {
          info.map(({ key, value }) => (
            <li key={key} className="border-b border-gray-100 flex mb-2">
              <div className="w-40 text-gray-400">{key}</div>
              <div className="flex-1">{value}</div>
            </li>
          ))
        }
      </ul>

      <div className="mb-8">
        <div className="text-gray-400">Owners List: </div>
        <ul className="list-disc ml-6">
          <li>0x</li>
          <li>0x</li>
          <li>0x</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center mb-4 flex-1">
          <Input
            isReadOnly
            label="Owners Count For Confirmation"
            variant="bordered"
            defaultValue="5"
            size="sm"
            className="max-w-xs mr-4"
          />
          <Input
            isReadOnly
            label="Balance"
            variant="bordered"
            defaultValue="0"
            size="sm"
            className="max-w-xs mr-4"
          />

          <Button color="primary" variant="flat">
            Withdraw
          </Button>

        </div>
        <Button color="primary" variant="flat" className="ml-4">
          Submit New Transaction
        </Button>

      </div>


      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => {
                if(columnKey === 'actions') {
                  return <TableCell>
                    <Button size="sm" color="warning" variant="flat">Confirm</Button>
                    <Button size="sm" color="success" variant="flat" className="ml-2">Execute</Button>
                  </TableCell>
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default Page