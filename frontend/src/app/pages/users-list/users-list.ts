import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'active', 'actions'];
  loading = false;

  private userService = inject(UserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/users/new']);
  }

  onEdit(user: User): void {
    this.router.navigate([`/users/${user.id}/edit`]);
  }

  onDelete(user: User): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && user.id) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.snackBar.open('User Deleted', 'Close', { duration: 3000 });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
