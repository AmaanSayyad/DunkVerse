// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AIGeneratedNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    string public baseTokenURI;
    
    struct ImageMetadata {
        string name;
        string imageUrl;
    }
    
    mapping(uint256 => ImageMetadata) public images;

    constructor(string memory _baseTokenURI) 
        ERC721("AI Generated NFT", "AINFT") 
        Ownable(msg.sender) 
    {
        baseTokenURI = _baseTokenURI;
    }

    function mint(address to, string memory name) external onlyOwner {
        uint256 tokenId = nextTokenId;
        images[tokenId] = ImageMetadata(name, string(abi.encodePacked(baseTokenURI, name)));
        _safeMint(to, tokenId);
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
}