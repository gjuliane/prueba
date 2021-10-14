import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../interfaces/person.interface';
import { PersonsService } from '../services/persons.service';
import { pluck, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  // Initializing the reactive form
  myFormPerson: FormGroup = this.fb.group(
    {
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'firstName': ['', [Validators.required, Validators.minLength(2)]],
      'lastName': ['', [Validators.required]],
      'rfc': ['', [Validators.required, Validators.minLength(2)]],
      'gender': ['', [Validators.required]],
    }
  );

  // Labels
  public labelStatus: string = '';
  public labelButton: string = 'Guardar';
  
  // Default person
  _person: Person = {
    name: '',
    firstName: '',
    lastName: '',
    rfc: '',
    gender: ''
  }

  // Error labels
  labelErrors = {
    'name': '',
    'firstName': '',
    'lastName': '',
    'rfc': '',
    'gender': ''
  }

  constructor(
    private fb: FormBuilder, // FormBuilder to control the form as reactive
    private personsService: PersonsService, // Injectin service to connect with api
    private activatedRoute: ActivatedRoute, // To catch the id for edition
    private router: Router // To catch the current url
  ) { }

  ngOnInit(): void {
    // If the route has edit 
    if (this.router.url.includes('edit')){
      this.activatedRoute.params.pipe(
        pluck('id'), // Extracting the id
        switchMap(id => this.personsService.getPerson(id)) // Getting the person with the id
      )
      .subscribe(
        (person) => {
          // console.log(person);
          this._person = person;
          this.myFormPerson.reset(person); // Setting the form with edition values
          this.labelButton = "Actualizar"; // Changing the label of button submit
        }
      );
    }

    // Setting the values of form at the beginig
    // this.myFormPerson.reset(
      // {
      //   name: 'Luis',
      //   firstName: 'Flores',
      //   lastName: 'Colorado',
      //   rfc: 'LUIS123',
      //   // gender: 'm'
      // }
    // );

    // To reset the form to blank values when the form change
    this.myFormPerson.valueChanges
    .subscribe( (_) => {
      console.log('Form Changed');
      this.labelStatus = '';
    });

  }

  /**
   * // Error labels for all fields of form
   * 
   * @param field the name of field
   * @returns void
   */
  fieldNotValid(field: string): boolean | null {
    let errors = this.myFormPerson.controls[field].errors;

    if (errors == null) {
      const tempErrors = {[field]: ''};
      this.labelErrors = {...this.labelErrors, ...tempErrors};
    }else if (errors?.hasOwnProperty('required') ) {
      const tempErrors = {[field]: 'Campo requerido'};
      this.labelErrors = {...this.labelErrors, ...tempErrors};
    }else if (errors?.hasOwnProperty('minlength') ) {
      let tempErrors = {[field]: `Debe terner al menos ${errors.minlength.requiredLength}`};
      this.labelErrors = {...this.labelErrors, ...tempErrors};
    }

    return this.myFormPerson.controls[field].errors
      && this.myFormPerson.controls[field].touched;
  }

  /**
   * Save or update the person
   * 
   * @returns 
   */
  save() {
    console.log("Saving");
    if( this.myFormPerson.invalid ){
      this.myFormPerson.markAllAsTouched();
      return;
    }
    
    // Constructing person payload
    const payload: Person = {
      name: this.myFormPerson.get('name')?.value,
      firstName: this.myFormPerson.get('firstName')?.value,
      lastName: this.myFormPerson.get('lastName')?.value,
      rfc: this.myFormPerson.get('rfc')?.value,
      gender: this.myFormPerson.get('gender')?.value
    }
    console.log("Paylod", payload);
    
    if ( this._person.hasOwnProperty('id') ) { // If has id then update
      console.log(this._person);
       this._person
      this.updatePerson({...this._person, ...payload});
    } else { // if not then save
      this.createPerson(payload);
    }

    // Blankin the form
    this.myFormPerson.reset();
  }

  /**
   * Fuction to save
   * @param payload 
   */
  createPerson(payload: Person){
    this.personsService.createPerson(payload)
      .subscribe( (result) => {
        this.labelStatus = 'Registro guadardo con éxito';
      });
  }

  /**
   * Function to update
   * 
   * @param payload
   */
  updatePerson(payload: Person) {
    this.personsService.updatePerson(payload)
      .subscribe( (result) => {
        this.labelStatus = 'Registro actualizado con éxito';
      });

    this.router.navigate(['/persons/list']);
  }


}
