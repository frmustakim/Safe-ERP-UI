import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Division } from '../types/setup/Division'

type State = {
  divisions: Division[]
  division: Division
  modalOpen: boolean
}

type ActionType1 = {
  type: string
  payload: Division[]
}
type ActionType2 = {
  type: string
  payload: Division
}
type ActionType3 = {
  type: string
  payload: boolean
}

type Action = ActionType1 | ActionType2 | ActionType3

let initialState: State = {
  divisions: [] as Division[],
  division: {} as Division,
  modalOpen: false
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_DATA': {
      return {
        ...state,
        divisions: action.payload as Division[]
      }
    }
    case 'LOAD_SINGLE_DATA': {
      return {
        ...state,
        division: action.payload as Division
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

const DivisionContext = createContext({
  dataState: initialState,
  getData: (countryID:number) => {},
  getSingleData: (divisionID: number) => {},
  postData: (division: Division) => {},
  putData: (division: Division) => {},
  removeData: (id: number) => {},
  handleModal: () => {}
})

export const DivisionProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const getData = async (countryID:number) => {
    debugger
    try {
      const res = await axios.get(`http://119.148.55.93:8091/api/Divisions/${countryID}`)
      dispatch({
        type: 'LOAD_DATA',
        payload: res.data
      })
    } catch (e) {
      console.error(e)
    }
  }
  const getSingleData = async (divisionID: number) => {
    try {
      const res = await axios.get(`http://119.148.55.93:8091/api/Divisions/${divisionID}`)
      dispatch({
        type: 'LOAD_SINGLE_DATA',
        payload: res.data
      })
    } catch (e) {
      console.error(e)
    }
  }
  const postData = async (division: Division) => {
    try {
      const res = await axios.post<Division>('http://119.148.55.93:8091/api/Divisions/', { ...division })
      const returnData = res.data
      if (returnData != null) {
        //getData()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const putData = async (division: Division) => {
    try {
      const res = await axios.put<Division>(`http://119.148.55.93:8091/api/Divisions/${division.divisionID}`, { ...division })
      console.log(res)
      const returnData = res.data
      if (returnData != null) {
        //getData()
      }
    } catch (e) {
      console.error(e)
    }
  }
  const removeData = async (id: number) => {
    try {
      debugger
      const res = await axios.delete<Division>(`http://119.148.55.93:8091/api/Divisions/${id}`)
      const returnData = res.data
      if (returnData != null) {
        //getData()
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
    <DivisionContext.Provider
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
    </DivisionContext.Provider>
  )
}
export default DivisionContext
