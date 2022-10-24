import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }
}
