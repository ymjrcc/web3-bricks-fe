'use client'

import { Link } from "@nextui-org/react";

function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Web3-Bricks</h1>
      
      <p className="mb-4">
        Web3-Bricks is your comprehensive toolkit for common Web3 functionalities. 
        Through this project, you can:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Familiarize yourself with various Web3 module interactions</li>
        <li>Learn Solidity smart contract development</li>
        <li>Master frontend and smart contract interaction techniques</li>
        <li>Gain practical Web3 project development experience</li>
        <li>And more...</li>
        </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Features:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>
          <Link href="/multi-sig-wallet" className="text-orange-600 hover:underline">Multi-signature Wallets</Link>
          <span className="text-sm text-gray-600 ml-2">- Enhance security with multiple approvals</span>
        </li>
        <li>
          <Link href="/merkle-airdrop" className="text-orange-600 hover:underline">Merkle Tree Airdrops</Link>
          <span className="text-sm text-gray-600 ml-2">- Efficient token distribution</span>
        </li>
        <li>
          <Link href="/crowd-fund" className="text-orange-600 hover:underline">Crowdfunding Tools</Link>
          <span className="text-sm text-gray-600 ml-2">- Launch and manage fundraising campaigns</span>
        </li>
        <li>
          <Link href="/auction" className="text-orange-600 hover:underline">Auction</Link>
          <span className="text-sm text-gray-600 ml-2">- Create and participate in decentralized auctions</span>
        </li>
        <li>
          <Link href="/address-generator" className="text-orange-600 hover:underline">Address Generator</Link>
          <span className="text-sm text-gray-600 ml-2">- Create new blockchain addresses easily</span>
        </li>
        <li>
          <span>Coming soon...</span>
        </li>
      </ul>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Source Codes:</h3>
        <p className="mb-4">
          Explore our GitHub repositories to learn more about Web3-Bricks:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            <a href="https://github.com/ymjrcc/web3-bricks-fe" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Frontend Repository
            </a>
            : Contains the Next.js application and UI components.
          </li>
          <li>
            <a href="https://github.com/ymjrcc/web3-bricks" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Smart Contracts Repository
            </a>
            : Houses the Solidity contracts and deployment scripts.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Page;
