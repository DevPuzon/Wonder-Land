// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract WonderToken is ERC20, ERC20Burnable {
    uint256 supply = 100_000_000_000 * 10**18;
    
    constructor() ERC20("WonderToken", "WToken") {
         
    }

    function mint (uint256 amount)public {
        address account = msg.sender;
        _mint(account, amount);
    }

}