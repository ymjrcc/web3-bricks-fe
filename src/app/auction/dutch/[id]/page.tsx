'use client'
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react"
import { useReadDutchAuction } from "@/utils/contracts"
import { useEffect, useState } from "react"
import { erc721Abi, formatUnits } from "viem";
import { useReadContract } from "wagmi";
import NftCard from "../../components/NftCard";


const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const

const Page = ({ params }: { params: { id: string } }) => {

  const [tokenMetadata, setTokenMetadata] = useState<any>(null)
  
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
              <li>
                <strong className="text-gray-400 inline-block w-32">Current Price:</strong>
                <span className="font-bold text-xl text-green-500">
                  {currentPrice ? `${formatUnits(currentPrice, 18)} ETH` : 'Loading...'}
                </span>
                <Button 
                  size="sm"
                  variant="flat"
                  color="success"
                  className="ml-2" 
                  onClick={() => refetchPrice()}
                  isLoading={isLoadingPrice}
                >Refresh</Button>
            </li>
            </ul>
          )}
        </div>
      </div>
      <div className="mt-4">

      </div>
    </div>
  )
}

export default Page