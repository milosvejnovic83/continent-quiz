import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const questions = 'https://api.myjson.com/bins/a6da9';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionsService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getQuestions(): Observable<any> {
    return this.http.get(questions).pipe(
      map(this.extractData));
  }

}
