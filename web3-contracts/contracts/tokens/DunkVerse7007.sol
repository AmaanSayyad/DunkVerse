// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC7007.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract DunkVerse7007 is ERC7007, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
    address public owner;

    event TokensMinted(address indexed to, uint256 amount);
    event NFTMinted(address indexed to, uint256 tokenId);

    constructor() ERC7007('DunkVerse', 'FTO') {
        owner = msg.sender;
        _mint(owner, 10000000000 * (10 ** uint256(decimals())));
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(MINTER_ROLE, owner);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function mintNFT(address to, uint256 amount) external onlyRole(MINTER_ROLE) returns (uint256 tokenId) {
        tokenId = _mintNFT(to, amount);
        emit NFTMinted(to, tokenId);
    }

    function burnNFT(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not the NFT owner");
        _burnNFT(tokenId);
    }
}
