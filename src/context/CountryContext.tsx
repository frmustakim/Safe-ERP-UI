import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Country } from '../types/setup/Country'
import { CountryEntity } from 'src/types/setup/CountryEntity'

const url = 'http://localhost:5095/countries/'

type State = {
  countries: Country[]
  country: Country
  modalOpen: boolean
}

type ActionType1 = {
  type: string
  payload: Country[]
}
type ActionType2 = {
  type: string
  payload: Country
}
type ActionType3 = {
  type: string
  payload: boolean
}

type Action = ActionType1 | ActionType2 | ActionType3

let initialState: State = {
  countries: [] as Country[],
  country: {} as Country,
  modalOpen: false
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_DATA': {
      return {
        ...state,
        countries: action.payload as Country[]
      }
    }
    case 'LOAD_SINGLE_DATA': {
      return {
        ...state,
        country: action.payload as Country
      }
    }
    case 'HANDLE_MODAL': {
      return {
        ...state,
        modalOpen: !state.modalOpen
      }
    }
    default: {
      return { ...state }
    }
  }
}

const CountryContext = createContext({
  dataState: initialState,
  getData: () => {},
  getSingleData: (countryID: number) => {},
  postData: (country: Country) => {},
  putData: (country: CountryEntity) => {},
  removeData: (id: number) => {},
  handleModal: () => {}
})

export const CountryProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const getData = async () => {
    try {
      const res = await axios.get('https://localhost:5010/api/v1/hrms/country')
      console.log(res)
      dispatch({
        type: 'LOAD_DATA',
        payload: res.data
      })
    } catch (e) {
      console.error(e)
    }
  }
  const getSingleData = async (countryID: number) => {
    try {
      const res = await axios.get(`https://localhost:5010/api/v1/hrms/country/${countryID}`)
      dispatch({
        type: 'LOAD_SINGLE_DATA',
        payload: res.data
      })
    } catch (e) {
      console.error(e)
    }
  }
  const postData = async (todo: Country) => {
    try {
      const res = await axios.post<Country>('https://localhost:5010/api/v1/hrms/country', { ...todo })
      const returnData = res.data
      if (returnData != null) {
        getData()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const putData = async (country: CountryEntity) => {
    try {
      const res = await axios.put<CountryEntity>(`https://localhost:5010/api/v1/hrms/country`, {
        ...country
      })
      console.log(res)
      const returnData = res.data
      if (returnData != null) {
        getData()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const removeData = async (id: number) => {
    try {
      // debugger
      const res = await axios.delete<Country>(`https://localhost:5010/api/v1/hrms/country/${id}`)
      const returnData = res.data
      if (returnData != null) {
        getData()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleModal = async () => {
    try {
      dispatch({
        type: 'HANDLE_MODAL',
        payload: initialState.modalOpen
      })
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {}, [])

  return (
    <CountryContext.Provider
      value={{
        dataState: state,
        getData,
        getSingleData,
        postData,
        putData,
        removeData,
        handleModal
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}
export default CountryContext
