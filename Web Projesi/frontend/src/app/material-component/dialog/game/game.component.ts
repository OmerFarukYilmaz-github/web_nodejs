import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { GameService } from 'src/app/services/game.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  onAddGame= new  EventEmitter();
  onEditGame= new  EventEmitter();
  gameForm:any = FormGroup;
  dialogAction:any="Add";
  action:any= "Add";

  responseMessage:any; 
  categories:any =[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder:FormBuilder,
    private gameService:GameService,
    public dialogRef:MatDialogRef<GameComponent>,
    private snackbarService:SnackbarService,
    private categoryService:CategoryService) { }


  ngOnInit(): void {
    this.gameForm= this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      categoryId:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]]
    });

    if(this.dialogData.action ==="Edit")
    {
      this.dialogAction=  "Edit";
      this.action="Update";
      this.gameForm.patchValue(this.dialogData.data);
    }

    this.getCategories();
  }

  getCategories()
  {
    this.categoryService.getAllCategory().subscribe((response:any)=>
    {
      this.categories= response;
    }
    ,(error:any)=>
    {
       if(error.error?.message)
       {
        this.responseMessage=error.error?.message;
       }
       else{
        this.responseMessage=GlobalConstant.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    });

  }

  handleSubmit()
  {
    if(this.dialogAction==="Edit")
    {
      this.edit();
    }
    else
    {
      this.add();
    }
  }

  add()
  {
    var formData= this.gameForm.value;
    var data= 
    {
      name: formData.name,
      categoryId: formData.categoryId,
      description:formData.description,
      price: formData.price
    };
    this.gameService.add(data).subscribe((response:any)=>
    {
      this.dialogRef.close();
      this.onAddGame.emit();
      this.responseMessage=response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    }
    ,(error:any)=>
    {
       this.dialogRef.close();
       if(error.error?.message)
       {
        this.responseMessage=error.error?.message;
       }
       else{
        this.responseMessage=GlobalConstant.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    });

  }

  edit()
  {   
    var formData= this.gameForm.value;
    var data= 
    {
      gameId: this.dialogData.data.gameId,
      name: formData.name,
      categoryId: formData.categoryId,
      description:formData.description,
      price: formData.price
    };
    this.gameService.update(data).subscribe((response:any)=>
    {
      this.dialogRef.close();
      this.onEditGame.emit();
      this.responseMessage=response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    }
    ,(error:any)=>
    {
       this.dialogRef.close();
       if(error.error?.message)
       {
        this.responseMessage=error.error?.message;
       }
       else{
        this.responseMessage=GlobalConstant.genericError;
       }
       this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    });
  }

}
