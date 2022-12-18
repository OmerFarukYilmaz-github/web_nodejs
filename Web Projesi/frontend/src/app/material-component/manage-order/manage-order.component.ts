import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { GameService } from 'src/app/services/game.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ["name","category","price","quantity","total","edit"];
  dataSource:any =[];
  manageOrderForm:any= FormGroup;
  categories:any=[];
  games:any=[];
  price:any;
  totalAmount:number=0;
  responseMessage:any; 

  constructor( private formbuilder:FormBuilder,
    private categoryService:CategoryService,
    private gameService:GameService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getAllCategories();
    
    this.manageOrderForm = this.formbuilder.group(
      {
        name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
        email:[null,[Validators.required,Validators.pattern(GlobalConstant.mailRegex)]],
        contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
        paymentMethod:[null,[Validators.required]],
        games:[null,[Validators.required]],
        category:[null,[Validators.required]],
        quantity:[null,[Validators.required]],
        price:[null,[Validators.required]],
        total:[0,[Validators.required]]
      }
    )
  }

  getAllCategories()
  {
    this.categoryService.getAllCategory().subscribe((response:any)=>
    {
      this.ngxService.stop();
      this.categories = response;
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

  getGamesByCategory(value:any)
  {
    this.gameService.getGamesByCategory(value.categoryId).subscribe((response:any)=>
    {
      this.games = response;
      this.manageOrderForm.controls['price'].setValue("");
      this.manageOrderForm.controls['quantity'].setValue("");
      this.manageOrderForm.controls['total'].setValue(0);
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
    });;

  }
  
  getGameDetails(value:any)
  {
     this.gameService.getGamesById(value.gameId).subscribe((response:any)=>
     {
      this.price=response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue("1");
      this.manageOrderForm.controls['total'].setValue(this.price*1);
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

  setQuantity(value:any)
  {
    var tempQuantity = this.manageOrderForm.controls["quantity"].value;
    if(tempQuantity>0)
    {
      this.manageOrderForm.controls["total"].setValue
      (
        this.manageOrderForm.controls["quantity"].value *  
        this.manageOrderForm.controls["price"].value
      );
    }
    else if (tempQuantity !='')
    {
      this.manageOrderForm.controls["quantity"].setValue('1');
      this.manageOrderForm.controls["total"].setValue
      (
        this.manageOrderForm.controls["quantity"].value *  
        this.manageOrderForm.controls["price"].value
      );
    }
    
  }


  isGameAddButtonActive()
  {
    if(this.manageOrderForm.controls["total"].value === 0 ||
    this.manageOrderForm.controls["total"].value === null ||
    this.manageOrderForm.controls["quantity"].value <= 0)
    {
      return false;
    }
    else { return true; }

  }

  isSubmitButtonActive()
  {
    if(this.totalAmount ===0 || 
      this.manageOrderForm.controls["name"].values ===null ||
      this.manageOrderForm.controls["email"].values ===null ||
      ! this.manageOrderForm.controls["email"].valid ||
      this.manageOrderForm.controls["contactNumber"].values ===null ||
      ! this.manageOrderForm.controls["contactNumber"].valid ||
      this.manageOrderForm.controls["paymentMethod"].values ===null )
    {
      return false;
    }
    else{
      return true;
    }
  }

  add()
  {
    var formData = this.manageOrderForm.value;
    var gameName = this.dataSource.find((e:{gameId:number;})=>e.gameId == formData.games.gameId);
    if(gameName === undefined)
    {
      this.totalAmount += formData.total;
      this.dataSource.push(
        {
          gameId: formData.games.gameId,
          name: formData.games.name,
          category: formData.category.name,
          quantity: formData.quantity,
          price: formData.price,
          total: formData.total
        });
        console.log(this.dataSource);
        this.dataSource =[...this.dataSource];
        this.snackbarService.openSnackBar(GlobalConstant.gameAdded,"success");
    }
    else
    {
      this.snackbarService.openSnackBar(GlobalConstant.gameExistError,GlobalConstant.error);
    }
  }

  handleDeleteAction(value:any, element:any)
  {
    this.totalAmount -= element.total;
    this.dataSource.splice(value,1);
    this.dataSource = [...this.dataSource];
  }

  submitAction()
  {this.ngxService.start();
   /* this.ngxService.start();
    var formData = this.manageOrderForm.value;
    var data=
    {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod:  formData.paymentMethod,
      totalAmount: this.totalAmount,
      gameDetails: JSON.stringify(this.dataSource)
    }*/
    // belki database kaydetmeyi eklenebilir.Yoksa farazi satın alma
    this.manageOrderForm.reset();
    this.dataSource=[];
    this.totalAmount=0;
    this.ngxService.stop();
    this.snackbarService.openSnackBar("Purchase Successfull Enjoy the Game","success");
  }

}
