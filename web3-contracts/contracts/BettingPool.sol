// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract BettingPool is ERC721Holder {
    using SafeERC20 for IERC20;

    event NewUser(uint256 userID, address userAddress);
    event Deposit(uint256 userID, uint256 amount, uint256 poolId);
    event Withdrawal(uint256 userID, uint256 amount, uint256 poolId);
    event MomentPurchased(address indexed buyer, uint256 indexed momentID, uint256 amount);
    event AccruedFeesWithdrawn(uint256 amount, address to);
    event BetPlaced(address indexed user, uint256 amount, uint256 poolId);
    event BetWon(address indexed user, uint256 poolId, uint256 nftId);
    event RewardClaimed(address indexed user, uint256 nftId);

    IERC20 public flowToken;
    IERC721 public nftContract;
    uint256 public accruedFees;
    address public commissionsAddress;
    uint256 public commission = 5;
    uint256 public bettingPeriod = 24 hours;

    struct User {
        uint256 owedValue;
        uint256 uuid;
    }

    struct Bet {
        address user;
        uint256 amount;
    }

    mapping(address => User) public users;
    mapping(uint256 => uint256) public poolAmount;
    mapping(uint256 => Bet[]) public bets;
    mapping(uint256 => uint256) public nftPrices;
    mapping(address => uint256) public userBalance;
    mapping(address => uint256) public userInvested;

    uint256 public totalNFTs;
    uint256 public totalNFTPrice;

    constructor(address _flowToken, address _nftContract, address _commissionsAddress) {
        flowToken = IERC20(_flowToken);
        nftContract = IERC721(_nftContract);
        commissionsAddress = _commissionsAddress;
    }

    function createUser() external returns (uint256) {
        require(users[msg.sender].uuid == 0, "User already exists");

        uint256 userId = uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
        users[msg.sender] = User({owedValue: 0, uuid: userId});
        
        emit NewUser(userId, msg.sender);
        return userId;
    }

    function deposit(uint256 amount, uint256 poolId) external {
        require(amount > 0, "Amount must be greater than zero");
        User storage user = users[msg.sender];
        require(user.uuid != 0, "User not registered");

        flowToken.safeTransferFrom(msg.sender, address(this), amount);
        uint256 afterCommission = (amount * (100 - commission)) / 100;
        user.owedValue += afterCommission;
        poolAmount[poolId] += afterCommission;
        userBalance[msg.sender] += afterCommission;
        userInvested[msg.sender] += afterCommission;
        accruedFees += (amount - afterCommission);

        emit Deposit(user.uuid, amount, poolId);
    }

    function withdraw(uint256 amount, uint256 poolId) external {
        User storage user = users[msg.sender];
        require(user.owedValue >= amount, "Insufficient owed value");
        require(poolAmount[poolId] >= amount, "Insufficient pool balance");

        user.owedValue -= amount;
        poolAmount[poolId] -= amount;
        userBalance[msg.sender] -= amount;
        userInvested[msg.sender] -= amount;

        flowToken.safeTransfer(msg.sender, amount);

        emit Withdrawal(user.uuid, amount, poolId);
    }

    function purchaseMoment(uint256 momentID, uint256 amount) external {
        User storage user = users[msg.sender];
        require(user.owedValue >= amount, "Insufficient balance");

        user.owedValue -= amount;
        accruedFees += amount;
        nftPrices[momentID] = amount;
        totalNFTs++;
        totalNFTPrice += amount;

        emit MomentPurchased(msg.sender, momentID, amount);
    }

    function withdrawAccruedFees() external {
        require(msg.sender == commissionsAddress, "Not authorized");
        require(accruedFees > 0, "No accrued fees to withdraw");

        flowToken.safeTransfer(commissionsAddress, accruedFees);
        emit AccruedFeesWithdrawn(accruedFees, commissionsAddress);
        accruedFees = 0;
    }

    function enterBet(uint256 poolId, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        User storage user = users[msg.sender];
        require(user.uuid != 0, "User not registered");

        flowToken.safeTransferFrom(msg.sender, address(this), amount);
        bets[poolId].push(Bet({user: msg.sender, amount: amount}));
        userBalance[msg.sender] += amount;
        userInvested[msg.sender] += amount;

        emit BetPlaced(msg.sender, amount, poolId);
    }

    function finalizeBet(uint256 poolId, uint256 nftId) external {
        require(block.timestamp >= bettingPeriod, "Betting period not over");

        Bet[] storage poolBets = bets[poolId];
        require(poolBets.length > 0, "No bets placed");

        Bet memory highestBet = poolBets[0];
        for (uint256 i = 1; i < poolBets.length; i++) {
            if (poolBets[i].amount > highestBet.amount) {
                highestBet = poolBets[i];
            }
        }

        for (uint256 i = 0; i < poolBets.length; i++) {
            if (poolBets[i].user != highestBet.user) {
                flowToken.safeTransfer(poolBets[i].user, poolBets[i].amount);
                userBalance[poolBets[i].user] -= poolBets[i].amount;
                userInvested[poolBets[i].user] -= poolBets[i].amount;
            }
        }

        nftContract.safeTransferFrom(address(this), highestBet.user, nftId);
        emit BetWon(highestBet.user, poolId, nftId);
    }

    function claimReward(uint256 nftId) external {
        require(nftContract.ownerOf(nftId) == address(this), "NFT not available for claim");

        nftContract.safeTransferFrom(address(this), msg.sender, nftId);
        emit RewardClaimed(msg.sender, nftId);
    }

    function getUserDetails(address userAddress) external view returns (uint256 owedValue, uint256 uuid) {
        User storage user = users[userAddress];
        return (user.owedValue, user.uuid);
    }

    function getPoolBalance(uint256 poolId) external view returns (uint256) {
        return poolAmount[poolId];
    }

    function getContractBalance() external view returns (uint256) {
        return flowToken.balanceOf(address(this));
    }

    function getAverageNFTPrice() external view returns (uint256) {
        return totalNFTs > 0 ? totalNFTPrice / totalNFTs : 0;
    }
}