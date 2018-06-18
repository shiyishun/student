import {Component} from '@angular/core';

import {NavParams, NavController,LoadingController, ToastController} from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import {SignPage} from "../sign/sign";
import {GlobalStorage} from '../../providers/global-storage'

@Component({
  selector: 'page-position',
  templateUrl: 'position.html'
})
export class PositionPage {


  homeItem: any;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController,public globalStorage:GlobalStorage,
              public navCtrl: NavController, public navParams: NavParams, public redditService: RedditData) {


    this.homeItem = navParams.get('item');

    globalStorage.setStorage('courseName', this.homeItem.cnameAndID.courseName);

  }



  ionViewDidLoad() {

  }

  gotoSign() {

    this.navCtrl.push(SignPage);
  }

  askForLeave() {
    let loading = this.loadingCtrl.create({
      duration: 1000
    });
    this.globalStorage.getStorage('stuId').then(res => {

      this.redditService.updateCallTheRoll(res, '0*0', this.homeItem.cnameAndID.courseName, 2).subscribe(r => {
        if(r.state == '1') {
          let toast = this.toastCtrl.create({
            message: '请假申请成功',
            duration: 1500,
            position: 'bottom',
          });
          toast.present();
          loading.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: '请假申请成功',
            duration: 1500,
            position: 'middle',
          });
          toast.present();
          loading.present();
        }
      });
    });

  }
}
