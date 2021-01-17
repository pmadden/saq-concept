export interface ApiConfig {
  enableDidYouMean: boolean;
  fieldsToInclude: string[];
  numberOfResults: number;
  partialMatch: boolean;
  partialMatchKeyWords: number;
  sortCriteria: string;
}
