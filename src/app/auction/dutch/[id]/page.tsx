'use client'
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react"
import { useReadDutchAuction } from "@/utils/contracts"
import { useEffect, useState } from "react"
import { erc721Abi, formatUnits } from "viem";
import { useReadContract, useWaitForTransactionReceipt } from "wagmi";
import NftCard from "../../components/NftCard";
import { useWriteDutchAuction } from "@/utils/contracts";
import toast from "react-hot-toast";


const Page = ({ params, searchParams }: { params: { id: string }, searchParams: { contract: string } }) => {

  const contractAddress = searchParams.contract as `0x${string}`
  
  const [tokenMetadata, setTokenMetadata] = useState<any>(null)

  const { data: hash, writeContractAsync: writeDutchAuction, isPending } = useWriteDutchAuction()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: auction, refetch: refetchAuction } = useReadDutchAuction({
    address: contractAddress,
    functionName: 'auctions',
    args: [BigInt(params.id)]
  })

  const { data: currentPrice, refetch: refetchPrice, isLoading: isLoadingPrice } = useReadDutchAuction({
    address: contractAddress,
    functionName: 'getPrice',
    args: [BigInt(params.id)]
  })

  const { data: tokenURI, refetch: refetchTokenURI } = useReadContract({
    address: auction?.[0],
    abi: erc721Abi,
    functionName: 'tokenURI',
    args: [auction?.[1] as bigint],
    query: {
      enabled: !!auction?.[0] && !!auction?.[1]
    }
  })

  const onBuy = async () => {
    const _hash = await writeDutchAuction({
      address: contractAddress,
      functionName: 'buy',
      value: currentPrice,
      args: [BigInt(params.id)]
    }, {
      onSuccess: () => {
        toast.success('Buy successfully')
        refetchAuction()
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

  useEffect(() => {
    console.log(auction)
    console.log(currentPrice)
    refetchTokenURI()
  }, [auction, currentPrice])

  useEffect(() => {
    const fetchTokenMetadata = async () => {
      if (tokenURI) {
        try {
          const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
          const data = await response.json()
          console.log(data)
          setTokenMetadata(data)
        } catch (error) {
          console.error("Error fetching token metadata:", error)
        }
      }
    }

    fetchTokenMetadata()
  }, [tokenURI])

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/auction">Auction</BreadcrumbItem>
        <BreadcrumbItem>Dutch Auction #{params.id}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex mt-4">
        <div className="flex-1 mr-4">
          <NftCard metadata={tokenMetadata} />
          <Button
            color="primary"
            variant="flat"
            className="mt-4 w-full"
            isDisabled={!auction?.[7]}
            isLoading={isPending || isLoading}
            onClick={onBuy}
          >Buy</Button>
        </div>
        <div className="flex-[2]">
          {auction && (
            <ul className="space-y-2">
              <li><strong className="text-gray-400 inline-block w-32">NFT Address:</strong> {auction[0]}</li>
              <li><strong className="text-gray-400 inline-block w-32">NFT ID:</strong> {auction[1].toString()}</li>
              <li><strong className="text-gray-400 inline-block w-32">Seller:</strong> {auction[2]}</li>
              <li><strong className="text-gray-400 inline-block w-32">Start Price:</strong> {formatUnits(auction[3], 18)} ETH</li>
              <li><strong className="text-gray-400 inline-block w-32">End Price:</strong> {formatUnits(auction[4], 18)} ETH</li>
              <li><strong className="text-gray-400 inline-block w-32">Start Time:</strong> {new Date(Number(auction[5]) * 1000).toLocaleString()}</li>
              <li><strong className="text-gray-400 inline-block w-32">End Time:</strong> {new Date(Number(auction[5]) * 1000 + Number(auction[6]) * 1000).toLocaleString()}</li>
              <li><strong className="text-gray-400 inline-block w-32">Active:</strong> {auction[7] ? 'Yes' : 'No'}</li>
              {
                auction?.[7] ? (
                  <li>
                    <strong className="text-gray-400 inline-block w-32">Current Price:</strong>
                    <span className="font-bold text-xl text-orange-500">
                      {currentPrice ? `${formatUnits(currentPrice, 18)} ETH` : 'Loading...'}
                    </span>
                    <Button
                      size="sm"
                      variant="flat"
                      color="warning"
                      className="ml-2"
                      onClick={() => refetchPrice()}
                      isLoading={isLoadingPrice}
                    >Refresh</Button>
                  </li>
                ) : (
                  <>
                    <li>
                      <strong className="text-gray-400 inline-block w-32">Buyer:</strong> 
                      {auction?.[8]}
                    </li>
                    <li>
                      <strong className="text-gray-400 inline-block w-32">Deal Price:</strong>
                      <span className="font-bold text-xl text-green-500">
                        {auction?.[9] && `${formatUnits(auction[9], 18)} ETH`}
                      </span>
                    </li>
                  </>
                )
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page