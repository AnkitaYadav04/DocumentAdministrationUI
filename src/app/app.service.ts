import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from "rxjs";
import {IGrid, IKeywords} from './Models/gird.model';

const API_URL='https://localhost:44319/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  searchFilter$: ReplaySubject<any> = new ReplaySubject();

  setSearchFilter(value: string) {
    this.searchFilter$.next(value);
  }

  constructor(private httpClient: HttpClient) {
  }

  getPosts(value: string): Observable<IGrid[]> {
    const url = `${API_URL}/Documents?filterKeyword=${value}`
    return this.httpClient.get<IGrid[]>(url);
  }

  getKeywordsByDocId(value: string): Observable<IGrid> {
    const url = `${API_URL}/Documents/${value}`
    return this.httpClient.get<IGrid>(url);
  }

  creteNewKeyword(data: any) {
    return this.httpClient.post(API_URL+'/Keywords', data);
  }

  deleteKeyword(keyId: string) {
    return this.httpClient.delete(`${API_URL}/Keywords/${keyId}`)
  }
}
