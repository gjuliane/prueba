/**
 * Service to control the CRUD methods
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Person } from '../interfaces/person.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getPersons ():Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/persons`);
  }
  
  getPerson (id: string):Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/persons/${id}`);
  }
  
  createPerson (person: Person):Observable<Person> {
    return this.http.post<Person>(`${this.apiUrl}/persons`, person);
  }
  
  updatePerson (person: Person):Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/persons/${person.id}`, person);
  }

  deletePerson (person: Person):Observable<any> {
    return this.http.delete<Person>(`${this.apiUrl}/persons/${person.id}`);
  }
  
  existPerson (id: string):Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/persons`);
  }

}
