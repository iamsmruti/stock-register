import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from 'react'
import axios from "axios";

import StaffInfoModal from "./components/StaffInfoModal";
import StaffInfoModalUpdate from "./components/StaffInfoModalUpdate";

import { API, businessId } from '../../assets/constants'
import { roleMap } from "../../data/roles";

const ManageStaff = () => {
  const [activeStore, setActiveStore] = useState('');
  const [stores, setStores] = useState([])
  const [staffs, setStaffs] = useState([])
  const [trigger, setTrigger] = useState(0)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get(`${API}/store/getStore/${businessId}`).then((res) => {
      setStores(res.data)
      setActiveStore(res.data[0].storeId)
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`${API}/staff/get/${activeStore}`).then((res) => {
      setStaffs(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    axios.get(`${API}/staff/get/${activeStore}`).then((res) => {
      console.log(res.data)
      setStaffs(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [activeStore, trigger])

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"} sx={{px: 2, py: 2, borderBottom: '1px solid lightgray'}}>
        <Typography sx={{fontSize: '22px', fontWeight: 500}}>Manage Staff</Typography>
        <Button onClick={handleOpen} variant="contained" sx={{bgcolor: '#1602FF', textTransform: 'capitalize'}}>Add Staff</Button>
      </Stack>

      <Box sx={{bgcolor: '#f7f9ff', p: 2}}>
        <Stack direction="row">
          {stores?.map((store) => {
            if(store.storeId === activeStore) {
              return (
                <Chip sx={{bgcolor: '#1602FF', color: 'white', mr: 2}} label={store.name} variant="outlined" />
              )
            } else {
              return (
                <Chip sx={{mr: 2}} label={store.name} variant="outlined" onClick={() => setActiveStore(store.storeId)} />
              )
            }
          })}
        </Stack>

        <Box sx={{mt: 2}}>
          <StaffHeader />

          {staffs?.map((staff) => (
            <StaffRow key={staff.id} trigger={trigger} activeStore={activeStore} staff={staff} setTrigger={setTrigger} />
          ))}
        </Box>

        <StaffInfoModal open={open} handleClose={handleClose} handleOpen={handleOpen} setTrigger={setTrigger} />
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

export const StaffRow = ({ staff, setTrigger, activeStore, trigger }) => {
  const [showActions, setShowActions] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setTrigger(prev => prev + 1)

    setData({
      name: staff?.name,
      staffId: staff?.staffId,
      phone: staff?.mobile,
      access_type: staff?.access_type,
      store: activeStore
    })
    
    handleOpen()
  }

  const handleRemoveRole = () => {
    
  }

  return (
    <>
    <Grid component={"div"} onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)} className="staff-record" container sx={{bgcolor: 'white', border: '1px solid lightgray', borderTop: 'none', display: 'flex', alignItems: 'center', height: '52px'}}>
      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>{staff.name}</Typography>
      </Grid>

      <Grid item md={2} sx={{px: 2, py: 1}}>
        <Typography sx={{fontSize: '15px'}}>{staff.mobile}</Typography>
      </Grid>

      <Grid item md={2} sx={{px: 2, py: 1}}>
        {staff.role === '' && <Typography sx={{fontSize: '15px'}}>No Role</Typography>}
        {staff.role !== '' && <Typography sx={{fontSize: '15px'}}>{roleMap[staff?.access_type]}</Typography>}
      </Grid>

      {showActions === true && <Grid className="staff-actions" item md={6} sx={{px: 2, py: 1, display: 'flex', justifyContent: 'flex-end'}}>
        {staff.role === '' && <Button onClick={handleUpdate} variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Add Role</Button>}
        {staff.role !== '' && <Button onClick={handleUpdate} variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Change Role</Button>}
        {staff.role !== '' && <Button onClick={handleRemoveRole} variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Remove Role</Button>}
        <Button onClick={handleUpdate} variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1, outline: 'black', color: 'black', border: '1px solid black'}}>Rename Staff</Button>
        <Button onClick={handleDelete} color="error" variant="outlined" sx={{fontSize: '14px', textTransform: 'capitalize', ml: 1}}>Delete Staff</Button>
      </Grid>}
    </Grid>

    <StaffInfoModalUpdate trigger={trigger} setTrigger={setTrigger} data={data} handleClose={handleClose} open={open} />
    </>
  )
}
