import React from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { Link, useLocation } from 'react-router-dom'
import { dashboardInEditAtom, openModalAtom } from '../atom/event.atom'
import { HiViewGridAdd } from 'react-icons/hi'
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai'
import { lazy } from 'react'
import { AppLogo } from './AppLogo'
import '../styles/cmps/AppHeader.scss'

const AddPageModal = lazy(() => import('./AddPageModal'))

export default function AppHeader() {
	const [dashboardInEdit, setDashInEdit] = useAtom(dashboardInEditAtom)
	const openModal = useSetAtom(openModalAtom)
	const location = useLocation()

	const inDashboardPage = location.pathname === '/'

	return (
		<header className="flex align-center space-between app-header">
			<AppLogo />
			<div className="btn-container">
				{inDashboardPage ? (
					<div className="flex align-center dash-edit-btns">
						<button
							className="btn btn-svg btn-edit"
							onClick={() => setDashInEdit(!dashboardInEdit)}>
							{dashboardInEdit ? <AiFillCheckCircle size="18px" /> : <AiFillEdit size="18px" />}
						</button>
						{dashboardInEdit && (
							<button
								className="btn btn-svg btn-add"
								onClick={() => openModal(AddPageModal)}>
								<HiViewGridAdd size="18px" />
							</button>
						)}
					</div>
				) : (
					<Link
						className="nav-link"
						to="/">
						Home
					</Link>
				)}
			</div>
		</header>
	)
}
