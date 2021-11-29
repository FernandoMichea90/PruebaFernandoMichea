import React from 'react'
import { TextField,Grid,Box,Button} from '@mui/material'
import {makeStyles} from '@mui/styles'
import { useFormik } from 'formik'
import * as yup from "yup";
const estilos=makeStyles((theme)=>({
    margenTextfield:{
       marginTop:'16px !important',
       padding:'5px'
    }
}))
yup.addMethod(yup.string,'validarRut',function (errorMessage) {
  return this.test(`validarRut`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
          checkRut(value)||
      createError({ path, message: errorMessage })
    );
  });
}); 
function  checkRut  (rut) {
  //variable error 
  var noError=true
  //Valor indefinido 
  if(rut!=undefined){ 
  // Despejar Puntos
  var valor = rut.split('.').join('')
  // Despejar Guión
  valor = valor.replace('-','');
  // Aislar Cuerpo y Dígito Verificador
  var cuerpo = valor.slice(0,-1);
  console.log(cuerpo)
  var dv = valor.slice(-1).toUpperCase();  
  var suma = 0;
  var multiplo = 2;
  // Para cada dígito del Cuerpo
  for(var i=1;i<=cuerpo.length;i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      var index = multiplo * valor.charAt(cuerpo.length - i);
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  }
  // Calcular Dígito Verificador en base al Módulo 11
  var dvEsperado = 11 - (suma % 11);
  // Casos Especiales (0 y K)
  dv = (dv == 'K')?10:dv;
  dv = (dv == 0)?11:dv;
  // Validar que el Cuerpo coincide con su Dígito Verificador
  if(dvEsperado != dv) { noError=false
  console.log('RUT invalido')
      }else{ console.log('RUT Valido') }}else{
        noError = true
       } 
  // mostrar errores


  return noError 
}
const stepOneValidationSchema= yup.object({
    nombres: yup
    .string()
    .required('Ingrese nombre completo'),
    apellido_paterno: yup
    .string()
    .required('Ingrese apellido paterno'),
    apellido_materno: yup
    .string()
    .required('Ingrese apellido materno'),
    rut: yup
    .string()
    .validarRut('Rut invalido')
    .matches(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/, 'RUT no valido. Ej:12.345.678-9')
    .required('Ingrese RUT'),
})
const FormularioCuenta = (props) => {
    const clases=estilos()
    const formik = useFormik({
        initialValues:props.data,
        validationSchema: stepOneValidationSchema,
        onSubmit: (values) => {
         // alert(JSON.stringify(values, null, 2));
         props.changeState(values)
          props.handleNext()
        },
      });
    
    return (
        <form onSubmit={formik.handleSubmit}>
        <div>
                <Grid container>
                <Grid item xs={12}
                className={clases.margenTextfield}
                >
                <TextField  variant="standard"  fullWidth 
                label='Nombre Completo'
                id='nombres' 
                name='nombres'
                value={formik.values.nombres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={ formik.touched.nombres && Boolean(formik.errors.nombres)}
                helperText={ formik.touched.nombres && formik.errors.nombres}
                />
                </Grid> 
                <Grid item xs={6} className={clases.margenTextfield}>
                    <TextField variant="standard" label='Apellido paterno' fullWidth 
                     id='apellido_paterno' 
                     name='apellido_paterno'
                     value={formik.values.apellido_paterno}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={ formik.touched.apellido_paterno && Boolean(formik.errors.apellido_paterno)}
                     helperText={ formik.touched.apellido_paterno && formik.errors.apellido_paterno}
                   />
                </Grid>
                 <Grid item xs={6}  className={clases.margenTextfield} >
                <TextField variant="standard" label='Apellido materno' fullWidth
                id='apellido_materno' 
                name='apellido_materno'
                value={formik.values.apellido_materno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={ formik.touched.apellido_materno && Boolean(formik.errors.apellido_materno)}
                helperText={ formik.touched.apellido_materno && formik.errors.apellido_materno}
                />
                </Grid> 
                <Grid item xs={12}  className={clases.margenTextfield} >
                <TextField variant="standard" label='RUT' fullWidth 
                 id='rut' 
                 name='rut'
                 value={formik.values.rut}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 error={ formik.touched.rut && Boolean(formik.errors.rut)}
                 helperText={ formik.touched.rut && formik.errors.rut}
                />
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

    )
}

export default FormularioCuenta
