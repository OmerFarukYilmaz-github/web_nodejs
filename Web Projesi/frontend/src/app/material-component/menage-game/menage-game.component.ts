import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GameService } from 'src/app/services/game.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { GameComponent } from '../dialog/game/game.component';

@Component({
  selector: 'app-menage-game',
  templateUrl: './menage-game.component.html',
  styleUrls: ['./menage-game.component.scss']
})
export class MenageGameComponent implements OnInit {

    displayedColumns :string[] = ["name","categoryName","description","price",'edit'];
    dataSource:any;
    responseMessage:any;

  constructor(
    private gameService:GameService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData()
  {
    this.gameService.getAllGames().subscribe((response:any)=>
    {
      this.ngxService.stop();
      this.dataSource= new MatTableDataSource(response);
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

  
  handleAddAction()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={action:'Add'};
    dialogConfig.width= "850px"

    const dialogRef= this.dialog.open(GameComponent,dialogConfig);
    this.router.events.subscribe(()=>
    {
      dialogRef.close();
    });

    const sub =dialogRef.componentInstance.onAddGame.subscribe(
      (response)=>
      {
        this.tableData();
      }
    )

  }

  handleEditAction(values:any)
  {   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=
    {
      action:'Edit',
      data:values
    };
    dialogConfig.width= "850px"

    const dialogRef= this.dialog.open(GameComponent,dialogConfig);
    this.router.events.subscribe(()=>
    {
      dialogRef.close();
    });

    const sub =dialogRef.componentInstance.onEditGame.subscribe(
      (response)=>
      {
        this.tableData();
      }
    )
  }

  handleDeleteAction(values:any)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=
    {
      message:'delete '+values.name+" game",
    };
    const dialogRef= this.dialog.open(ConfirmationComponent,dialogConfig);
   
    const sub =dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response)=>
      {
        this.ngxService.start();
        this.deleteGame(values.gameId);
        dialogRef.close();
        //this.tableData();
      })
  }

  deleteGame(gameId:any) 
  {
    this.gameService.delete(gameId).subscribe(
      (response:any)=>
      {
        this.ngxService.stop();
        this.tableData();
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
      });
  }

  onChange(status:any, gameId:any){
    var data = 
    {
      isActive:status.toString(),
      gameId:gameId
    }
    this.gameService.updateStatus(data).subscribe(
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

}
