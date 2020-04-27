import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function getSteps() {
  return ['signin', 'review', 'complete'];
}

export default function CardStepper(props) {
//   const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();
  
  return (
    <div className='cart_stteper'>
      <span>FundooNotes</span>
      <Stepper activeStep={props.cartStepper} >
        {steps.map((label,index) => (
          <Step key={label}>
            <StepLabel>
                <div>{props.cartStepper === index?<ShoppingCartIcon fontSize='large' color='primary'/>:null}</div>
                <div>{label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <div>
        {activeStep === steps.length ? (
          <div>
            <Typography >All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography >{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}