// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC7007.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AIGeneratedNFT7007 is ERC7007, Ownable {
    uint256 public nextTokenId;
    string public baseTokenURI;
    
    struct ImageMetadata {
        string name;
        string imageUrl;
    }
    
    mapping(uint256 => ImageMetadata) public images;

    constructor(string memory _baseTokenURI) 
        ERC7007("AI Generated NFT", "AINFT") 
        Ownable(msg.sender) 
    {
        baseTokenURI = _baseTokenURI;
    }

    function mint(address to, uint256 amount, string memory name) external onlyOwner returns (uint256 tokenId) {
        tokenId = _mintNFT(to, amount);
        images[tokenId] = ImageMetadata(name, string(abi.encodePacked(baseTokenURI, name)));
        nextTokenId++;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function getImageMetadata(uint256 tokenId) external view returns (string memory name, string memory imageUrl) {
        ImageMetadata memory metadata = images[tokenId];
        return (metadata.name, metadata.imageUrl);
    }

    function burnNFT(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not the NFT owner");
        _burnNFT(tokenId);
    }
}
