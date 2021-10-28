import { atom } from "recoil"


export const pageState = atom({
    key: 'page',
    default: 1
})

export const searchQueryState = atom({
    key: 'searchQuery',
    default: ''
})