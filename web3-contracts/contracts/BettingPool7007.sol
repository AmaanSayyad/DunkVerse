// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

interface IERC7007 is IERC721 {
    /**
     * @dev Emitted when `tokenId` token is minted with AI-generated content.
     */
    event Mint(
        uint256 indexed tokenId,
        bytes indexed prompt,
        bytes indexed aigcData,
        string uri,
        bytes proof
    );

    /**
     * @dev Mints a new NFT with AI-generated content.
     */
    function mintAIGC(
        address to,
        uint256 tokenId,
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    ) external;

    /**
     * @dev Verifies the AI-generated content using the provided proof.
     */
    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external view returns (bool);
}

contract BettingPool7007 is ERC721Enumerable, Ownable, IERC7007 {
    using SafeERC20 for IERC20;

    event NewUser(uint256 userID, address userAddress);
    event Deposit(uint256 userID, uint256 amount, uint256 poolId);
    event Withdrawal(uint256 userID, uint256 amount, uint256 poolId);
    event BetPlaced(address indexed user, uint256 amount, uint256 poolId);
    event BetWon(address indexed user, uint256 poolId, uint256 nftId);
    event RewardClaimed(address indexed user, uint256 nftId);

    IERC20 public flowToken;
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
    mapping(address => uint256) public userBalance;
    mapping(address => uint256) public userInvested;

    // ERC-7007 specific mappings
    mapping(uint256 => bytes) private _prompts;
    mapping(uint256 => bytes) private _aigcData;
    mapping(uint256 => string) private _uris;
    mapping(uint256 => bytes) private _proofs;

    constructor(address _flowToken, address _commissionsAddress) ERC721("BettingPool7007NFT", "BP7007") {
        flowToken = IERC20(_flowToken);
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

    function finalizeBet(uint256 poolId, uint256 nftId) external onlyOwner {
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

        _safeTransfer(address(this), highestBet.user, nftId, "");
        emit BetWon(highestBet.user, poolId, nftId);
    }

    function claimReward(uint256 nftId) external {
        require(ownerOf(nftId) == address(this), "NFT not available for claim");

        _safeTransfer(address(this), msg.sender, nftId, "");
        emit RewardClaimed(msg.sender, nftId);
    }

    function mintAIGC(
    address to,
    uint256 tokenId,
    bytes calldata prompt,
    bytes calldata aigcData,
    string calldata uri,
    bytes calldata proof
) external override onlyOwner {
    require(!_exists(tokenId), "Token already minted");

    _prompts[tokenId] = prompt;
    _aigcData[tokenId] = aigcData;
    _uris[tokenId] = uri;
    _proofs[tokenId] = proof;

    _safeMint(to, tokenId);

    emit Mint(tokenId, prompt, aigcData, uri, proof);
}
