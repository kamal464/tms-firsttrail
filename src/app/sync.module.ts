import { NgModule } from '@angular/core';
import { TextBoxModule,MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
@NgModule({
  exports: [
    ButtonModule,
    TextBoxModule,
    MaskedTextBoxModule,
    DropDownListModule,
    UploaderModule,
    DatePickerModule,
    DialogModule,
    
  ],
})
export class SyncModule {}
