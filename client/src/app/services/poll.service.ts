import { Inject, Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Poll } from "../models/poll";
import { NewPoll } from "../new-poll";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class PollService {
  url: string;

  constructor(
    private _http: Http,
    @Inject(DOCUMENT) private document: Document
  ) {
    let host = document.location.hostname;
    this.url = "";
    if (host === "localhost") {
      this.url = "http://" + document.location.hostname + ":8000";
    }
  }

  list(cb) {
    this._http.get(this.url + "/polls").subscribe(
      (res) => cb(res.json()),
      (err) => console.log(err)
    );
  }

  create(newPoll: NewPoll, cb) {
    this._http.post(this.url + "/polls", newPoll).subscribe(
      (res) => cb(res.json()),
      (err) => console.log(err)
    );
  }

  show(id: string, cb) {
    this._http.get(this.url + `/polls/${id}`).subscribe(
      (res) => cb(res.json()),
      (err) => console.log(err)
    );
  }

  destroy(id: string, cb) {
    this._http.delete(`/polls/${id}`).subscribe(
      (res) => cb(res.json()),
      (err) => console.log(err)
    );
  }
}
