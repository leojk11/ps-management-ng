import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { MessageResponse } from 'src/app/shared/models/message-response.model';
import { Console } from '../models/console.model';

@Injectable({
  providedIn: 'root'
})
export class ConsolesService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  getConsoles(): Observable<Console[]> {
    const path = `${ this.apiUrl }/consoles`;
    return this.http.get<Console[]>(path);
  }

  getSingleConsole(id: string): Observable<Console> {
    const path = `${ this.apiUrl }/consoles/${ id }`;
    return this.http.get<Console>(path);
  }

  addNewConsole(body: Partial<Console>): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/consoles`;
    return this.http.post<MessageResponse>(path, body);
  }

  editConsole(body: Partial<Console>, id: string): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/consoles/${ id }`;
    return this.http.patch<MessageResponse>(path, body);
  }

  start(id: string, time: Date): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/consoles/${ id }/start`;
    return this.http.patch<MessageResponse>(path, { time });
  }

  stop(id: string): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/consoles/${ id }/stop`;
    return this.http.patch<MessageResponse>(path, {});
  }

  deleteConsole(id: string): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/consoles/${ id }`;
    return this.http.delete<MessageResponse>(path);
  }
}
