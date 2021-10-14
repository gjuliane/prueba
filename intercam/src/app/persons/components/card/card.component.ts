import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Person } from '../../interfaces/person.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() person!:Person;
  @Output() OnDeletePerson: EventEmitter<Person> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  delete(event: any) {
    console.log("Emmit", event);
    this.OnDeletePerson.emit(this.person);
  }
}
