import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { MessageResponse } from 'src/app/shared/models/message-response.model';
import { Drink } from '../models/drink.model';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  getAllDrinks(): Observable<Drink[]> {
    const path = `${ this.apiUrl }/drinks`;
    return this.http.get<Drink[]>(path);
  }

  addNewDrink(body: Partial<Drink>): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/drinks`;
    return this.http.post<MessageResponse>(path, body);
  }

  editDrink(id: string, body: Partial<Drink>): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/drinks/${ id }`;
    return this.http.patch<MessageResponse>(path, body);
  }

  sellDrink(id: string, amountToSell: number): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/drinks/${ id }/sell`;
    return this.http.patch<MessageResponse>(path, { amount_to_sell: amountToSell });
  }

  deleteDrink(id: string): Observable<MessageResponse> {
    const path = `${ this.apiUrl }/drinks/${ id }`;
    return this.http.delete<MessageResponse>(path);
  }
}
