import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, Stack } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import CustomDropDown from "../../../components/CustomDropDown";

import { style, customInput, customInput2 } from "../../../assets/styles";
import { roles } from "../../../data/roles";
import { stores } from "../../../data/stores";
import axios from "axios";
import { API } from "../../../assets/constants";

export default function StaffInfoModal({ setTrigger, handleClose, handleOpen, open, data, setData}) {
  const [role, setRole] = useState()
  const [store, setStore] = useState()
  const [name, setName] = useState()
  const [mobile, setMobile] = useState()
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (data.name !== '') {
      setName(data.name)
      setEdit(true)
    }

    if (data.phone !== '') {
      setMobile(data.phone)
    }

    if (data.role!== '') {
      setRole(data.role)
    }

    if (data.store!== '') {
      setStore(data.store)
    }
  }, [data])

  const handleSubmit = () => {
    if(name === ''){
      alert('Staff Name is required')
      return
    }

    if(mobile === ''){
      alert('Mobile Number is required')
      return
    }

    if(edit === false){
      axios.post(`${API}/staff/add`, {
        name: name,
        phone: mobile
      }).then((res) => {
        console.log(res)
        handleClose()
        setTrigger(prev => prev + 1)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      axios.put(`${API}/staff/update`, {
        name: name,
        phone: mobile,
        staffId: data.staffId,
      }).then((res) => {
        console.log(res)
        handleClose()
        setTrigger(prev => prev + 1)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            {data.name === '' && <Typography sx={{px: 2, py: 1}}>Add Staff</Typography>}

            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack sx={{pt: 3, px: 2, bgcolor: '#f7f9ff', width: '100%', minHeight: 510}}>
            <Grid container sx={{width: '100%'}}>
              <Grid item md={6} sx={{pr: 1}}>
                <Typography>Staff Name*</Typography>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Here" style={customInput} />
              </Grid>

              <Grid item md={6} sx={{pl: 1, display: 'flex'}}>
                <div>
                  <Typography>Code</Typography>
                  <input disabled value="+91" placeholder="Enter Here" style={customInput2} />
                </div>
                <div style={{width: '100%'}}>
                  <Typography>Mobile Number*</Typography>
                  <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Here" style={customInput} />
                </div>
              </Grid>

              <Grid item md={6} sx={{pr: 1, mt: 2}}>
                <Typography>Select Store*</Typography>
                <CustomDropDown list={stores} ans={store} setAns={setStore}/>
              </Grid>

              <Grid item md={6} sx={{pl: 1, mt: 2}}>
                <Typography>Select Role*</Typography>
                <CustomDropDown list={roles} ans={role} setAns={setRole}/>
              </Grid>
            </Grid>

            {role === 'store-admin' && <AdminInfo />}
            {role === 'sales-operator' && <SalesInfo />}
            {role === 'sales-purchase-operator' && <SalesPurchaseInfo />}

            <Stack direction="row" justifyContent={"flex-end"} sx={{py: 2, mt: 'auto'}}>
              <Button onClick={handleClose} sx={{width: '150px', mr: 2, textTransform: 'capitalize'}} variant="outlined">Cancel</Button>
              <Button onClick={handleSubmit} sx={{width: '150px', textTransform: 'capitalize', bgcolor: '#1602FF'}} variant="contained">Save</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export const AdminInfo = () => {
  return (
    <Box sx={{bgcolor: 'white', my: 2, p: 2}}>
      <Typography>Store Admin Permissions -</Typography>
      <ul style={{ marginLeft: '1rem'}}>
        <li>View all entries & download reports</li>
        <li>Add, edit, delete any type of entry</li>
        <li>View total sale, purchase</li>
        <li>View all added items, add new item, edit item, delete item</li>
        <li>Add new party, view all added parties and their entries</li>
        <li>Download & share all reports, bills</li>
      </ul>
    </Box>
  )
}

export const SalesInfo = () => {
  return (
    <Box sx={{bgcolor: 'white', my: 2, p: 2}}>
      <Typography>Sale Operator Permissions -</Typography>
      <ul style={{ marginLeft: '1rem'}}>
        <li>View opening stock, remaining stock of all items</li>
        <li>Add sale entry, stock out entry</li>
        <li>Add new party</li>
        <li>View added sale bill and share to party</li>
      </ul>
    </Box>
  )
}

export const SalesPurchaseInfo = () => {
  return (
    <Box sx={{bgcolor: 'white', my: 2, p: 2}}>
      <Typography>Sale Purchase Operator Permissions -</Typography>
      <ul style={{ marginLeft: '1rem'}}>
        <li>View opening stock, remaining stock of all items</li>
        <li>Add sale & purchase entry, stock in/out entry</li>
        <li>Add new party</li>
        <li>View added sale bill and share to party</li>
      </ul>
    </Box>
  )
}