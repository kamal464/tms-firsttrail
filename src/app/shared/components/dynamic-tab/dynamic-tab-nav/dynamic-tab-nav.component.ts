import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnDestroy,
} from '@angular/core';
@Component({
  selector: 'app-dynamic-tab-nav',
  templateUrl: './dynamic-tab-nav.component.html',
  styleUrls: ['./dynamic-tab-nav.component.scss']
})
export class DynamicTabNavComponent implements OnChanges, OnDestroy {
  @Input() changed: boolean;
  @Input() selectedId: string;
  @Input() navItemsMap: Map<string, DynamicTabNavItem>;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  navItems: DynamicTabNavItem[] = [];
  selectedNavItemId: string;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges() {
    const navIds = Array.from(this.navItemsMap.keys());
    navIds.sort();
    const navItems: DynamicTabNavItem[] = [];
    for (const navId of navIds) {
      const item = this.navItemsMap.get(navId);
      navItems.push(item);
    }
    this.navItems = navItems;
    if (this.selectedId != null && this.navItemsMap.has(this.selectedId)) {
      this.selectedNavLink(this.selectedId);
    }
  }

  ngOnDestroy() {
    for (const item of this.navItems) {
      item.is_selected = false;
    }
  }

  selectedNavLink(id: string) {
    if (this.navItemsMap.get(id).has_children) {
      this.openOrCloseSideMenuExpand(id, !this.navItemsMap.get(id).is_expanded);
      this.ref.markForCheck();
    } else {
      if (this.selectedNavItemId !== id) {
        this.deselectPreviousNavLink();
        this.selectedNavItemId = id;
        let linkIndex = -1;
        let linkId = id;
        do {
          this.navItemsMap.get(linkId).is_selected = true;
          linkIndex = linkId.lastIndexOf(':');
          if (linkIndex > -1) {
            linkId = linkId.substring(0, linkIndex);
            this.openOrCloseSideMenuExpand(linkId, true);
          }
        } while (linkIndex > -1);
        this.selected.emit(this.selectedNavItemId);
      }
    }
  }

  deselectPreviousNavLink() {
    if (this.selectedNavItemId != null) {
      let linkIndex = -1;
      let linkId = this.selectedNavItemId;
      do {
        if (this.navItemsMap.has(linkId)) {
          this.navItemsMap.get(linkId).is_selected = false;
          linkIndex = linkId.lastIndexOf(':');
          linkId = linkId.substring(0, linkIndex);
        }
      } while (linkIndex > -1);
    }
  }

  openOrCloseSideMenuExpand(id: string, flag: boolean) {
    this.navItemsMap.get(id).is_expanded = flag;
    for (const navItemId of this.navItemsMap.keys()) {
      if (navItemId.startsWith(id + ':')) {
        this.navItemsMap.get(navItemId).is_hidden = !flag;
      }
    }
  }
}

export interface DynamicTabNavItem {
  id: string;
  icon: string;
  label: string;
  is_hidden?: boolean;
  is_selected?: boolean;
  has_children?: boolean;
  is_expanded?: boolean;
  is_child?: boolean;
}
