import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Store, select } from '@ngrx/store';
import { selectErrorAuth } from './store/auth/auth.selectors';
import { TAppStore } from './app.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resetError } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  title = 'projects-manager-client';
  authError$ = this.store.pipe(select(selectErrorAuth));

  constructor(
    private readonly store: Store<TAppStore>,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authError$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((error) => {
        if (error) {
          this.snackBar.open(error, 'Закрыть', { duration: 5000 });
          this.store.dispatch(resetError());
        }
      });
  }
}
