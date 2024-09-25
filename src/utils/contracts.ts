import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CFToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cfTokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CrowdFund
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const crowdFundAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'token_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'campaigns',
    outputs: [
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'goal', internalType: 'uint256', type: 'uint256' },
      { name: 'pledged', internalType: 'uint256', type: 'uint256' },
      { name: 'startAt', internalType: 'uint32', type: 'uint32' },
      { name: 'endAt', internalType: 'uint32', type: 'uint32' },
      { name: 'claimed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'count',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_goal', internalType: 'uint256', type: 'uint256' },
      { name: '_startAt', internalType: 'uint32', type: 'uint32' },
      { name: '_endAt', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'launch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'pledge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'pledgedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'refund',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract ICFToken', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unpledge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Cancel',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'goal',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'startAt',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      { name: 'endAt', internalType: 'uint32', type: 'uint32', indexed: false },
    ],
    name: 'Launch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Pledge',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Refund',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unpledge',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICFToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const icfTokenAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iTokenAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MerkleAirdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const merkleAirdropAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'token_', internalType: 'address', type: 'address' },
      { name: 'merkleRoot_', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getLeafHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mToken',
    outputs: [{ name: '', internalType: 'contract IToken', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Claim',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MerkleAirdropToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const merkleAirdropTokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MerkleProof
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const merkleProofAbi = [
  { type: 'error', inputs: [], name: 'MerkleProofInvalidMultiproof' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiSigWallet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiSigWalletAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owners', internalType: 'address[]', type: 'address[]' },
      {
        name: '_ownersCountForConfirmation',
        internalType: 'uint128',
        type: 'uint128',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [{ name: '_txIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'confirmTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_txIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'executeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOwners',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTransactions',
    outputs: [
      {
        name: '',
        internalType: 'struct MultiSigWallet.Transaction[]',
        type: 'tuple[]',
        components: [
          { name: 'executed', internalType: 'bool', type: 'bool' },
          { name: 'confirmations', internalType: 'uint128', type: 'uint128' },
          { name: 'destination', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isConfirmed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'owners',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ownersCountForConfirmation',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_destination', internalType: 'address', type: 'address' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'submitTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'transactions',
    outputs: [
      { name: 'executed', internalType: 'bool', type: 'bool' },
      { name: 'confirmations', internalType: 'uint128', type: 'uint128' },
      { name: 'destination', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TransactionConfirmed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'TransactionExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destination',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'TransactionSubmitted',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__
 */
export const useReadCfToken = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadCfTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadCfTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadCfTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadCfTokenName = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCfTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadCfTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadCfTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: cfTokenAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__
 */
export const useWriteCfToken = /*#__PURE__*/ createUseWriteContract({
  abi: cfTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteCfTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: cfTokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteCfTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: cfTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteCfTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: cfTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteCfTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: cfTokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteCfTokenTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: cfTokenAbi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteCfTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: cfTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__
 */
export const useSimulateCfToken = /*#__PURE__*/ createUseSimulateContract({
  abi: cfTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateCfTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cfTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateCfTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: cfTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateCfTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cfTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateCfTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cfTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateCfTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cfTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cfTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateCfTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cfTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cfTokenAbi}__
 */
export const useWatchCfTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cfTokenAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cfTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchCfTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cfTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cfTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchCfTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cfTokenAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cfTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchCfTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cfTokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link crowdFundAbi}__
 */
export const useReadCrowdFund = /*#__PURE__*/ createUseReadContract({
  abi: crowdFundAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"campaigns"`
 */
export const useReadCrowdFundCampaigns = /*#__PURE__*/ createUseReadContract({
  abi: crowdFundAbi,
  functionName: 'campaigns',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"count"`
 */
export const useReadCrowdFundCount = /*#__PURE__*/ createUseReadContract({
  abi: crowdFundAbi,
  functionName: 'count',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"pledgedAmount"`
 */
export const useReadCrowdFundPledgedAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: crowdFundAbi,
    functionName: 'pledgedAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"token"`
 */
export const useReadCrowdFundToken = /*#__PURE__*/ createUseReadContract({
  abi: crowdFundAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__
 */
export const useWriteCrowdFund = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"cancel"`
 */
export const useWriteCrowdFundCancel = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
  functionName: 'cancel',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteCrowdFundClaim = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"launch"`
 */
export const useWriteCrowdFundLaunch = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
  functionName: 'launch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"pledge"`
 */
export const useWriteCrowdFundPledge = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
  functionName: 'pledge',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"refund"`
 */
export const useWriteCrowdFundRefund = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
  functionName: 'refund',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"unpledge"`
 */
export const useWriteCrowdFundUnpledge = /*#__PURE__*/ createUseWriteContract({
  abi: crowdFundAbi,
  functionName: 'unpledge',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__
 */
export const useSimulateCrowdFund = /*#__PURE__*/ createUseSimulateContract({
  abi: crowdFundAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"cancel"`
 */
export const useSimulateCrowdFundCancel =
  /*#__PURE__*/ createUseSimulateContract({
    abi: crowdFundAbi,
    functionName: 'cancel',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateCrowdFundClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: crowdFundAbi,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"launch"`
 */
export const useSimulateCrowdFundLaunch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: crowdFundAbi,
    functionName: 'launch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"pledge"`
 */
export const useSimulateCrowdFundPledge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: crowdFundAbi,
    functionName: 'pledge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"refund"`
 */
export const useSimulateCrowdFundRefund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: crowdFundAbi,
    functionName: 'refund',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link crowdFundAbi}__ and `functionName` set to `"unpledge"`
 */
export const useSimulateCrowdFundUnpledge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: crowdFundAbi,
    functionName: 'unpledge',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__
 */
export const useWatchCrowdFundEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: crowdFundAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__ and `eventName` set to `"Cancel"`
 */
export const useWatchCrowdFundCancelEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: crowdFundAbi,
    eventName: 'Cancel',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchCrowdFundClaimEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: crowdFundAbi,
    eventName: 'Claim',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__ and `eventName` set to `"Launch"`
 */
export const useWatchCrowdFundLaunchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: crowdFundAbi,
    eventName: 'Launch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__ and `eventName` set to `"Pledge"`
 */
export const useWatchCrowdFundPledgeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: crowdFundAbi,
    eventName: 'Pledge',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__ and `eventName` set to `"Refund"`
 */
export const useWatchCrowdFundRefundEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: crowdFundAbi,
    eventName: 'Refund',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link crowdFundAbi}__ and `eventName` set to `"Unpledge"`
 */
export const useWatchCrowdFundUnpledgeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: crowdFundAbi,
    eventName: 'Unpledge',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link icfTokenAbi}__
 */
export const useWriteIcfToken = /*#__PURE__*/ createUseWriteContract({
  abi: icfTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link icfTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIcfTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: icfTokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link icfTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIcfTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: icfTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link icfTokenAbi}__
 */
export const useSimulateIcfToken = /*#__PURE__*/ createUseSimulateContract({
  abi: icfTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link icfTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIcfTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: icfTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link icfTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIcfTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: icfTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iTokenAbi}__
 */
export const useWriteIToken = /*#__PURE__*/ createUseWriteContract({
  abi: iTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteITokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: iTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iTokenAbi}__
 */
export const useSimulateIToken = /*#__PURE__*/ createUseSimulateContract({
  abi: iTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateITokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: iTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropAbi}__
 */
export const useReadMerkleAirdrop = /*#__PURE__*/ createUseReadContract({
  abi: merkleAirdropAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"claimed"`
 */
export const useReadMerkleAirdropClaimed = /*#__PURE__*/ createUseReadContract({
  abi: merkleAirdropAbi,
  functionName: 'claimed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"getLeafHash"`
 */
export const useReadMerkleAirdropGetLeafHash =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropAbi,
    functionName: 'getLeafHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"mToken"`
 */
export const useReadMerkleAirdropMToken = /*#__PURE__*/ createUseReadContract({
  abi: merkleAirdropAbi,
  functionName: 'mToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"merkleRoot"`
 */
export const useReadMerkleAirdropMerkleRoot =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropAbi,
    functionName: 'merkleRoot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"verify"`
 */
export const useReadMerkleAirdropVerify = /*#__PURE__*/ createUseReadContract({
  abi: merkleAirdropAbi,
  functionName: 'verify',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropAbi}__
 */
export const useWriteMerkleAirdrop = /*#__PURE__*/ createUseWriteContract({
  abi: merkleAirdropAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteMerkleAirdropClaim = /*#__PURE__*/ createUseWriteContract({
  abi: merkleAirdropAbi,
  functionName: 'claim',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropAbi}__
 */
export const useSimulateMerkleAirdrop = /*#__PURE__*/ createUseSimulateContract(
  { abi: merkleAirdropAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateMerkleAirdropClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropAbi,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleAirdropAbi}__
 */
export const useWatchMerkleAirdropEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: merkleAirdropAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleAirdropAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchMerkleAirdropClaimEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: merkleAirdropAbi,
    eventName: 'Claim',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__
 */
export const useReadMerkleAirdropToken = /*#__PURE__*/ createUseReadContract({
  abi: merkleAirdropTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMerkleAirdropTokenAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMerkleAirdropTokenBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMerkleAirdropTokenDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadMerkleAirdropTokenName =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMerkleAirdropTokenOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMerkleAirdropTokenSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMerkleAirdropTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__
 */
export const useWriteMerkleAirdropToken = /*#__PURE__*/ createUseWriteContract({
  abi: merkleAirdropTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMerkleAirdropTokenApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMerkleAirdropTokenMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMerkleAirdropTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMerkleAirdropTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMerkleAirdropTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMerkleAirdropTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__
 */
export const useSimulateMerkleAirdropToken =
  /*#__PURE__*/ createUseSimulateContract({ abi: merkleAirdropTokenAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMerkleAirdropTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMerkleAirdropTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMerkleAirdropTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMerkleAirdropTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMerkleAirdropTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMerkleAirdropTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: merkleAirdropTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleAirdropTokenAbi}__
 */
export const useWatchMerkleAirdropTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: merkleAirdropTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMerkleAirdropTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: merkleAirdropTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMerkleAirdropTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: merkleAirdropTokenAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link merkleAirdropTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMerkleAirdropTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: merkleAirdropTokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__
 */
export const useReadMultiSigWallet = /*#__PURE__*/ createUseReadContract({
  abi: multiSigWalletAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"getOwners"`
 */
export const useReadMultiSigWalletGetOwners =
  /*#__PURE__*/ createUseReadContract({
    abi: multiSigWalletAbi,
    functionName: 'getOwners',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"getTransactions"`
 */
export const useReadMultiSigWalletGetTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: multiSigWalletAbi,
    functionName: 'getTransactions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"isConfirmed"`
 */
export const useReadMultiSigWalletIsConfirmed =
  /*#__PURE__*/ createUseReadContract({
    abi: multiSigWalletAbi,
    functionName: 'isConfirmed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"isOwner"`
 */
export const useReadMultiSigWalletIsOwner = /*#__PURE__*/ createUseReadContract(
  { abi: multiSigWalletAbi, functionName: 'isOwner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"owners"`
 */
export const useReadMultiSigWalletOwners = /*#__PURE__*/ createUseReadContract({
  abi: multiSigWalletAbi,
  functionName: 'owners',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"ownersCountForConfirmation"`
 */
export const useReadMultiSigWalletOwnersCountForConfirmation =
  /*#__PURE__*/ createUseReadContract({
    abi: multiSigWalletAbi,
    functionName: 'ownersCountForConfirmation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"transactions"`
 */
export const useReadMultiSigWalletTransactions =
  /*#__PURE__*/ createUseReadContract({
    abi: multiSigWalletAbi,
    functionName: 'transactions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiSigWalletAbi}__
 */
export const useWriteMultiSigWallet = /*#__PURE__*/ createUseWriteContract({
  abi: multiSigWalletAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"confirmTransaction"`
 */
export const useWriteMultiSigWalletConfirmTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiSigWalletAbi,
    functionName: 'confirmTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"executeTransaction"`
 */
export const useWriteMultiSigWalletExecuteTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiSigWalletAbi,
    functionName: 'executeTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"submitTransaction"`
 */
export const useWriteMultiSigWalletSubmitTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiSigWalletAbi,
    functionName: 'submitTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteMultiSigWalletWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiSigWalletAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiSigWalletAbi}__
 */
export const useSimulateMultiSigWallet =
  /*#__PURE__*/ createUseSimulateContract({ abi: multiSigWalletAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"confirmTransaction"`
 */
export const useSimulateMultiSigWalletConfirmTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiSigWalletAbi,
    functionName: 'confirmTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"executeTransaction"`
 */
export const useSimulateMultiSigWalletExecuteTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiSigWalletAbi,
    functionName: 'executeTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"submitTransaction"`
 */
export const useSimulateMultiSigWalletSubmitTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiSigWalletAbi,
    functionName: 'submitTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiSigWalletAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateMultiSigWalletWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiSigWalletAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiSigWalletAbi}__
 */
export const useWatchMultiSigWalletEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: multiSigWalletAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiSigWalletAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchMultiSigWalletDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiSigWalletAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiSigWalletAbi}__ and `eventName` set to `"TransactionConfirmed"`
 */
export const useWatchMultiSigWalletTransactionConfirmedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiSigWalletAbi,
    eventName: 'TransactionConfirmed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiSigWalletAbi}__ and `eventName` set to `"TransactionExecuted"`
 */
export const useWatchMultiSigWalletTransactionExecutedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiSigWalletAbi,
    eventName: 'TransactionExecuted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiSigWalletAbi}__ and `eventName` set to `"TransactionSubmitted"`
 */
export const useWatchMultiSigWalletTransactionSubmittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiSigWalletAbi,
    eventName: 'TransactionSubmitted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })
