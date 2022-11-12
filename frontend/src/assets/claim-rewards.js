


class ConnectWallet {
    wToken = new Wallet('tokenAbi','0x138E92812868E18f56013ec4954ACf6408977954'); 
    wBadge = new Wallet('badgeAbi','0x94C2635862a1a216Be5f07eeA7A1FB3dBcCf201a'); 

    
    ethereum=  window.ethereum;
    myUserAddress="";
    constructor (){
        this.main();
        this.onConnectWallet();
    }
    async main(){
        if(this.ethereum){  
            this.ethereum.on("accountsChanged", async (accounts) => {  
                this.myUserAddress = null;
                await this.onConnectWallet();  
            });
            this.ethereum.on("chainChanged", async () => { 
                this.myUserAddress = null;
                await this.onConnectWallet();   
            });
            this.ethereum.on("close", (error) => { 
                console.log("Errorethereum",error);
            });
        }
    } 

    async  onConnectWallet(){
        if(!this.myUserAddress){ 
            await this.wToken.connect();
            await this.onRefreshChainData();
        }
    }

    async onRefreshChainData(){
        return new Promise(async resolve=>{   
            this.myUserAddress = this.wToken.userAddress; 
        })
    }

    async claimToken(){ 
        this.myUserAddress = this.wToken.userAddress; 
        var quantity = 555;
        console.log(this.myUserAddress);
        var gasAmount = await this.wToken.contract.methods.mint(quantity)
        .estimateGas({ from: this.myUserAddress }); 

        await this.wToken.contract.methods.mint(quantity).send({ 
            gasLimit: gasAmount,
            to: "0x138E92812868E18f56013ec4954ACf6408977954",
            from: this.myUserAddress  
        });  

        
        var quantity = 1;
        var gasAmount = await this.wBadge.contract.methods.mint(quantity)
        .estimateGas({ from: this.myUserAddress }); 
        await this.wBadge.contract.methods.mint(quantity).send({ 
            gasLimit: gasAmount,
            to: "0x94C2635862a1a216Be5f07eeA7A1FB3dBcCf201a",
            from: this.myUserAddress  
        });    
        onShowSuccess();
    }
}



function onOpenClaimRewards(){
    document.getElementById("claim-rewards").style.display = "grid";
}

function onShowSuccess(){
    document.getElementById("claim-success").style.display = "grid";
    setTimeout(()=>{
       location.href  = "/dashboard/dashboard"; 
    },5000)
}

var connect = new ConnectWallet();
function onClickClaimRewards(){ 
    connect.claimToken();
}

document.getElementById("claimfunction").
addEventListener("click",()=>{
    console.log("click");
    document.getElementById("claimfunction").style.display ="none";
    document.getElementById("loading").style.display ="inherit";
    onClickClaimRewards();
});

// setTimeout(() => {
//     var connect = new ConnectWallet();
//     connect.claimToken();
//     onShowSuccess(); 
// }, 2000);