import { ChangeDetectionStrategy, Component, InputSignal, WritableSignal, input, signal } from "@angular/core";
import { ProgressBar } from 'primeng/progressbar';
import { TableModule } from "primeng/table";

// Enums
import { TypeDisplayColumnEnum } from "@shared/enums/table.enum";

// Interfaces
import { DisplayColumn } from "@shared/interfaces/table.interface";

// Pipes
import { SafeHtmlPipe } from "@shared/pipes/safe-html/safe-html.pipe";

// Types
import { SizeType } from "@shared/types/common.type";

@Component({
    selector: 'ladorian-table',
    imports: [
        ProgressBar,
        SafeHtmlPipe,
        TableModule
    ],
    templateUrl: 'table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LadorianTableComponent {

    public rows                 : WritableSignal<number> = signal<number>(10);
    public typeDisplayColumnEnum: WritableSignal<typeof TypeDisplayColumnEnum> = signal<typeof TypeDisplayColumnEnum>(TypeDisplayColumnEnum);

    public columns              : InputSignal<DisplayColumn[]> = input.required<DisplayColumn[]>();
    public items                : InputSignal<any[]> = input.required<any[]>();
    public loading              : InputSignal<boolean> = input.required<boolean>();
    public rowsPerPage          : InputSignal<number[]> = input<number[]>([5, 10, 25, 50]);
    public showCurrentPageReport: InputSignal<boolean> = input<boolean>(true);
    public showGridLines        : InputSignal<boolean> = input<boolean>(false);
    public size                 : InputSignal<SizeType> = input<SizeType>('small');

    resolveNestedProperty(obj: any, path: string): string {
        if (!obj || !path) {
            return '';
        }

        const parts: string[] = path.split('.');
        let current: string = obj;

        parts.forEach((x: string) => {
            const part: string = x;

            if (current === null || typeof current === 'undefined') {
                return undefined;
            }

            current = current[part];
        });

        return current;
    }

}
