// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

interface IERC7007 is IERC721 {
    /**
     * @dev Emitted when `tokenId` token's AIGC data is added.
     */
    event AigcData(
        uint256 indexed tokenId,
        bytes indexed prompt,
        bytes indexed aigcData,
        bytes proof
    );

    /**
     * @dev Adds AIGC data to the token at `tokenId` given `prompt`, `aigcData`, and `proof`.
     */
    function addAigcData(
        uint256 tokenId,
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external;

    /**
     * @dev Verifies the `prompt`, `aigcData`, and `proof`.
     */
    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external view returns (bool success);
}

contract InviteFriends7007 is ERC721Enumerable, Ownable, IERC7007 {
    IERC20 public dunkVerseToken;
    mapping(address => bool) public invited;
    mapping(address => uint256) public tokens;

    // ERC-7007 specific mappings
    mapping(uint256 => bytes) private _prompts;
    mapping(uint256 => bytes) private _aigcData;
    mapping(uint256 => bytes) private _proofs;

    event InvitationSent(address indexed inviter, address indexed invitee, uint256 amount);
    event InvitationAccepted(address indexed invitee, uint256 amount);

    constructor(address _dunkVerseToken) ERC721("InviteFriends7007NFT", "IF7007") {
        dunkVerseToken = IERC20(_dunkVerseToken);
    }

    function invite(address invitee, uint256 amount) external {
        require(!invited[invitee], "Already invited");
        require(dunkVerseToken.balanceOf(msg.sender) >= amount, "Insufficient token balance");

        invited[invitee] = true;
        tokens[invitee] = amount;
        emit InvitationSent(msg.sender, invitee, amount);
    }

    function acceptInvitation() external {
        require(invited[msg.sender], "Not invited");
        uint256 amount = tokens[msg.sender];
        tokens[msg.sender] = 0;
        invited[msg.sender] = false;

        // Transfer tokens to the invitee
        dunkVerseToken.transfer(msg.sender, amount);
        emit InvitationAccepted(msg.sender, amount);
    }

    /**
     * @dev Adds AIGC data to the token at `tokenId` given `prompt`, `aigcData`, and `proof`.
     */
    function addAigcData(
        uint256 tokenId,
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external override onlyOwner {
        require(_exists(tokenId), "ERC7007: Nonexistent token");

        _prompts[tokenId] = prompt;
        _aigcData[tokenId] = aigcData;
        _proofs[tokenId] = proof;

        emit AigcData(tokenId, prompt, aigcData, proof);
    }

    /**
     * @dev Verifies the `prompt`, `aigcData`, and `proof`.
     */
    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external view override returns (bool success) {
        // Implement the verification logic here
        // This is a placeholder implementation
        return keccak256(prompt) == keccak256(aigcData) && proof.length > 0;
    }

    /**
     * @dev Mints a new NFT with the given `tokenId` to the specified `to` address.
     */
    function mint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }
}
