import React, { useEffect, useState } from 'react'
import { Router } from './routing/Router'
import { pagesAtom } from './store/pages.atom'
import { useAtom } from 'jotai'
import { Page, pagesService } from './services/pages.service'
import './styles/style.scss'
import './styles/helpers.scss'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
	const [userPages, setUserPages] = useAtom(pagesAtom)
	const [fetched, setFetched] = useState(false)

	useEffect(() => {
		if (!fetched) fetchData().finally(() => setFetched(true))
	}, [])

	const fetchData = async () => {
		if (userPages.length > 0) return
		const data = (await pagesService.query()) as Page[]
		setUserPages(data)
	}

	if (!fetched) return <></>
	return <Router />
}
