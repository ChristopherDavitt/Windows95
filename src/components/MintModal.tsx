import React from 'react';
import { Button, ProgressBar } from 'react95';
import styled from 'styled-components';
import DraggableWindow from './DraggableWindow';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract 
} from 'wagmi';
import { nftAbi } from '@/utils/abis';
import Image from 'next/image';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const CenteredText = styled.p`
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const MintButton = styled(Button)`
  align-self: flex-end;
  width: 100%;
`;

interface MintModalProps {
  onClose: () => void;
}

const MintModal: React.FC<MintModalProps> = ({ onClose }) => {
  const { address } = useAccount();
  const [amount, setAmount] = React.useState(0);
  const { writeContract, data } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      writeContract({ 
        abi: nftAbi,
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'mint',
        args: [amount] 
      });
    } else {
      alert('Please connect your wallet first');
    }
  };

  return (
    <DraggableWindow title="Mint NFT" onClose={onClose}>
      <CenteredText>120 / 1230</CenteredText>
      <ProgressBar variant="tile" value={120 / 1230 * 100} />
      <ImageContainer>
        <Image src="/abc.jpg" alt="NFT" width={300} height={300} />
      </ImageContainer>
      <p>OG: Price: 1 AVAX</p>
      <p>WL: Price: 1 AVAX</p>
      <p>Public: Price: 2 AVAX</p>
      <Form style={{ marginTop: '16px' }} onSubmit={handleSubmit}>
        <ButtonGroup>
          <Button onClick={() => setAmount(amount - 1)}>-</Button>
          <MintButton type="submit" disabled={isLoading}>
            {isLoading ? 'Minting...' : `Mint ${amount}`}
          </MintButton>
          <Button onClick={() => setAmount(amount + 1)}>+</Button>
        </ButtonGroup>
        {isSuccess && <p>NFT minted successfully!</p>}
      </Form>
    </DraggableWindow>
  );
};

export default MintModal;