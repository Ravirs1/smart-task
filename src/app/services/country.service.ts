import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private API_URL = 'https://restcountries.com/v3.1';

  constructor(
    private httpClient : HttpClient
  ) { }

  getCountries(): Observable<any>{
    return this.httpClient.get<any>(`${this.API_URL}/all`).pipe(
      map(arr => {
        return arr.map((country: {
          flags: any; name: { common: any; }; population: any; region: any; capital: any[]; 
})  => {
          return {
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital,
            flag : country.flags.png
          };
        });
      })
    )
  }

  getCountryFilter(type:any, name: any) {
    return this.httpClient.get<any>(`${this.API_URL}/${type}/${name}`).pipe(
      map(arr => {
        return arr.map((country: {
          flags: any; name: { common: any; }; population: any; region: any; capital: any[]; 
})  => {
          return {
            name: country.name.common,
            population: country.population,
            region: country.region,
            capital: country.capital,
            flag : country.flags.png
          };
        });
      }),
    )
  }
}
