// packages import
import express from "express"
import cors from "cors"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.json())
app.use(cors({
  origin: '*',
}));

const port = process.env.PORT || 5000;
const backendUrl = 'http://stock.staging.digitalregister.in:8080/api/v1'
const businessId = 'VgwLq1sKrUdkxsSuTKEhEF5b8KG3'

app.get("/", (req, res) => {
    res.send("Proxy Server Working ...");
});

// To get all the staffs for a particular store
app.get('/staff/get/:storeID', async (req, res) => {
  const completeStaffsData = []
  try {
    const staffs = await axios.post(`${backendUrl}/staff/get`, {
      businessIds: [businessId]
    })

    const staffInfo = await axios.get(`${backendUrl}/staffAccess/get/${req.params.storeID}`)

    staffInfo?.data.storeManagerModels?.map((item) => {
      const staff = {
        storeManagerId: item.storeManagerID,
        staffId: item.staffModel.staffId,
        businessId: item.staffModel.businessId,
        name: item.staffModel.name,
        mobile: item.staffModel.mobile,
        access_type: 'STORE_MANAGER',
      }

      completeStaffsData.push(staff)
    })

    staffInfo?.data.salesManagerModels?.map((item) => {
      const staff = {
        storeManagerId: item.storeManagerID,
        staffId: item.staffModel.staffId,
        businessId: item.staffModel.businessId,
        name: item.staffModel.name,
        mobile: item.staffModel.mobile,
        access_type: 'SALES_MANAGER',
      }

      completeStaffsData.push(staff)
    })

    staffInfo?.data.salesPurchaseManagerModels?.map((item) => {
      const staff = {
        storeManagerId: item.storeManagerID,
        staffId: item.staffModel.staffId,
        businessId: item.staffModel.businessId,
        name: item.staffModel.name,
        mobile: item.staffModel.mobile,
        access_type: 'SALE_PURCHASE_MANAGER',
      }

      completeStaffsData.push(staff)
    })

    staffs.data.response?.map((item) => {
      if(!completeStaffsData.find(staff => staff.staffId === item.staffId)){
        const staff = {
          staffId: item.staffId,
          businessId: item.businessId,
          name: item.name,
          mobile: item.mobile,
          role: '',
        }

        completeStaffsData.push(staff)
      }
    })

    res.json(completeStaffsData)
  } catch (err) {
    console.log(err)
  }
})

app.post('/staff/add', async (req, res) => {
  try {
    const newStaff = await axios.post(`${backendUrl}/staff/add`, {
      name: req.body.name,
      phone: req.body.phone,
      businessId: businessId,
    })

    console.log(newStaff.data)
    const assignRole = await axios.post(`${backendUrl}/staffAccess/add`, {
      staffId: newStaff.data.staffId,
      access_type: req.body.role,
      storeId: req.body.storeId, 
    })


    res.json({
      staffId: newStaff.data.staffId,
      businessId: newStaff.data.businessId,
      name: newStaff.data.name,
      mobile: newStaff.data.mobile,
      assign_type: req.body.role,
    })
  } catch (error) {
    console.log(error)
  }
})

app.delete('/staff/delete/:staffId', async (req, res) => {
  console.log(req.params.staffId)
  try {
    const deletedStaff = await axios.delete(`${backendUrl}/staff/delete/${req.params.staffId}`)
    
    res.json(deletedStaff.data.response)
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/staff/update/', async (req, res) => {
  try {
    const updatedStaff = await axios.post(`${backendUrl}/staff/update/`, {
      staffId: req.body.staffId,
      name: req.body.name,
      phone: req.body.phone,
      businessId: businessId
    })

    console.log(req.body)

    const assignRole = await axios.post(`${backendUrl}/staffAccess/add`, {
      staffId: req.body.staffId,
      access_type: req.body.access_type,
      storeId: req.body.storeId, 
    })

    res.json(updatedStaff.data.response)
  } catch (error) {
    console.log(error.message)
  }
})

app.post('/staff/removeRole', async (req, res) => {
  const assignRole = await axios.post(`${backendUrl}/staffAccess/add`, {
    staffId: req.body.staffId,
    access_type: 'fafsxgdfsg',
    storeId: req.body.storeId, 
  })

  res.json(assignRole.data)
})

app.get('/store/getStore/:bussinessId', async (req, res) => {
  try {
    const stores = await axios.get(`${backendUrl}/store/getStore/${req.params.bussinessId}`)

    res.json(stores.data.response)
  } catch (error) {
    console.log(error.message)
  }
})

// console text when app is running
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});