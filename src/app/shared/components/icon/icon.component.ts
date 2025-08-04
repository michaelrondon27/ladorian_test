import { ChangeDetectionStrategy, Component, InputSignal, input } from "@angular/core";
import { FaIconLibrary, FontAwesomeModule, IconPack } from "@fortawesome/angular-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Interfaces
import { Icon } from "@shared/interfaces/icon.interface";

@Component({
    selector: 'ladorian-icon',
    imports: [
        FontAwesomeModule
    ],
    templateUrl: 'icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LadorainIconComponent {

    public icon: InputSignal<Icon> = input.required<Icon>();

    constructor(
        faIconLibrary: FaIconLibrary
    ) {
        this._addIcons(faIconLibrary);
    }

    private _addIcons(faIconLibrary: FaIconLibrary): void {
        faIconLibrary.addIconPacks(fab as IconPack);
        faIconLibrary.addIconPacks(far as IconPack);
        faIconLibrary.addIconPacks(fas as IconPack);
    }

}
