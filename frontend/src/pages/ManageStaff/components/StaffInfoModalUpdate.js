import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, Stack } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import { style, customInput, customInput2 } from "../../../assets/styles";
import { roles } from "../../../data/roles";
import axios from "axios";
import { API, businessId } from "../../../assets/constants";
import StoreDropDown from "../../../components/StoreDropDown";
import RoleDropDown from "../../../components/RoleDropDown copy";

export default function StaffInfoModalUpdate({ trigger, setTrigger, handleClose, open, data}) {
  const [role, setRole] = useState('')
  const [store, setStore] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')

  useEffect(() => {
    setName(data.name)
    setMobile(data.phone)
    setRole(data.access_type)
    setStore(data.store)
  }, [data, trigger])

  const [stores, setStores] = useState([])

  useEffect(() => {
    axios.get(`${API}/store/getStore/${businessId}`).then((res) => {
      setStores(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const handleSubmit = () => {
    if(name === ''){
      alert('Staff Name is required')
      return
    }

    if(mobile === ''){
      alert('Mobile Number is required')
      return
    }

    axios.put(`${API}/staff/update`, {
      name: name,
      phone: mobile,
      staffId: data.staffId,
      access_type: role,
      storeId: store
    }).then((res) => {
      console.log(res)
      handleClose()
      setTrigger(prev => prev + 1)
    }).catch((err) => {
      console.log(err)
    })
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
                <input defaultValue={data.name} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Here" style={customInput} />
              </Grid>

              <Grid item md={6} sx={{pl: 1, display: 'flex'}}>
                <div>
                  <Typography>Code</Typography>
                  <input disabled value="+91" placeholder="Enter Here" style={customInput2} />
                </div>
                <div style={{width: '100%'}}>
                  <Typography>Mobile Number*</Typography>
                  <input defaultValue={data.phone} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Here" style={customInput} />
                </div>
              </Grid>

              <Grid item md={6} sx={{pr: 1, mt: 2}}>
                <Typography>Select Store*</Typography>
                <StoreDropDown list={stores} defaultValue={data.store} ans={store} setAns={setStore}/>
              </Grid>

              <Grid item md={6} sx={{pl: 1, mt: 2}}>
                <Typography>Select Role*</Typography>
                <RoleDropDown list={roles} defaultValue={data.access_type} ans={role} setAns={setRole}/>
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