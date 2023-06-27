# Angular Reactive Registration Form

## Introduction

You are given an application that renders an empty Registration component. Your goal is to implement a registration form based on the Angular Material and the Angular Reactive Forms.

## Problem Statement

The form should consist of a few FormFields and a FormGroup with some constraints. The expected structure of the reactive form is:
* `firstName` FormControl,
   - should be a text input (matInput),
   - should be required,
* `lastName` FormControl,
   - should be a text input (matInput),
   - should be required,
* `email` FormControl,
   - should be a text input (matInput),
   - should be required,
   - should have Angular's email validator attached,
   - should display an error message inside of `<mat-error id="emailErrorMessage"></mat-error>`,
       - for an empty email display `Please enter the email address`
       - for a non-empty invalid email display `The email address is invalid`
* `origin` FormGroup,
   - `originSelect` FormControl,
       - should be a select input (mat-select),
       - should display a list of options coming from `OriginsService`'s `origin` observable,
   - `originOther` FormControl,
       - should be a text input (matInput),
       - should be hidden unless the user selects `OTHER_ORIGIN` value from the `originSelect` field (defined in the `origins.service.ts`),
   - the whole group should be required, meaning:
       - either the `originSelect`'s value is not empty and different from the `OTHER_ORIGIN`,
       - the `originSelect`'s value is `OTHER_ORIGIN` and `originOther` field is not empty.
 
* `topics` FormControl
   - should be a `mat-chip-list` with a text input for adding chips (representing users’ topics of interest),
   - should be wrapped in the `<mat-form-field id="topicsFormField">`,
   - writing text in the input and hitting ENTER should add a chip to the list,
   - each chip should have a `<mat-icon>` with a `matChipRemove` directive on it,
   - clicking the `<mat-icon>` should remove the chip from the list,
 
- Name the fields and groups exactly as specified above.
- All fields should use Angular Material and be wrapped in the `<mat-form-field></mat-form-field>`.
- The required fields should display an asterisk next to the field (do it via Angular Material's mechanism, do not add it manually).
- There should be a `Register` button at the bottom of the form that:
   - will be disabled if any of the fields/groups are invalid,
   - will submit the form.
- On submitting the form, the `RegistrationComponent` should emit an event named `onRegister` containing data from the form in the format defined by the `RegistrationData` interface,
   - the value of the `origin` field should be:
       - the value chosen in `originSelect` as long as it is different from `OTHER_ORIGIN`,
       - the value of `originOther` if the `originSelect`'s value is `OTHER_ORIGIN`,
   - the value of the `topics` field should be an array of typed in topics (strings).

When you implement that logic, tests from the `registration.component.spec.ts` suite should pass.

## Setup

Follow these steps if you are using zip/git mode (i.e. not available inside Devskiller in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests (this will be used to evaluate your solutions)
3. `npm run test:watch` – run all tests in _watch mode_ (alternative to `npm test` which you might find more convenient to use locally)
4. `npm start` – (optional) serve the application locally at [http://localhost:4200/](http://localhost:4200/) (it won't be used to evaluate your solutions)
5. `nvm install` - (optional) set up the expected _major_ version of Node.js locally ([`nvm`](https://github.com/nvm-sh/nvm) required; Node.js version defined in `.nvmrc` file)

This application was generated using [Angular CLI](https://angular.io/cli). It has all the standard setups.

**Good Luck!**
