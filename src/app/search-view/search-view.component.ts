import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SolrService } from '../solr.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  
  private subscription;
  searching:boolean = false; // is searching?

  searchQuery :string = ''; // whats searched
  numFound: number; // how many results
  results :any; // Json
  page:number = 1;
  rowsToDisplay:number = 10;
  numPages:number = 0;
  offset:number = 0;
  documents:any[];
  responseTime:any;
  

  constructor(private _solrService: SolrService, public _route: ActivatedRoute, private _router: Router){}
  ngOnInit() {
    // produce result on page load
    this._route.queryParams.subscribe(params => {
      if (params['q']) {
          var startTime = new Date();

          this.searchQuery = params['q'];
          if (params['page']) { // pagination
            this.page = parseInt(params['page']);
            this.offset = (this.page - 1) * this.rowsToDisplay; // 1 based pagination
            if(this.offset!=0){this.offset++;}
          }
          this.subscription = this._solrService.searchSolr(this.searchQuery, this.rowsToDisplay, this.offset).subscribe(results =>{
            this.results = results.response;
            this.numFound = results.response.numFound;
            this.numPages = Math.ceil(this.numFound / this.rowsToDisplay);
            this.documents = this.results.docs;
            console.log(this.results); // debug
          });

      var endTime = new Date();
      this.responseTime = Math.abs(startTime.getTime() - endTime.getTime()); 
    }
    });
  }
  searchApi(){
      if(this.searchQuery != ''){
        this._router.navigate(['/search'], { queryParams: {q:this.searchQuery} }) 
      }
  }
  isSearching(){
    if(this.searchQuery != ''){
        this.searching = true;
    }
    return this.searching;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
