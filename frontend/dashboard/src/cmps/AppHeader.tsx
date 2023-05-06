import React from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Link, useLocation } from 'react-router-dom'
import { dashboardInEditAtom, openModalAtom } from '../store/event.atom'
import { HiViewGridAdd } from 'react-icons/hi'
import { AiFillCheckCircle, AiFillEdit, AiFillHome } from 'react-icons/ai'
import { lazy } from 'react'
import { AppLogo } from './AppLogo'
import { pagesAtom } from '../store/pages.atom'
import '../styles/cmps/AppHeader.scss'

const AddPageModal = lazy(() => import('./AddPageModal'))

export default function AppHeader() {
	return (
		<header className="flex align-center space-between app-header">
			<Link
				className="home-link"
				to="/">
				<AppLogo />
			</Link>
			<div className="btn-container">
				<HeaderBtns/>
			</div>
		</header>
	)
}

const HeaderBtns = () => {
	const [dashboardInEdit, setDashInEdit] = useAtom(dashboardInEditAtom)
	const openModal = useSetAtom(openModalAtom)
	const location = useLocation()
	const userPages = useAtomValue(pagesAtom)

	const inDashboardPage = location.pathname === '/'

	if (!inDashboardPage)
		return (
			<Link
				className="nav-link"
				to="/">
				<div className="btn btn-svg">
					<AiFillHome size="18px" />
				</div>
			</Link>
		)

	if (dashboardInEdit)
		return (
			<div className="flex align-center dash-edit-btns">
				<button
					className={`btn btn-svg btn-add ${userPages.length === 0 ? 'btn-animation' : ''}`}
					title="Add Aplication"
					onClick={() => openModal(AddPageModal)}>
					<HiViewGridAdd size="18px" />
				</button>
				<button
					className='btn btn-svg btn-done'
					title='Done'
					onClick={() => setDashInEdit(false)}>
					<AiFillCheckCircle size="18px" />
				</button>
			</div>
		)

	return (
		<button
			className={`btn btn-svg btn-edit ${userPages.length === 0 ? 'btn-animation' : ''}`}
			title='Edit'
			onClick={() => setDashInEdit(true)}>
			{dashboardInEdit ? <AiFillCheckCircle size="18px" /> : <AiFillEdit size="18px" />}
		</button>
	)
}
