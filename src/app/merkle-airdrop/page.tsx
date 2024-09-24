'use client'
import { useEffect, useState } from 'react';
import { keccak256, encodePacked, parseEther, parseAbi } from 'viem'
import { MerkleTree } from 'merkletreejs'
import { 
  Code, Input, Button,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell 
} from "@nextui-org/react";
import { useReadMerkleAirdrop, useWriteMerkleAirdrop } from '@/utils/contracts';
import { useAccount, useReadContracts, useWaitForTransactionReceipt } from 'wagmi';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' as const
const erc20Address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as const

const info = [
  { key: 'Name', value: 'Merkle Airdrop' },
  { key: 'Description', value: 'An airdrop DApp that uses a Merkle tree to verify addresses eligible for token claims.' },
  { key: 'Merkle Airdrop', value: contractAddress, href: `https://sepolia.etherscan.io/address/${contractAddress}` },
  { key: 'MAT (ERC20)', value: erc20Address, href: `https://sepolia.etherscan.io/address/${erc20Address}` },
]

type WhiteItem = {
  to: `0x${string}`
  amount: number
}

const whitelist: WhiteItem[] = [
  {
    to: '0xCE733Fa2f9dd9Aee9353248fB0F237b0522af73E',
    amount: 1000
  },
  {
    to: '0xFA8Bac84bb8594B7Fc7ACAF932cA680D9A6E495E',
    amount: 2000
  },
  {
    to: '0xDD73b74016a3Ca58765f932b0104126948c5D46A',
    amount: 3000
  },
  {
    to: '0x25047223ca7F1Ed0d3120eF7743FCC80376cB52f',
    amount: 5000
  }
]

const leafNodes = whitelist.map(({ to, amount }: WhiteItem) =>
  keccak256(encodePacked(['address', 'uint256'], [to, parseEther(amount.toString())]))
)

const merkleTree = new MerkleTree(leafNodes, keccak256, { sort: true }) // sort 非常重要！！！
const rootHash = merkleTree.getRoot().toString('hex')

console.log('Root Hash:', rootHash);


const generateProof = (to: `0x${string}`, amount: string) => {
  const leaf = keccak256(encodePacked(['address', 'uint256'], [to, parseEther(amount)]))
  const proof = merkleTree.getHexProof(leaf)
  return proof
}

const Page = () => {
  const [to, setTo] = useState<any>('')
  const [amount, setAmount] = useState('')
  const [proof, setProof] = useState<any[]>([])

  const { address } = useAccount()
  const { data: hash, writeContractAsync: writeMerkleAirdrop, isPending } = useWriteMerkleAirdrop()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: claimeds, refetch: refetchClaimeds } = useReadContracts({
    contracts: whitelist.map(({ to, amount }) => ({
      address: contractAddress,
      functionName: 'claimed',
      abi: parseAbi(['function claimed(bytes32) view returns (bool)']),
      args: [keccak256(encodePacked(['address', 'uint256'], [to, parseEther(amount.toString())]))]
    }))
  })

  useEffect(() => {
    if(!isPending) {
      refetchClaimeds()
    }
  }, [isPending])

  const { data: verifyResult, refetch: refetchVerify } = useReadMerkleAirdrop({
    address: contractAddress,
    functionName: 'verify',
    args: [proof, to, parseEther(amount)],
    query: {
      enabled: false
    }
  })

  const { data: merkleRoot } = useReadMerkleAirdrop({
    address: contractAddress,
    functionName: 'merkleRoot',
  })

  const onVerify = () => {
    const _proof = generateProof(to, amount)
    setProof(_proof)
    setTimeout(() => {
      refetchVerify()
    }, 100);
  }

  const onClaim = async (to: `0x${string}`, amount: number) => {
    const proof: any = generateProof(to, amount.toString())
    await writeMerkleAirdrop({
      address: contractAddress,
      functionName: 'claim',
      args: [proof, to, parseEther(amount.toString())]
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

  return (
    <>
      <ul className="bg-gray-50 rounded-xl px-4 py-2 mb-4">
        {
          info.map(({ key, value, href }) => (
            <li key={key} className="border-b border-gray-100 flex mb-2">
              <div className="w-40 text-gray-400">{key}</div>
              {
                href ?
                  <a href={href} target="_blank" className="flex-1 text-blue-600 underline underline-offset-2">{value}</a> :
                  <div className="flex-1">{value}</div>
              }
            </li>
          ))
        }
      </ul>
      <Input
        isReadOnly
        label="Merkle Root"
        variant="bordered"
        value={merkleRoot}
        className="mb-2"
      />
      <div className='text-lg  text-gray-400 mb-2'>White List:</div>
      <Table aria-label="Example static collection table" className='mb-4'>
        <TableHeader>
          <TableColumn>To</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Claimed</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {
            whitelist.map(({ to, amount }: WhiteItem, index: number) => (
              <TableRow key={to}>
                <TableCell>
                  <Code className={clsx(to === address && 'border-2 border-orange-400')}>
                    {to} {to === address && '(current)'}
                  </Code>
                </TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{claimeds?.[index].result?.toString()}</TableCell>
                <TableCell>
                  <Button 
                    size="sm" color="primary" variant="flat" 
                    isDisabled={(to !== address) || claimeds?.[index].result}
                    isLoading={(to === address) && (isPending || isLoading)}
                    onClick={() => onClaim(to, amount)}
                  >Claim</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <div className='text-lg  text-gray-400 mb-2'>Verify:</div>
      <div className='flex items-center'>
        <Input
          label="To"
          placeholder="0x"
          variant="bordered"
          className="mr-2 w-96"
          size="sm"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Input
          label="Amount"
          type="number"
          placeholder="0"
          variant="bordered"
          className="mr-4 w-32"
          size="sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button 
          color="primary"
          isDisabled={to.length !==42 || !amount}
          onClick={onVerify}
        >Verify</Button>
      </div>
      <div>
        result: {verifyResult?.toString()}
      </div>
      </>
  )
}

export default Page