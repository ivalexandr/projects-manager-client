import { Component, Input } from '@angular/core';
import { CenterPanelAnimationDirective } from '../../share/directives/center-panel-animation.directive';

@Component({
  selector: 'app-center-panel',
  standalone: true,
  imports: [CenterPanelAnimationDirective],
  templateUrl: './center-panel.component.html',
  styleUrl: './center-panel.component.scss',
})
export class CenterPanelComponent {
  @Input() isHideBar = false;
}
