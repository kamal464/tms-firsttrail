import {
  Component,
  OnInit,
  ViewChild,
  DoCheck,
  AfterViewInit,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedServiceService } from './../shared/shared-service.service';
import { SchemaAttributeComponent } from './../schema-attribute/schema-attribute.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck {
  title = 'dtpl';
  appComponent = 'yes';
  menuItems = [];
  currentRoute: string;
  isActive = false;
  activeButton: string;
  schemaColumn: string;
  dynamicNavItems = [];
  currentField: string = '';
  isSideNavEnabled = false;
  _selected_option = null;
  abc = null;
  showContent(field: string): void {
    this.currentField = field;
  }

  @ViewChild(SchemaAttributeComponent) childComponent: SchemaAttributeComponent;
  constructor(
    private router: Router,
    private sharedService: SharedServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {}

  ngDoCheck() {
  
    let navItemToBeAdd = null;

    if (
      this.sharedService.dynamicNavItems.length < this.dynamicNavItems.length
    ) {
      let removedItem = null;
      this.dynamicNavItems.forEach((navItem) => {
        if (!this.sharedService.dynamicNavItems.includes(navItem)) {
          removedItem = navItem;
        }
      });

      if (removedItem) {
        if(removedItem == 'addemployee'){
          const index = this.dynamicNavItems.indexOf(removedItem);
      this.doAction('Find Employee')
        }
        console.log(removedItem);
        const index = this.dynamicNavItems.indexOf(removedItem);
        if (index !== -1) {
          this.dynamicNavItems.splice(index, 1);
          
          if (this.dynamicNavItems.length > 0) {
            this._selected_option = '';
              this.dynamicNavItems[this.dynamicNavItems.length - 1];
          } else {
            this._selected_option = null; // or assign a default value if needed
          }
        }
      }
    } else {
      this.sharedService.dynamicNavItems.forEach((navItem) => {
        if (!this.dynamicNavItems.includes(navItem)) {
          navItemToBeAdd = navItem;
        }
      });

      if (navItemToBeAdd) {
        this._selected_option = navItemToBeAdd;
        this.dynamicNavItems.push(navItemToBeAdd);
        console.log(
          this.sharedService.dynamicNavItems,
          this._selected_option,
          'docheck'
        );
      }
    }
  }

  callDoAction(): void {
    // this.cdr.detectChanges();
    const action = this.sharedService.getActionParameter();
    if (action) {
      this.doAction(action);
    }
  }
  ngOnInit() {
    console.log(this.currentRoute);
  }

  toggleSideNavView() {
    this.isSideNavEnabled = !this.isSideNavEnabled;
  }
  deleteItem(item: string): void {
    
    this.sharedService. removeItem(item);
    this._selected_option = this.dynamicNavItems[this.dynamicNavItems.length - 1];
  }

  // doAction(action: any): void {
  //   console.log(this.dynamicNavItems, 'this._selected_option')
  //   if (!this.dynamicNavItems.includes(action)){
  //     this.dynamicNavItems.push(action);
  //      console.log(action ,'pushed')
  //   }
  //   this._selected_option = action;
  //     console.log(this._selected_option)
  //     console.log(this.dynamicNavItems,this._selected_option)
  // }

  doAction(action: any): void {
    // console.log(this.sharedService.dynamicNavItems, 'this._selected_option');
    // if (!this.sharedService.dynamicNavItems.includes(action)) {
    //   this.sharedService.dynamicNavItems = [
    //     ...this.sharedService.dynamicNavItems,
    //     action,
    //   ];
    //   // console.log(action, 'pushed');
    //   const lastitem = this.sharedService.dynamicNavItems.slice(-1)[0];
    //   this.dynamicNavItems = [...this.dynamicNavItems, lastitem];
    // }
    // this.sharedService._selected_option = action;
    this._selected_option = action;
    // this.abc = action;

    this.sharedService.addNavItem(action);

    this.dynamicNavItems = this.sharedService.getNavItems();

    console.log(this.dynamicNavItems, 'dynamicNavItems');
    // console.log(this.sharedService.dynamicNavItems, this.sharedService._selected_option);
  }
}
