import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Revenue } from '../models/revenue.model';
import { TotalEarning } from '../models/totalEarning.model';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  getRevenues(): Observable<Revenue[]> {
    const path = `${ this.apiUrl }/revenue`;
    return this.http.get<Revenue[]>(path);
  }

  getTotalEarning(): Observable<TotalEarning> {
    const now = new Date();
    const path = `${ this.apiUrl }/revenue/revenue/${ now.getDate() }/${ now.getFullYear() }`;
    return this.http.get<TotalEarning>(path);
  }
}
