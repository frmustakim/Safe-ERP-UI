import * as React from 'react'
import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

import CloseIcon from 'mdi-material-ui/Close'
import CountryCreate from './CountryCreate'
import useCountry from 'src/hooks/useCountry'
import { useEffect, useState } from 'react'
import Floppy from 'mdi-material-ui/Floppy'
import { Country } from 'src/types/setup/Country'
import { CountryEntity } from 'src/types/setup/CountryEntity'

const CountryCreateModal = () => {
  const { dataState, handleModal, postData, putData } = useCountry()

  const handleSave = async () => {
    let country = dataState.country
    console.log(country)
    if (!country.countryId) {
      dataState.country = { ...country }
      await postData(dataState.country)
    } else {
      let country = { Id: dataState.country.countryId, ...dataState.country } as CountryEntity
      console.log(country)
      await putData(country)
    }
    handleModal()
  }

  return (
    <div>
      <Dialog open={dataState.modalOpen} onClose={handleModal}>
        <DialogTitle sx={{ color: 'primary.main' }}>Country</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <CountryCreate />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            sx={{ mt: 2 }}
            size='small'
            startIcon={<Floppy fontSize='small' />}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
//
export default CountryCreateModal
