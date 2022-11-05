import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public items: MenuItem[] = [];
  public loginToken: any;
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.loginToken = sessionStorage.getItem('token');
    }
    this.items = [
      {
        label:'Home',
        icon:'pi pi-home',
        routerLink: '/'
     },
      {
          label:'Match',
          icon:'pi pi-user-edit',
          items:[
              {
                  label:'Add',
                  icon:'pi pi-fw pi-plus',
                  url: 'http://159.65.148.113/admin/tournaments/tournamentmatches/add/'
              },
              {
                  label:'View',
                  icon:'pi pi-chevron-right',
                  routerLink: '/match'
              }
          ]
      },
  ];
  }
  login(){
    sessionStorage.setItem("token", this.loginToken);
    window.location.reload();
  }
  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    this.loginToken = sessionStorage.getItem('token');
    window.location.reload();
  }

  getLoginToken(){
    return sessionStorage.getItem("token");
  }
}
