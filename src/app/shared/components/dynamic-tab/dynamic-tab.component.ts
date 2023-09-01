import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { DynamicComponent } from './dynamic-component-loader.directive';
import { DynamicTabNavItem } from './dynamic-tab-nav/dynamic-tab-nav.component';
import { TabeventserviceService } from '../../tabeventservice.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTabComponent implements OnInit {
  private removeTabSubscription: Subscription;
  @Output() selected = new EventEmitter();
  navItemsMap = new Map<string, DynamicTabNavItem>();
  isSideNavEnabled = false;
  tabChanged = false;
  viewTabs = [];
  selectedId: string;
  selectedTabIndex: number;

  constructor(private ref: ChangeDetectorRef,
    private tabeventservice : TabeventserviceService) {
      this.removeTabSubscription = this.tabeventservice.removeTab$.subscribe((index) => {
       
        this.removeTab(index);
      });
    }

  toggleSideNavView() {
    this.isSideNavEnabled = !this.isSideNavEnabled;
  }

  updateSelectedId(id: string) {
    if (this.selectedId !== id) {
      for (let index = 0; index < this.viewTabs.length; index++) {
        if (this.viewTabs[index].id === id) {
          this.selectTabIndex(index);
          break;
        }
      }
      this.refreshView();
    }
  }

  ngOnInit(): void {
      this.tabeventservice.tabEventSubject.subscribe((item)=>
    {
      this.openOrAddTab(item)
    })
  
    
  }
  selectTabIndex(tabIndex) {
    if (this.selectedTabIndex !== tabIndex) {
      this.selectedTabIndex = tabIndex;
      this.selectedId = this.viewTabs[tabIndex].id;
      this.setTabChanged();
    }
  }

  openOrAddTab(item: TabbedItem) { 
    if (!this.navItemsMap.has(item.id)) {
      this.navItemsMap.set(item.id, {
        id: item.id,
        icon: item.icon,
        label: item.label,
        is_child: item.isChild || false,
        is_expanded: item.hasChildren || false,
        has_children: item.hasChildren || false,
      });
      if (!item.hasChildren) {
        this.viewTabs.push(item);
      }
    }
    if (!item.hasChildren) {
      this.updateSelectedId(item.id);
      this.refreshView();
    }
  }



  removeTab(index: number) {
    console.log(index,'dynamictabcomponent')  
    const removedId = this.viewTabs.splice(index, 1)[0].id;
    this.navItemsMap.delete(removedId);
    if (removedId.indexOf(':') > -1) {
      const groupItemId = removedId.substring(0, removedId.indexOf(':') + 1);
      let groupItemFound = false;
      for (const navItemId of this.navItemsMap.keys()) {
        if (navItemId.startsWith(groupItemId)) {
          groupItemFound = true;
          break;
        }
      }
      if (!groupItemFound) {
        this.navItemsMap.delete(
          groupItemId.substring(0, groupItemId.length - 1)
        );
      }
    }
    this.setTabChanged();
    this.refreshView();
  }

  setTabChanged() {
    this.selected.emit(this.selectedId);
    this.tabChanged = !this.tabChanged;
  }

  refreshView() {
    setTimeout(() => {
      this.ref.markForCheck();
    }, 100);
  }
}

export interface TabbedItem {
  id: string;
  icon?: string;
  label?: string;
  hideLabel?: boolean;
  item?: DynamicComponent;
  hasChildren?: boolean;
  isChild?: boolean;
  isClosable?: boolean;
}
