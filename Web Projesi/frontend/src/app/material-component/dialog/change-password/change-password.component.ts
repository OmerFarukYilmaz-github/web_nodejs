import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:[null,[Validators.required]],
      newPassword:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
  }

  areNewPasswordConfirmed()
  {
    if(this.changePasswordForm.controls["newPassword"].value != 
       this.changePasswordForm.controls["confirmPassword"].value )
      { 
        return false; 
      }
    else
    {
      return true;
    }
  }

  handleChangePasswordSubmit()
  {
      this.ngxService.start();
      var formData = this.changePasswordForm.value;
      var data = 
      {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      };
       
    this.userService.changePassword(data).subscribe((response:any)=>
    {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage,"success"); 
    }
    ,(error:any)=>
    {
      console.log(error);
      this.ngxService.stop();
      if(error.error?.message)
      {
        this.responseMessage= error.error?.message;
      }
      else
      {
        this.responseMessage= GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.genericError); 
      
    })
  }
    
    
  


}
