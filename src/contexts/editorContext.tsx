import { createContext, Dispatch, ReactChild, useReducer } from "react"
import { initialState, reducer, State, ActionType } from "../modules/editor"

export const EditorContext = createContext<State>(initialState)

export const EditorUpdateContext = createContext<Dispatch<ActionType>>(() => void (0))

export function EditorContextProvider({ children }: { children: ReactChild }) {
  const [editor, dispatch] = useReducer(reducer, initialState)

  return (
    <EditorContext.Provider value={editor}>
      <EditorUpdateContext.Provider value={dispatch}>
        {children}
      </EditorUpdateContext.Provider>
    </EditorContext.Provider>
  )
}