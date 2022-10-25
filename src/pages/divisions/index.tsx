import React, { Fragment, useState } from 'react'
import { CountryProvider } from 'src/context/CountryContext'
import CountryDDL from 'src/views/countries/CountryDDL'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import DivisionsList from 'src/views/divisions/DivisionsList'
import { DivisionProvider } from 'src/context/DivisionContext'


const Index = () => {
  const [countryID, setCountryID] = useState(0)
  function handleSelectionUpdate(data: any) {
    setCountryID(data)
  }

  return (
    <Fragment>
      <CountryProvider>
        <Card>
          <CountryDDL onSelectionUpdate={handleSelectionUpdate} />
        </Card>
      </CountryProvider>
      <DivisionProvider>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Card>
            <DivisionsList countryID={countryID} />
          </Card>
        </Grid>
      </DivisionProvider>
    </Fragment>
  )
}

export default Index
