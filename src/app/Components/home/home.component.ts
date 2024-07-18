import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NgxPaginationModule, FormsModule, SearchPipe, NgxSpinnerModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('top') topElement!: ElementRef;

  private dataSubject = new BehaviorSubject<User[]>([]);
  data$ = this.dataSubject.asObservable();
  data: User[] = [];
  term: string = '';
  p: any;
  total: any;

  constructor(private _HttpClient: HttpClient, private _NgxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._HttpClient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (res) => {
        this.dataSubject.next(res);
        this._NgxSpinnerService.hide();
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this._NgxSpinnerService.hide();
      }
    });

    this.data$.subscribe(data => {
      this.data = data;
    });
  }

  sortbyname() {
    const sortedData = [...this.dataSubject.value].sort((a, b) => a.name.localeCompare(b.name));
    this.dataSubject.next(sortedData);
  }
  sortbyusername() {
    const sortedData = [...this.dataSubject.value].sort((a, b) => a.username.localeCompare(b.name));
    this.dataSubject.next(sortedData);
  }
  sortbyuseremail() {
    const sortedData = [...this.dataSubject.value].sort((a, b) => a.email.localeCompare(b.name));
    this.dataSubject.next(sortedData);
  }

  pageChanged(eve: any) {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.p = eve;
  }
}
