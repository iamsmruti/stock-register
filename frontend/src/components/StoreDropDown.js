import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StoreDropDown({ list, ans, setAns, label, defaultValue }) {

  const handleChange = (event) => {
    setAns(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mt: '0.3rem', bgcolor: 'white'}}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          defaultValue={defaultValue}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ans}
          label={label}
          onChange={handleChange}
        >
          {list.storeId !== null && list?.map((item) => (
            <MenuItem value={item.storeId}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}