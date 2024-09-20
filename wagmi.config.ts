import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/utils/contracts.ts',
  contracts: [],
  plugins: [
    foundry({
      project: '../web3-bricks/packages/foundry',
    }),
    react()
  ],
})
