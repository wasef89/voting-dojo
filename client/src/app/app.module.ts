import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollNewComponent } from './poll-new/poll-new.component';
import { PollShowComponent } from './poll-show/poll-show.component';

import { PollService } from './services/poll.service';
import { OptionService } from './services/option.service';
import { ChartModule } from 'angular2-chartjs';



@NgModule({
  declarations: [
    AppComponent,
    PollListComponent,
    PollNewComponent,
    PollShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [
    PollService,
    OptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
