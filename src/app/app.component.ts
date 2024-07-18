import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task_2';
  constructor(private _NgxSpinnerService: NgxSpinnerService) { }
  ngOnInit() {
    this._NgxSpinnerService.show();
    setTimeout(() => {
      this._NgxSpinnerService.hide();
    }, 1000);
  }
}
