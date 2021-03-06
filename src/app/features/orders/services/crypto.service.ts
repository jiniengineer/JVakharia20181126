import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICurrencyType, CurrencyType } from '../models/currency-type';
import { ICryptoListingResponse, ICryptoListingData } from '../models/crypto-listings-response';
import { ICryptoTickerResponse } from '../models/crypto-ticker-response';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  private baseUrl = 'https://api.coinmarketcap.com/v2/';

  constructor(private http: HttpClient) { }

  getCryptoPrice(id: string): Observable<number> {
    const url = `${this.baseUrl}ticker/${id}/`;
    return this.http.get(url).pipe(
      map((response: ICryptoTickerResponse) => {
        const price = response.data.quotes.USD.price;
        return price;
      }),
      catchError((e) => throwError(e))
    );
  }

  getCurrencyListings(): Observable<CurrencyType[]> {
    const url = `${this.baseUrl}listings/`;
    return this.http.get(url).pipe(
      map((response: ICryptoListingResponse) => {
        const responseData: ICryptoListingData[] = response.data;
        const details = responseData.map(data => new CurrencyType(data));
        return details;
      }),
      catchError((e) => throwError(e)));
  }

}
