import { Directive, Renderer2, ViewContainerRef } from '@angular/core';

const LOADING_CLASS = 'animate-card-in';

@Directive({
  selector: '[appDeferLoading]',
})
export class DeferLoadingDirective {
  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly renderer: Renderer2
  ) {
    this.isElementInViewport(this.viewContainerRef.element.nativeElement);
  }

  private addAnimationClass(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(
          this.viewContainerRef.element.nativeElement,
          LOADING_CLASS
        );
      }
    });
  }

  private isElementInViewport(element: HTMLElement): void {
    let options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(
      this.addAnimationClass.bind(this),
      options
    );

    observer.observe(element);
  }
}
