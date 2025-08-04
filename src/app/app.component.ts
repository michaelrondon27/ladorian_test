import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [
        RouterModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class App {

    protected readonly title = signal('ladorian_test');

}
