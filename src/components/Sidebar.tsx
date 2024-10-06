'use client'
import { usePathname } from 'next/navigation';
import { BrickWall, House, Wallet, Gift, Boxes, Gavel, Hash } from "lucide-react"
import { Link } from "@nextui-org/react"
import clsx from "clsx"
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Sidebar = () => {
  const pathname = usePathname()
  const navItems = [
    { href: '/', label: 'Home', icon: House },
    { href: '/multi-sig-wallet', label: 'Multi-Sig Wallet', icon: Wallet },
    { href: '/merkle-airdrop', label: 'Merkle Airdrop', icon: Gift },
    { href: '/crowd-fund', label: 'Crowd Fund', icon: Boxes },
    // { href: '/auction', label: 'Auction', icon: Gavel },
    { href: '/address-generator', label: 'Address Generator', icon: Hash },
  ]
  const isCurrentPath = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.includes(href)
  }
  return (
    <div className="w-60 pr-4">
      <div className='fixed right-4 top-3'>
        <ConnectButton />
      </div>
      <div className="flex items-center mb-10">
        <BrickWall className="text-orange-600" size={40} />
        <div className="ml-4 text-xl italic font-bold text-gray-600 underline underline-offset-4">Web3 Bricks</div>
      </div>
      <ul>
        {
          navItems.map(({ href, label, icon }) => {
            const Icon = icon
            return <li key={href} className={clsx(
              "group mb-2 rounded-lg border border-transparent hover:bg-white hover:border-gray-200",
              isCurrentPath(href) && "bg-white border-gray-200"
            )}>
              <Link href={href} className={clsx(
                "w-full h-full px-4 py-2 text-gray-500 hover:text-gray-800",
                isCurrentPath(href) && "text-gray-800"
              )} >
                <Icon className={clsx(
                  "pr-2 text-gray-500 group-hover:text-orange-600",
                  isCurrentPath(href) && "text-orange-600"
                )} /> {label}
              </Link>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar