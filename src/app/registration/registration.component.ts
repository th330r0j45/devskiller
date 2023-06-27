import { Component, EventEmitter, OnInit, Output,inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RegistrationData } from '../model/registration-data';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { OriginsService } from '../origins.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Topic {
  name: string;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  @Output() public onRegister = new EventEmitter<RegistrationData>();
  // public registrationFormGroup: UntypedFormGroup;

  announcer = inject(LiveAnnouncer);
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  topics: Topic[] = [];
  origins: any;
  registrationFormGroup: FormGroup = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required,Validators.email]],
    origin:this.fb.group({
      originSelect:[null,[Validators.required]],
      originOther:['',[]],
      topics:[this.topics]
    })
  })
  show: boolean;
  constructor(
    private fb: FormBuilder,
    private originsService:OriginsService
  ) { }
  public ngOnInit() {
    this.getData()
  }
  getData(){
    this.origins = this.originsService.origins
  }

  onSelectionChange(event: any): void {
    const selectedOption = event.value;
    if (selectedOption == 'Other, specify') {
      this.show = true;
      this.registrationFormGroup.get('origin.originOther')?.setValidators([Validators.required]);
      this.registrationFormGroup.updateValueAndValidity();
    }else{
      this.show = false;
      this.registrationFormGroup.get('origin.originOther')?.clearValidators();
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our topic
    if (value) {
      this.topics.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(topic: any): void {
    const index = this.topics.indexOf(topic);

    if (index >= 0) {
      this.topics.splice(index, 1);

      this.announcer.announce(`Removed ${topic}`);
    }
  }

  edit(topic: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove topic if it no longer has a name
    if (!value) {
      this.remove(topic);
      return;
    }

    // Edit existing topic
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics[index].name = value;
    }
  }
  send(){
    let form = this.registrationFormGroup.value 
    this.onRegister.emit(form);
  }

}
