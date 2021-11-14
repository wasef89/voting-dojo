import {Component, OnInit} from '@angular/core';
import {NewPoll} from '../new-poll';
import {PollService} from '../services/poll.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-poll-new',
  templateUrl: './poll-new.component.html',
  styleUrls: ['./poll-new.component.css']
})
export class PollNewComponent implements OnInit {

  newPoll: NewPoll = new NewPoll();
  errors: string[] = [];

  constructor(
    private _pollService: PollService,
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  createPoll() {
    this._pollService.create(this.newPoll, (poll) => {
      if (poll.errors) {
        for (let key of Object.keys(poll.errors)) {
          let error = poll.errors[key];
          this.errors.push(error.message);
        }
      } else {
        this._router.navigateByUrl('');
      }
    });
  }

}
