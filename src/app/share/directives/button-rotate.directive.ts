import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appButtonRotate]',
  standalone: true,
})
export class ButtonRotateDirective implements OnDestroy {
  @Input() isHide = false;
  animationRightFrameId = 0;
  animationLeftFrameId = 0;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {}

  @HostListener('click')
  clickButton() {
    if (this.isHide) {
      this.ngZone.runOutsideAngular(() => {
        this.rotateLeftButton();
      });
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.rotateRightButton();
      });
    }
  }

  private rotateRightButton() {
    const button = this.el.nativeElement as HTMLElement;

    let startTime = 0;
    const duration = 500;
    const targetDegrees = 180;

    const animate = (timestamp: number) => {
      startTime = startTime || timestamp;
      const progress = timestamp - startTime;

      const precentage = Math.min(progress / duration, 1);

      const newDegrees = precentage * targetDegrees;
      this.renderer.setStyle(button, 'transform', `rotate(${newDegrees}deg)`);

      if (progress < duration) {
        this.animationRightFrameId = requestAnimationFrame(timestamp => animate(timestamp));
      }
    };

    requestAnimationFrame(timestamp => animate(timestamp));
  }

  private rotateLeftButton() {
    const button = this.el.nativeElement as HTMLElement;

    let startTime = 0;
    const duration = 500;
    const targetDegrees = 0;

    const animate = (timestamp: number) => {
      startTime = startTime || timestamp;
      const progress = timestamp - startTime;

      const precentage = Math.min(progress / duration, 1);

      const newDegrees = precentage * targetDegrees;
      this.renderer.setStyle(button, 'transform', `rotate(${newDegrees}deg)`);

      if (progress < duration) {
        this.animationLeftFrameId = requestAnimationFrame(timestamp => animate(timestamp));
      }
    };

    requestAnimationFrame(timestamp => animate(timestamp));
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationLeftFrameId);
    cancelAnimationFrame(this.animationRightFrameId);
    this.animationLeftFrameId = 0;
    this.animationRightFrameId = 0;
  }
}
