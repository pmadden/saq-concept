import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {LoadingService} from '@saq/shared/data';
import {Subscription} from 'rxjs';

@Component({
  selector: 'saq-omnibox',
  templateUrl: './omnibox.component.html',
  styleUrls: ['./omnibox.component.scss']
})
export class OmniboxComponent implements OnInit, OnDestroy {
  private loadingSubscription: Subscription | undefined;
  private subscription: Subscription | undefined;
  private child: any;
  searchBox: FormControl;
  searchTerm: string | undefined;
  isLoading = false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private loadingService: LoadingService,
               private changeRef: ChangeDetectorRef) {
    this.searchBox = new FormControl();
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && this.child !== this.route.firstChild) {
        if (this.subscription) { this.subscription.unsubscribe(); }
        this.child = this.route.firstChild;
        this.subscription = this.route.firstChild?.paramMap.subscribe(
          (params: ParamMap) => {
            this.searchTerm = params.get('term') || '';
            this.changeRef.markForCheck();
          }
        );
      }
    });

    this.searchBox.valueChanges.pipe(
      debounceTime(200)
    ).subscribe( term => {
      if (term === '') {
        this.router.navigateByUrl('' );
      }
      else {
        this.router.navigateByUrl('/search/' + term );
      }
    });

    this.loadingSubscription = this.loadingService.loading$.pipe().subscribe(
      (status: boolean) => {
        this.isLoading = status;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
    console.log('ngOnDestroy() called.');
  }
}
