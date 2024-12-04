import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-visitor',
  standalone: true,
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css',
  imports: [
    NgIf,
    MatToolbarModule,
    MatIconModule,
    MatSidenav,
    MatListModule,
    MatSidenavModule
  ]
})
export class VisitorComponent implements OnInit{
  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;

  constructor (private observer : BreakpointObserver){

  }
  ngOnInit(): void{
    this.observer.observe(["(max-width: 800px)"])
    .subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = "over";
        this.sidenav.close();
      }
      else{
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    })
  }
}
