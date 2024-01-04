import { NgModule } from '@angular/core';
import { TextBoxModule,MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  exports: [
    ButtonModule,
    TextBoxModule,
    MaskedTextBoxModule,
    DropDownListModule,
    UploaderModule,
    DatePickerModule,
    DialogModule,
    SwitchModule,
    DateTimePickerModule,
    RadioButtonModule,
    CheckBoxModule,
    TimePickerModule
  ],
})
export class SyncModule {}
