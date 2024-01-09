import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CompanyOverviewComponent } from './company-overview/company-overview.component';
import { CompanyOfficesComponent } from './company-offices/company-offices.component';
import { OfficesComponent } from './company-offices/offices/offices.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewOverviewComponent } from './new-overview/new-overview.component';
import { KitUiTextEditComponent } from './kit-ui-text-edit/kit-ui-text-edit.component';
import { TitleComponent } from './shared/components/title/title.component';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';
import { CountryComponent } from './country/country.component';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { EmailComponent } from './email/email.component';
import { TextareaComponent } from './textarea/textarea.component';
import { IntComponent } from './int/int.component';
import { IntDecimalComponent } from './int-decimal/int-decimal.component';
import { ToggleComponent } from './toggle/toggle.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { RadioComponent } from './radio/radio.component';
import { MultipleCheckboxComponent } from './multiple-checkbox/multiple-checkbox.component';
import { SettingsComponent } from './settings/settings.component';
import { ReasonsComponent } from './reasons/reasons.component';
import { ReasonitemsComponent } from './reasonitems/reasonitems.component';
import { SchemaManagerComponent } from './schema-manager/schema-manager.component';
import { SchemaAttributeComponent } from './schema-attribute/schema-attribute.component';
import { SchemaColumnComponent } from './schema-column/schema-column.component';
import { SharedServiceService } from './shared/shared-service.service';
import { RouterModule } from '@angular/router';
import { SchemacolumnAttributeComponent } from './schemacolumn-attribute/schemacolumn-attribute.component';
import { CommonModule, DatePipe } from '@angular/common';
import { WebMenuComponent } from './web-menu/web-menu.component';
import { AttributeViewComponent } from './reason-attribute/attribute-view.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { CompanyDepartmentsComponent } from './company-departments/company-departments.component';
import { CompanyDepartmentsEntryComponent } from './company-departments/company-departments-entry/company-departments-entry.component';
import { CompanyDepartmentsTypesComponent } from './company-departments-types/company-departments-types.component';
import { CompanyDesignationsComponent } from './company-designations/company-designations.component';
import { CompanyGradesComponent } from './company-grades/company-grades.component';
import { CompanyIdentificationsComponent } from './company-identifications/company-identifications.component';
import { CompanyIdentificationEntryComponent } from './company-identifications/company-identification-entry/company-identification-entry.component';
import { SchemaAttributeTableComponent } from './schema-attribute-table/schema-attribute-table.component';
import { SchemaColumnAttributeTableComponent } from './schema-column-attribute-table/schema-column-attribute-table.component';
import { DepartmentAttributesComponent } from './company-departments-types/department-attributes/department-attributes.component';
import { DesignationAttributeComponent } from './company-designations/designation-attribute/designation-attribute.component';
import { GradesAttributesComponent } from './company-grades/grades-attributes/grades-attributes.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { StringdatePipe } from './shared/stringdate.pipe';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeProfileEntryComponent } from './employee-profile-entry/employee-profile-entry.component';
import { EmployeeProfileEntryRightsidenavComponent } from './employee-profile-entry-rightsidenav/employee-profile-entry-rightsidenav.component';
import { EmployeeAddemployeeComponent } from './employee-addemployee/employee-addemployee.component';
import { EmployeeAddressesComponent } from './employee-addresses/employee-addresses.component';
import { EmployeeAddAddressComponent } from './employee-addresses/employee-add-address/employee-add-address.component';
import { EmployeeContactComponent } from './employee-contact/employee-contact.component';
import { EmployeeAddContactComponent } from './employee-contact/employee-add-contact/employee-add-contact.component';
import { EmployeeDepandantsComponent } from './employee-depandants/employee-depandants.component';
import { EmployeeAddDepandantComponent } from './employee-depandants/employee-add-depandant/employee-add-depandant.component';
import { EmployeeWorkExperienceComponent } from './employee-work-experience/employee-work-experience.component';
import { EmployeeAddWorkExperienceComponent } from './employee-work-experience/employee-add-work-experience/employee-add-work-experience.component';
import { EmployeeIdentitiesComponent } from './employee-identities/employee-identities.component';
import { EmployeeAddIdentitiesComponent } from './employee-identities/employee-add-identities/employee-add-identities.component';
import { EmployeeEducationComponent } from './employee-education/employee-education.component';
import { EmployeeAddEducationComponent } from './employee-education/employee-add-education/employee-add-education.component';
import { EmployeeHistoryComponent } from './employee-history/employee-history.component';
import { EmployeeAddHistoryComponent } from './employee-history/employee-add-history/employee-add-history.component';
import { EmployeeProfileEmpComponent } from './employee/employee-profile-emp/employee-profile-emp.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeAddSuccessPopupComponent } from './employee/employee-add/employee-add-success-popup/employee-add-success-popup.component';
import { EmployeeProfilePersonalAddComponent } from './employee-profile-entry/employee-profile-personal-update/employee-profile-personal-add.component';
import { StringToDatePipe } from './shared/pipes/stringtodate';
import { SyncCompanyProfileComponent } from './sync-company-profile/sync-company-profile.component';
import { SyncCompanyOverviewComponent } from './sync-company-profile/sync-company-overview/sync-company-overview.component';
import { SyncModule } from './sync.module';
import { CompanyIdentificationUploaderComponent } from './company-identifications/company-identification-entry/company-identification-uploader/company-identification-uploader.component';
import { DynamicTabComponent } from './shared/components/dynamic-tab/dynamic-tab.component';
import { DynamicTabNavComponent } from './shared/components/dynamic-tab/dynamic-tab-nav/dynamic-tab-nav.component';
import { DynamicComponentLoaderDirective } from './shared/components/dynamic-tab/dynamic-component-loader.directive';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { TabeventserviceService } from './shared/tabeventservice.service';
import { AttachmentComponent } from './shared/components/attachment/attachment.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { FileSizePipe } from './shared/pipes/file-size.pipe';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { AvatarSelectionComponent } from './shared/components/avatar-selection/avatar-selection.component';
import { KitTextComponentComponent } from './kitcomponents/kit-text-component/kit-text-component.component';
import { KitDatepickerComponent } from './kitcomponents/kit-datepicker/kit-datepicker.component';
import { KitCountryDropdownComponent } from './kitcomponents/kit-country-dropdown/kit-country-dropdown.component';
import { KitInputMaskComponent } from './kitcomponents/kit-input-mask/kit-input-mask.component';
import { KitTextareaComponent } from './kitcomponents/kit-textarea/kit-textarea.component';
import { KitDropdownComponent } from './kitcomponents/kit-dropdown/kit-dropdown.component';
import { KitRadioComponent } from './kitcomponents/kit-radio/kit-radio.component';
import { KitToggleSwitchComponent } from './kitcomponents/kit-toggle-switch/kit-toggle-switch.component';
import { KitDateTimePickerComponent } from './kitcomponents/kit-date-time-picker/kit-date-time-picker.component';
import { KitCheckboxComponent } from './kitcomponents/kit-checkbox/kit-checkbox.component';
import { KitButtonComponent } from './kitcomponents/kit-button/kit-button.component';
import { ResetEmailComponent } from './changefields/reset-email/reset-email.component';
import { ResetPhonenumberComponent } from './changefields/reset-phonenumber/reset-phonenumber.component';
import { ResetSupervisorComponent } from './changefields/reset-supervisor/reset-supervisor.component';
import { ResetOfficeComponent } from './changefields/reset-office/reset-office.component';
import { ResetNewPromotionComponent } from './changefields/reset-new-promotion/reset-new-promotion.component';
import { EmployeeResignComponent } from './employee-resign/employee-resign.component';
import { ResignationtasksComponent } from './resignationtasks/resignationtasks.component';
import { ResignationtasksEditComponent } from './resignationtasks-edit/resignationtasks-edit.component';
import { FindCustomerComponent } from './Customer/find-customer/find-customer.component';

