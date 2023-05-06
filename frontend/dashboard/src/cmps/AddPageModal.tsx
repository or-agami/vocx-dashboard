import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { pagesAtom, pagesToAddAtom } from '../store/pages.atom'
import { pagesService, type Page } from '../services/pages.service'
import '../styles/cmps/AddPageModal.scss'

export default function AddPageModal() {
	const pagesToAdd = useAtomValue(pagesToAddAtom)
	const setUserPages = useSetAtom(pagesAtom)

	const onAddApp = async (page: Page) => {
		const { cmpName, description } = page
		const newPages = await pagesService.add({ cmpName, description })
		if (newPages && newPages.length > 0) setUserPages(newPages)
	}
	return (
		<div className="add-page-modal">
			<h1 className="title">Add a new page</h1>
			<p className="description">
				Pages are the main element of the dashboard. you can add as many pages as you want
			</p>
			<div className="flex align-center justify-center available-pages">
				{pagesToAdd.length === 0 ? (
					<p className="no-pages">You have added all available pages</p>
				) : (
					pagesToAdd.map((page) => (
						<button
							className="flex-column align-center btn btn-add-page"
							key={page.cmpName}
							onClick={() => onAddApp(page)}>
							<div className="img-container">
								<img
									src={page.icon}
									alt="Page Icon"
								/>
							</div>
							<p className="page-name">{page.name}</p>
						</button>
					))
				)}
			</div>
		</div>
	)
}
