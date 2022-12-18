import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  signAdminForm:any=FormGroup;
  responseMessage:any;
 
   constructor(private formBuilder:FormBuilder,
     private router:Router,
     private userService:UserService,
     private snackbarService:SnackbarService,
     private dialogRef:MatDialogRef<SignupComponent>,
     private ngxService:NgxUiLoaderService) { }
 
   ngOnInit(): void {
     this.signAdminForm = this.formBuilder.group({
       name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
       email:[null,[Validators.required,Validators.pattern(GlobalConstant.mailRegex)]],
       contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
       password:[null,[Validators.required]]
     })
   }
 
   handleAddAdminSubmit()
   {
       this.ngxService.start();
       var formData = this.signAdminForm.value;
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
 
}
