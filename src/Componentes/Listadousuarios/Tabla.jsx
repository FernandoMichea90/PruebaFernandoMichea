import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button,Grid,TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {makeStyles} from '@mui/styles'
const estilos=makeStyles((theme) => ({
  margenTextfield:{
  marginTop:'16px !important',
  padding:'5px'
}
}))
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const Tabla = () => {
const clases=estilos()
const [usuarios, setusuarios] = useState([])
const [open, setOpen] = React.useState(false);
const [usuarioSelecionado, setusuarioSelecionado] = useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const solicitarUsuarios=async(token)=>{
await axios.get('http://prueba.brik.cl/api/users/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    console.log(res.data)
    setusuarios(res.data.data)
  })
  .catch((error) => {
    console.error(error)
  })
}
useEffect(() => {
 let token=localStorage.getItem('mydata')
 solicitarUsuarios(token)
}, [])
    return (
        <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center"><Button onClick={()=>{
                    setOpen(true)
                    setusuarioSelecionado(row)

              }}>Ver</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" align='center' variant="h6" component="h2">
            USUARIO 
          </Typography>
        <Grid container item xs={12} >
        <TextField
          id="outlined-read-only-input"
          label="id"
          variant="outlined"
          className={clases.margenTextfield}
          value={usuarioSelecionado.id}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
        <Grid container item xs={12} >
        <TextField
          id="outlined-read-only-input"
          label="Nombre completo"
          variant="outlined"
          className={clases.margenTextfield}
          value={usuarioSelecionado.name}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
        <Grid container item xs={12} >
        <TextField
          id="outlined-read-only-input"
          label="Email"
          variant="outlined"
          className={clases.margenTextfield}
          value={usuarioSelecionado.email}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
        <Grid container item xs={12} >
        <TextField
          id="outlined-read-only-input"
          label="Creado"
          variant="outlined"
          className={clases.margenTextfield}
          value={usuarioSelecionado.created_at}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
        <Grid container item xs={12} >
        <TextField
          id="outlined-read-only-input"
          label="Email Verificado"
          variant="outlined"
          className={clases.margenTextfield}
          value={usuarioSelecionado.email_verified_at==null? 'no verificado':'si verificado'}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
         
         
        </Box>
      </Modal>
    </div>



        </div>
    )
}

export default Tabla
