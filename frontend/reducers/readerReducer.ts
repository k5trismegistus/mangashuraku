import { Action } from 'redux'

// Definition of Store

export interface ReaderStore {
  currentPageNumber: number
  leftToRight: boolean
  singlePage: boolean
  showingQuickBar: boolean
  showingMenu: boolean
}

export const initialReaderStore = {
  currentPageNumber: 1,
  leftToRight: false,
  singlePage: true,
  showingQuickBar: false,
  showingMenu: false,
}

// Definitions of Action & ActionCreator

export enum ACTIONS {
  UPDATE_CURRENT_PAGE_NUMBER = 'UPDATE_CURRENT_PAGE_NUMBER',
  TOGGLE_DIRECTION = 'TOGGLE_DIRECTION',
  TOGGLE_READER_TYPE = 'TOGGLE_READER_TYPE',
  TOGGLE_QUICKBAR = 'TOGGLE_QUICKBAR',
  TOGGLE_MENU = 'TOGGLE_MENU',
  CLEAR_STATE = 'CLEAR_STATE',
}

export type ReaderActions =
  UpdateCurrentPageNumber |
  ToggleDirection |
  ToggleReaderType |
  ToggleQuickBar |
  ToggleMenu |
  ClearState

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

interface ToggleQuickBar extends Action {
  type: ACTIONS.TOGGLE_QUICKBAR
}

export const toggleQuickBar = (): ToggleQuickBar => ({
  type: ACTIONS.TOGGLE_QUICKBAR
})

interface ToggleMenu extends Action {
  type: ACTIONS.TOGGLE_MENU
}

export const toggleMenu = (): ToggleMenu => ({
  type: ACTIONS.TOGGLE_MENU
})

interface ClearState extends Action {
  type: ACTIONS.CLEAR_STATE
}

export const clearState = (): ClearState => ({
  type: ACTIONS.CLEAR_STATE
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
      case ACTIONS.TOGGLE_QUICKBAR:
        return Object.assign({}, state, {
          showingQuickBar: !state.showingQuickBar
        })
      case ACTIONS.TOGGLE_MENU:
        return Object.assign({}, state, {
          showingMenu: !state.showingMenu
        })
      case ACTIONS.CLEAR_STATE:
        return initialReaderStore
  }
  return state
}
