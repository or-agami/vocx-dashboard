import { atom } from 'jotai'
import { type Page } from '../services/pages.service'
import { availablePages } from '../pages.const'

export const pagesAtom = atom<Page[]>([])

//? Contains the available pages the user can add
export const pagesToAddAtom = atom((get) => {
	const pages = get(pagesAtom)
	const existingPagesNames = pages.map((page) => page.cmpName)
	return availablePages.filter((page) => !existingPagesNames.includes(page.cmpName))
})
