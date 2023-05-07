import React from 'react'
import { SideBar, SideNavLink } from './SideBar'
import { AiFillHome } from 'react-icons/ai'
import { FaCheckSquare, FaSquare, FaTasks } from 'react-icons/fa'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { NavigationManager } from './NavigationManager'

const navLinks: SideNavLink[] = [
	{
		name: 'Home',
		path: '',
		icon: AiFillHome
	},
	{
		name: 'All Todos',
		path: 'all',
		icon: FaTasks
	},
	{
		name: 'Remains',
		path: 'remain',
		icon: FaSquare
	},
	{
		name: 'Done',
		path: 'done',
		icon: FaCheckSquare
	}
]

export const Layout = () => {
	return (
		<div className="todo">
			<SideBar
				navLinks={navLinks}
				iconLink="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/png/microsoft-todo.png"
			/>
			<main>
				<NavigationManager>
					<Suspense>
						<Outlet />
					</Suspense>
				</NavigationManager>
			</main>
		</div>
	)
}
