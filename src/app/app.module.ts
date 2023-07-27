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
import { CommonModule } from '@angular/common';
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
@NgModule({
  declarations: [
    StringdatePipe,
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

    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      // { path: 'meta-table', component: SchemaColumnComponent },
    ]),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptorInterceptor,
      multi: true,
    },
    SharedServiceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
