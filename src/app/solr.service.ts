import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SolrService {
  private ip = '52.207.105.14';
  private u = 'd0tLUx34Y_Ap1+f04Y0U!';
  private p = 'UW6vZpgkpPkR%[{K[ck7FP-xb5';
  private querypipeline = "iLux1-default"
  private collection = "iLux1"
  constructor( private _http : Http) {
      console.log('Solr Services Are Ready');
  }
  searchSolr(query:string, rows:number, offset:number){
        let solr_URL: string = 'http://' + this.ip + ':8764/api/apollo/query-pipelines/' + this.querypipeline + '/collections/' + this.collection + '/select?q=' + query + '&rows=' + rows + '&start=' + offset + '&wt=json';
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.u + ":" + this.p)); 
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let options = new RequestOptions({headers: headers});
        
        return this._http.get(solr_URL, options)
        .map(res => res.json());
  }

}
