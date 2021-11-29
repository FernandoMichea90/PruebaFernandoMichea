import React from 'react'
import {Grid,Paper} from '@mui/material'
import {makeStyles} from '@mui/styles'
import Formulario from '../Componentes/Login/Formulario'

const estilos=makeStyles((theme)=>({
    root:
    {
     height: '100vh'}
    ,
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:"#ffffff",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },

}))

const Login = () => { 
    const clases=estilos()
    return (
        <Grid container className={clases.root}>
            <Grid item xs={false} sm={4} md={8} className={clases.image}>

            </Grid>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6}>
                <Formulario></Formulario>
            </Grid>

        </Grid>
    )
}

export default Login
