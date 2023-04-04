import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn= new BehaviorSubject<boolean>(false);
isLoginError= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
    //console.log("service call")
    //let result = this.http.post('http://localhost:3000/seller',
    //data,
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.log(result)
      //this.isSellerLoggedIn.next(true);
      if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
      //console.log("result",result)
    }
    });

    //return false
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['seller-home']);


    }
  }
  userLogin(data:Login){
    console.log(data)
    //api call code will be there
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    )
    .subscribe((result:any)=>{
    console.log(result)
    if(result && result.body && result.body.length){
    console.log("user logged in")
    localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
    console.log("login failed")
    this.isLoginError.emit(true)
        }

      });

    }

  }
