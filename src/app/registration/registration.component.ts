import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output,inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RegistrationData } from '../model/registration-data';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { OriginsService } from '../origins.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { formErrors, formErrorsArray, formErrorsGroup, getErrorMsg, getErrorMsgArray, getErrorMsgGroup } from '../shared/functions/errorMsgs';

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

  topics: Topic[] = [{name: 'Angular'}, {name: 'React'}, {name: 'VueJS'}];
  origins: any;
  registrationFormGroup: FormGroup = this.fb.group({
    firstName: [null, [Validators.required,Validators.pattern(/^\S*$/)]],
    lastName: [null,  [Validators.required,Validators.pattern(/^\S*$/)]],
    email: [null, [Validators.required,Validators.email]],
    origin:this.fb.group({
      originSelect:[null,[Validators.required]],
      originOther:['',[]],
      topics:[this.topics,[Validators.required]]
    })
  })
  show: boolean;
  constructor(
    private fb: FormBuilder,
    private originsService:OriginsService,
    private cd:ChangeDetectorRef
  ) { }
  public ngOnInit() {
    this.getData();
  }
  getData(){
    this.origins = this.originsService.origins;
  }

  onSelectionChange(event: any): void {
    let selectedOption = event.value;
    if (selectedOption == 'Other, specify') {
      this.show = true;
      this.registrationFormGroup.get('origin.originOther')?.setValidators([Validators.required,Validators.pattern(/^\S*$/)]);
      this.registrationFormGroup.updateValueAndValidity();
      this.cd.detectChanges();
    }else{
      this.show = false;
      this.registrationFormGroup.get('origin.originOther')?.clearValidators();
      this.registrationFormGroup.updateValueAndValidity();
      this.cd.detectChanges();
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
  errors(form: FormGroup, control: string) {
    return formErrors(form, control);
  }
  errorsGroup(form: FormGroup, formGroupName: string,  field: string): boolean | undefined {
    return formErrorsGroup(form,formGroupName,field)
  }
  errorsArray(form: FormGroup, formArrayName: string, index: number, field: string): boolean | undefined {
    return formErrorsArray(form,formArrayName,index,field)
  }
  errorMsg(form: FormGroup, control: string) {
    return getErrorMsg(form, control);
  }
  errorMsgGroup(form: FormGroup, formGroupName:string, field: string): string | null {
    return getErrorMsgGroup(form,formGroupName, field);
  }
  errorMsgArray(form: FormGroup, formArrayName: string, index: number, field: string): string | null {
    return getErrorMsgArray(form, formArrayName, index, field);
  }
}
