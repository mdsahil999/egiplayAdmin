import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatchAddOrEditComponent } from './component/match-add-or-edit/match-add-or-edit.component';
import {AccordionModule} from 'primeng/accordion';
import {CalendarModule} from 'primeng/calendar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import {DialogModule} from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InterceptorService } from './services/interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MatchAddOrEditComponent,
    DynamicFormComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AccordionModule,
    CalendarModule,
    ScrollPanelModule,
    TableModule,
    ListboxModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
    DialogModule,
    MenubarModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
