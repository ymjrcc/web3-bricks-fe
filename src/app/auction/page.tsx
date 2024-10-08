'use client'
import { Tabs, Tab } from "@nextui-org/react";
import DutchAuctionList from "./components/DutchAuctionList";

const dutchAuctionAddress = '0xB1478022436d48Ef12B636cB0C5B123A9dcd06AE' as const

const info = [
  { key: 'Name', value: 'Auction' },
  { key: 'Description', value: 'This is an auction contract that enables various auction operations.' },
  { key: 'Dutch Auction', value: dutchAuctionAddress, href: `https://sepolia.etherscan.io/address/${dutchAuctionAddress}` },
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
          <DutchAuctionList contractAddress={dutchAuctionAddress} />
        </Tab>
        <Tab key="english-auction" title="English Auction"></Tab>
      </Tabs>
    </>
  )
}

export default Page