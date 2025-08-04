import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// Interfaces
import { Country } from '@shared/interfaces/countries.interface';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private _httpClient: HttpClient = inject(HttpClient);

    private _url: WritableSignal<string> = signal<string>('assets/data/list-countries.json');

    getCountries(): Observable<Country[]> {
        return this._httpClient.get<Country[]>(this._url())
            .pipe(catchError((error) => throwError(() => error)));
    }

}
