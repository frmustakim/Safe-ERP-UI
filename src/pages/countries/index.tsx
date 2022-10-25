// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import React from 'react'
import CountriesList from 'src/views/countries/CountriesList'

import CountryCreateModal from 'src/views/countries/CountryCreateModal'
import { CountryProvider } from 'src/context/CountryContext'
import CountryPageHeader from 'src/views/countries/CountryPageHeader'

const Index = () => {

  return (
    <Grid container spacing={3}>
      <CountryProvider>
        <Grid item xs={12}>
          <CountryPageHeader />
          <CountryCreateModal />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CountriesList />
          </Card>
        </Grid>
      </CountryProvider>
    </Grid>
  )
}

export default Index
