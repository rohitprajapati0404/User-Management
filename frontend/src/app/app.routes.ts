import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { UsersList } from './pages/users-list/users-list';
import { UserForm } from './pages/user-form/user-form';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'users',
    component: UsersList
  },
  {
    path: 'users/new',
    component: UserForm
  },
  {
    path: 'users/:id/edit',
    component: UserForm
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFound
  }
];

