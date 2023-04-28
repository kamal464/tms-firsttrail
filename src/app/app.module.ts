import { NgModule } from '@angular/core';
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
import { NewOverviewComponent } from './new-overview/new-overview.component'
import { KitUiTextEditComponent } from './kit-ui-text-edit/kit-ui-text-edit.component';
import { TitleComponent } from './shared/components/title/title.component';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    CompanyOverviewComponent,
    CompanyOfficesComponent,
    OfficesComponent,
    NewEmployeeComponent,

    KitUiTextEditComponent,
    TitleComponent,
    ToolBarComponent,


    NewOverviewComponent,

 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [ { provide: HTTP_INTERCEPTORS, useClass: MyInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
