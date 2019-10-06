import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {

  highScoreList: any = [];

  constructor() { }

  ngOnInit() {
    var getHighScores = JSON.parse(localStorage.getItem("highScores"));
    if(getHighScores == null || getHighScores.length < 4) {     
      var highScores = [{name:"player1", score:750}, {name:"player2", score:2250}, {name:"player3", score:1500}];
      localStorage.setItem('highScores', JSON.stringify(highScores));
      var getHighScores = JSON.parse(localStorage.getItem("highScores"));
      getHighScores.sort(compare);
    } else if (getHighScores.length >= 4) {
        getHighScores.sort(compare);
        getHighScores.pop();
        localStorage.setItem('highScores', JSON.stringify(getHighScores));
    }
    function compare(a, b) {
      const playerA = a.score;
      const playerB = b.score;    
      let comparison = 0;
      if (playerA < playerB) {
        comparison = 1;
      } else if (playerA > playerB) {
        comparison = -1;
      }
      return comparison;
    }    
    this.highScoreList = getHighScores;
  }

}
