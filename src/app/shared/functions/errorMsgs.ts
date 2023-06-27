import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export function formErrors(form: FormGroup, control: string): boolean | undefined {
     const getControl: AbstractControl<any, any> = form.controls[control];
     return !getControl?.valid && (getControl?.touched || getControl?.dirty);
};
export function formErrorsGroup(form: FormGroup, formGroupName: string, field: string) {
     let control = form.get(formGroupName)?.get(field) as FormGroup;
     return !control?.valid && (control?.touched || control?.dirty);

}
export function formErrorsArray(form: FormGroup, formArrayName: string, index: number, field: string) {
     let control = form.get(formArrayName) as FormArray;

     return ((control.controls[index].get(field)?.touched ||
         control.controls[index].get(field)?.dirty)
         &&
         !control.controls[index].get(field)?.valid);
}
export function getErrorMsg(form: FormGroup, field: string): string | null {
     let message: string | null = null;
     const getControl = form.get(field);
     if (getControl) {
         if (getControl.hasError('required')) {
             if (field == "requestBeginDate") {
                 message = '*The start date is mandatory';
             }
             else if (field == "expirationBeginDate") {
                 message = '*The start date is mandatory';
             }
             else {
                 message = '*This field is required';
             }
         }
         if (getControl.hasError('minlength')) {
             let errorContent = getControl.getError('minlength');
             let nlen: number = errorContent.requiredLength;
             message = `*The field must have at least ${nlen} characters`;
         }
         if (getControl.hasError('maxlength')) {
             let errorContent = getControl.getError('maxlength');
             let nlen: number = errorContent.requiredLength;
             message = `*The field must have a maximum of ${nlen} characters`;
         }
         if (getControl.hasError('min')) {
             message = 'The value is below the minimum required value';
         }
         if (getControl.hasError('max')) {
             message = 'The value is above the maximum required value';
         }
         if (getControl.hasError('pattern')) {
             message = 'The field does not meet the valid criteria';
         }
         if (getControl.hasError('pattern') && getControl.hasError('email')) {
             message = '*The email must have a valid format';
         }
     }
     return message;
}
export function getErrorMsgGroup(form: FormGroup, formGroupName: string, field: string): string | null {
     let message: string | null = null;
     let group = form.get(formGroupName)?.get(field) as FormGroup;
     if (group) {
         if (group.hasError('required'))
             message = '*This field is required';
         else if (group.hasError('pattern'))
             message = '*The email must have a valid format';
         else if (group.hasError('minlength')) {
             let errorContent = group.getError('minlength');
             let nlen: number = errorContent.requiredLength;
             message = `The field must have at least ${nlen} characters`;
         }
         else if (group.hasError('maxlength')) {
             let errorContent = group.getError('maxlength');
             let nlen: number = errorContent.requiredLength;
             message = `The field must have a maximum of ${nlen} characters`;

         }
         else if (group.hasError('email')) {
             message = 'The email is not correct';
         }

     }

     return message;
}
export function getErrorMsgArray(form: FormGroup, formArrayName: string, index: number, field: string): string | null {
     let message: string | null = null;
     let array = form.get(formArrayName) as FormArray;
     if (array) {
         let control = array.controls[index].get(field);
         if (control) {
             if (control.hasError('required'))
                 message = '*This field is required';
             else if (control.hasError('pattern'))
                 message = '*The email must have a valid format';
             else if (control.hasError('minlength')) {
                 let errorContent = control.getError('minlength');
                 let nlen: number = errorContent.requiredLength;
                 message = `The field must have at least ${nlen} characters`;
             }
             else if (control.hasError('maxlength')) {
                 let errorContent = control.getError('maxlength');
                 let nlen: number = errorContent.requiredLength;
                 message = `The field must have a maximum of ${nlen} characters`;

             }
             else if (control.hasError('email')) {
                 message = 'The email is not correct';
             }

         }
     }

     return message;
}