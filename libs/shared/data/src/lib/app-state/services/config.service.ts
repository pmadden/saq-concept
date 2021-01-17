import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configKey = 'appSettings';
  changes$ = new BehaviorSubject(this.config);

  get config(): any {
    return JSON.parse(localStorage.getItem(this.configKey) as string);
  }

  set config(jsonValue: any) {
    localStorage.setItem(this.configKey, JSON.stringify(jsonValue));
    this.changes$.next(jsonValue);
  }
}
