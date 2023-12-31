import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private auth:AuthService){}
  user={localId:"someid",displayName:"somename"}
  ngOnInit():void{
    this.auth.canAccess();
    if(this.auth.isAuthenticated()){
      //call user details
      this.auth.details().subscribe({
        next:data=>{
          this.user.localId=data.users[0].localId;
          this.user.displayName=data.users[0].displayName;
        }
      })
    }
  }

}
