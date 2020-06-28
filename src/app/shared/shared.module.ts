import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotfoundComponent, MainLayoutComponent],
  imports: [
    RouterModule,
    CommonModule,
    NgZorroAntdModule,
    NzSpaceModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    NotfoundComponent,
    MainLayoutComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
