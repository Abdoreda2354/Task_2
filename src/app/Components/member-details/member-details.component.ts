import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent {
constructor(private _ActivatedRoute:ActivatedRoute,private _HttpClient:HttpClient){}
memberId:any
memberData:any
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(prams)=>{
      this.memberId=prams.get('id')

    }
  })
  this._HttpClient.get(`https://jsonplaceholder.typicode.com/users/${this.memberId}`).subscribe({
    next:(res)=>{
      console.log(res);
      this.memberData=res
      

    }
  })
 
}
}
