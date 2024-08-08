import { Routes } from '@angular/router';
import { ErrorPageComponent } from './_main_components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "home", pathMatch: "full"
    },
    {
        path: "home", component: HomeComponent
    },

    // {
    //     path: "games", component: GamesComponent
    // },
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

