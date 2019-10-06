import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  userName: string;

  constructor() { }

  ngOnInit() {
  }

  addUser() {
    var getHighScores = JSON.parse(localStorage.getItem("highScores"));
    if (this.userName == null) {
      this.userName = "new player";
    }
    getHighScores.push({name:this.userName, score:0})
    localStorage.setItem('highScores', JSON.stringify(getHighScores));
  }

}
