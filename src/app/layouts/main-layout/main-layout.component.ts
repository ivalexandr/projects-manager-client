import { Component, signal } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { CenterPanelComponent } from '../../components/center-panel/center-panel.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [TopBarComponent, LeftPanelComponent, CenterPanelComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isHideSidebar = signal(false);

  hideSideBarHandler() {
    this.isHideSidebar.update(state => !state);
  }
}
