import {
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { DURATION_ANIMATION_PANELS } from '../../common/constants';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appCenterPanelAnimation]',
  standalone: true,
})
export class CenterPanelAnimationDirective implements OnChanges, OnDestroy, OnInit {
  @Input() isHide = false;
  animationHideFrameId = 0;
  animationShowFrameId = 0;
  targetShowAnimateLeft!: number;
  centerPanelEl = this.el.nativeElement as HTMLElement;

  authUser$ = this.store.pipe(
    select(selectAuthUser),
    map(u => u)
  );
  private destroyRef = inject(DestroyRef);

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone,
    private readonly store: Store<TAppStore>
  ) {}

  ngOnChanges(): void {
    if (this.isHide) {
      this.ngZone.runOutsideAngular(() => {
        this.hideAnimate();
      });
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.showAnimate();
      });
    }
  }

  ngOnInit(): void {
    this.authUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isAuth => {
      if (isAuth) {
        this.targetShowAnimateLeft = 310;
        this.renderer.setStyle(this.centerPanelEl, 'left', `${this.targetShowAnimateLeft}px`);
      } else {
        this.targetShowAnimateLeft = 0;
        this.renderer.setStyle(this.centerPanelEl, 'left', `${this.targetShowAnimateLeft}px`);
      }
    });
  }

  hideAnimate() {
    const startLeft = this.centerPanelEl.getBoundingClientRect().left;
    const targetLeft = 110;
    const duration = DURATION_ANIMATION_PANELS;
    let startTime = 0;

    const animate = (timestamp: number) => {
      startTime = startTime || timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const newLeft = startLeft - percentage * (startLeft - targetLeft);
      this.renderer.setStyle(this.centerPanelEl, 'left', `${newLeft}px`);

      if (progress < duration) {
        this.animationHideFrameId = requestAnimationFrame(timeStamps => animate(timeStamps));
      }
    };

    this.animationHideFrameId = requestAnimationFrame(timestamps => animate(timestamps));
  }

  showAnimate() {
    const startLeft = this.centerPanelEl.getBoundingClientRect().left;
    const duration = DURATION_ANIMATION_PANELS;
    let startTime = 0;

    const animate = (timestamp: number) => {
      startTime = startTime || timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const newLeft = startLeft + percentage * (this.targetShowAnimateLeft - startLeft);
      this.renderer.setStyle(this.centerPanelEl, 'left', `${newLeft}px`);

      if (progress < duration) {
        this.animationShowFrameId = requestAnimationFrame(timeStamps => animate(timeStamps));
      }
    };

    this.animationShowFrameId = requestAnimationFrame(timestamps => animate(timestamps));
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
