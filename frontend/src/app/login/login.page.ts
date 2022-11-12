import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ConnectwalletService } from '../utils/connectwallet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSplash=false;
  constructor(private connectWallet:ConnectwalletService,
    private loadingController:LoadingController) { }

  ngOnInit() {
     
  }

  async onSplash(){
    // this.isSplash = true
    // setTimeout(()=>{
    //   window.location.href = "/dashboard"
    // },2500) 
    
    const loading = await this.loadingController.create({ message: "Verifying Wonder Pass...."  });
    await loading.present();  

    await this.connectWallet.connect();
    setTimeout(async () => { 
      await loading.dismiss();  
      window.location.href = "/dashboard";
    }, 3000);
  }
 
}
