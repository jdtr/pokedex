import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetailComponent } from './pages/detail/detail.component';

// ======== Guard ===========
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'detail/:id',
        component: DetailComponent,
        canActivate: [ AuthGuard ]
    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}