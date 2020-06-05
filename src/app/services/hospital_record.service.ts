import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {HospitalRecord} from '../models/hospital_record';
import {HOSPITAL_RECORDS} from '../models/hospital_records';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  hospitalRecords: HospitalRecord[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(hospitalRecords: HospitalRecord[], column: string, ): HospitalRecord[] {
    return hospitalRecords;
}

function matches(hospitalRecord: HospitalRecord, term: string, pipe: PipeTransform) {
  return hospitalRecord.hospitalRegistration.name.toLowerCase().includes(term)
    || pipe.transform(hospitalRecord.hospitalRegistration.addressDetails).includes(term)
    || pipe.transform(hospitalRecord.itemName).includes(term);
}

@Injectable({providedIn: 'root'})
export class HospitalRecordService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _hospitalRecords$ = new BehaviorSubject<HospitalRecord[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._hospitalRecords$.next(result.hospitalRecords);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get hospitalRecords$() { return this._hospitalRecords$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let hospitalRecords = sort(HOSPITAL_RECORDS, sortColumn);

    // 2. filter
    hospitalRecords = hospitalRecords.filter(hospitalRecord => matches(hospitalRecord, searchTerm, this.pipe));
    const total = hospitalRecords.length;

    // 3. paginate
    hospitalRecords = hospitalRecords.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({hospitalRecords, total});
  }
}