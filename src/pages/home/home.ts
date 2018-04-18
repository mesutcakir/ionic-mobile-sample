import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sampleResult: string;
  config: AdMobFreeBannerConfig;
  constructor(public admobFree: AdMobFree,private ga: GoogleAnalytics) {
    this.config = {
      isTesting: false,
      autoShow: false,
      id: "ca-app-pub-7691889669897119/7510818119"
    };
  }
  sample() {
    this.admobFree.banner.config(this.config);
    this.sampleResult = "Reklam Yükleniyor..";
    this.admobFree.banner.prepare().then(() => {
      setTimeout(() => {
        this.sampleResult = "banner showing";
        this.admobFree.banner.show();
      }, 1000);
    }).catch(e => {
      Pro.monitoring.exception(e);
      this.sampleResult = JSON.stringify(e);
    });
  }
initializeApp() {
   setTimeout(this.sample, 1000);
      this.ga.startTrackerWithId('UA-117874259-1')
        .then(() => {
          console.log('Google analytics is ready now');

          this.ga.debugMode();
          this.ga.setAllowIDFACollection(true);
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e)); 
  }
}
