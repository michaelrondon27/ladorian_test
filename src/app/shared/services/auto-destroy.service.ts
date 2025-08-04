import { Injectable, OnDestroy, WritableSignal, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutoDestroyService implements OnDestroy {

    protected destroyed$: WritableSignal<Subject<void>> = signal<Subject<void>>(null);

    constructor() {
        this.destroyed$.set(new Subject());
    }

    ngOnDestroy(): void {
        this.destroyed$().next();
        this.destroyed$().complete();
    }

}
