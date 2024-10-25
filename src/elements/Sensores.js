import React from 'react'
import {MenuItem,InputLabel,FormControl,Select} from '@mui/material'

function Sensores({name,value,onChange}){
    let sensores = {'rpm':'RPM','vss':'VSS','clt':'CLT','lap':'LAP TIME','temp':'Temperatura'}
    return <FormControl style={{ paddingRight: '5vw', width: '200px' }}>
        <InputLabel id="select-label">Choose an option</InputLabel>
        <Select style={{maxWidth:'10vw'}}
            name={name}
            labelId="select-label"
            value={value}
            label="Choose an option"
            onChange={onChange}
        >
            {Object.entries(sensores).map(([key, label], index) => (
            <MenuItem key={index} value={key} >
                {label}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
}
export default Sensores