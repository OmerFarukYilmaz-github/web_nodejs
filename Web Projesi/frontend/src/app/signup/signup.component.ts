import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 signupForm:any=FormGroup;
 responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.mailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
      password:[null,[Validators.required]]
    })
  }

  handleAddAdminAction()
  {
      this.ngxService.start();
      var formData = this.signupForm.value;
      var data = 
      {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password
      }
    this.userService.addAdmin(data).subscribe((response:any)=>
    {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage =response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    }
    ,(error:any)=>
    {
      this.ngxService.stop();
      if(error.error?.message)
      {
        this.responseMessage= error.error?.message;
      }
      else
      {
        this.responseMessage= GlobalConstant.genericError;
      }

      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    })
  }

handleSubmit(){
  this.ngxService.start();
  var formData = this.signupForm.value;
  var data = {
    name: formData.name,
    email: formData.email,
    contactNumber: formData.contactNumber,
    password: formData.password
  }
this.userService.signup(data).subscribe((response:any)=>
{
  this.ngxService.stop();
  this.dialogRef.close();
  this.responseMessage =response?.message;
  this.snackbarService.openSnackBar(this.responseMessage,"");
  this.router.navigate(['/']);
}
,(error:any)=>
{
  this.ngxService.stop();
  if(error.error?.message)
  {
    this.responseMessage= error.error?.message;
  }
  else
  {
    this.responseMessage= GlobalConstant.genericError;
  }

  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
}
)


}


}
