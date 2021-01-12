# Triage-UI
UI for Triage Class prediction

## Main Components
### User Input
Is a form for the user to input their prediction parameters.

See [HERE](./src/app/get-prediction/user-input) for details

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