import { createContext, Dispatch, ReactChild, useReducer } from "react"
import { initialState, reducer, State, ActionType } from "../modules/viewer"

export const ViewerContext = createContext<State>(initialState)

export const ViewerUpdateContext = createContext<Dispatch<ActionType>>(null)

export function ViewerContextProvider({ children }: { children: ReactChild }) {
  const [viewer, dispatch] = useReducer(reducer, initialState)

  return (
    <ViewerContext.Provider value={viewer}>
      <ViewerUpdateContext.Provider value={dispatch}>
        {children}
      </ViewerUpdateContext.Provider>
    </ViewerContext.Provider>
  )
}