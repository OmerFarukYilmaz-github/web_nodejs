import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AnyARecord } from 'dns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { SignupComponent } from 'src/app/signup/signup.component';
import { AdminComponent } from '../dialog/admin/admin.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  displayedColumns:string [] =["name","email","contactNumber","status"];
  dataSource:any=[];
  responseMessage:any;

  constructor(
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    private userService:UserService,
    private dialog:MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData()
  {
    this.userService.getAllUsers().subscribe((response:any)=>
    {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }
    ,(error:any)=>
    {
      this.ngxService.stop();
      if(error.error?.message)
      {
        this.responseMessage=error.error?.message;
      }
      else
      {
        this.responseMessage=GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    });
  }

  applyFilter(event:Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

  handleChangeAction(status:any, userId:any){
    this.ngxService.start(); 
    var data = 
    {
      isActive:status.toString(),
      userId:userId
    }
    this.userService.updateUserStatus(data).subscribe(
      (response:any)=>
      {
        this.ngxService.stop();
        //this.tableData();
        this.responseMessage= response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"success");
        
      },(error:any)=>
      {
        this.ngxService.stop();
        if(error.error?.message)
        {
          this.responseMessage=error.error?.message;
        }
        else
        {
          this.responseMessage=GlobalConstant .genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
      });;
  }

  handleAddAdminAction()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(AdminComponent, dialogConfig);
  }

}
