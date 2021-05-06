import { Dango } from "../types/Dango"

const SET_ORIGINAL = "SET_ORIGINAL" as const
const CLEAR_ORIGINAL = "CLEAR_ORIGINAL" as const
const UPDATE_MODIFED = "UPDATE_MODIFED" as const
const SWITCH_RANDOMIZE = "SWITCH_RANDOMIZE" as const

type Modified = Omit<Dango, 'id'>;

// action
export const setOriginalAction = (dango: Dango) => {
  return { type: SET_ORIGINAL, payload: dango }
}

export const clearOriginalAction = () => {
  return { type: CLEAR_ORIGINAL }
}

export const updateModifiedAction = (modifiedParams: Partial<Modified>) => {
  return {
    type: UPDATE_MODIFED, payload: modifiedParams
  }
}

export const switchRandomizeAction = (randomize: boolean) => {
  return {
    type: SWITCH_RANDOMIZE, payload: {
      randomize
    }
  }
}

export type ActionType =
  | ReturnType<typeof setOriginalAction>
  | ReturnType<typeof clearOriginalAction>
  | ReturnType<typeof updateModifiedAction>
  | ReturnType<typeof switchRandomizeAction>

// reducer
export type State =
  | {
    original: null,
    modified: null,
    randomize: boolean
  }
  | {
    original: Dango,
    modified: Modified,
    randomize: boolean
  }

export const initialState: State = {
  original: null,
  modified: null,
  randomize: true
}

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case SET_ORIGINAL: {
      const original = action.payload
      return {
        ...state,
        original: original,
        modified: {
          width: original.width,
          height: original.height,
          fill: original.fill,
          stroke: original.stroke,
          strokeWidth: original.strokeWidth,
        },
      }
    }
    case CLEAR_ORIGINAL:
      return {
        ...state,
        original: null,
        modified: null,
      }
    case UPDATE_MODIFED:
      const modifiedParams = action.payload
      if (!state.modified) return state
      return {
        ...state,
        modified: {
          ...state.modified,
          ...modifiedParams
        },
      }
    case SWITCH_RANDOMIZE:
      return {
        ...state,
        randomize: action.payload.randomize
      }
    default:
      return state
  }
}