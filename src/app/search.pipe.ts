import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], filterQuery: string): any[] {
    if (!filterQuery || filterQuery.trim() === '') {
      return items;
    }
    return items.filter(item =>
      item.firstname.toLowerCase().includes(filterQuery.toLowerCase()) || item.lastname.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }

}
