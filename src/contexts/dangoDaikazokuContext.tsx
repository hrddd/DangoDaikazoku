import { createContext, Dispatch, ReactChild, useReducer } from "react"
import { inialState, reducer, State, ActionType } from "../modules/dangoDaikazoku"

export const DangoDaikazokuContext = createContext<State | undefined>(inialState)

export const DangoDaikazokuUpdateContext = createContext<Dispatch<ActionType>>(null)

export function DangoDaikazokuContextProvider({ children }: { children: ReactChild }) {
  const [dangoDaikazoku, dispatch] = useReducer(reducer, inialState)

  return (
    <DangoDaikazokuContext.Provider value={dangoDaikazoku}>
      <DangoDaikazokuUpdateContext.Provider value={dispatch}>
        {children}
      </DangoDaikazokuUpdateContext.Provider>
    </DangoDaikazokuContext.Provider>
  )
}