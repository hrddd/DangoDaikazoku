import { createContext, Dispatch, ReactChild, useReducer } from "react"
import { initialState, reducer, State, ActionType } from "../modules/dangoDaikazoku"

export const DangoDaikazokuContext = createContext<State | undefined>(initialState)

export const DangoDaikazokuUpdateContext = createContext<Dispatch<ActionType>>(null)

export function DangoDaikazokuContextProvider({ children }: { children: ReactChild }) {
  const [dangoDaikazoku, dispatch] = useReducer(reducer, initialState)

  return (
    <DangoDaikazokuContext.Provider value={dangoDaikazoku}>
      <DangoDaikazokuUpdateContext.Provider value={dispatch}>
        {children}
      </DangoDaikazokuUpdateContext.Provider>
    </DangoDaikazokuContext.Provider>
  )
}