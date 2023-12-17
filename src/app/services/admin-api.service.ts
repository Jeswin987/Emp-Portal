import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  SERVER_URL = "https://employe-portal.onrender.com"
  constructor(private http:HttpClient){}


  authenticate (){
    // api call 
    return this.http.get(`${this.SERVER_URL}/users/1`)
  }

  updateAdmin(admin:any){
    return this.http.put(`${this.SERVER_URL}/users/1`,admin)
 
  }
}
