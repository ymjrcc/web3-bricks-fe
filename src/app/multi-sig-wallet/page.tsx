'use client'

import {
  Button, Input, Code,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react"
import { useReadMultiSigWallet, useWriteMultiSigWallet } from "@/utils/contracts";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { stringToHex } from 'viem'
import clsx from "clsx";

const contractAddress = '0xf5Fba73AcABE9267Bc406364CE0d3AF4dc13fe31'

const info = [
  { key: 'Name', value: 'Multi-Sig Wallet' },
  { key: 'Description', value: 'This is a Multi-Sig Wallet DApp.' },
  { key: 'Contract Address', value: contractAddress, href: `https://sepolia.etherscan.io/address/${contractAddress}` },
]

const columns = [
  {
    key: "destination",
    label: "Destination",
  },
  {
    key: "value",
    label: "Value",
  },
  {
    key: "confirmations",
    label: "Confirmations",
  },
  {
    key: "executed",
    label: "Executed",
  },
  {
    key: "actions",
    label: "Actions",
  }
];

const Page = () => {
  const [destination, setDestination] = useState<any>('')
  const [currentAction, setCurrentAction] = useState('')
  const [value, setValue] = useState<any>('')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { address } = useAccount()
  const { data: hash, writeContractAsync: writeMultiSigWallet, isPending } = useWriteMultiSigWallet()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { data: balance, refetch: refetchBalance } = useBalance({ address: contractAddress })

  const { data: ownersCountForConfirmation } = useReadMultiSigWallet({
    address: contractAddress,
    functionName: 'ownersCountForConfirmation'
  })

  const { data: owners } = useReadMultiSigWallet({
    address: contractAddress,
    functionName: 'getOwners'
  })

  const { data: transactions, refetch: refetchTransactions } = useReadMultiSigWallet({
    address: contractAddress,
    functionName: 'getTransactions'
  })

  const rows = useMemo(() => {
    if (!transactions) return []
    return transactions.map((item, index) => ({
      ...item,
      txId: index,
      value: (Number(item.value) / 10 ** 18),
      confirmations: Number(item.confirmations),
      executed: item.executed ? 'Yes' : 'No'
    }))
  }, [transactions])

  const balanceFormatted = useMemo(() => {
    if (!balance?.value) return '0'
    return String(Number(balance.value) / 10 ** 18)
  }, [balance])

  const isOwner = useMemo(() => {
    if (!address || !owners) return false
    return owners.includes(address)
  }, [owners, address])

  const onWithdraw = async () => {
    setCurrentAction('withdraw')
    await writeMultiSigWallet({
      address: contractAddress,
      functionName: 'withdraw',
    }, {
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      }
    })
  }

  const onSubmit = async () => {
    setCurrentAction('submit')
    await writeMultiSigWallet({
      address: contractAddress,
      functionName: 'submitTransaction',
      args: [destination, BigInt(Number(value) * 10 ** 18), stringToHex('')]
    }, {
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      },
      onSuccess: () => {
        setDestination('')
        setValue('')
        toast.loading('Submiting... Please wait for a moment')
        onClose()
      }
    })
  }

  const onConfirm = async (txId: number) => {
    setCurrentAction('confirm')
    await writeMultiSigWallet({
      address: contractAddress,
      functionName: 'confirmTransaction',
      args: [BigInt(txId)]
    }, {
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      },
      onSuccess: () => {
        toast.loading('Confirming... Please wait for a moment')
      }
    })
  }

  const onExecute = async (txId: number) => {
    setCurrentAction('execute')
    await writeMultiSigWallet({
      address: contractAddress,
      functionName: 'executeTransaction',
      args: [BigInt(txId)]
    }, {
      onError: (error) => {
        toast.error(error.message, {
          style: {
            wordBreak: 'break-all'
          }
        })
      },
      onSuccess: () => {
        toast.loading('Executing... Please wait for a moment')
      }
    })
  }

  useEffect(() => {
    if(isSuccess) {
      refetchBalance()
      refetchTransactions()
      toast.remove()
      toast.success('The data was updated successfully!')
    }
  }, [isSuccess])

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

      <div className="mb-8">
        <div className="text-xl font-bold  text-gray-400 mt-4">Owners: </div>
        <ul className="list-disc ml-6">
          {
            owners?.map((owner, index) => (
              <li key={index}>
                <Code className={clsx("mt-2", owner === address && 'border-2 border-orange-400')}>{owner} {owner === address && '(current)'}</Code>
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
            value={balanceFormatted}
            size="sm"
            className="max-w-xs mr-4"
          />

          <Button
            color="primary" variant="flat"
            isDisabled={!isOwner}
            isLoading={currentAction==='withdraw' && (isPending || isLoading)}
            onClick={onWithdraw}
          >
            Withdraw
          </Button>

        </div>
        <Button
          color="primary" variant="flat" className="ml-4"
          isDisabled={!isOwner}
          onClick={onOpen}
        >
          Submit New Transaction
        </Button>

      </div>

      <div className="text-xl font-bold  text-gray-400 mt-4 mb-2">Transactions: </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          {
            rows.map((item) => (
              <TableRow key={item.txId}>
                <TableCell>
                  <Code>{item.destination}</Code>
                </TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell 
                  className={clsx(item.confirmations >= Number(ownersCountForConfirmation) && 'text-orange-500 font-bold')}
                >{item.confirmations} / {owners?.length}</TableCell>
                <TableCell className={clsx(item.executed == 'Yes' && 'text-green-500 font-bold')}>{item.executed}</TableCell>
                {
                  item.executed==='No' ? (
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          size="sm" color="warning" variant="flat"
                          isLoading={currentAction==='confirm' && (isPending || isLoading)}
                          isDisabled={ !isOwner }
                          onClick={() => onConfirm(item.txId)}
                        >Confirm</Button>
                        <Button
                          size="sm" color="success" variant="flat" className="ml-2"
                          isLoading={currentAction==='execute' && (isPending || isLoading)}
                          isDisabled={ !isOwner }
                          onClick={() => onExecute(item.txId)}
                        >Execute</Button>
                      </div>
                    </TableCell>
                  ) : <TableCell>-</TableCell>
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Submit New Transaction</ModalHeader>
              <ModalBody>
                <Input
                  label="Address of destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <Input
                  label="Value of ETH"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onSubmit}
                  isDisabled={!value || destination.length !== 42}
                  isLoading={currentAction==='submit' && (isPending || isLoading)}
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