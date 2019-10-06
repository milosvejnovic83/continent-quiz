import { Component, OnInit } from '@angular/core';
import { GetQuestionsService } from '../services/get-questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: any;
  answers=["Antarctica", "Oceania", "Europe", "North America", "South America","Asia", "Africa"];
  questionNumber = 0;
  preparedQuestions: any;
  preparedAnswers: any;
  askedQuestion: any;
  askedQuestionAnswer: any;
  score = 0;

  constructor(public getQuestionsService: GetQuestionsService, private router: Router) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questions = [];
    this.getQuestionsService.getQuestions().subscribe((data: {}) => { 
      this.questions = data;  
      this.prepareTest();
    });
  }

  prepareTest() {
    var allQuestions=[];
    var quizQuestions=[];
    var question=[];
    var twoAnswers=[];
    var threeAnswers=[];
    var allAnswers=[];
    var questionNumber = this.questions.length;
    var answer;
    var posibleAnswers;
    var n;
    var m;
    var r;
    var p;
    for (m=0; m < questionNumber; m++) {
      allQuestions[m] = m;
    };   
    for (n=1; n<=5; ++n)
    {
      var i = Math.floor((Math.random() * (questionNumber-n)) + 1);
      quizQuestions.push(allQuestions[i]);
      allQuestions[i] = allQuestions[questionNumber-n];
    };
    for (r=0; r < quizQuestions.length; r++) {
      question[r] = this.questions[quizQuestions[r]];
      answer = question[r].continent;
      posibleAnswers = this.answers.filter(e => e !== answer); 
      for (p=1; p<=2; ++p)
      {
        var i = Math.floor((Math.random() * (6-p)) + 1);
        twoAnswers.push(posibleAnswers[i]);
        posibleAnswers[i] = posibleAnswers[6-p];
      };    
      threeAnswers = twoAnswers;
      threeAnswers.push(answer);
      threeAnswers.sort(() => Math.random() - 0.5);
      twoAnswers = [];
      allAnswers[r] = threeAnswers;
    }
    this.preparedQuestions = question;
    this.preparedAnswers = allAnswers; 
    this.askQuestion();
  }

  askQuestion() {
    this.askedQuestion = this.preparedQuestions[this.questionNumber].image;
    this.askedQuestionAnswer = this.preparedAnswers[this.questionNumber];
  }

  nextQuestion() {
    this.questionNumber++;  
    var i;
    document.getElementById("next").setAttribute("disabled", "true");
    document.getElementById("next").classList.add("opacity");
    for (i=0; i<3; i++) {
      document.getElementById(i).setAttribute("disabled", "true");
      document.getElementById(i).removeAttribute("disabled");     
      document.getElementById(i).classList.add("answer");
      document.getElementById(i).classList.remove("trueAnswer");
      document.getElementById(i).classList.remove("falseAnswer");     
      document.getElementById(i).classList.remove("reallyTrueAnswer");
    } 
    if (this.questionNumber < 5) {
      this.askQuestion();
      
    } else {
      var getHighScores = JSON.parse(localStorage.getItem("highScores"));
      getHighScores[3].score = this.score;
      localStorage.setItem('highScores', JSON.stringify(getHighScores));
      this.router.navigateByUrl('/score');
    }
  }

  trueOrFalse(userAnswer, id) {
    var i;
    for (i=0; i<3; i++) {
      document.getElementById(i).setAttribute("disabled", "true");
    } 
    document.getElementById("next").removeAttribute("disabled");
    document.getElementById("next").classList.remove("opacity");
    if (userAnswer == this.preparedQuestions[this.questionNumber].continent) {
      this.score = this.score + 750;
      document.getElementById(id).classList.remove("answer");
      document.getElementById(id).classList.add("trueAnswer");
    } else {
      document.getElementById(id).classList.remove("answer");
      document.getElementById(id).classList.add("falseAnswer");
      for (i=0; i<3; i++) {
        if (document.getElementById(i).textContent == this.preparedQuestions[this.questionNumber].continent) {         
          document.getElementById(i).classList.remove("answer");
          document.getElementById(i).classList.add("reallyTrueAnswer");
        }
      } 
    }
    
  }

}
