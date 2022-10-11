import react, { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useCountry from 'src/hooks/useCountry'

const CountryDDL = (props: any) => {
  const { dataState, getData } = useCountry()

  const [country, setCountry] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value)
    if (props.hasOwnProperty('onSelectionUpdate')) {
      props.onSelectionUpdate(event.target.value)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <FormControl size='small'>
      <InputLabel id='demo-select-small'>Country</InputLabel>
      <Select
        labelId='demo-select-small'
        id='demo-select-small'
        value={country}
        label='Country'
        onChange={handleChange}
      >
        {dataState.countries.map(country => {
          return (
            <MenuItem key={country.countryID} value={country.countryID}>
              {country.countryName}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default CountryDDL
