import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ITypeProbleme } from './typeProbleme';

@Injectable({
  providedIn: 'root'
})
export class TypeProblemeService {

  private baseUrl = 'api/typeProbleme';

  constructor(private http: HttpClient) { }

  obtenirTypeProbleme(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(
        tap(data => console.log('obtenirTypeProbleme: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    return throwError(err.message);
  }
}
