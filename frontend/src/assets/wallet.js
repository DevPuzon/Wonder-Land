class Wallet {
    contract=null;
    ethereum=  window.ethereum;
    web3=null;
    config ={
        "NETWORK": {  
            "NAME": "GOERLI ETH",
            "SYMBOL": "GOERLIETH",
            "ID": 5,
            "RPCURL": "https://goerli.infura.io/v3/",
            "blockExplorerUrls" : "https://goerli.etherscan.io"
          }
    }
    constructor(abi,CONTRACT_ADDRESS){ 
        this.init(abi,CONTRACT_ADDRESS);
    }
  async init(str,CONTRACT_ADDRESS) {  
    console.log(this.ethereum);
    this.web3 = new Web3(this.ethereum); 
    let abi = `http://localhost:4200/assets/${str}.json`; 
    const abiResponse = await fetch(abi, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });  
    const contractAbi = await abiResponse.json();
    const contractAddress = CONTRACT_ADDRESS; 
    console.log(contractAbi,contractAddress)
    console.log(new this.web3.eth.Contract(contractAbi,  contractAddress));
    this.contract = new this.web3.eth.Contract(contractAbi,  contractAddress); 
    console.log(this.contract)
  } 

  initAcc(){  
    return new Promise(async(resolve)=>{
      const accounts = await this.web3.eth.getAccounts();
      if(accounts.length == 0){ 
        this.setAccount(await this.getAccount());
      }else{ 
        this.setAccount(accounts[0]);
      } 
      resolve({});
    })
  }

  
  async connect(){   
    return new Promise(async (resolve,reject)=>{
      const metamaskIsInstalled = this.ethereum && this.ethereum.isMetaMask; 
      const networkId = await this.ethereum.request({
        method: "net_version",
      });

      if (!metamaskIsInstalled) {
        this.errorAlert("Install Metamask.");
        reject({});
        return;
      }  
      console.log(`connect`,networkId,this.config.NETWORK.ID);
      if (networkId != this.config.NETWORK.ID) { 
        this.errorAlert(`Please, change the network to ${this.config.NETWORK.NAME}.`);
        this.switchChain();
        reject({});
        return;
      }
    
      const accounts = await this.web3.eth.getAccounts();
      if(accounts.length == 0){ 
        this.setAccount(await this.getAccount());
      }else{ 
        this.setAccount(accounts[0]);
      } 
      console.log(this.contract,this.userAddress);
      resolve({});
    })

  }

  async setAccount(account) {
    this.userAddress = account;  
    if(this.userAddress  ){ 
      this.isConnected = true;
    } 
    console.log(this.userAddress);  
  }
 
  async getAccount() {
    return new Promise(async resolve=>{ 
      const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' }); 
      resolve(accounts[0]);
    })
  }
  
  async errorAlert(message){ 
    const alert = await this.alertController.create({  
      message: message,
      backdropDismiss:false,
      buttons: [ {
          text: 'Ok',
          handler: async () => {  
            window.location.reload();
          }
        }
      ]
    }); 
    await alert.present();
  }

  async switchChain() { 
    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x'+this.config.NETWORK.ID.toString(16) }],
      });
    } catch (e) {
      console.log(`switchEthereumChain e`,e);
      if (e.code === 4902) {
        try {
          await this.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x'+this.config.NETWORK.ID.toString(16),
                chainName: this.config.NETWORK.NAME,
                nativeCurrency: {
                  name: this.config.NETWORK.SYMBOL,
                  symbol: this.config.NETWORK.SYMBOL,  
                  decimals: 18
                }, 
                rpcUrls: [this.config.NETWORK.RPCURL],
                blockExplorerUrls:[this.config.NETWORK.blockExplorerUrls]
              },
            ],
          });
        } catch (addError) {
          console.log(`switchEthereumChain addError`,addError);
          console.error(addError);
        }
      }
      // console.error(e)
    }
  }

  async gasEstimate (fromAddress, toAddress, amount)   {
    const gasAmount = await this.web3.eth.estimateGas({
      to: toAddress,
      from: fromAddress,
      value: this.web3.utils.toWei(`${amount}`, 'ether'),
    });
    console.log("gasAmount",gasAmount);
    return gasAmount;
  }

  toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }
}
 
// const wPass = new Wallet('passAbi',"0x4c096B7d243c61a5680E684eDb3B3a6574200466");
// const wBadge = new Wallet('badgeAbi',"0x94C2635862a1a216Be5f07eeA7A1FB3dBcCf201a");
// const wToken = new Wallet('tokenAbi'); 
 