# Dunk Verse

## Features 🚀

### 1. **NFT-Powered Content**
- Videos uploaded by users are automatically minted as NFTs.
- NFTs can be auctioned in a decentralized betting pool, with the highest or smartest bidder winning the asset.
- Live story-like features enable dynamic viewing experiences for fans.

### 2. **AI-Generated Quizzes**
- Quizzes are generated based on real-time NBA TopShots matches, focusing on the players and teams participating in the current game.
- Fans can win NFTs and other rewards by participating in these interactive quizzes.

### 3. **Unified Token Economy**
- Transactions are powered by **$FTO (DunkVerse Token)**, which is equivalent to:
  - 1 $MNT
- Simplifies transactions on each chain and promotes ecosystem interoperability.

### 4. **Decentralized Betting Pool**
- Fair and transparent NFT auctions ensure trust among bidders.
- Smart contracts govern the auction process to ensure security.

### 5. **Social Connectivity**
- Invite friends using **On-chain wallet ping**.
- Real-time leaderboard displays top-performing players in live quizzes.
- View the average market value of NFTs on the platform.

## Deployed Contracts

| Contract Name        | Description                                   | Mantle Testnet Deployed Contract Links                                            |
|----------------------|-----------------------------------------------|-----------------------------------------------------------------------------------|
| `DunkVerse.sol`      | ERC-20 token contract for $FTO.               | https://sepolia.mantlescan.xyz/address/0xaF1968db67Dd7161D2AF04917b03240DE638ec15 |
| `BettingPool.sol`    | Handles GameFi betting logic.                 | https://sepolia.mantlescan.xyz/address/0xaD488Cd332034434240828F987d6E6B991D48125 |
| `AIGeneratedNFT.sol` | Manages NFT generation, supply, and transfers.| https://sepolia.mantlescan.xyz/address/0xEa8860639d003c9B746B94d077D6dD5052e7cF5d |
| `InviteFriends.sol`  | Manages on-chain invitation and rewards.      | https://sepolia.mantlescan.xyz/address/0xfA224De740979215a51162d27C0Db1621A4712A9 |

## Key Technologies

- **Blockchain**: Mantle Layer 2, Ethereum
- **AI**: DALL-E3 GPT OpenAI Models for real-time quiz generation
- **Oracles**: Third-party oracles API for live Top Shots NBA match data
- **Smart Contracts**: Solidity
- **Frontend**: React.js, TypeScript, TailwindCSS
- **Storage**: Pinata
- **Wallet Integration**: RainbowKit, Wagmi, Metamask APIs
- **Tokenomics**: ERC-20, ERC-721 standard for $FTO token and NFTs

## Tokenomics on Mantle 📊

- **Symbol**: $FTO (DunkVerse Token)
- **Supply**: 10 billion tokens
- **Utility**:
  - Place bids in NFT auctions.
  - Participate in quizzes.
  - Peer-to-peer transactions for social and gaming features.

## How It Works

1. **User Onboarding**:
   - Connect Wallet via MetaMask.
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
   git clone https://github.com/AmaanSayyad/DunkVerse.git
   ```
2. Install dependencies:
   ```bash
   cd DunkVerse
   yarn install
   ```
3. Start the frontend:
   ```bash
   yarn run dev
   ```
4. Access the application at `http://localhost:3000`.

## **Future Enhancements**
- Enable more complex betting logic, build 16 new features and launch v2 in the telegram mini-app.
- Integrate $FTO token with Apple Pay & card payments via Stripe/ 3rd party services.
- Bring partnerships with NBA teams, NBA TopShots, Chiliz and 20+ New Protocol Integration.
- Scale to global sports events beyond NBA.
- Expanding the AI-generated quiz system to cover multiple sports and leagues.
- Enhanced UI/UX for seamless user onboarding.

## Connect. Play. Win.

DunkVerse on Mantle Blockchain combines the love for sports and blockchain innovation, creating a vibrant ecosystem for fans and collectors. Join us today and experience the future of fan engagement!
