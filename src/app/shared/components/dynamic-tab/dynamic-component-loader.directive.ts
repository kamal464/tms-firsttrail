import {ComponentFactoryResolver, Directive , Input,
  OnInit,
  Type,
  ViewContainerRef,} from '@angular/core';

@Directive({
  selector: '[appDynamicComponentLoader]'
})
export class DynamicComponentLoaderDirective {

  @Input() item: DynamicComponent;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        this.item.component
      );
    const viewContainerRef = this.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as IDynamicComponent).data = this.item.data;
  }
}

export class DynamicComponent {
  constructor(public component: Type<any>, public data: any) {}
}

export interface IDynamicComponent {
  data: any;
}
