import { Routes } from '@angular/router';
import { ErrorPageComponent } from './_main_components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { viewcarComponent } from './components/cars/view_cars/viewcars.component';
import { VeiwSingleCarComponent } from './components/cars/veiw-single-car/veiw-single-car.component';
import { CreateCarComponent } from './components/cars/create-car/create-car.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';


export const routes: Routes = [
    {
        path: "", redirectTo: "home", pathMatch: "full"
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "cars", component: viewcarComponent
    },
    {
        path: "cars/view/:id", component: VeiwSingleCarComponent
    },
    {
        path: "cars/create", component: CreateCarComponent
    },
    {
        path: "user/login", component: LoginComponent
    },
    {
        path: "user/register", component: RegisterComponent
    },
    {
        path: "cars/edit/:id", component: CreateCarComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];

