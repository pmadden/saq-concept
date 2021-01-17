import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {
  ConfigService,
  GoogleAnalyticsService,
  LoadingService,
  Product,
  SearchOptions,
  SearchQueryResponse,
  StoreService
} from '@saq/shared/data';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProductInfoDialogComponent} from '../../components/product-info-dialog/product-info-dialog.component';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';

const FilterFields = new Map<string, string>([
  ['tppays', 'Pays'],
  ['tpregion', 'Région'],
  ['tpenspecial', 'En Spécial'],
  ['tpdisponibilite', 'Disponibilité'],
  ['tpcategorie', 'Catégorie'],
  ['tppastilledegout', 'Pastille de goût'],
  ['tpparticularitesplitgroup', 'Particularité'],
  ['tpmillesime', 'Millésime']
]);

@Component({
  selector: 'saq-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit, OnDestroy, AfterViewInit {
  private loadingSubscription: Subscription | undefined;
  private paramMapSubscription: Subscription | undefined;
  searchResults: Product[] = new Array<Product>();
  searchQueryResponse: SearchQueryResponse;
  groupByResults: any | undefined = [];
  defaultResultsLayout = 'results-grid';
  selectedProduct: Product;
  filterFields: Map<string, string>;
  numberOfResultsDisplayed = 0;
  searchOptions: SearchOptions;
  isLoading = false;
  configKey = 'appSettings';
  config = {
    viewFilters: true,
    viewWidescreen: false
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private httpClient: HttpClient,
              private storeService: StoreService,
              private configService: ConfigService,
              private loadingService: LoadingService,
              private analyticsService: GoogleAnalyticsService,
              public dialog: MatDialog) {
    this.filterFields = FilterFields;
    configService.changes$.subscribe((val) => {
      this.config = this.configService.config;
    });

    this.selectedProduct = new Product();
    this.searchQueryResponse = new SearchQueryResponse();

    this.searchOptions = {
      term: '',
      sortCriteria: 'relevancy',
      activeFilters: [],
      numberOfResults: 0,
      firstResult: 0
    };
  }

  ngOnInit(): void {
    this.searchOptions.term = this.route.snapshot.paramMap.get('term') || '';

    // Subscribe to changes in the search term
    this.paramMapSubscription = this.route.paramMap.pipe(delay(10)).subscribe(
      (params: ParamMap) => {
        this.searchOptions.term = params.get('term') || '';
        this.searchOptions.activeFilters = [];
        this.searchOptions.firstResult = 0;
        this.getProducts(this.searchOptions);
      }
    );
  }

  ngAfterViewInit(): void {
    this.loadingSubscription = this.loadingService.loading$.pipe().subscribe(
      (status: boolean) => {
        this.isLoading = status;
      }
    );
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '56rem';
    dialogConfig.height = '36rem';
    dialogConfig.data = {
      product: this.selectedProduct
    };

    const dialogRef = this.dialog.open(ProductInfoDialogComponent, dialogConfig);
    this.analyticsService.trackEvent('product_view', {
      codeSAQ: this.selectedProduct?.raw.tpcodesaq,
      title: this.selectedProduct?.raw.systitle
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  getQueryCorrection(): string {
    if (this.searchQueryResponse && this.searchQueryResponse.queryCorrections) {
      if (this.searchQueryResponse.queryCorrections.length) {
        return this.searchQueryResponse.queryCorrections[0].correctedQuery;
      }
    }
    return '';
  }

  getProducts(searchOptions: SearchOptions): boolean {
    this.loadingService.startLoading();
    if (searchOptions.term) {
      this.storeService.getProducts(searchOptions).subscribe((searchQueryResponse: any) => {
        this.searchQueryResponse = searchQueryResponse;

        if (searchQueryResponse.totalCount === 0) {
          this.setTitle('SAQ - Recherche | Aucun Résultat | ' + searchOptions.term);
        }
        else {
          this.setTitle('SAQ - Recherche | ' + searchOptions.term);
        }

        // If we're retrieving 'more' results then append to existing result set.
        if (this.searchOptions.firstResult > 0) {
          this.searchResults = this.searchResults?.concat(searchQueryResponse.results);
        }
        // If we're not fetching more results then return the scroll position to the top of the page.
        else {
          this.searchResults = searchQueryResponse?.results;
          window.scrollTo(0, 0);
        }

        this.groupByResults = this.searchQueryResponse?.groupByResults;
        // For each Facet group set to 'expanded' if a filter is applied within the group
        this.groupByResults.forEach((facet: { expanded: boolean; field: string; }) =>
          {
            facet.expanded = this.isFacetFieldApplied(facet.field);
          });
        // console.log('sqr', this.searchQueryResponse);

        this.loadingService.stopLoading();
      });
    } else {
      this.setTitle('SAQ - Recherche');
      this.searchQueryResponse = new SearchQueryResponse();
      this.searchResults = [];
      this.loadingService.stopLoading();
    }

    return true;
  }

  setSelectedProduct(product: any): void {
    this.selectedProduct = product || undefined;
  }

  sortByRelevancy(): void {
    this.searchOptions.sortCriteria = 'relevancy';
    this.analyticsService.trackEvent('search_sort', { criteria: 'relevancy'});
    this.searchOptions.firstResult = 0;
    this.getProducts(this.searchOptions);
  }

  toggleSortByPrice(): void {
    if (this.searchOptions.sortCriteria === '@tpprixnum ascending') {
      this.searchOptions.sortCriteria = '@tpprixnum descending';
      this.analyticsService.trackEvent('search_sort', { criteria: 'price', order: 'descending'});
    }
    else {
      this.searchOptions.sortCriteria = '@tpprixnum ascending';
      this.analyticsService.trackEvent('search_sort', { criteria: 'price', order: 'ascending'});
    }
    this.searchOptions.firstResult = 0;
    this.getProducts(this.searchOptions);

  }

  toggleFacet(id: number): void {
    this.groupByResults[id].expanded = !this.groupByResults[id].expanded;
  }

  applyFacetFilter(facetField: string, facetValue: string): void {
    if (!this.isFacetFilterApplied(facetField, facetValue)) {
      this.analyticsService.trackEvent('filter_add', {
        facet_field: facetField,
        facet_value: facetValue
      });
      this.searchOptions.activeFilters.push({ field: facetField, value: facetValue });
      this.searchOptions.firstResult = 0;
      this.getProducts(this.searchOptions);
    }
  }

  removeFacetFilter(facetField: string, facetValue: string): void {
    this.analyticsService.trackEvent('filter_remove', {
      facet_field: facetField,
      facet_value: facetValue
    });
    this.searchOptions.activeFilters = this.searchOptions.activeFilters.filter(
        (facet: { field: string; value: string; }) => facet.field !== facetField && facet.value !== facetValue);
    this.searchOptions.firstResult = 0;
    this.getProducts(this.searchOptions);
  }

  isFacetFilterApplied(facetField: string, facetValue: string): boolean {
    return this.searchOptions.activeFilters.some(facet => facet.field === facetField && facet.value === facetValue);
  }

  isFacetFieldApplied(facetField: string): boolean {
    return this.searchOptions.activeFilters.some(facet => facet.field === facetField);
  }

  retrieveMoreProducts(): void {
    this.analyticsService.trackEvent('search_more', {
      first_result: this.searchResults?.length,
    });
    this.searchOptions.firstResult = this.searchResults?.length || 0;
    this.getProducts(this.searchOptions);
  }

  clearALlFacetFilters(): void {
    this.analyticsService.trackEvent('clear_filters', {
      num_of_filters_cleared: this.searchOptions.activeFilters.length,
    });
    this.searchOptions.activeFilters = [];
    this.searchOptions.firstResult = 0;
    this.getProducts(this.searchOptions);
  }
}
