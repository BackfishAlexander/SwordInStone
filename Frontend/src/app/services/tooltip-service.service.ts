import { Injectable, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injector } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  private tooltipComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private createTooltip() {
    if (!this.tooltipComponentRef) {
      console.log('Creating tooltip component');
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.tooltipComponentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.tooltipComponentRef.hostView);
      
      const domElem = (this.tooltipComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    }
  }

  showTooltip(x: number, y: number, title: string, description: string, backgroundColor: string) {
    this.createTooltip();
    this.tooltipComponentRef.instance.show(x, y, title, description, backgroundColor);
  }

  hideTooltip() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.instance.hide();
    }
  }
}