import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER',
    active: true
  };

  isEditMode = false;
  userId: number | null = null;
  loading = false;
  saving = false;

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.userId = +idParam;
      this.loadUser();
    }
  }

  loadUser(): void {
    if (!this.userId) return;
    this.loading = true;
    this.cdr.detectChanges();
    this.userService.getUser(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.snackBar.open('Failed to load user', 'Close', { duration: 3000 });
      }
    });
  }

  onSave(): void {
    this.saving = true;
    this.cdr.detectChanges();

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, this.user).subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open('User Updated', 'Close', { duration: 3000 });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.saving = false;
          this.cdr.detectChanges();
          const message = err?.error?.message || 'Failed to update user';
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.userService.createUser(this.user).subscribe({
        next: () => {
          this.saving = false;
          this.snackBar.open('User Created', 'Close', { duration: 3000 });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.saving = false;
          this.cdr.detectChanges();
          const message = err?.error?.message || 'Failed to create user';
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
