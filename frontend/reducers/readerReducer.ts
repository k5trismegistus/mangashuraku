import { Action } from 'redux'

// Definition of Store

export interface ReaderStore {
  currentPageNumber: number
}

export const initialReaderStore = {
  currentPageNumber: 0
}

// Definitions of Action & ActionCreator

export enum ACTIONS {
  UPDATE_CURRENT_PAGE_NUMBER = 'UPDATE_CURRENT_PAGE_NUMBER'
}

export type ReaderActions =
  UpdateCurrentPageNumber

interface UpdateCurrentPageNumber extends Action {
  type: ACTIONS.UPDATE_CURRENT_PAGE_NUMBER
  pageNumber: number
}

export const updateCurrentPageNumber = (pageNumber: number): UpdateCurrentPageNumber => ({
  type: ACTIONS.UPDATE_CURRENT_PAGE_NUMBER,
  pageNumber,
})

// Definition of Reducer

export const readerReducer = (state: ReaderStore = initialReaderStore, action: any) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CURRENT_PAGE_NUMBER:
      return Object.assign({}, state, {
        currentPageNumber: action.pageNumber
      })
  }
  return state
}
