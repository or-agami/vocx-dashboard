import React from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { Link, useLocation } from 'react-router-dom'
import { dashboardInEditAtom, openModalAtom } from '../store/event.atom'
import { HiViewGridAdd } from 'react-icons/hi'
import { AiFillCheckCircle, AiFillEdit, AiFillHome } from 'react-icons/ai'
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
			<Link
				className="home-link"
				to="/">
				<AppLogo />
			</Link>
			<div className="btn-container">
				{inDashboardPage ? (
					<div className="flex align-center dash-edit-btns">
						{dashboardInEdit && (
							<button
								className="btn btn-svg btn-add"
								title="Add Aplication"
								onClick={() => openModal(AddPageModal)}>
								<HiViewGridAdd size="18px" />
							</button>
						)}
						<button
							className="btn btn-svg btn-edit"
							title={dashboardInEdit ? 'Done' : 'Edit'}
							onClick={() => setDashInEdit(!dashboardInEdit)}>
							{dashboardInEdit ? <AiFillCheckCircle size="18px" /> : <AiFillEdit size="18px" />}
						</button>
					</div>
				) : (
					<Link
						className="nav-link"
						to="/">
						<div className="btn btn-svg">
							<AiFillHome size="18px" />
						</div>
					</Link>
				)}
			</div>
		</header>
	)
}
