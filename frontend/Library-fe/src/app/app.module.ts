import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UIRouterModule } from '@uirouter/angular';

import { CookieService } from 'ngx-cookie-service';
import { SimpleModalModule } from 'ngx-simple-modal';

import { InterceptorService } from './commons/services/interceptors/interceptor.service';
import { APP_STATES } from './commons/utils/app.states'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { NavigationComponent } from './components/main/navigation/navigation.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { SettingsComponent } from './components/users/settings/settings.component';
import { OwnedBooksComponent } from './components/books/owned-books/owned-books.component';
import { BorrowedBooksComponent } from './components/books/borrowed-books/borrowed-books.component';
import { AuthorListComponent } from './components/books/author-list/author-list.component';
import { AddBookComponent } from './components/books/add-book/add-book.component';
import { AddAuthorComponent } from './components/books/add-author/add-author.component';
import { EditBookComponent } from './components/main/modals/edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    FooterComponent,
    DashboardComponent,
    SettingsComponent,
    OwnedBooksComponent,
    BorrowedBooksComponent,
    AuthorListComponent,
    AddBookComponent,
    AddAuthorComponent,
    EditBookComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    UIRouterModule.forRoot(APP_STATES),
    SimpleModalModule,
    NgbModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    DatePipe, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
