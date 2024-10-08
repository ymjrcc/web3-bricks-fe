import { Spinner } from "@nextui-org/react"

const NftCard = ({ metadata }: { metadata: any }) => {
  if (!metadata) {
    return <div className="bg-gray-100 h-64 flex flex-col items-center justify-center">
      <Spinner color="primary" />
      <p className="text-gray-400 mt-4">Loading NFT data...</p>
    </div>
  }
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="relative w-full flex items-center p-2">
        <img
          className="h-20 w-20 mr-4 rounded"
          src={metadata.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')}
          alt={metadata.name}
        />
        <h2 className="text-lg font-bold text-gray-600 flex-1">{metadata.name}</h2>
      </div>
      <div className="p-2">
        {
          metadata.description && (
            <p className="text-gray-600 mb-4">{metadata.description}</p>
          )
        }
        <div className="grid grid-cols-2 gap-2">
          {metadata.attributes.map((attr: any, index: number) => (
            <div key={index} className="bg-gray-100 p-2 rounded">
              <p className="text-sm font-semibold">{attr.trait_type}</p>
              <p className="text-sm">{attr.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NftCard