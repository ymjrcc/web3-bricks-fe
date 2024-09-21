'use client'

import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Code } from "@nextui-org/react"
import { useReadMultiSigWallet, useWriteMultiSigWallet } from "@/utils/contracts";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

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

  const { address } = useAccount() 

  const { data: hash, writeContractAsync: writeMultiSigWallet, isPending } = useWriteMultiSigWallet()

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: ownersCountForConfirmation } = useReadMultiSigWallet({
    address: contractAddress,
    functionName: 'ownersCountForConfirmation'
  })

  const { data: owners } = useReadMultiSigWallet({
    address: contractAddress,
    functionName: 'getOwners'
  })

  const { data: balance, refetch: refetchBalance } = useBalance({ address: contractAddress })

  const balanceFormatted = useMemo(() => {
    if(!balance?.value) return '0'
    return Number(balance.value / BigInt(10 ** 18)).toFixed(3)
  }, [balance])

  const isOwner = useMemo(() => {
    if(!address || !owners) return false
    return owners.includes(address)
  }, [owners, address])

  const onWithdraw = async () => {
    await writeMultiSigWallet({
      address: contractAddress,
      functionName: 'withdraw',
    },{
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      }
    })
  }
  
  useEffect(() => {
    isSuccess && refetchBalance()
  }, [isSuccess])

  const info = [
    { key: 'Name', value: 'Multi-Sig Wallet' },
    { key: 'Description', value: 'This is a Multi-Sig Wallet' },
    { key: 'Contract Address', value: contractAddress },
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
        <div className="text-gray-400">Owners: </div>
        <ul className="list-disc ml-6">
          {
            owners?.map((owner, index) => (
              <li key={index} className="mt-2">
                <Code>{owner}</Code>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center flex-1">
          <Input
            isReadOnly
            label="Owners Count For Confirmation"
            variant="bordered"
            value={String(ownersCountForConfirmation || '0')}
            size="sm"
            className="max-w-xs mr-4"
          />
          <Input
            isReadOnly
            label="Balance"
            variant="bordered"
            value={balanceFormatted }
            size="sm"
            className="max-w-xs mr-4"
          />

          <Button 
            color="primary" variant="flat" 
            isDisabled={!isOwner}
            isLoading={isPending || isLoading }
            onClick={onWithdraw} 
          >
            Withdraw
          </Button>

        </div>
        <Button color="primary" variant="flat" className="ml-4" isDisabled={!isOwner}>
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
                    <Button size="sm" color="warning" variant="flat" isDisabled={!isOwner}>Confirm</Button>
                    <Button size="sm" color="success" variant="flat" className="ml-2" isDisabled={!isOwner}>Execute</Button>
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