import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from 'react'
import StaffInfoModal from "./components/StaffInfoModal";
import { stores } from "../../data/stores";
import axios from "axios";
import { API } from '../../assets/constants'

const ManageStaff = () => {
  const [activeStore, setActiveStore] = useState('VgwLq1sKrUdkxsSuTKEhEF5b8KG3');
  const [staffs, setStaffs] = useState([])
  const [trigger, setTrigger] = useState(0)

  const [data, setData] = useState({
    name: '',
    staffId:'',
    phone: '',
    role: '',
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.post(`${API}/staff/get`, {
      businessIds: ["VgwLq1sKrUdkxsSuTKEhEF5b8KG3"]
    }).then((res) => {
      console.log(res)
      setStaffs(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    axios.post(`${API}/staff/get`, {
      businessIds: ["VgwLq1sKrUdkxsSuTKEhEF5b8KG3"]
    }).then((res) => {
      console.log(res)
      setStaffs(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [trigger])

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"} sx={{px: 2, py: 2, borderBottom: '1px solid lightgray'}}>
        <Typography sx={{fontSize: '22px', fontWeight: 500}}>Manage Staff</Typography>
        <Button onClick={handleOpen} variant="contained" sx={{bgcolor: '#1602FF', textTransform: 'capitalize'}}>Add Staff</Button>
      </Stack>

      <Box sx={{bgcolor: '#f7f9ff', p: 2}}>
        <Stack direction="row">
          {stores?.map((store) => {
            if(store.id === activeStore) {
              return (
                <Chip sx={{bgcolor: '#1602FF', color: 'white', mr: 2}} label={store.name} variant="outlined" />
              )
            } else {
              return (
                <Chip sx={{mr: 2}} label={store.name} variant="outlined" onClick={() => setActiveStore(store.id)} />
              )
            }
          })}
        </Stack>

        <Box sx={{mt: 2}}>
          <StaffHeader />

          {staffs?.filter((item) => item.businessId === activeStore).map((staff) => (
            <StaffRow setData={setData} handleOpen={handleOpen} key={staff.id} staff={staff} setTrigger={setTrigger} />
          ))}
        </Box>

        <StaffInfoModal data={data} setData={setData} open={open} handleClose={handleClose} handleOpen={handleOpen} setTrigger={setTrigger} />
      </Box>
    </Box>
  )
}

export default ManageStaff

export const StaffHeader = () => {
  return (
    <Grid container sx={{bgcolor: '#f0f0f0', border: '1px solid lightgray'}}>
      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>Staff</Typography>
      </Grid>

      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>Mobile Number</Typography>
      </Grid>

      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>Role</Typography>
      </Grid>

      <Grid item md={6} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px', textAlign: 'right'}}>Actions</Typography>
      </Grid>
    </Grid>
  )
}

export const StaffRow = ({ staff, setTrigger, handleOpen, setData }) => {
  const [showActions, setShowActions] = useState(false)

  const handleDelete = () => {
    axios.delete(`${API}/staff/delete/${staff.staffId}`).then((res) => {
      console.log(res)
      alert('Sucessfully deleted')
      setTrigger(prev => prev + 1)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleUpdate = () => {

    handleOpen()
    setData(
      {
        name: staff.name,
        staffId: staff.staffId,
        phone: staff.mobile,
        role: ''
      }
    )
  }

  return (
    <Grid component={"div"} onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)} className="staff-record" container sx={{bgcolor: 'white', border: '1px solid lightgray', borderTop: 'none', display: 'flex', alignItems: 'center', height: '52px'}}>
      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>{staff.name}</Typography>
      </Grid>

      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>{staff.mobile}</Typography>
      </Grid>

      <Grid item md={2} sx={{px: 2, py: 1}}>
        {staff.role === '' && <Typography sx={{fontSize: '15px'}}>No Role</Typography>}
        {staff.role !== '' && <Typography sx={{fontSize: '15px'}}>{staff.role}</Typography>}
      </Grid>

      {showActions === true && <Grid className="staff-actions" item md={6} sx={{px: 2, py: 1, display: 'flex', justifyContent: 'flex-end'}}>
        {staff.role === '' && <Button variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Add Role</Button>}
        {staff.role !== '' && <Button variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Change Role</Button>}
        {staff.role !== '' && <Button variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Remove Role</Button>}
        <Button onClick={handleUpdate} variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Rename Staff</Button>
        <Button onClick={handleDelete} color="error" variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1}}>Delete Staff</Button>
      </Grid>}
    </Grid>
  )
}
