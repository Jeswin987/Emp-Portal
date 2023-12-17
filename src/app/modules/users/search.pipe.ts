import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers:any[], searchkey:string): any [] {
    const result:any = []
    if(!allUsers || searchkey == ""){
      return allUsers
    }
    allUsers.forEach((item:any)=>{
      if(item.name.trim().toLowerCase().includes(searchkey.trim().toLocaleLowerCase())){
        result.push(item)
      }
     
    })
    return result
       
  }

}
