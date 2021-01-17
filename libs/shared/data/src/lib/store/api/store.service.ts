import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfig} from '../models/api-config';
import {catchError, tap} from 'rxjs/operators';
import {Product} from '../models/product';
import {SearchOptions} from '../models/search-options';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // URL to coveo web api
  private searchUrl = 'https://cloudplatform.coveo.com/rest/search';
  private authToken = '058c85fd-3c79-42a3-9236-b83d35588103';
  private apiConfig: ApiConfig = {
    enableDidYouMean: true,
    fieldsToInclude: [
      'systitle',
      'tpaccordsnommenu',
      'tpbouchon',
      'tpcategorie',
      'tpcepagesplitgroup',
      'tpcodesaq',
      'tpcodecup',
      'tpcompagniedescription',
      'tpcontenant',
      'tpcouleur',
      'tpdisponibilite',
      'tpenspecial',
      'tpformat',
      'tpparticularite',
      'tpparticularitesplitgroup',
      'tppastilledegout',
      'tppays',
      'tpprixintial',
      'tpprixnormal',
      'tpprixrabais',
      'tpproducteur',
      'tpregion',
      'tpsousregion',
      'tpthumbnailuri'],
    numberOfResults: 24,
    partialMatch: true,
    partialMatchKeyWords: 0,
    sortCriteria: 'relevancy'
  };

  constructor(private httpClient: HttpClient) {}

  private parseFilters(activeFilters: any[]): string {
    let aq = '';
    activeFilters.forEach(filter => {
      aq += '@' + filter.field + '==("' + filter.value + '") ';
    });
    return aq;
  }

  /** GET products from the server */
  public getProducts(searchOptions: SearchOptions): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      })
    };

    return this.httpClient.post<any[]>(this.searchUrl, {
      q: searchOptions.term,
      aq: this.parseFilters(searchOptions.activeFilters || []),
      enableDidYouMean: this.apiConfig.enableDidYouMean,
      fieldsToInclude: this.apiConfig.fieldsToInclude,
      firstResult: searchOptions.firstResult || 0,
      numberOfResults: this.apiConfig.numberOfResults,
      partialMatch: this.apiConfig.partialMatch,
      partialMatchKeyWords: this.apiConfig.partialMatchKeyWords,
      sortCriteria: searchOptions.sortCriteria || this.apiConfig.sortCriteria,
      groupBy: [
        {
          field: '@tppays',
          maximumNumberOfValues: 120,
          sortCriteria: 'alphaascending'
        },
        {
          field: '@tpregion',
          maximumNumberOfValues: 500,
          sortCriteria: 'alphaascending'
        },
        {
          field: '@tpenspecial',
          maximumNumberOfValues: 2,
          sortCriteria: 'occurences'
        },
        {
          field: '@tpdisponibilite',
          maximumNumberOfValues: 4,
          sortCriteria: 'occurences'
        },
        {
          field: '@tpcategorie',
          maximumNumberOfValues: 500,
          sortCriteria: 'alphaascending'
        },
        {
          field: '@tpparticularitesplitgroup',
          maximumNumberOfValues: 100,
          sortCriteria: 'alphaascending'
        },
        {
          field: '@tppastilledegout',
          maximumNumberOfValues: 40,
          sortCriteria: 'alphaascending'
        },
        {
          field: '@tpmillesime',
          maximumNumberOfValues: 100,
          sortCriteria: 'alphaascending'
        }
      ]
    }, httpOptions).pipe(
      tap(_ => this.log(`fetched Products term=${searchOptions.term}`)),
      catchError(this.handleError<Product[]>(`getProducts term=${searchOptions.term}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AppointmentService message */
  private log(message: string): void {
    // TODO
    console.log(message);
  }
}
