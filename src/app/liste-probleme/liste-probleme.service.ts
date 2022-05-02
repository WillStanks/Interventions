import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IProbleme } from '../probleme/probleme';

@Injectable({
  providedIn: 'root'
})
export class ListeProblemeService {

  //private baseUrl = 'https://interventionsws2022.azurewebsites.net/Intervention';
  private baseUrl = 'https://localhost:7132/Intervention';


  constructor(private http: HttpClient) { }

  obtenirProblemes(): Observable<IProbleme[]> {
    return this.http.get<IProbleme[]>(this.baseUrl + '/ObtenirProblemes').pipe(
        tap(data => console.log('obtenirProblemes: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
  }

  deleteProbleme(id: number): Observable<IProbleme>{    
    return this.http.delete<IProbleme>(this.baseUrl + '/DeleteProbleme?idProbleme=' + id).pipe(
      tap(data => console.log('deleteProbleme: ' + JSON.stringify(data))),
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
