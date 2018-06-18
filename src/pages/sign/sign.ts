import {Component} from '@angular/core';

import {LoadingController, ToastController} from 'ionic-angular';
import {GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'

@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html'
})

export class SignPage {

  c: any;
  site: string[];
  row: any;
  col: any;
  rows: number[];
  cols: number[];

  pai: string;
  lie: string;


  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public courseData: RedditData, public globalStorage: GlobalStorage) {
    globalStorage.getStorage('courseName').then(res => {
      this.c = res;
      console.log('sign page ' + res);
      courseData.getCourseByName(res).subscribe(result => {
        this.site = result.course.shape.split('*');
        this.row = this.site[0];
        this.col = this.site[1];
        console.log('sign page row ' + this.row);
        console.log('sign page col ' + this.col);
        this.cols = [];
        this.rows = [];
        for (let i = 1; i <= this.col; i++) {
          // console.log('cols ' + i);
          this.cols.push(i);
        }
        for (let i = 1; i <= this.row; i++) {
          // console.log('cols ' + i);
          this.rows.push(i);
        }
        // console.log('sign page sign ' + this.sign[0] + ':' + this.sign[1]);
        // console.log('sign page getCourse ' + result.course.shape);
      });
    });



  }

  sign() {
    let loading = this.loadingCtrl.create({
      duration: 1000
    });
    // console.log('sign page sign() time ' + this.event);
     //console.log('sign page sign() pai ' + this.pai);
     //console.log('sign page sign() lie ' + this.lie);
    let w = this.pai + '*' + this.lie;

    this.globalStorage.getStorage('stuId').then(res => {
      //console.log('sign page ' + this.c + ' ' + res + ' ' + w);
      this.courseData.updateCallTheRoll(res, w, this.c, 1).subscribe(r => {
        console.log(r.state);
        if(r.state == '1') {
          let toast = this.toastCtrl.create({
            message: '签到成功',
            duration: 1000,
            position: 'bottom',
          });
          toast.present();
          loading.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: '签到成功',
            duration: 1000,
            position: 'middle',
          });
          toast.present();
          loading.present();
        }
      });
      // console.log('sign page final' + this.c + ' ' + res + ' ' + w);
    });



  }
}
