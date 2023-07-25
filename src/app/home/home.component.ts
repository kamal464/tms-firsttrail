
import { Component,OnInit,ViewChild,AfterViewInit,OnChanges ,SimpleChanges} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedServiceService } from './../shared/shared-service.service';
import { SchemaAttributeComponent } from './../schema-attribute/schema-attribute.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'dtpl';
  appComponent = 'yes'
  menuItems = [];
  currentRoute: string;
  isActive = false;
  activeButton: string = '';
  schemaColumn:string;
  dynamicNavItems = [];
  currentField: string = '';
  isSideNavEnabled = false;
  _selected_option = null;
  showContent(field: string): void {
    this.currentField = field;
  }

  @ViewChild(SchemaAttributeComponent) childComponent:SchemaAttributeComponent;
  constructor(private router: Router,
    private sharedService:SharedServiceService) { }

ngAfterViewInit(): void {
   
}


callDoAction(): void {
  
  const action = this.sharedService.getActionParameter();
  if (action) {
    this.doAction(action);
  }
}
  ngOnInit() {

    console.log(this.currentRoute)
   
  }
  
  toggleSideNavView() {
    this.isSideNavEnabled = !this.isSideNavEnabled;
  }
  deleteItem(item: string): void {
    const index = this.dynamicNavItems.indexOf(item);
    if (index !== -1) {
      this.dynamicNavItems.splice(index, 1);
      if (this.dynamicNavItems.length > 0) {
        this._selected_option = this.dynamicNavItems[this.dynamicNavItems.length - 1];
      } else {
        this._selected_option = null; // or assign a default value if needed
      }
    }
  }
  
  doAction(action: any): void {
    if (!this.dynamicNavItems.includes(action)){
      this.dynamicNavItems.push(action);
       console.log(action ,'pushed')
    }
    this._selected_option = action;   
      console.log(this._selected_option)
      console.log(this.dynamicNavItems,this._selected_option) 
  }
}
