import React from 'react'
import {makeStyles} from '@mui/styles'
import {Typography } from '@mui/material'
import HorizontalLinearStepper from '../Componentes/CrearCuenta/Stepper'

const estilos=makeStyles((theme) => ({
    divFormulario:{
        width:'800px',
        margin: 'auto',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        marginTop: '24px',
        marginBottom: '24px',
        padding: '16px',
    },margen:{
        margin:'30px 0px !important'
    }
}))
const CrearCuenta = () => {
    const clases=estilos()
    return (
        <div>
            <div className={clases.divFormulario}>
                <Typography className={clases.margen} variant='h4' align='center'>
                    Registro
                </Typography>
                <HorizontalLinearStepper></HorizontalLinearStepper>

                  
           
            </div>
        </div>
    )
}

export default CrearCuenta
