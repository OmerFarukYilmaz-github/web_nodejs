import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewGameComponent } from './dialog/view-game/view-game.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { MenageGameComponent } from './menage-game/menage-game.component';
import { GameComponent } from './dialog/game/game.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AdminComponent } from './dialog/admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewGameComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    MenageGameComponent,
    GameComponent,
    ManageOrderComponent,
    ManageUserComponent,
    AdminComponent    
  ]
})
export class MaterialComponentsModule {}
