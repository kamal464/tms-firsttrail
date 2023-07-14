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
formData  :any;
topMenu : string;
subMenu : string;
menuItem : string;
uiRoute : string;
currentIndex :number = 0;
inputLabel: any = [  "#","TopMenu","SubMenu", "MenuItem","UiRoute"];
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
    this.http.post(`${API_BASE_URL}/t/webmenu/add`,requestBody).subscribe(()=> {
     
    })
   
    
  }

  getMenu() {
    this.http
      .post(`${API_BASE_URL}/t/webmenu/getall`, {},{
        // headers: new HttpHeaders().set('id', id)
      }).subscribe((data) =>{
this.menuData = data;
        console.log(this.menuData);
      })
      
  }




}

