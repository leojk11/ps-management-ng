import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { MessageResponse } from 'src/app/shared/models/message-response.model';
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
}
