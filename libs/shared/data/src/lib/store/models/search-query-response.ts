export interface SearchQueryResponse {
  totalCount: number;
  queryCorrections: [{
    correctedQuery: string
  }];
  groupByResults: [];
}

export class SearchQueryResponse implements SearchQueryResponse {
  totalCount: number;
  queryCorrections: [{
    correctedQuery: string
  }];
  groupByResults: [];

  constructor() {
    this.totalCount = 0;
    this.queryCorrections = [{
        correctedQuery: ''
    }];
    this.groupByResults = [];
  }
}
