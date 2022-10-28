import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { MessageResponse } from 'src/app/shared/models/message-response.model';
import { Game } from '../models/game.model';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  getSettings(): Observable<Settings> {
    const path = `${ this.apiUrl }/settings`;
    return this.http.get<Settings>(path);
  }

  editSettings(body: Partial<Settings>): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/settings`;
    return this.http.patch<MessageResponse>(path, body);
  }

  getGames(): Observable<Game[]> {
    const path = `${ this.apiUrl }/games`;
    return this.http.get<Game[]>(path);
  }

  addGame(body: Partial<Game>): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/games`;
    return this.http.post<MessageResponse>(path, body);
  }

  editGame(game: Partial<Game>, id: string): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/games/${ id }`;
    return this.http.patch<MessageResponse>(path, game);
  }

  deleteGame(id: string): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/games/${ id }`;
    return this.http.delete<MessageResponse>(path);
  }
}
