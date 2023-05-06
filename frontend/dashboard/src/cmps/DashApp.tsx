import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { pagesService, type Page } from '../services/pages.service'
import { Link } from 'react-router-dom'
import { dashboardInEditAtom } from '../atom/event.atom'
import { FaTrash } from 'react-icons/fa'
import { pagesAtom } from '../atom/pages.atom'
import '../styles/cmps/DashApp.scss'

export default function DashApp({ app }: { app: Page }) {
	const inEditMode = useAtomValue(dashboardInEditAtom)
	const setUserPages = useSetAtom(pagesAtom)

	const onRemoveApp = async () => {
		const newPages = (await pagesService.remove(app.cmpName)) as Page[]
		setUserPages(newPages)
	}

	return (
		<li className={`dash-app ${inEditMode ? 'edit-mode' : ''}`}>
			<Link
				className="app-link"
				to={app.path}>
				<div className="split-layout">
					<h2 className="app-name">{app.name}</h2>
					<div className="img-container">
						<img src={app.icon} />
					</div>
				</div>
			</Link>
			{inEditMode && (
				<button
					className="btn btn-svg btn-remove"
					title="Remove page"
					onClick={onRemoveApp}>
					<FaTrash size="14px" />
				</button>
			)}
		</li>
	)
}
