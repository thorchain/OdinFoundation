import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { GrantsComponent } from '../app/grants/grants.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'grants',
        component: GrantsComponent
      },
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
