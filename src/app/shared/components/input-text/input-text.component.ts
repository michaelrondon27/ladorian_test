import { AfterContentInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, InputSignal, OnInit, Signal, WritableSignal, computed, forwardRef, input, signal, viewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbstractControl, ControlValueAccessor, FormControlStatus, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { takeUntil } from "rxjs";

// Services
import { AutoDestroyService } from "@shared/services/auto-destroy.service";

// Types
import { SizeType } from "@shared/types/common.type";
import { InputTextType } from "@shared/types/input-text.type";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LadorianInputTextComponent)
}

@Component({
    selector: 'ladorain-input-text',
    imports: [
        CommonModule,
        InputTextModule
    ],
    templateUrl: 'input-text.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ]
})
export class LadorianInputTextComponent extends AutoDestroyService implements AfterContentInit, ControlValueAccessor, DoCheck, OnInit {

    static inputTextCount: WritableSignal<number> = signal<number>(0);

    public errors    : WritableSignal<string[]> = signal<string[]>([]);
    public innerValue: WritableSignal<any> = signal<any>('');

    private _htmlElement: WritableSignal<HTMLInputElement> = signal<HTMLInputElement>(null);
    private _touched    : WritableSignal<boolean> = signal<boolean>(false);

    public control        : InputSignal<AbstractControl<any, any>> = input.required<AbstractControl<any, any>>();
    public defaultValue   : InputSignal<any> = input<any>('');
    public disabled       : InputSignal<boolean> = input<boolean>(false);
    public formControlName: InputSignal<string> = input.required<string>();
    public inputId        : InputSignal<string> = input<string>(`input-text-${ LadorianInputTextComponent.inputTextCount() }`);
    public inputType      : InputSignal<InputTextType> = input<InputTextType>('text');
    public label          : InputSignal<string> = input.required<string>();
    public placeholder    : InputSignal<string> = input<string>('');
    public readonly       : InputSignal<boolean> = input<boolean>(false);
    public required       : InputSignal<boolean | string> = input<boolean | string>(false);
    public showLabel      : InputSignal<boolean> = input<boolean>(true);
    public size           : InputSignal<SizeType> = input<SizeType>('small');

    public inputRef: Signal<ElementRef<any>> = viewChild<ElementRef>('input');

    public hasRequired: Signal<boolean | string> = computed<boolean | string>(() => {
        if (this.required() === '') {
            return true;
        }

        return this.required();
    });

    constructor() {
        super();
        LadorianInputTextComponent.inputTextCount.set(LadorianInputTextComponent.inputTextCount() + 1);
    }

    ngAfterContentInit(): void {
        if (this.defaultValue()) {
            this.innerValue.set(this.defaultValue());
        }
    }

    ngDoCheck(): void {
        if (this.control().touched) {
            this.manageErrors();
        }
    }

    ngOnInit(): void {
        this.innerValue.set(this.control().value || this.innerValue());
        this._touched.set(false);
        this._htmlElement.set(this.inputRef().nativeElement);
        this._htmlElement().value = this.control().value || this.innerValue();

        this.control().statusChanges.pipe(
            takeUntil(this.destroyed$())
        ).subscribe({
            next: (status: FormControlStatus) => {
                this.markAsTouched();

                if (status === 'INVALID' && this.control().touched) {
                    this.manageErrors();
                }
            }
        });
    }

    get value(): any {
        return this.innerValue();
    }

    set value(value: any) {
        if (value !== this.innerValue()) {
            this.innerValue.set(value);
        }
    }

    manageErrors = () => {
        this.errors.set([]);

        if (this.control().errors) {
            let errors: string[] = [];

            Object.entries(this.control().errors).forEach(([key, value]) => {
                if (value) {
                    switch (key) {
                        default:
                            errors.push(this.control().errors[key]);
                            break;
                    }

                    this.errors.set([
                        ...this.errors(),
                        ...errors
                    ]);
                }
            });
        }
    }

    markAsTouched(): void {
        if (this.control().touched) {
            this.onTouched();
            this._touched.set(true);
        }
    }

    onChange(event: Event, byUser?: boolean): void {
        this.writeValue(this._htmlElement().value, byUser);

        this.manageErrors();
    }

    onTouched: any = ()=> { }

    propagateChange = (_: any) => { }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: any, byUser?: boolean): void {
        this.innerValue.set(value);

        if (value !== null && this.propagateChange) {
            if (byUser) {
                this.propagateChange(value);
            }
        }
    }

}
