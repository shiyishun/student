import {Component} from '@angular/core';
import {GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})

export class ScorePage {
  qscores: any;

  constructor(public questionData: RedditData, public globalStorage: GlobalStorage) {
    this.qscores = [];
    globalStorage.getStorage('stuId').then(res => {
      questionData.getQuestion('电子技术', res).subscribe(result => {
        this.qscores = result.questions;
        // console.log('score page ' + result.questions[0].score);
      })
    });
  }
}
