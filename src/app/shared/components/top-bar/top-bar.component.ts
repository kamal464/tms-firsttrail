import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DynamicComponent } from '../dynamic-tab/dynamic-component-loader.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaManagerComponent } from 'src/app/schema-manager/schema-manager.component';
import { WebMenuComponent } from 'src/app/web-menu/web-menu.component';
import { CompanyProfileComponent } from 'src/app/company-profile/company-profile.component';
import { SettingsComponent } from 'src/app/settings/settings.component';
import { ReasonsComponent } from 'src/app/reasons/reasons.component';
import { EmployeeProfileComponent } from 'src/app/employee-profile/employee-profile.component';
import { EmployeeComponent } from 'src/app/employee/employee.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  appVersion = '0.0.1';
  currentEmployee: any;
  menu_items = [
    {route:'schema',label:'Schema Manager',tooltip:'schema',iconfile:'',name:'schema',level:1},
    {route:'webmenu', label:'WebMenu',tooltip:'webmenu',iconfile:'',name:'webmenu',level:1},
    {route:'companyprofile', label:'Company-Profile',tooltip:'companyprofile',iconfile:'',name:'companyprofile',level:1},
    {route:'settings', label:'settings',tooltip:'settings',iconfile:'settings',name:'settings',level:1 ,id :1234},
    {route:'settings', label:'settings',tooltip:'settings',iconfile:'settings',name:'settings',level:2 ,fkparentid :1234},
    {route:'reasons', label:'Reasons',tooltip:'reasons',iconfile:'',name:'reasons',level:3,fkparentid:1234},
    {route:'employeeprofile', label:'employee-profile',tooltip:'employeeprofile',iconfile:'',name:'employeeprofile',level:1,id:56565},
    {route:'employeeprofile', label:'employee-profile',tooltip:'employeeprofile',iconfile:'',name:'employeeprofile',level:2,fkparentid:56565},
    {route:'findemployee', label:'Find-Employee',tooltip:'findemployee',iconfile:'',name:'findemployee',level:2,fkparentid:56565},
    
  
  ];
  menuItems = [];
  @Input() tabEvent;
  currentView = '';
  searchInput = new FormControl('');

  

  constructor(
    private ref: ChangeDetectorRef
  ) {
    if (this.menu_items != null) {
      this.updateMenuItems(this.menu_items);
    }
   }

  ngOnInit(): void {
  }

  updateMenuItems(menu_items_list): void {
    let menu_map = new Map(),
      current_menu = null,
      roots = [];
    let menu_items = JSON.parse(JSON.stringify(menu_items_list));
    menu_items.map((menu_item) => {
      menu_item.children = [];
      menu_map.set(menu_item.id, menu_item);
    });
    menu_items.forEach((menu_item) => {
      if (menu_item.fkparentid != null) {
        if (menu_map.has(menu_item.fkparentid)) {
          let menu_parent = menu_map.get(menu_item.fkparentid);
          menu_parent.children.push(menu_item);
          menu_parent.children.sort((a, b) => a.serialno - b.serialno);
        }
      } else {
        roots.push(menu_item);
        roots.sort((a, b) => a.serialno - b.serialno);
      }
      if (menu_item.route == this.currentView) {
        current_menu = menu_item;
      }
    });
    this.menuItems = roots;
    console.log(this.menuItems,'check menuitems')
    
  }

  getComponentByMenuRoute(route): any {
    switch (route) {
      case 'schema':
        return SchemaManagerComponent;
      case 'webmenu':
        return WebMenuComponent;
    case 'companyprofile':
    return CompanyProfileComponent;
case 'settings':
  return SettingsComponent;
  case 'reasons':
    return ReasonsComponent;
case 'employeeprofile':
  return EmployeeProfileComponent;
  case 'findemployee':
    return EmployeeComponent;

      default:
        return null;
    }
  }



  openMenu(menu_item): void {
    const tabComponent = this.getComponentByMenuRoute(menu_item.route);
    console.log(menu_item,'checkitem')
    if (tabComponent != null) {
      const tabEntry = {
        isClosable: true,
      };
      tabEntry['id'] = menu_item.route;
      tabEntry['icon'] = menu_item.iconfile;
      tabEntry['label'] = menu_item.label;
      tabEntry['item'] = new DynamicComponent(tabComponent, {
        currentEmployee: this.currentEmployee,
        tabEvent: this.tabEvent,
      });
      console.log(tabEntry,' check tabentry')
      console.log(this.tabEvent,'eventcheck')
      this.tabEvent.next(tabEntry);
    }
  }






}
