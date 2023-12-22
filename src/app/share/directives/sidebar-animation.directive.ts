import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { DURATION_ANIMATION_PANELS } from '../../common/constants';

@Directive({
  selector: '[appSidebarAnimation]',
  standalone: true,
})
export class SidebarAnimationDirective implements OnDestroy {
  animationHideFrameId = 0;
  animationShowFrameId = 0;

  @Input() isHide = false;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {}

  @HostListener('click', ['$event.target'])
  clickHideButton(target: HTMLElement) {
    if (target.closest('[data-action]')) {
      if (this.isHide) {
        this.ngZone.runOutsideAngular(() => {
          this.hideSidebar();
        });
      } else {
        this.ngZone.runOutsideAngular(() => {
          this.showSidebar();
        });
      }
    }
  }

  private hideSidebar() {
    const sidebar = this.el.nativeElement as HTMLElement;

    const startWidth = sidebar.offsetWidth;
    const targetWidth = 100;
    const duration = DURATION_ANIMATION_PANELS;
    let startTime = 0;

    this.renderer.addClass(sidebar, 'hide');

    const animate = (timestamp: number, startWidth: number) => {
      startTime = startTime || timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);

      const newWidth = startWidth - percentage * (startWidth - targetWidth);

      this.renderer.setStyle(sidebar, 'width', `${newWidth}px`);

      if (progress < duration) {
        this.animationHideFrameId = requestAnimationFrame(newTimesStamp =>
          animate(newTimesStamp, newWidth)
        );
      }
    };

    this.animationHideFrameId = requestAnimationFrame(timestamp => animate(timestamp, startWidth));
  }

  private showSidebar() {
    const sidebar = this.el.nativeElement as HTMLElement;

    const startWidth = 100;
    const targetWidth = 200;
    const duration = DURATION_ANIMATION_PANELS;
    let startTime = 0;

    this.renderer.removeClass(sidebar, 'hide');

    const animate = (timestamp: number) => {
      startTime = startTime || timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);

      const newWidth = startWidth + percentage * targetWidth;

      this.renderer.setStyle(sidebar, 'width', `${newWidth}px`);

      if (progress < duration) {
        this.animationShowFrameId = requestAnimationFrame(newTimesStamp => animate(newTimesStamp));
      }
    };

    this.animationShowFrameId = requestAnimationFrame(timestamp => animate(timestamp));
  }

  ngOnDestroy(): void {
    if (this.animationHideFrameId) {
      cancelAnimationFrame(this.animationHideFrameId);
      this.animationHideFrameId = 0;
    }
    if (this.animationShowFrameId) {
      cancelAnimationFrame(this.animationShowFrameId);
      this.animationShowFrameId = 0;
    }
  }
}
