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
  page?: number;
  take?: any;
}

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  getRevenues(): Observable<any> {
    const path = `${ this.apiUrl }/revenue`;
    return this.http.get<Revenue[]>(path);
  }

  getTotalEarning(): Observable<TotalEarning> {
    const now = new Date();
    const path = `${ this.apiUrl }/revenue/revenue/${ now.getDate() }/${ now.getMonth() + 1 }/${ now.getFullYear() }`;
    return this.http.get<TotalEarning>(path);
  }

  getTotalDrinksEarnings(): Observable<TotalEarning> {
    const now = new Date();
    const path = `${ this.apiUrl }/revenue/revenue/drink/${ now.getDate() }/${ now.getMonth() + 1 }/${ now.getFullYear() }`;
    return this.http.get<TotalEarning>(path);
  }

  filterRevenue(params: RevenueParams): Observable<any> {
    const path = `${ this.apiUrl }/revenue`;
    return this.http.get(path, { observe: 'response', params: this.getRevenueParams(params) });
  }

  getRevenueParams(params: RevenueParams): HttpParams {
    let httpParams = new HttpParams;

    if (params.page) {
      httpParams = httpParams.set('page', params.page);
    }

    if (params.take) {
      httpParams = httpParams.set('take', params.take);
    }

    if (params.day) {
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
