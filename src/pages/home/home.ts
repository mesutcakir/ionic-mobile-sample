import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sampleResult: string;
  bannerConfig: AdMobFreeBannerConfig;
  rewardVideoConfig:AdMobFreeRewardVideoConfig;
  constructor(public admobFree: AdMobFree, private ga: GoogleAnalytics) {
    this.bannerConfig = {
      isTesting: false,
      autoShow: false,
      id: "ca-app-pub-7691889669897119/7510818119"
    };

    this.rewardVideoConfig = {
      autoShow: false,
      id: "ca-app-pub-7691889669897119~3610391116",
      isTesting:false
    };
  }
  sample() {
    this.ga.startTrackerWithId('UA-117874259-1')
      .then(() => {
        this.sampleResult = "Reklam Yükleniyor..";

        this.ga.trackView("Banner Sample");
        this.ga.trackEvent("category", "action", "label", 1, true);

       // this.admobFree.banner.config(this.bannerConfig);
       // this.admobFree.banner.prepare().then(() => {
         // setTimeout(() => {
           // this.sampleResult = "<br />banner showed";
             // this.admobFree.banner.show();
            //},
           // 1000);
       // }).catch(e => {
         // Pro.monitoring.exception(e);
          //this.sampleResult = JSON.stringify(e);
          //});

        this.admobFree.rewardVideo.config(this.rewardVideoConfig);
        this.admobFree.rewardVideo.prepare().then(() => {
          setTimeout(() => {
            this.sampleResult += "<br />rewardVideo showed";
              this.admobFree.rewardVideo.show();
            },
            1000);
        }).catch(e => {
          Pro.monitoring.exception(e);
          this.sampleResult = JSON.stringify(e);
        });

      })
      .catch(e => Pro.monitoring.exception(e));

  }
}
