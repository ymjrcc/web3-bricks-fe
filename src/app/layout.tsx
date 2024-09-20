import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Web3 Bricks',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='h-[100vh] p-4 bg-gray-100 flex'>
            <Sidebar />
            <div className='flex-1 mt-12 p-4 bg-white border-1 border-gray-200 rounded-2xl overflow-auto'>
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
