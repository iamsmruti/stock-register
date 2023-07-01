import { Box, Typography } from "@mui/material"
import React from 'react'
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const menuItems = [
    {
      name: 'Party',
      path: '/party',
    },
    {
      name: 'All Entries & Bill',
      path: '/all-entries-and-bills',
    },
    {
      name: 'Stock',
      path: '/stock',
    },
    {
      name: 'Item',
      path: '/item',
    },
    {
      name: 'Reports',
      path: '/reports',
    },
    {
      name: 'Manage Staff',
      path: '/manage-staff',
    },
    {
      name: 'Setting',
      path: '/setting',
    },
    {
      name: 'Paid Plan',
      path: '/paid-plan',
    },
    {
      name: 'Help & Support',
      path: '/help-and-support',
    },
  ]

  const location = useLocation()
  return (
    <Box sx={{ bgcolor: '#0F0E20', width: '100%', height: '100vh'}}>
      {menuItems.map((item) => (
        <Box>
          <Link to={item.path}>
            {location.pathname !== item.path 
              ? <Typography sx={{color: '#AB8484', fontSize: '20px', '&:hover': {bgcolor: 'rgba(21, 2, 254, 0.5)', color: 'white'}, py: 2, pl: 2}}>{item.name}</Typography>
              : <Typography sx={{color: '#AB8484', fontSize: '20px', bgcolor: '#1602FF', color: 'white', py: 2, pl: 2}}>{item.name}</Typography>
            }
          </Link>
        </Box>
      ))}
    </Box>
  )
}

export default Sidebar