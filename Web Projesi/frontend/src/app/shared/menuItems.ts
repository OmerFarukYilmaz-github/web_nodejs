import { Injectable } from "@angular/core";

export interface Menu
{
    state:string;
    name:string;
    icon:string;    
    role:string;
}

const MENUITEMS =[
    {state:"dashboard",name:"Dashboard",icon:"space_dashboard",role:""},
    {state:"category", name:"Manage Category",icon:"category",role:"admin"},
    {state:"game",name:"Manage Game",icon:"sports_esports ",role:"admin"},
    {state:"order",name:"Manage Order",icon:"shopping_cart ",role:"user"}];

@Injectable()
export class MenuItems{
    getMenuItems(): Menu[]{
        return MENUITEMS;
    }
}