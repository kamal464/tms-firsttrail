import { Component,OnInit,ViewChild,AfterViewInit,OnChanges ,SimpleChanges, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedServiceService } from './shared/shared-service.service';
import { SchemaAttributeComponent } from './schema-attribute/schema-attribute.component';
import * as v8 from 'v8';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private memoryUsage: number; //
  ngOnInit(): void {

    // this.memoryUsage = performance.now();

   
    // setInterval(() => {
    //   const currentMemoryUsage = performance.now();
    //   const memoryIncrease = currentMemoryUsage - this.memoryUsage;
    //   console.log(`Memory increase (milliseconds): ${memoryIncrease}`);
      
     
    //   this.memoryUsage = currentMemoryUsage;
    // }, 1000); 
  }



//   title = 'dtpl';
//   appComponent = 'yes'
//   menuItems = [];
//   currentRoute: string;
//   isActive = false;
//   activeButton: string = '';


//   dynamicNavItems = [];
//   currentField: string = '';
//   isSideNavEnabled = false;
//   _selected_option = null;
//   showContent(field: string): void {
//     this.currentField = field;
//   }

//   @ViewChild(SchemaAttributeComponent) childComponent:SchemaAttributeComponent;
//   constructor(private router: Router,
//     private sharedService:SharedServiceService) { }

// ngAfterViewInit(): void {
//      this.sharedService.getData().subscribe((data: string) => {
       
//        if (data === 'column') {
//         //  const url = '/column';
//         //  window.open(url, '_blank');
//         //  this.router.navigateByUrl(url);
//          this._selected_option = data;
//          this.appComponent = 'no'
//       }

//     });
// }



//   ngOnInit() {
//     console.log(this.currentRoute)
   
//   }
  
//   toggleSideNavView() {
//     this.isSideNavEnabled = !this.isSideNavEnabled;
//   }
//   deleteItem(item: string): void {
//     const index = this.dynamicNavItems.indexOf(item);
//     if (index !== -1) {
//       this.dynamicNavItems.splice(index, 1);
//       if (this.dynamicNavItems.length > 0) {
//         this._selected_option = this.dynamicNavItems[this.dynamicNavItems.length - 1];
//       } else {
//         this._selected_option = null; // or assign a default value if needed
//       }
//     }
//   }
  
//   doAction(action: any): void {
//     if (!this.dynamicNavItems.includes(action)){
//       this.dynamicNavItems.push(action);
//     }
//     else if(this._selected_option == 'column'){

//     }
//     this._selected_option = action;   
//       console.log(action) 
//   }

 
 

  
}
