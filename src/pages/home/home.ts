import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bannerConfig: AdMobFreeBannerConfig = {
    isTesting: true,
    autoShow: true,
    bannerAtTop:true,
    //id: "ca-app-pub-7691889669897119/7510818119"
  };
  constructor(public admobFree: AdMobFree) {
    this.admobFree.banner.config(this.bannerConfig);
  }
  ionViewDidLoad() {
    this.admobFree.banner.prepare().then(() => {
      console.log("banner showing");
    }).catch(e => Pro.monitoring.exception(e));
  }
}
