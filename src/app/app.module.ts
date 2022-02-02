import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { PomodoroCardComponent } from './pages/pomodoro-card/pomodoro-card.component';
// import { CollapsableEditingComponent } from './pages/collapsable-editing/collapsable-editing.component';
import { TimerComponent } from './pages/timer/timer.component';

import { TimerSettingComponent } from './pages/timer-setting/timer-setting.component';
import { TimerPipe } from './pages/timer/timer-pipe.pipe';
import { TimePipe } from './pages/main-layout/time-pipe.pipe';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './pages/login/login.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PomodoroCardComponent,
    // CollapsableEditingComponent,
    TimerComponent,
    TimerSettingComponent,
    TimerPipe,
    TimePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
