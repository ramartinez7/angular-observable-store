import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotfoundComponent, MainLayoutComponent],
  imports: [
    RouterModule,
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    NotfoundComponent,
    MainLayoutComponent
  ]
})
export class SharedModule { }
