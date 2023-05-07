import React from 'react'
import AppHeader from './AppHeader'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import ModalDialog from './ModalDialog'
import { ToastContainer } from 'react-toastify'

export const Layout = () => {
	return (
		<div className="main-layout">
			<AppHeader />
			<Suspense>
				<Outlet />
			</Suspense>
			<ModalDialog />
			<ToastContainer
				theme="dark"
				position="bottom-right"
				draggable
				closeOnClick
				newestOnTop
			/>
		</div>
	)
}
