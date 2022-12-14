// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  configchain:{  
    "CONTRACT_ADDRESS": "0x4c096B7d243c61a5680E684eDb3B3a6574200466",   
    "NETWORK": {  
        "NAME": "GOERLI ETH",
        "SYMBOL": "GOERLIETH",
        "ID": 5,
        "RPCURL": "https://goerli.infura.io/v3/",
        "blockExplorerUrls" : "https://goerli.etherscan.io"
      },
    "GAS_LIMIT": 100000,  
  } 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
