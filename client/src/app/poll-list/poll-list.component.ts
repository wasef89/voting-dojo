import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll';
import * as moment from 'moment';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  polls: Poll[];
  topPolls: Poll[];

  constructor(
    private _router: Router,
    private _pollService: PollService
  ) { }

  ngOnInit() {
    this.getPolls();
  }

  destroyPoll(id: string){
    this._pollService.destroy(id, (res) => {
      if(res.status === true){
        this.getPolls();
      }
    });
  }

  getPolls(){
    this._pollService.list((polls) => {
      this.polls = polls;
      const pollsVotCounts = [];
      for (const i in polls) {
        pollsVotCounts[i] = {};
        pollsVotCounts[i].count = 0;
        pollsVotCounts[i].poll = polls[i];
        for (const j in polls[i].options) {
          pollsVotCounts[i].count += polls[i].options[j].vote;
        }
      }

      pollsVotCounts.sort(function (a, b) {
        return b.count - a.count;
      });
      this.topPolls= [];
      pollsVotCounts[0] && this.topPolls.push(pollsVotCounts[0].poll);
      pollsVotCounts[0] && this.topPolls.push(pollsVotCounts[1].poll);
      pollsVotCounts[0] && this.topPolls.push(pollsVotCounts[2].poll);


      console.log(this.topPolls);
    });
  }

  getRelativeTime (currentTime:string) {
    let date = new Date(currentTime);
    return moment(date).startOf("minute").fromNow();
  }

}
