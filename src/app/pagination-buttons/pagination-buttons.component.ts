import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css']
})
export class PaginationButtonsComponent implements OnInit {
  
  @Input() page: number;
  @Input() searchQuery: string;
  @Input() numPages: number;
  adjacent: number = 6;

  repeat = Array;

  constructor(private _router: Router) { 

  }
  ngOnInit() {
    if(this.page == 0){

    }
  }
  paginateToPage(page:number){
    this._router.navigate(['/search'], { queryParams: {q:this.searchQuery, page:page} })
  }
  paginateNext(){
     // check this against total 
    let nextPage:number = this.page + 1;
    this._router.navigate(['/search'], { queryParams: {q:this.searchQuery, page:nextPage} })
    
  }
  paginatePrev(){
    if(this.page > 0){
      this._router.navigate(['/search'], { queryParams: {q:this.searchQuery, page:this.page - 1} })
    }
  }
  
  
}
