import { Dango } from "../types/Dango"

const SELECT_DANGO = "SELECT_DANGO" as const
const DESELECT_DANGO = "DESELECT_DANGO" as const
const UPDATE_DANGO = "UPDATE_DANGO" as const
const ADD_DANGO = "ADD_DANGO" as const
const REMOVE_DANGO = "REMOVE_DANGO" as const

// action
export const selectDangoAction = (id: Dango['id']) => {
  return { type: SELECT_DANGO, payload: { id } }
}

export const deselectDangoAction = () => {
  return { type: DESELECT_DANGO }
}

export const updateDangoAction = (dango: Dango) => {
  return {
    type: UPDATE_DANGO, payload: dango
  }
}

export const addDangoAction = (dango?: Partial<Omit<Dango, 'id'>>) => {
  return { type: ADD_DANGO, payload: dango }
}

export const removeDangoAction = (id: Dango['id']) => {
  return { type: REMOVE_DANGO, payload: { id } }
}

export type ActionType =
  | ReturnType<typeof selectDangoAction>
  | ReturnType<typeof deselectDangoAction>
  | ReturnType<typeof updateDangoAction>
  | ReturnType<typeof addDangoAction>
  | ReturnType<typeof removeDangoAction>

// reducer
export type State =
  | { dangos: Dango[]; selectedId: null }
  | { dangos: Dango[]; selectedId: string }

const dangoFactory = () => ({
  id: new Date().getTime().toString(16),
  width: 72,
  height: 52,
  fill: '#aaC8B3',
  stroke: '#5D3F35',
  strokeWidth: 8
})
export const initialState: State = { dangos: [], selectedId: null }

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case SELECT_DANGO:
      return {
        ...state,
        selectedId: action.payload.id
      }
    case DESELECT_DANGO:
      return {
        ...state,
        selectedId: null
      }
    case UPDATE_DANGO:
      const targetIndex = state.dangos.findIndex(dango => dango.id === action.payload.id)
      return targetIndex >= 0 ? {
        ...state,
        dangos: [
          ...state.dangos.slice(0, targetIndex),
          { ...action.payload },
          ...state.dangos.slice(targetIndex + 1)
        ]
      } : state
    case ADD_DANGO:
      return {
        ...state,
        dangos: [
          ...state.dangos,
          {
            ...dangoFactory(),
            ...action.payload
          }
        ]
      }
    case REMOVE_DANGO:
      return {
        ...state,
        dangos: state.dangos.filter(dango => dango.id !== action.payload.id)
      }
    default:
      return state
  }
}