import { AddCustomerComponent } from './Customer/add-customer/add-customer.component';
import { CustomerOverviewComponent } from './Customer/customer-overview/customer-overview.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';
import { CustomerAddressComponent } from './Customer/customer-address/customer-address.component';
import { CustomerContactComponent } from './Customer/customer-contact/customer-contact.component';
import { CustomerProjectsComponent } from './Customer/customer-projects/customer-projects.component';
import { AddCustomerAddressComponent } from './Customer/customer-address/add-customer-address/add-customer-address.component';
import { AddCustomerContactComponent } from './Customer/customer-contact/add-customer-contact/add-customer-contact.component';
import { AttendenceRulesComponent } from './attendence/attendence-rules/attendence-rules.component';

import { KitTimePickerComponent } from './kitcomponents/kit-time-picker/kit-time-picker.component';
import { HolidaysViewComponent } from './holidays/holidays-view/holidays-view.component';
import { HolidaysAddComponent } from './holidays/holidays-add/holidays-add.component';
import { WorkingDayViewComponent } from './workingdays/working-day-view/working-day-view.component';
import { WorkingDayAddComponent } from './workingdays/working-day-add/working-day-add.component';
import { LeaveRulesAddComponent } from './leaves/leave-rules-add/leave-rules-add.component';
import { LeaveRulesViewComponent } from './leaves/leave-rules-view/leave-rules-view.component';
import { CasualLeaveEditComponent } from './leaves/casual-leave-edit/casual-leave-edit.component';
import { CasualLeaveViewComponent } from './leaves/casual-leave-view/casual-leave-view.component';
import { LeaveTypesComponent } from './leaves/leave-types/leave-types.component';
import { CasualLeavePoliciesComponent } from './leaves/casual-leave-policies/casual-leave-policies.component';
import { EmployeeEveryMonthAttendenceComponent } from './attendence/employee-every-month-attendence/employee-every-month-attendence.component';
@NgModule({
  declarations: [
    StringdatePipe,
    FileSizePipe,
    AppComponent,
    CompanyOverviewComponent,
    CompanyOfficesComponent,
    OfficesComponent,
    NewEmployeeComponent,
    CountryComponent,
    KitUiTextEditComponent,
    TitleComponent,
    ToolBarComponent,
    PhonenumberComponent,
    EmailComponent,
    TextareaComponent,
    IntComponent,
    IntDecimalComponent,
    ToggleComponent,
    CheckboxComponent,
    NewOverviewComponent,
    DateComponent,
    DateTimePickerComponent,
    MultiSelectComponent,
    RadioComponent,
    MultipleCheckboxComponent,
    SettingsComponent,
    ReasonsComponent,
    ReasonitemsComponent,
    SchemaManagerComponent,
    SchemaAttributeComponent,
    SchemaColumnComponent,
    SchemacolumnAttributeComponent,
    WebMenuComponent,
    CompanyProfileComponent,
    AttributeViewComponent,
    OverviewComponent,
    CompanyDepartmentsComponent,
    CompanyDepartmentsEntryComponent,
    CompanyDepartmentsTypesComponent,
    CompanyDesignationsComponent,
    CompanyGradesComponent,
    CompanyIdentificationsComponent,
    CompanyIdentificationEntryComponent,
    SchemaAttributeTableComponent,
    SchemaColumnAttributeTableComponent,
    OfficesComponent,
    DepartmentAttributesComponent,
    DesignationAttributeComponent,
    GradesAttributesComponent,
    HomeComponent,
    EmployeeComponent,
    EmployeeProfileComponent,
    EmployeeProfileEntryComponent,
    EmployeeProfileEntryRightsidenavComponent,
    EmployeeAddemployeeComponent,
    EmployeeAddressesComponent,
    EmployeeAddAddressComponent,
    EmployeeContactComponent,
    EmployeeAddContactComponent,
    EmployeeDepandantsComponent,
    EmployeeAddDepandantComponent,
    EmployeeWorkExperienceComponent,
    EmployeeAddWorkExperienceComponent,
    EmployeeIdentitiesComponent,
    EmployeeAddIdentitiesComponent,
    EmployeeEducationComponent,
    EmployeeAddEducationComponent,
    EmployeeHistoryComponent,
    EmployeeAddHistoryComponent,
    EmployeeProfileEmpComponent,
    EmployeeAddComponent,
    EmployeeAddSuccessPopupComponent,
    EmployeeProfilePersonalAddComponent,
    StringToDatePipe,
    SyncCompanyProfileComponent,
    SyncCompanyOverviewComponent,
    CompanyIdentificationUploaderComponent,
    DynamicTabComponent,
    DynamicTabNavComponent,
    DynamicComponentLoaderDirective,
    TopBarComponent,
    AttachmentComponent,
    ConfirmDialogComponent,
    AvatarComponent,
    AvatarSelectionComponent,
    KitTextComponentComponent,
    KitDatepickerComponent,
    KitCountryDropdownComponent,
    KitInputMaskComponent,
    KitTextareaComponent,
    KitDropdownComponent,
    KitRadioComponent,
    KitToggleSwitchComponent,
    KitDateTimePickerComponent,
    KitCheckboxComponent,
    KitButtonComponent,
    ResetEmailComponent,
    ResetPhonenumberComponent,
    ResetSupervisorComponent,
    ResetOfficeComponent,
    ResetNewPromotionComponent,
    EmployeeResignComponent,
    ResignationtasksComponent,
    ResignationtasksEditComponent,
    FindCustomerComponent,
    CustomerOverviewComponent,
    CustomerProfileComponent,
    AddCustomerComponent,
    CustomerAddressComponent,
    CustomerContactComponent,
    CustomerProjectsComponent,
    AddCustomerAddressComponent,
    AddCustomerContactComponent,
    AttendenceRulesComponent,
    WorkingDayViewComponent,
    KitTimePickerComponent,
    HolidaysViewComponent,
    HolidaysAddComponent,
    WorkingDayAddComponent,
    LeaveRulesAddComponent,
    LeaveRulesViewComponent,
    CasualLeaveEditComponent,
    CasualLeaveViewComponent,
    LeaveTypesComponent,
    CasualLeavePoliciesComponent,
    EmployeeEveryMonthAttendenceComponent,
  ],
  // schemas: [NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SyncModule,
    PdfJsViewerModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'sync',
        component: SyncCompanyProfileComponent,
      },
      // { path: 'meta-table', component: SchemaColumnComponent },
    ]),
  ],
  entryComponents: [ResetEmailComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorInterceptor,
      multi: true,
    },
    SharedServiceService,
    TabeventserviceService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
