import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { MenageGameComponent } from './menage-game/menage-game.component';



export const MaterialRoutes: Routes = [
    {
        path:"category",
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:
        {
            expectedRole:["admin"]
        }
    },
    {
        path:"game",
        component:MenageGameComponent,
        canActivate:[RouteGuardService],
        data:
        {
            expectedRole:["admin"]
        }
    }
];
