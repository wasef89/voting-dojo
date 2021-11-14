import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollNewComponent } from './poll-new/poll-new.component';
import { PollShowComponent } from './poll-show/poll-show.component';

const routes: Routes = [
  {
    path: "",
    component: PollListComponent
  },
  {
    path: "new",
    component: PollNewComponent
  },
  {
    path: 'poll/:id',
    component: PollShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
