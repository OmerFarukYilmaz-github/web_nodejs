import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from "jwt-decode";
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService 
{

  constructor(
    public auth:AuthService,
    public router:Router,
    public snackbarService:SnackbarService) { }

    canActivate(route:ActivatedRouteSnapshot):boolean
    {
      let expectedRoleArray = route.data;
      expectedRoleArray = expectedRoleArray.expectedRole;

      const token:any = localStorage.getItem("token");
      var tokenPayload:any;
      try 
      {
        tokenPayload = jwt_decode(token);  
      } 
      catch (error) 
      {
        localStorage.clear();
        this.router.navigate(["/"]);
      }

      let doesRolesMatch = false;

      for (let i = 0; i < expectedRoleArray.length; i++) 
      {
        if(expectedRoleArray[i]== tokenPayload.role)
        {
          doesRolesMatch = true;
        }
      }

      if(tokenPayload.role == "user" || tokenPayload.role == "admin")
      {
        if(this.auth.isAuthenticated() && doesRolesMatch)
        {
          return true;
        }
        else
        {
          this.snackbarService.openSnackBar(GlobalConstant.unauthroized, GlobalConstant.error);  
          this.router.navigate(["/gamestore/dashboard"]);
          return false; 
        }
      }
      else
      {
        this.router.navigate(["/"]);
        localStorage.clear();
        return false;
      }
    }

}

