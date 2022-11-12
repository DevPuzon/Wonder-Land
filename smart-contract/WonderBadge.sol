// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;  
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol"; 
import "erc721b/contracts/ERC721B.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol"; 
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract WonderBadge is Ownable,AccessControl,ReentrancyGuard,ERC721B,IERC721Metadata{ 
  using Strings for uint256;
    
  bytes32 private constant _MINTER_ROLE = keccak256("MINTER_ROLE"); 
  bytes32 private constant _APPROVED_ROLE = keccak256("APPROVED_ROLE");
  bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
  uint16 public constant MAX_SUPPLY = 10000;   
 
  mapping(address => uint256) public minted; 
  bool public isStartPublicSale = false; 
  bool public isStartWhiteListSale = false; 
  string private _baseTokenURI = "ipfs://bafybeibfz7pwmmfdheldq5dvys2qdrd2jlvxff4t2x6lrgxqnysdh637ga/"; 
  string private _CONTRACT_URI = "ipfs://bafybeibfz7pwmmfdheldq5dvys2qdrd2jlvxff4t2x6lrgxqnysdh637ga";  
  uint256 public maxPerWallet = 1; 
  uint256 public mintPrice = 0 ether;   
  uint256 public creatorFees = 1000; 
  address public treasury = 0xfa83B36104cbB964a001B91bc4154C673408FeD2; 
  
  constructor() {
    _safeMint(msg.sender, 3);
  }

  function isApprovedForAll(
    address owner, 
    address operator
  ) public view override(ERC721B, IERC721) returns(bool) {
    return hasRole(_APPROVED_ROLE, operator) 
      || super.isApprovedForAll(owner, operator);
  } 
  
  function name() external pure override returns(string memory) {
    return "WonderBadge"; 
  }
  
  function symbol() external pure override returns(string memory) {
    return "WBadge";  
  }

  function contractURI() external view returns(string memory) {
    return _CONTRACT_URI;
  }

  function royaltyInfo(
    uint256 tokenId,
    uint256 salePrice
  ) external view returns (
    address receiver,
    uint256 royaltyAmount
  ) {
    if (treasury == address(0) || !_exists(tokenId)) 
      revert InvalidCall();
    
    return (
      payable(treasury), 
      (salePrice * creatorFees) / 10000
    );
  }
 
  function tokenURI(uint256 tokenId) external view override returns(string memory) {
    if(!_exists(tokenId)) revert InvalidCall();
        return string( abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json") );
  } 

  function mint(uint256 quantity) external nonReentrant {
    address recipient = _msgSender();  
    _safeMint(recipient, quantity);
  } 

  function whiteListMint(
    uint256 quantity, 
    bytes memory proof
  ) external payable nonReentrant {
    address recipient = _msgSender(); 
    if (quantity == 0  
      || !isStartWhiteListSale 
      || (quantity + minted[recipient]) > maxPerWallet 
      || (quantity * mintPrice) > msg.value 
      || (totalSupply() + quantity) > MAX_SUPPLY 
      || !hasRole(_MINTER_ROLE, ECDSA.recover(
        ECDSA.toEthSignedMessageHash(
          keccak256(abi.encodePacked("whiteListMint", recipient))
        ),
        proof
      ))
    ) revert InvalidCall(); 
    minted[recipient] += quantity;
    _safeMint(recipient, quantity);
  }  

  function mintForAddress(
    address recipient,
    uint256 quantity
  ) external onlyOwner nonReentrant { 
    if (quantity == 0  
      || (totalSupply() + quantity) > MAX_SUPPLY
    ) revert InvalidCall();

    _safeMint(recipient, quantity);
  }
  
  function setBaseURI(string memory uri) external onlyOwner {
    _baseTokenURI = uri;
  }
  
  function setContractURI(string memory _uri) external onlyOwner {
    _CONTRACT_URI = _uri;
  }
  
  function setMaxPerWallet(uint256 max) external onlyOwner {
    maxPerWallet = max;
  }  

  function setMintPrice(uint256 price) external onlyOwner {
    mintPrice = price;
  } 

  function setPausesStates(bool _isStartPublicSale,bool _isStartWhiteListSale) external onlyOwner {
    isStartPublicSale = _isStartPublicSale;
    isStartWhiteListSale = _isStartWhiteListSale;
  }  
  
  function withdraw(address to) external onlyOwner nonReentrant {  
    payable(to).transfer(address(this).balance);
  } 
   
  function updateFees(uint256 percent) external onlyOwner {
    if (percent > 1000) revert InvalidCall();
    creatorFees = percent;
  }
 
  function supportsInterface(
    bytes4 interfaceId
  ) public view override(AccessControl, ERC721B, IERC165) returns(bool) { 
    return interfaceId == type(IERC721Metadata).interfaceId 
      || interfaceId == _INTERFACE_ID_ERC2981 
      || super.supportsInterface(interfaceId);
  }
}