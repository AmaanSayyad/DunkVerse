# Dunk Verse

## Overview

Dunk Verse integrates multiple Web3 paradigms into a single platform, allowing users to:
- Participate in AI-generated quizzes.
- Bet and predict outcomes using Dunk Verse tokens ($FTO).
- Earn AI-generated NFTs as rewards.
- Engage in a gamified environment with leaderboards.
- Invite friends via on-chain mechanisms and track rewards.

## Features

### 1. **AI-Generated Content (AIGC)**
- **Quiz Creation**: Generates engaging quizzes using advanced AI models like GPT and DALL-E3.
- **NFT Generation**: AI-powered creation of unique NBA-themed NFTs (TopShots) as rewards.

### 2. **DeFi**
- **Prediction Market**: Users bet $FTO tokens to predict outcomes and win rewards.
- **Lending and Staking**: Future roadmap includes novel mechanisms for liquidity mining and staking.

### 3. **GameFi**
- **Betting Contracts**: Secure and transparent smart contracts manage user deposits and distribute winnings.
- **Gamification**: Leaderboards track and display top-performing players.

### 4. **NFTs**
- **Dynamic NFT Rewards**: Win AI-generated TopShots NFTs by participating in quizzes and predictions.
- **Marketplace Integration**: Trade NFTs within the Dunk Verse ecosystem (future feature).

### 5. **SocialFi**
- **On-Chain Invitations**: Users can invite friends via MetaMask and track invitation rewards.
- **Community Engagement**: Leaderboards and social features promote competition and interaction.

## Deployed Contracts

| Contract Name        | Description                                   | Contract Address                                                                  |
|----------------------|-----------------------------------------------|-----------------------------------------------------------------------------------|
| `DunkVerse.sol`      | ERC-20 token contract for $FTO.               | https://sepolia.mantlescan.xyz/address/0xaF1968db67Dd7161D2AF04917b03240DE638ec15 |
| `BettingPool.sol`    | Handles GameFi betting logic.                 | https://sepolia.mantlescan.xyz/address/0xaD488Cd332034434240828F987d6E6B991D48125 |
| `AIGeneratedNFT.sol` | Manages NFT generation, supply, and transfers.| https://sepolia.mantlescan.xyz/address/0xEa8860639d003c9B746B94d077D6dD5052e7cF5d |
| `InviteFriends.sol`  | Manages on-chain invitation and rewards.      | https://sepolia.mantlescan.xyz/address/0xfA224De740979215a51162d27C0Db1621A4712A9 |
|
## Key Technologies

- **Blockchain**: Mantle Layer 2, Ethereum
- **AI**: DALL-E3, GPT models
- **Oracles**: Third party oracles api for live Top Shots NBA match data
- **Smart Contracts**: Solidity
- **Frontend**: React, TypeScript
- **Storage**: Pinata

## How It Works

1. **User Onboarding**:
   - Sign up via MetaMask.
   - Receive $FTO tokens if you have a metamask-to-metamask invitation.

2. **Participation**:
   - Join AI-generated quizzes.
   - Bet on outcomes using $FTO.

3. **Rewards**:
   - Win AI-generated NFTs and leaderboard points.
   - Redeem rewards directly in the ecosystem.

4. **Social Engagement**:
   - Invite friends and earn rewards.
   - Compete on the leaderboard.

## Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/AmaanSayyad/dunk-verse.git
   ```
2. Install dependencies:
   ```bash
   cd dunk-verse
   yarn install
   ```
3. Start the frontend:
   ```bash
   yarn run dev
   ```
4. Access the application at `http://localhost:3000`.
