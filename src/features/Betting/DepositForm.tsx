import { ethers } from 'ethers';
import React, { useState } from 'react';

interface DepositFormProps {
  contract: ethers.Contract;
}

const DepositForm: React.FC<DepositFormProps> = ({ contract }) => {
  const [amount, setAmount] = useState('');
  const [poolId, setPoolId] = useState('');

  const handleDeposit = async () => {
    try {
      const tx = await contract.deposit(
        ethers.utils.parseEther(amount),
        poolId
      );
      const receipt = await tx.wait();
      console.log('Funds deposited:', receipt);
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  return (
    <div>
      <input
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type='number'
        placeholder='Pool ID'
        value={poolId}
        onChange={(e) => setPoolId(e.target.value)}
      />
      <button onClick={handleDeposit} className='btn-primary'>
        Deposit Funds
      </button>
    </div>
  );
};

export default DepositForm;
