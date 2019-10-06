import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckInComponent } from './check-in/check-in.component';
import { QuestionsComponent } from './questions/questions.component';
import { ScoreComponent } from './score/score.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HighScoresComponent, pathMatch: 'full' },
  { path: 'highScores', component: HighScoresComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'score', component: ScoreComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    QuestionsComponent,
    ScoreComponent,
    HighScoresComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
