import { useContext } from 'react'
import FetchDataContext from 'src/contexts/FetchDataContext'

const useFetchData = () => useContext(FetchDataContext)

export default useFetchData
