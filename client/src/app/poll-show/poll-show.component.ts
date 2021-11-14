import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Poll } from '../models/poll';
import { OptionService } from '../services/option.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-poll-show',
  templateUrl: './poll-show.component.html',
  styleUrls: ['./poll-show.component.css']
})
export class PollShowComponent implements OnInit, OnDestroy {
  poll: Poll = new Poll();
  poll_id: string;
  subscription: Subscription;
  voted: boolean;
  chartType: string;
  chartData: any;
  chartOptions: any;

  constructor(
    private _pollService: PollService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _optionService: OptionService
  ) { }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => this.poll_id = params.id);
    this.getPoll();
    this.voted = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getPoll(){
    this._pollService.show(this.poll_id, poll => {
      this.poll = poll;
      this.preprareChartData();
    });
  }

  preprareChartData () {
    this.chartType = 'pie';
    let pollOptionsLabel = [];
    let pollOptionValues = [];
    for (let i in this.poll.options) {
      let option = this.poll.options[i];
      pollOptionsLabel.push(option.option);
      pollOptionValues.push(option.vote);
    }
    this.chartData = {
      labels: pollOptionsLabel,
      datasets: [
        {
          label: this.poll.question,
          data: pollOptionValues,
          backgroundColor: [
            'rgb(255,165,0)',
            'rgb(255,0,0)',
            'rgb(100,149,237)',
            'rgb(148,0,211)'
          ],
        }
      ]
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  update(option_id: string){
    this._optionService.update(option_id, (res) => {
      this.getPoll();
      this.voted = true;
    });
  }

}
