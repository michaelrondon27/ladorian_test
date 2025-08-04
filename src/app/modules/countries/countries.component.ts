import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { takeUntil } from "rxjs";

// Components
import { LadorainAlertMesaggeComponent } from "@shared/components/alert-message/alert-message.component";
import { LadorianInputTextComponent } from "@shared/components/input-text/input-text.component";
import { LadorianMultiSelectComponent } from "@shared/components/multi-select/multi-select.component";
import { LadorianTableComponent } from "@shared/components/table/table.component";

// Interfaces
import { Country } from "@shared/interfaces/countries.interface";
import { DisplayColumn } from "@shared/interfaces/table.interface";

// Services
import { CountriesService } from "./countries.service";
import { AutoDestroyService } from "@shared/services/auto-destroy.service";

interface Continent {
    name: string;
}

@Component({
    selector: 'module-countries',
    imports: [
        LadorainAlertMesaggeComponent,
        LadorianInputTextComponent,
        LadorianMultiSelectComponent,
        LadorianTableComponent,
        ReactiveFormsModule
    ],
    templateUrl: 'countries.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CountriesComponent extends AutoDestroyService implements OnInit {

    private _countriesService: CountriesService = inject(CountriesService);
    private _formBuilder     : FormBuilder = inject(FormBuilder);

    private _continentsSelected: WritableSignal<Continent[]> = signal<Continent[]>([]);
    private _countries         : WritableSignal<Country[]> = signal<Country[]>([]);
    private _countryWritten    : WritableSignal<string> = signal<string>('');

    public continents       : WritableSignal<Continent[]> = signal<Continent[]>([]);
    public countriesFiltered: WritableSignal<Country[]> = signal<Country[]>([]);
    public displayColumns   : WritableSignal<DisplayColumn[]> = signal<DisplayColumn[]>([]);
    public form             : WritableSignal<FormGroup> = signal<FormGroup>(null);
    public hasError         : WritableSignal<boolean> = signal<boolean>(false);
    public loading          : WritableSignal<boolean> = signal<boolean>(false);

    ngOnInit(): void {
        this._setDisplayColumns();
        this._setForm();

        this._getCountries();

        this._onContinentsChanged();
        this._onCountryChanged();
    }

    private _filterCountries(): void {
        this.countriesFiltered.set(this._countries());

        if (this._continentsSelected().length) {
            const continents: string[] = this._continentsSelected().map((x: Continent) => x.name);

            this.countriesFiltered.set(this.countriesFiltered().filter((x: Country) => continents.includes(x.continent)));
        }

        if (this._countryWritten().length) {
            this.countriesFiltered.set(this.countriesFiltered().filter((x: Country) => x.country.toLowerCase().includes(this._countryWritten())));
        }
    }

    private _getCountries(): void {
        this.hasError.set(false);
        this.loading.set(true);

        this._countriesService.getCountries()
            .pipe(takeUntil(this.destroyed$()))
            .subscribe({
                error: (error: any) => {
                    this.hasError.set(true);
                    this.loading.set(false);
                },
                next: (resp: Country[]) => {
                    this._countries.set(resp);
                    this.countriesFiltered.set(this._countries());
                    this.loading.set(false);

                    this._setContinents();
                }
            });
    }

    private _onContinentsChanged(): void {
        this.form().get('continents').valueChanges
            .pipe(takeUntil(this.destroyed$()))
            .subscribe({
                next: (value: Continent[]) => {
                    this._continentsSelected.set(value);

                    this._filterCountries();
                }
            });
    }

    private _onCountryChanged(): void {
        this.form().get('country').valueChanges
            .pipe(takeUntil(this.destroyed$()))
            .subscribe({
                next: (value: string) => {
                    this._countryWritten.set(value);

                    this._filterCountries();
                }
            });
    }

    private _setContinents(): void {
        this.continents.set(this._countries()
            .map((x: Country) => ({
                name: x.continent
            }))
            .reduce((acc: Continent[], item: Continent) => {
                if (!acc.find((x: Continent) => x.name === item.name)) {
                    acc.push(item);
                }

                return acc;
            }, [])
            .sort((a: Continent, b: Continent) => a.name.localeCompare(b.name))
        );
    }

    private _setDisplayColumns(): void {
        this.displayColumns.set([
            {
                key: 'country',
                name: 'country',
                sortable: true
            },
            {
                key: 'continent',
                name: 'continent',
                sortable: true
            }
        ]);
    }

    private _setForm(): void {
        this.form.set(this._formBuilder.group({
            continents: [''],
            country: ['']
        }));
    }

}
