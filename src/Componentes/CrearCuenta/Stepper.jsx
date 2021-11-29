import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormularioCuenta from './FormularioCuenta';
import DatosUsuarios from './DatosUsuarios';
import ConfirmarDatos from './ConfirmarDatos';
const steps = [
{paso:'Datos personales'},
{paso:'Datos Usuarios'},
{paso:'Confirmar Datos'}
];
export default function HorizontalLinearStepper() {
   const [data, setData] = useState({
    email: '',
    nombres:'',
    apellido_paterno:'', 
    apellido_materno:'',
    rut:'', 
    name:'',
    password:'',
    password_confirmation:''

   })
  const [showPassword, setshowPassword] = useState(false)
  const [showPasswordConfirm, setshowPasswordConfirm] = useState(false)
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const changeState=(newData) => {
    setData({...data,...newData})
  }
  const handleClickShowPassword = () => {
    setshowPassword(current=> !current);
  };
  const handleClickShowPasswordConfirm = () => {
    setshowPasswordConfirm(current=> !current);
  };
const ChooseStep=[
<FormularioCuenta data={data}  changeState={changeState}   handleBack={handleBack} activeStep={activeStep} steps={steps}  handleNext={handleNext} />,
<DatosUsuarios 
    data={data} 
    changeState={changeState} 
    showPassword={showPassword}  
    handleClickShowPassword={handleClickShowPassword} 
    showPasswordConfirm={showPasswordConfirm}  
    handleClickShowPasswordConfirm={handleClickShowPasswordConfirm} 
    handleBack={handleBack}
    activeStep={activeStep} 
    steps={steps}  
    handleNext={handleNext}/>,
<ConfirmarDatos data={data} handleBack={handleBack}  showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} activeStep={activeStep} steps={steps}  handleNext={handleNext}/>
]
 

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label.paso}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {ChooseStep[activeStep]}
      
  
    </Box>
  );
}
