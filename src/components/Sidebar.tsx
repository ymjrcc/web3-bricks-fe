'use client'
import { usePathname } from 'next/navigation';
import { BrickWall, House } from "lucide-react"
import { Link } from "@nextui-org/react"
import clsx from "clsx"

const Sidebar = () => {
  const pathname = usePathname()
  const navItems = [
    { href: '/', label: 'Home', icon: House },
    { href: '/path1', label: 'Paht1', icon: BrickWall },
    { href: '/path2', label: 'Path2', icon: BrickWall },
    { href: '/path3', label: 'Path3', icon: BrickWall },
  ]
  return (
    <div className="w-60 pr-4">
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
              pathname === href && "bg-white border-gray-200"
            )}>
              <Link href={href} className={clsx(
                "w-full h-full px-4 py-2 text-gray-500 hover:text-gray-800",
                pathname === href && "text-gray-800"
              )} >
                <Icon className={clsx(
                  "pr-2 text-gray-500 group-hover:text-orange-600",
                  pathname === href && "text-orange-600"
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