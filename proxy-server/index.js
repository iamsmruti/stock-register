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
const storeID = 'acf2d038-7742-461d-9ce9-d5322f96be74'
const businessId = 'VgwLq1sKrUdkxsSuTKEhEF5b8KG3'

app.get("/", (req, res) => {
    res.send("Proxy Server Working ...");
});

// To get all the staffs for a particular store
app.post('/staff/get', async (req, res) => {
  const completeStaffsData = []
  try {
    const staffs = await axios.post(`${backendUrl}/staff/get`, {
      businessIds: req.body.businessIds
    })

    const staffInfo = await axios.get(`${backendUrl}/staffAccess/get/${storeID}`)

    staffInfo?.data.storeManagerModels?.map((item) => {
      const staff = {
        storeManagerId: item.storeManagerID,
        staffId: item.staffModel.staffId,
        businessId: item.staffModel.businessId,
        name: item.staffModel.name,
        mobile: item.staffModel.mobile,
        role: 'Store Admin',
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
        role: 'Sales Operator',
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
        role: 'Sales Purchase Operator',
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
      businessId: businessId
    })

    res.json(newStaff.data)
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
    const updatedStaff = await axios.put(`${backendUrl}/staff/update/`, {
      staffId: req.body.staffId,
      name: req.body.name,
      phone: req.body.phone,
      businessId: businessId
    })

    res.json(updatedStaff.data.response)
  } catch (error) {
    console.log(error.message)
  }
})

// console text when app is running
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});