import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  showLogin=false;
  authError:string='';
  constructor(private seller:SellerService, private router:Router ) {}


  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signUp(data:SignUp):void{
    console.log(data)
    this.seller.userSignUp(data);
    //this.seller.userSignUp(data).subscribe((result)=>{
      //console.log(result)
      //if(result){
        //this.router.navigate(['seller-home'])
      //}
   // });
  }
  login(data:SignUp):void{
    this.authError="";
    //console.log(data)
    //this.seller.userSignUp(data);
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct"

      }

    })
  }

  openLogin(){
    this.showLogin=true

  }
  openSignUp(){
    this.showLogin=false

  }



}
