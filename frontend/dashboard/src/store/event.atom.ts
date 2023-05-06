import { atom } from 'jotai'
import { type LazyCmp } from '../cmps/ModalDialog'

export const dashboardInEditAtom = atom(false)

export const openModalAtom = atom<LazyCmp>('none')
