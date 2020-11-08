import React, { useState, createContext, useContext } from 'react'
import { ToggleMode } from '../types'

interface State {
  selected?: ToggleMode
  mobileUpload?: boolean
}
interface Store {
  selected: ToggleMode
  mobileUpload: boolean
  set: (s: State) => void
}
const initialState: Store = {
  selected: 'normal',
  mobileUpload: false,
  set: (s: State) => { } // stub
}

const context = createContext(initialState)

export function useStore(): Store {
  return useContext(context)
}

interface Props {
  children: React.ReactNode
}
export function StoreProvider({ children }: Props) {
  const [state, setState] = useState(initialState)

  function set(newState: State) {
    setState(current => {
      return { ...current, ...newState }
    })
  }
  return <context.Provider value={{
    ...state, set
  }}>
    {children}
  </context.Provider>
}
