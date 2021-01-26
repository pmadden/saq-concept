# SaqConcept

A conceptual application to search and view SAQ products based upon an implementation of Coveo's REST API.

See a live demo at [angry.ninja](https://angry.ninja)

Developed for modern web browsers, built with Angular 11 and hosted on AWS Amplify.

## Features
* Suggested product searches on the home page.
* Toggle the filter list that is displayed in the search result view. Setting is saved to localstorage.
* Toggle widescreen mode to see more products in search result view. Setting is saved to localstorage.
* Filter by various facets. View and remove applied filters.
* Popup product box shows additional details of each product.
* Sort search results by Relevancy or Price (Asc/Desc)
* Search as you type (200ms delay)
* User interactions and custom events are tracked via Google Analytics.

## Development

The code is structured as you might for a monorepo with a minimal shell for the store application. Data related functionality is placed in a shared 'data' library. App specific 'store' libraries such as the store home page, search results and product pages contain code specifically for the store app. Some of these libraries could be shared if the same functionality was required in other applications. 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
