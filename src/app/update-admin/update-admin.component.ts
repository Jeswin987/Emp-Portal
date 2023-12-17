import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  profileImage:string = "./assets/images/profile.png"
  editAdminStatus:boolean = false
  adminDetails:any = {}
  @Output() onAdminChange = new EventEmitter()
  constructor(private api:AdminApiService){}
  ngOnInit(): void {
    this.api.authenticate().subscribe((res:any)=>{
      this.adminDetails = res
      if(res.picture){
        this.profileImage = res.picture
      }
    })
  }

  editAdminBtn(){
    this.editAdminStatus = true
  }
  getFile(event:any){
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetails.picture = this.profileImage
      
    }
  }

  updateAdmin(){
    // console.log(this.adminDetails);
    this.api.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        alert('Admin updated')
        localStorage.setItem("admin_name",res.name)
        localStorage.setItem("admin_pswd",res.password)
        this.editAdminStatus = false
        this.onAdminChange.emit(res.name)
      },
      error:(err:any)=>{
        alert("updation failed")
      }
    })
    
  }
  cancel(){
    this.editAdminStatus = false
  }
}
