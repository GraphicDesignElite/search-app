import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchViewComponent } from './search-view/search-view.component';

import { SolrService } from './solr.service';

import { AppRouting } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component';

import {Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  declarations: [
    AppComponent,
    SearchViewComponent,
    PageNotFoundComponent,
    PaginationButtonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    Ng2PaginationModule 
    
  ],
  providers: [SolrService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
