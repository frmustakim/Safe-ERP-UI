// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useState, ChangeEvent, useEffect } from 'react'

import FileEdit from 'mdi-material-ui/FileEditOutline'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'

import IconButton from '@mui/material/IconButton'
import useCountry from 'src/hooks/useCountry'
import { TableHeader } from 'src/types/TableHeader'
import Swal from 'sweetalert2'

const columns: readonly TableHeader[] = [
  { id: 'sl', label: 'SL#', headerAlign: 'center', dataAlign: 'center' },
  { id: 'countryName', label: 'Name', headerAlign: 'center', dataAlign: 'center' },
  { id: 'countryNameUC', label: 'Code', headerAlign: 'center', dataAlign: 'center' },
  { id: 'countryShortCode', label: 'Short Code', headerAlign: 'center', dataAlign: 'center' },
  { id: 'action', label: 'Action', headerAlign: 'center', dataAlign: 'center' }
]

const CountriesList = () => {
  const { dataState, getData, handleModal, getSingleData, removeData } = useCountry()

  // ** States

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  async function handleClickEdit(countryID: number) {
    await getSingleData(countryID)
    handleModal()
  }

  const handleClickDelete = (countryID: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      debugger
      if (result.isConfirmed) {
        removeData(countryID)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table sx={{ minWidth: 650 }} size='small' stickyHeader aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.headerAlign}
                  sx={{ minWidth: column.minWidth, backgroundColor: 'primary.main', color: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataState.countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.countryID}>
                  {columns.map(column => {
                    type ObjectKey = keyof typeof row
                    const isActionHead = column.id == 'action' ? true : false
                    const header = column.id as ObjectKey
                    const value = column.id == 'sl' ? ++index : row[header]

                    return !isActionHead ? (
                      <TableCell key={column.id} align={column.dataAlign}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    ) : (
                      <TableCell key={column.id} align={column.dataAlign}>
                        <IconButton
                          color='primary'
                          size='small'
                          aria-label='edit'
                          component='label'
                          title='Edit'
                          onClick={() => handleClickEdit(row.countryID)}
                        >
                          <FileEdit fontSize='small' />
                        </IconButton>
                        <IconButton
                          color='error'
                          size='small'
                          aria-label='delete'
                          component='label'
                          title='Delete'
                          onClick={() => handleClickDelete(row.countryID)}
                        >
                          <TrashCanOutline fontSize='small' />
                        </IconButton>
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component='div'
        count={dataState.countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default CountriesList
