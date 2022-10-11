import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import React, { FormEventHandler, useEffect, useState } from 'react'
// import { IBuyer } from 'src/Interfaces/IBuyer'
import { Country } from '../../types/setup/Country'
import useCountry from 'src/hooks/useCountry'

const CountryCreate = () => {
  const { dataState, getSingleData } = useCountry()
  const [country, setCountry] = useState<Country>({} as Country)

  useEffect(() => {
    setCountry(dataState.country)
  }, [])
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label='Country Name'
            size='small'
            placeholder='Country Name'
            onChange={e => (dataState.country.countryName = e.target.value)}
            defaultValue={dataState.country.countryName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label='Country Name BN'
            size='small'
            placeholder='Country Name BN'
            onChange={e => (dataState.country.countryNameBN = e.target.value)}
            defaultValue={dataState.country.countryNameBN}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label='Code'
            size='small'
            placeholder='Code'
            onChange={e => (dataState.country.countryCode = e.target.value)}
            defaultValue={dataState.country.countryCode}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default CountryCreate
