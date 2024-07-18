import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(members:any[],term:string): any {

    return members.filter((item)=>item.name.toLowerCase().includes(term.toLowerCase())||item.username.toLowerCase().includes(term.toLowerCase()));
  }

}
