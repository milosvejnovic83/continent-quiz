import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: any;
  userName: any;

  constructor() { }

  ngOnInit() {
    var getHighScores = JSON.parse(localStorage.getItem("highScores"));
    this.score = getHighScores[3].score;
    this.userName = getHighScores[3].name;
  }

}
