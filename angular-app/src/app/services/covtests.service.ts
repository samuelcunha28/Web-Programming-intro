import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Covtest } from '../models/covtest';



const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class CovtestsService {

  constructor(public http: HttpClient) { }

  getTests(): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${API_URL}/covtests/testList`, httpOptions)
  }

  getUserTests(id: string): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${API_URL}/covtests/listTest/${id}`, httpOptions)
  }

  countTotalTests(): Observable<any> {
    return this.http.get(`${API_URL}/covtests/count`, httpOptions)
  }

  countDayTests(date: Date): Observable<any> {
    return this.http.get(`${API_URL}/covtests/schedCount/${date}`, httpOptions)
  }

  countTotalInfected(): Observable<any> {
    return this.http.get(`${API_URL}/users/infected`, httpOptions)
  }

  updateTestStatus(testStatus: string, id: string): Observable<Covtest> {
    return this.http.put<Covtest>(`${API_URL}/covtests/update/testStatus/${id}`, testStatus, httpOptions);
  }

  updateUserTestStatus(UserTestStatus: string, id: string): Observable<Covtest> {
    return this.http.put<Covtest>(`${API_URL}/covtests/update/testUserStatus/${id}`, UserTestStatus, httpOptions);
  }

  updateTestResult(testResult: string, id: string): Observable<Covtest> {
    return this.http.put<Covtest>(`${API_URL}/covtests/update/testResult/${id}`, testResult, httpOptions);
  }

  uploadFile(fileToUpload: File, id: string): Observable<Covtest> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.put<Covtest>(`${API_URL}/covtests/upload/${id}`, formData, httpOptions)
  }

  downloadFile(id: string): Observable<File> {
    return this.http.get<File>(`${API_URL}/covtests/download/${id}`, httpOptions)
  }

  listPending(): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${API_URL}/covtests/pending`, httpOptions)
  }

  listNegative(): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${API_URL}/covtests/negative`, httpOptions)
  }

  listPositive(): Observable<Covtest[]> {
    return this.http.get<Covtest[]>(`${API_URL}/covtests/positive`, httpOptions)
  }

  scheduleTest(schedule: string, id: string): Observable<Covtest> {
    return this.http.put<Covtest>(`${API_URL}/covtests/schedule/${id}`, schedule, httpOptions)
  }

  nTestPerExtID(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/covtests/nTestsPerson/${id}`, httpOptions)
  }
}
