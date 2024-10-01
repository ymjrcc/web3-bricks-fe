'use client'
import { useCallback, useState } from 'react'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import workerScript from './addressGeneratorWorker'

function generateVanityAddress(suffix: string) {
  let attempts = 0;
  while (true) {
    attempts++;
    const privateKey = generatePrivateKey()
    const account = privateKeyToAccount(privateKey)
    
    if (account.address.toLowerCase().endsWith(suffix.toLowerCase())) {
      console.log(`Found matching address after ${attempts} attempts`)
      return { privateKey, account }
    }
    
    if (attempts % 1000 === 0) {
      console.log(`Attempted ${attempts} addresses...`)
    }
  }
}

function Page() {
  const [suffix, setSuffix] = useState('')
  const [result, setResult] = useState<{ address: string; privateKey: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateSuffix = useCallback((value: string) => {
    const validChars = /^[0-9a-fA-F]*$/
    return validChars.test(value) && value.length <= 4
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSuffix(suffix)) {
      setError('Invalid input. Please enter 1-4 hexadecimal characters (0-9, a-f).')
      return
    }
    setError('')
    setIsLoading(true)
    setResult(null)

    setTimeout(() => {
      try {
        const { privateKey, account } = generateVanityAddress(suffix)
        setResult({ address: account.address, privateKey })
      } catch (err) {
        setError('An error occurred while generating the address.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }, 0)
  }

  const onTestClick = () => {
    const worker = new Worker(workerScript);
    console.log('开始搜索随机数...');
    worker.postMessage({ target: '1234567' });
    worker.onmessage = function(event) {
        if (event.data.status === 'found') {
            console.log(`找到匹配的数字: ${event.data.number}`);
            console.log(`尝试次数: ${event.data.attempts}`);
            worker.terminate(); // 终止 worker
        } else if (event.data.status === 'progress') {
            console.log(`已尝试 ${event.data.attempts} 次`);
        }
    };
    console.log('主线程继续执行其他任务...');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">mnemonic</h1>
      <h1 className="text-2xl font-bold mb-4">batch generate</h1>
      <h1 className="text-2xl font-bold mb-4">Vanity Ethereum Address Generator</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={suffix}
          onChange={(e) => {
            const value = e.target.value.slice(0, 4) // Limit to 4 characters
            if (validateSuffix(value)) {
              setSuffix(value)
              setError('')
            } else {
              setError('Invalid input. Please enter 1-4 hexadecimal characters (0-9, a-f).')
            }
          }}
          placeholder="Enter 1-4 hex characters"
          className="border p-2 mr-2"
          disabled={isLoading}
          maxLength={4} // HTML-level restriction
        />
        <button 
          type="submit" 
          className={`text-white p-2 rounded ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isLoading || suffix.length === 0}
        >
          {isLoading ? (
            <>
              <span className="spinner inline-block mr-2"></span>
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading && <p>Generating address... This may take a while.</p>}
      {result && (
        <div>
          <p>Address: {result.address}</p>
          <p>Private Key: {result.privateKey}</p>
        </div>
      )}
      <div onClick={onTestClick}>test</div>
    </div>
  )
}

// function Page() {
//   const [suffix, setSuffix] = useState('')
//   const [result, setResult] = useState<{ address: string; privateKey: string } | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setResult(null)

//     // 使用 Web Worker 来避免阻塞主线程
//     const worker = new Worker(new URL('./vanityWorker.ts', import.meta.url))
//     worker.onmessage = (event) => {
//       setResult(event.data)
//       setIsLoading(false)
//       worker.terminate()
//     }
//     worker.postMessage(suffix)
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Vanity Ethereum Address Generator</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           value={suffix}
//           onChange={(e) => setSuffix(e.target.value)}
//           placeholder="Enter desired address suffix"
//           className="border p-2 mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
//           {isLoading ? 'Generating...' : 'Generate'}
//         </button>
//       </form>
//       {isLoading && <p>Generating address... This may take a while.</p>}
//       {result && (
//         <div>
//           <p>Address: {result.address}</p>
//           <p>Private Key: {result.privateKey}</p>
//         </div>
//       )}
//     </div>
//   )
// }

export default Page