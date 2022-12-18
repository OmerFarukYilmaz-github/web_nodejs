import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url= environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any)
  {
    return this.httpClient.post
    (this.url + "/game/add/", 
     data,
     {
       headers: new HttpHeaders().set('Content-Type', "application/json ")
     } 
    )
  }  

  update(data:any)
  {
    return this.httpClient.patch
    (this.url + "/game/update/", 
     data,
     {
       headers: new HttpHeaders().set('Content-Type', "application/json ")
     } 
    )
  }

  getAllGames()
  {
    return this.httpClient.get(this.url + "/game/getAll/");
  }

  updateStatus(data:any)
  {
    return this.httpClient.patch
    (this.url + "/game/updateStatus/", 
     data,
     {
       headers: new HttpHeaders().set('Content-Type', "application/json ")
     } 
    )
  }  

  delete(gameId:any)
  {
    return this.httpClient.delete
    (this.url + "/game/deletebyId/"+gameId,
     {
       headers: new HttpHeaders().set('Content-Type', "application/json ")
     } 
    )
  }  

  getGamesByCategory(categoryId:any)
  {
    return this.httpClient.get(this.url + "/game/getByCategory/"+categoryId);
  }

  getGamesById(gameId:any)
  {
    return this.httpClient.get(this.url + "/game/getById/"+gameId);
  }

  
}
