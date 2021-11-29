import React from 'react'
import {Grid,IconButton,TextField,Button,Box} from '@mui/material'
import { useFormik } from 'formik'
import {makeStyles} from '@mui/styles'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Axios from 'axios'
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'
const estilos=makeStyles((theme) => ({
    margenTextfield:{
    marginTop:'16px !important',
    padding:'5px'
}
}))
const ConfirmarDatos = (props) => {
  let navigate=useNavigate()
    const clases=estilos()
    const RegistrarUsuario =async(Usuarios) => {
      await Axios.post('http://prueba.brik.cl/api/register',Usuarios).then(
        res=>{
          try{
            console.log(res)
          if(res.data.success){
              Swal.fire({
                title:'Exito!',
                text:'El usuario ha sido registrado!',
                icon:'success',
                timer:1000,
                willClose: () => {
                  navigate('/')
                }
              })
          }else{ 
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.message,
            })
          }
        }catch(e){
          console.log(e)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
          })
        }}
      )
    }
    const formik = useFormik({
        initialValues:props.data,
        onSubmit: (values) => {
          RegistrarUsuario(values)
        },
      });
    return (
        
        <form onSubmit={formik.handleSubmit}>
        <div>
        <Grid container>
        <Grid container item xs={12} >
        <TextField
          id="outlined-read-only-input"
          label="Nombre completo"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.nombres}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid> 
        <Grid item xs={6} className={clases.margenTextfield}>
        <TextField
          id="outlined-read-only-input"
          label="Apellido Paterno"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.apellido_paterno}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid> 
        <Grid item xs={6} className={clases.margenTextfield}>
        <TextField
          id="outlined-read-only-input"
          label="Apellido Materno"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.apellido_materno}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid> 
        <Grid item xs={12} className={clases.margenTextfield}>
        <TextField
          id="outlined-read-only-input"
          label="RUT"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.rut}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />   
        </Grid> 
        <Grid item xs={12} className={clases.margenTextfield}>
        <TextField
          id="outlined-read-only-input"
          label="Usuario"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.name}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />   
        </Grid> 
        <Grid item xs={12} className={clases.margenTextfield}>
        <TextField
          id="outlined-read-only-input"
          label="Email"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.email}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />   
        </Grid> 
        <Grid item xs={12} className={clases.margenTextfield}>
        <FormControl fullWidth className={clases.margenTextfield} variant="standard">  
        <InputLabel >Contraseña </InputLabel>
          <Input
         type={props.showPassword ? 'text' : 'password'}
          id="outlined-read-only-input"
          label="Contraseña"
          variant="standard"
          className={clases.margenTextfield}
          value={props.data.password}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
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
                variant='contained'
                >
              {props.activeStep === props.steps.length - 1 ? 'Crear' : 'Siguiente'}
            </Button>
          </Box>    
        </div>
        </form>
        
    )
}

export default ConfirmarDatos
