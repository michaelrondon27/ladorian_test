import { ChangeDetectionStrategy, Component, InputSignal, input } from "@angular/core";
import { MessageModule } from 'primeng/message';

// Types
import { SeverityAlertMessageType, VariantAlertMessageType } from "@shared/types/alert-message.type";
import { SizeType } from "@shared/types/common.type";

@Component({
    selector: 'ladorian-alert-message',
    imports: [
        MessageModule
    ],
    templateUrl: 'alert-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LadorainAlertMesaggeComponent {

    public closable: InputSignal<boolean> = input<boolean>(false);
    public life    : InputSignal<number> = input<number>(null);
    public message : InputSignal<string> = input.required<string>();
    public severity: InputSignal<SeverityAlertMessageType> = input<SeverityAlertMessageType>('info');
    public size    : InputSignal<SizeType> = input<SizeType>('small');
    public variant : InputSignal<VariantAlertMessageType> = input<VariantAlertMessageType>('text');

}
