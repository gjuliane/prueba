import { Component, OnInit } from '@angular/core';
import { Person } from '../interfaces/person.interface';
import { PersonsService } from '../services/persons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  _persons: Person[] = [];

  get persons(): Person[] {
    return this._persons;
  }
  
  constructor(
    private personsService: PersonsService
  ) { }
    
  ngOnInit(): void {
    this.personsService.getPersons()
      .subscribe( persons => this._persons = persons);
  }

  delete(person: Person, index: number) {
    console.log("from Emmit", person);
    this.personsService.deletePerson(person)
    .subscribe((_) => {
      console.log('Persona Borrada...');
      this._persons.splice(index,1);
    });
  }

}
