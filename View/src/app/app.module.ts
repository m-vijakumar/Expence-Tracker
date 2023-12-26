import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MaterialModule } from './Modules/material.module';
import { primengModule } from './Modules/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CarouselModule } from 'primeng/carousel';
// import { ButtonModule } from 'primeng/button';
// import { ToastModule } from 'primeng/toast';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SubscriptionService } from './services/subscription.service';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from './services/transaction.service';
import { MessageService } from 'primeng/api';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TransactionComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    primengModule,
    // FlexLayoutModule,
    // NgbModule,
    // CarouselModule,
    // ButtonModule,
    // ToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    UserService,
    TransactionService,
    SubscriptionService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
