# Triage-UI
UI for Triage Class prediction

## Running locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Main Components
### User Input
Is a form for the user to input their prediction parameters.

See [the component source code](src/app/get-prediction/user-input/get-prediction-user-input.component.ts) for details

Inputs:
- prediction date range
- each interval time boundary
- confidence level
- each triage classes: window, min processing rate, time unit

### Prediction Results

Displays the prediction results.
This component displays the prediction results of the API
This displays the expected slot of each triage class for each prediction time interval.
Also displays the statistical significance and standard deviation

See [the component source code](src/app/get-prediction/prediction-results/prediction-results.component.ts) for details