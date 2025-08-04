import { Pipe, PipeTransform, inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

    protected _domSanitier: DomSanitizer = inject(DomSanitizer);

    transform(value: any): SafeHtml {
        return this._domSanitier.bypassSecurityTrustHtml(value);
    }

}
