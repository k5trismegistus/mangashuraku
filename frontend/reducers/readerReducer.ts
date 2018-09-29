import { Action } from 'redux'

// Definition of Store

export interface ReaderStore {
  currentPageNumber: number
  leftToRight: Boolean
  singlePage: Boolean
}

export const initialReaderStore = {
  currentPageNumber: 0,
  leftToRight: false,
  singlePage: true,
}

// Definitions of Action & ActionCreator

export enum ACTIONS {
  UPDATE_CURRENT_PAGE_NUMBER = 'UPDATE_CURRENT_PAGE_NUMBER',
  TOGGLE_DIRECTION = 'TOGGLE_DIRECTION',
  TOGGLE_READER_TYPE = 'TOGGLE_READER_TYPE',
}

export type ReaderActions =
  UpdateCurrentPageNumber |
  ToggleDirection |
  ToggleReaderType

interface UpdateCurrentPageNumber extends Action {
  type: ACTIONS.UPDATE_CURRENT_PAGE_NUMBER
  pageNumber: number
}

export const updateCurrentPageNumber = (pageNumber: number): UpdateCurrentPageNumber => ({
  type: ACTIONS.UPDATE_CURRENT_PAGE_NUMBER,
  pageNumber,
})

interface ToggleDirection extends Action {
  type: ACTIONS.TOGGLE_DIRECTION
}

export const toggleDirection = (): ToggleDirection => ({
  type: ACTIONS.TOGGLE_DIRECTION
})

interface ToggleReaderType extends Action {
  type: ACTIONS.TOGGLE_READER_TYPE
}

export const toggleReaderType = (): ToggleReaderType => ({
  type: ACTIONS.TOGGLE_READER_TYPE
})

// Definition of Reducer

export const readerReducer = (state: ReaderStore = initialReaderStore, action: any) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CURRENT_PAGE_NUMBER:
      return Object.assign({}, state, {
        currentPageNumber: action.pageNumber,
      })
      case ACTIONS.TOGGLE_DIRECTION:
        return Object.assign({}, state, {
          leftToRight: !state.leftToRight
        })
      case ACTIONS.TOGGLE_READER_TYPE:
        return Object.assign({}, state, {
          singlePage: !state.singlePage
        })
  }
  return state
}
