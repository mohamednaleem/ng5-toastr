/**
 * Created by dereks on 8/24/16.
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ToastModule, ToastOptions} from 'ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomOption} from './custom-option';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ToastModule.forRoot()],
  declarations: [AppComponent],
  providers: [
    {provide: ToastOptions, useClass: CustomOption},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
