import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import React, { Fragment } from 'react'
import useCountry from 'src/hooks/useCountry'
import { Country } from 'src/types/setup/Country'

const CountryPageHeader = () => {
  const { dataState, handleModal } = useCountry()
  const handleClickNew = () => {
    dataState.country = {} as Country
    handleModal()
  }
  return (
    <Fragment>
      
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ color: 'primary.main' }}>
          Countries
        </Typography>
        <Button variant='contained' size='small' startIcon={<Plus fontSize='small' />} onClick={handleClickNew}>
          New
        </Button>
      </Box>
      <Typography variant='body2'>Insert, Update or Delete Countries</Typography>
    </Fragment>
  )
}

export default CountryPageHeader
