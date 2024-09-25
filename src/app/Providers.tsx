'use client'
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react'
import { ThemeProvider } from 'styled-components'
import original from 'react95/dist/themes/original'
import {
  RainbowKitProvider,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { avalancheFuji, avalanche } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fallback, unstable_connector, WagmiProvider } from 'wagmi';
import { injected } from 'wagmi/connectors';
import {
  coreWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
// Define multiple RPC providers
const avalancheMainnetProviders = [
  unstable_connector(injected),
  // Add more providers as needed
];

const avalancheFujiProviders = [
  unstable_connector(injected),
];
const config = getDefaultConfig({
  appName: 'ABC',
  projectId: '2ca9e09e7067c0bf752bc4f35c3b9596',
  transports: {
    [avalancheFuji.id]: fallback(avalancheFujiProviders), // Use random load balancer
    [avalanche.id]: fallback(avalancheMainnetProviders), // Use random load balancer
  },
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        coreWallet,
        rabbyWallet,
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
  ssr: true,
  chains:
    process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [avalancheFuji]
      : [avalanche],
});
const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={original}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>

  )
}
