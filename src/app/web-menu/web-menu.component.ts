import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../shared/api-config';
@Component({
  selector: 'app-web-menu',
  templateUrl: './web-menu.component.html',
  styleUrls: ['./web-menu.component.scss']
})
export class WebMenuComponent implements OnInit {
menuData : any = [] ;
_currentAction = 'view';

topMenu : string;
subMenu : string;
editid:any;
editable: boolean;
menuItem : string;
uiRoute : string;
currentIndex :number = 0;
inputLabel: any = [  "#","TopMenu","SubMenu", "MenuItem","UiRoute","Actions"];
constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMenu();
  }

  doAction(action): void {
   
    this._currentAction = action;

  }


  addMenu(){

    const timestamp = new Date().getTime(); 
    const requestBody = {
      id: timestamp,
      topmenuitem:this.topMenu,
      level1menuitem:this.subMenu,
      level2menuitem:this.menuItem,
      uiroute:this.uiRoute,
      fkorgid:1
      
    }; 
    console.log(requestBody)
    this.http.post(`${API_BASE_URL}/v1/webmenu/add`,requestBody).subscribe((data)=> {
     this.menuData.push(requestBody);
     

    })
   
    
  }

  getMenu() {
    this.http
      .post(`${API_BASE_URL}/v1/webmenu/getall`, {},{
        // headers: new HttpHeaders().set('id', id)
      }).subscribe((data) =>{
this.menuData = data;
        console.log(this.menuData);
      })
      
  }


  toggleEditMode(data: any) {
    data.editMode = !data.editMode;
  }


  getfield(field):void{
    this.editid = field;
    for (let field of this.menuData) {
      this.editable = field.id === field;
    }
    
    console.log(field)
  }

  updateMenu(){
    const fieldId = this.editid;
    const fieldToUpdate = this.menuData.find((field) => field.id === fieldId);
  
    if (fieldToUpdate) {
      const updateData = {
        id: this.editid,
        topmenuitem:fieldToUpdate.topmenuitem,
      level1menuitem:fieldToUpdate.level1menuitem,
      level2menuitem:fieldToUpdate.level2menuitem,
      uiroute:fieldToUpdate.uiroute,
      fkorgid:1
      };
  
      console.log(updateData);
 
      this.http.post(`${API_BASE_URL}/v1/webmenu/update`, updateData).subscribe(() => {
        console.log('updateMenu is called');
      });
  }



}
deleteField(index: number) {
 
  this.menuData.splice(index, 1);
 
}
deleteMenuItem() {
  const identity = this.editid;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('id', [identity]); // Convert reason to an array

  this.http.post(`${API_BASE_URL}/v1/webmenu/delete`, {}, { headers })
    .subscribe();

  console.log('delete called',identity);
}

}