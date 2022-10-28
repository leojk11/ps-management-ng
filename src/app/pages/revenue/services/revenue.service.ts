import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Revenue } from '../models/revenue.model';
import { TotalEarning } from '../models/totalEarning.model';

export interface RevenueParams {
  day?: number;
  month?: number;
  year?: number;
}

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

  filterRevenue(params: RevenueParams): Observable<any> {
    const path = `${ this.apiUrl }/revenue`;
    return this.http.get(path, { observe: 'response', params: this.getRevenueParams(params) });
  }

  getRevenueParams(params: RevenueParams): HttpParams {
    console.log('before http params', params);
    
    let httpParams = new HttpParams;

    if (params.day) {
      console.log('in if params day', params.day);
      
      httpParams = httpParams.set('day', params.day.toString());
    } 

    if (params.month) {
      httpParams = httpParams.set('month', params.month);
    }

    if (params.year) {
      httpParams = httpParams.set('year', params.year);
    }

    
 
    return httpParams;
  }
}
