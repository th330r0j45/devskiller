import { Component } from '@angular/core';
import { RegistrationData } from './model/registration-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public registrationData: RegistrationData;

  public onRegister(registrationData) {
    this.registrationData = registrationData;
    console.log('Registering user with data', registrationData);
  }
}
