import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "collections", component: CollectionsComponent },
    { path: "profile", component: ProfileComponent },
    { path: "create", component: CreateComponent },
    { path: "update", component: UpdateComponent }
];
