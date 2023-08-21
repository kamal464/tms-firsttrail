import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemaColumnComponent } from './schema-column/schema-column.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: 'column', component: SchemaColumnComponent },
  // {path: ' **', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
