import React from 'react'
import { TextField,Grid,Box,Button,IconButton} from '@mui/material'
import {makeStyles} from '@mui/styles'
import { useFormik } from 'formik'
import * as yup from "yup";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


const estilos=makeStyles((theme) => ({
    margenTextfield:{
    marginTop:'16px !important'}
}))
const stepTwoValidationSchema= yup.object({
  name: yup
  .string()
  .required('Ingrese Usuario'),
  email: yup
  .string()
  .required('Ingrese email'),
  password: yup
  .string()
  .required('Ingrese contraseña'),
  password_confirmation: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
  .required('Ingrese confirmacion contraseña')
})
const DatosUsuarios = (props) => {
    const clases=estilos()
    const formik = useFormik({
      initialValues:props.data,
      validationSchema: stepTwoValidationSchema,
      onSubmit: (values) => {
        //alert(JSON.stringify(values, null, 2));
        props.changeState(values)
        props.handleNext()
      },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
             <div>
            <Grid container>
                <Grid item xs={12} >
                <TextField className={clases.margenTextfield} variant="standard" label='Ingrese usuario' fullWidth 
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={ formik.touched.name && Boolean(formik.errors.name)}
                helperText={ formik.touched.name && formik.errors.name}
                />
                </Grid> 
                <Grid item xs={12} >
                <TextField className={clases.margenTextfield} variant="standard" label='Ingrese email' fullWidth
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={ formik.touched.email && Boolean(formik.errors.email)}
                helperText={ formik.touched.email && formik.errors.email}
                />
                </Grid> 
                <Grid container item xs={12} >
                <FormControl fullWidth className={clases.margenTextfield}  
                 error={ formik.touched.password && Boolean(formik.errors.password)}
                  variant="standard">
                  <InputLabel 
                  >Contraseña</InputLabel>
                  <Input
                    type={props.showPassword ? 'text' : 'password'}
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={props.handleClickShowPassword}
                        >
                          {props.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                       }
                  />
                  <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
              </FormControl>
                </Grid>
                 <Grid item xs={12} >
                 <FormControl fullWidth className={clases.margenTextfield}  
                 error={ formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                  variant="standard">
                  <InputLabel 
                  >Confirmar Contraseña </InputLabel>
                  <Input
                    type={props.showPasswordConfirm ? 'text' : 'password'}
                    name='password_confirmation'
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={props.handleClickShowPasswordConfirm}
                        >
                          {props.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                       }
                  />
                  <FormHelperText>{formik.touched.password_confirmation && formik.errors.password_confirmation}</FormHelperText>
              </FormControl>
                </Grid> 
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={props.activeStep === 0}
              onClick={props.handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
           
            <Button 
                type="submit"
                >
              {props.activeStep === props.steps.length - 1 ? 'Crear' : 'Siguiente'}
            </Button>
          </Box>   
        </div>
        </form>
        </div>
    )
}

export default DatosUsuarios
