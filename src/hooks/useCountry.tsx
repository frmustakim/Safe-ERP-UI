import { useContext } from 'react'
import CountryContext from '../context/CountryContext'

const useCountry = () => useContext(CountryContext)

export default useCountry
