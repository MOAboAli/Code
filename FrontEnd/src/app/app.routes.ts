import { Routes } from '@angular/router';
import { ErrorPageComponent } from './_main_components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { viewcarComponent } from './components/cars/view_cars/viewcars.component';

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
    // {
    //     path: "games/game/:id", component: SingleGameComponent
    // },
    // {
    //     path: "games/game/update/:id", component: UpdategameComponent
    // },
    // {
    //     path: "games/Create", component: CreategameComponent
    // },
    {
        path: "**",
        component: ErrorPageComponent
    }
];

