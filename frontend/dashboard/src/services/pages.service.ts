import { availablePages } from '../pages.const'
import { httpService } from './http.service'
import { ComponentType, type LazyExoticComponent } from 'react'
import { toast } from 'react-toastify'

export const pagesService = {
	query,
	add,
	remove
}

const BASE_URL = 'page/'

export type PageDes = {
	cmpName: string
	description: string
}

export interface Page extends PageDes {
	name: string
	path: string
	icon: string
	mount?: () => Promise<any>
	cmp: LazyExoticComponent<ComponentType<any>>
}

async function query() {
	try {
		const pagesDescptions = (await httpService.get(BASE_URL)) as PageDes[]
		console.log('pagesDescptions:', pagesDescptions)
		return _setPagesData(pagesDescptions)
	} catch (error) {
		_handleError(error, 'Cannot get pages')
	}
}

async function add(page: PageDes) {
	const toastId = toast.loading(`Adding ${_toTitleCase(page.cmpName)}`)
	try {
		const pages = (await httpService.post(BASE_URL, page)) as PageDes[]
		const successMsg = `${_toTitleCase(page.cmpName)} page added successfully`
		return _handleSuccess(pages, successMsg, toastId)
	} catch (error) {
		const errMsg = `Cannot add ${_toTitleCase(page.cmpName)}`
		_handleError(error, errMsg, toastId)
	}
}

async function remove(cmpName: string) {
	const toastId = toast.loading(`Removing ${_toTitleCase(cmpName)}`)
	try {
		const pages = (await httpService.delete(BASE_URL + cmpName)) as PageDes[]
		const successMsg = `${_toTitleCase(cmpName)} page removed successfully`
		return _handleSuccess(pages, successMsg, toastId)
	} catch (error) {
		const errMsg = `Cannot remove ${_toTitleCase(cmpName)}`
		_handleError(error, errMsg, toastId)
	}
}

function _setPagesData(pagesDescptions: PageDes[]): Page[] {
	return pagesDescptions.map(({ cmpName, description }) => ({
		description,
		...availablePages.find((page) => page.cmpName === cmpName)
	})) as Page[]
}

function _handleSuccess(data: PageDes[], msg: string, toastId?: string | number) {
	if (toastId) {
		toast.update(toastId, {
			render: msg,
			type: 'success',
			hideProgressBar: false,
			closeButton: true,
			closeOnClick: true,
			autoClose: 5000,
			isLoading: false
		})
	} else toast(msg, { type: 'success' })
	return _setPagesData(data)
}

function _handleError(error: any, msg: string, toastId?: string | number) {
	if (toastId) {
		toast.update(toastId, {
			render: `${msg}: ${error.message}`,
			type: 'error',
			closeButton: true,
			hideProgressBar: false,
			closeOnClick: true,
			autoClose: 5000,
			isLoading: false
		})
	} else {
		toast(`${msg}: ${error.message}`, { type: 'error' })
		throw error
	}
}

function _toTitleCase(cmpName: string) {
	return cmpName.slice(0, 1).toUpperCase() + cmpName.slice(1)
}
