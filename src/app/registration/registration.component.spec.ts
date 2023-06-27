import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OriginsService, OTHER_ORIGIN } from '../origins.service';
import { take } from 'rxjs/operators';
import { MatChipsModule } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule
      ],
      declarations: [RegistrationComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('first name field', () => {
    const fieldElement = () => fixture.debugElement.query(By.css('input[formControlName="firstName"]'));
    const fieldControl = () => component.registrationFormGroup.get('firstName');

    it('should be found by formControlName', () => {
      expect(fieldElement()).toBeTruthy();
    });

    it('should be marked as required in html', () => {
      expect(fieldElement().attributes.hasOwnProperty('required')).toBeTrue();
    });

    it('should have "required" error when empty', () => {
      const control = fieldControl();

      expect(control.getError('required')).toBeTruthy();

      control.setValue('John');
      expect(control.getError('required')).toBeFalsy();

      control.setValue('');
      expect(control.getError('required')).toBeTruthy();
    });
  });

  describe('last name field', () => {
    const fieldElement = () => fixture.debugElement.query(By.css('input[formControlName="lastName"]'));
    const fieldControl = () => component.registrationFormGroup.get('lastName');

    it('should be found by formControlName', () => {
      expect(fieldElement()).toBeTruthy();
    });

    it('should have "required" error when empty', () => {
      const control = fieldControl();

      expect(control.getError('required')).toBeTruthy();

      control.setValue('John');
      expect(control.getError('required')).toBeFalsy();

      control.setValue('');
      expect(control.getError('required')).toBeTruthy();
    });
  });

  describe('email field', () => {
    const fieldElement = () => fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const errorMessageElement = () => fixture.debugElement.query(By.css('#emailErrorMessage'));
    const fieldControl = () => component.registrationFormGroup.get('email');

    it('should be found by formControlName', () => {
      expect(fieldElement()).toBeTruthy();
    });

    it('should be marked as required in html', () => {
      expect(fieldElement().attributes.hasOwnProperty('required')).toBeTrue();
    });

    describe('when empty', () => {
      it('should have "required" error', () => {
        const control = fieldControl();

        expect(control.getError('required')).toBeTruthy();

        control.setValue('John');
        expect(control.getError('required')).toBeFalsy();

        control.setValue('');
        expect(control.getError('required')).toBeTruthy();
      });

      it('should display an error message', () => {
        const control = fieldControl();

        control.setValue('');
        control.markAsTouched();
        fixture.detectChanges();

        expect(errorMessageElement().nativeElement.innerText).toEqual('Please enter an email address');
      });
    });


    describe('when email address is not valid', () => {
      it('should have "email" error', () => {
        const control = fieldControl();

        control.setValue('an invalid email');
        expect(control.getError('email')).toBeTruthy();

        control.setValue('john@doe.com');
        expect(control.getError('email')).toBeFalsy();
      });

      it('should display an error message', () => {
        const control = fieldControl();

        control.setValue('a');
        control.markAsTouched();
        fixture.detectChanges();

        expect(errorMessageElement().nativeElement.innerText).toEqual('The email address is invalid');
      });
    });
  });

  describe('origin group', () => {
    const originSelectControl = () => component.registrationFormGroup.get('origin.originSelect');
    const originOriginGroupControl = () => component.registrationFormGroup.get('origin');

    describe('originSelect field', () => {
      const originSelectElement = () => fixture.debugElement.query(By.css('mat-select[formControlName="originSelect"]'));
      const openOriginSelect = () => originSelectElement().nativeElement.click();
      const closeOriginSelect = () => fixture.debugElement.query(By.css('form')).nativeElement.click();

      const hasOption = (searchedOption: string) => {
        openOriginSelect();
        fixture.detectChanges();
        const hasOption = !!fixture.debugElement.queryAll(By.css('mat-option'))
          .map(option => option.nativeElement.innerText)
          .find(option => option === searchedOption);
        closeOriginSelect();
        fixture.detectChanges();

        return hasOption;
      };

      it('should be found by formControlName', () => {
        expect(originSelectElement()).toBeTruthy();
      });

      it('should be marked as required in html', () => {
        expect(originSelectElement().attributes.hasOwnProperty('required')).toBeTrue();
      });

      it('should have "required" error when empty', () => {
        const groupControl = originOriginGroupControl();
        const control = originSelectControl();

        expect(groupControl.getError('required')).toBeTruthy();

        control.setValue('some place');
        expect(groupControl.getError('required')).toBeFalsy();

        control.setValue('');
        expect(groupControl.getError('required')).toBeTruthy();
      });

      it('should have options coming from service', (done) => {
        TestBed.inject(OriginsService).origins.pipe(take(1)).subscribe(origins => {
          origins.forEach(origin => expect(hasOption(origin)).toBeTrue());
          done();
        });
      });
    });

    describe('originOther field', () => {
      const fieldElement = () => fixture.debugElement.query(By.css('input[formControlName="originOther"]'));

      describe('when originSelect is set to other origin', () => {
        beforeEach(() => {
          originSelectControl().setValue(OTHER_ORIGIN);
          fixture.detectChanges();
        });

        it('should be found by formControlName', () => {
          expect(fieldElement()).toBeTruthy();
        });

        it('should be marked as required in html', () => {
          expect(fieldElement().attributes.hasOwnProperty('required')).toBeTrue();
        });
      });

      describe('when originSelect is NOT set to other origin', () => {
        it('should NOT be found by formControlName', () => {
          originSelectControl().setValue('some origin');
          fixture.detectChanges();
          expect(fieldElement()).toBeFalsy();
        });
      });
    });
  });

  describe('topics chips', () => {
    const topicsInputElement = () => fixture.debugElement.query(By.css('#topicsFormField input'));
    const addTopic = (topic) => {
      topicsInputElement().nativeElement.value = topic;
      const keyboardEvent = new KeyboardEvent('keydown', {keyCode: ENTER} as any);
      topicsInputElement().nativeElement.dispatchEvent(keyboardEvent);
      fixture.detectChanges();
    };

    it('should add topics', () => {
      addTopic('cars');
      addTopic('football');

      expect(component.registrationFormGroup.get('topics').value).toEqual(['cars', 'football']);
    });
  });

  describe('submit button', () => {
    const submitButton = () => fixture.debugElement.query(By.css('button'));

    const fillTheFormCorrectly = (originSelect: string = OTHER_ORIGIN) => component.registrationFormGroup.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      origin: {
        originSelect,
        originOther: 'my aunt Debbie',
      },
      topics: ['cars', 'football'],
    });

    it('should be enabled only if the form is valid', () => {
      expect(submitButton().attributes.hasOwnProperty('disabled')).toBeTrue();

      fillTheFormCorrectly();
      fixture.detectChanges();

      expect(submitButton().attributes.hasOwnProperty('disabled')).toBeFalse();
    });

    describe('when clicked, should emit an event containing', () => {
      const testField = (fieldName, expectedValue, done, originSelect?) => {
        fillTheFormCorrectly(originSelect);
        fixture.detectChanges();

        component.onRegister.pipe(take(1)).subscribe(formValue => {
          expect(formValue[fieldName]).toEqual(expectedValue);
          done();
        });

        submitButton().nativeElement.click();
        fixture.detectChanges();
      };

      it('firstName', (done) => {
        testField('firstName', 'John', done);
      });

      it('lastName', (done) => {
        testField('lastName', 'Doe', done);
      });

      it('email', (done) => {
        testField('email', 'john@doe.com', done);
      });

      it('origin set to originSelect value', (done) => {
        testField('origin', 'Facebook', done, 'Facebook');
      });

      it('topics', (done) => {
        testField('topics', ['cars', 'football'], done);
      });
    });
  });
});
