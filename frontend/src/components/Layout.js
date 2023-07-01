import React from 'react'
import Sidebar from "./Sidebar"

import { Stack, Box } from "@mui/material"

const Layout = ({ children }) => {
  return (
    <Stack direction="row">
      <Box sx={{width: '180px', display: {xs: 'none', md: 'flex'}}}>
        <Sidebar />
      </Box>

      <div className="container">
        {children}
      </div>
    </Stack>
  )
}

export default Layout