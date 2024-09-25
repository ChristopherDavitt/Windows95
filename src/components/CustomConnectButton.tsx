'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { Button } from 'react95';
const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type='button'
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type='button'
                  >
                    Wrong network
                  </Button>
                );
              }

              function truncateAddress(address: string): React.ReactNode {
                return `${address.slice(0, 6)}...${address.slice(-4)}`;
              }

              return (
                <>
                  <div style={{ display: 'flex' }}>
                    <Button
                      onClick={openChainModal}
                    >
                      {truncateAddress(account.address)}
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default CustomConnectButton;
