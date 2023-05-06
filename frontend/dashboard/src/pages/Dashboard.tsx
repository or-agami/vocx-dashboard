import React from 'react'
import { useAtomValue } from 'jotai'
import DashApp from '../cmps/DashApp'
import { pagesAtom } from '../store/pages.atom'
import '../styles/pages/Dashboard.scss'

export default function Dashboard() {
	const userPages = useAtomValue(pagesAtom)

	return (
		<main className="dashboard">
			{userPages.length > 0 ? (
				<ul className="flex align-center justify-center app-list">
					{userPages.map((page) => (
						<DashApp
							key={page.path}
							app={page}
						/>
					))}
				</ul>
			) : (
				<div className="no-pages">
					<h1 className="title">You don't have any pages yet</h1>
					<p className="description">
						Add your first page now by clicking edit, add app and choose your apps from the list
					</p>
				</div>
			)}
		</main>
	)
}
