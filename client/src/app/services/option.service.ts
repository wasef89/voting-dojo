import { Inject, Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class OptionService {
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

  update(id: string, cb) {
    this._http.put(this.url + `/options/${id}`, {}).subscribe(
      (res) => cb(res.json()),
      (err) => console.log(err)
    );
  }
}
