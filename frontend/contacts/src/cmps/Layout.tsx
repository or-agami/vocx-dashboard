import React from 'react'
import { SideBar, SideNavLink } from './SideBar'
import { AiFillHome } from 'react-icons/ai'
import { RiContactsFill } from 'react-icons/ri'
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
		name: 'Contacts',
		path: 'my-contacts',
		icon: RiContactsFill
	}
]

export const Layout = () => {
	return (
		<div className="contacts">
			<SideBar
				navLinks={navLinks}
				iconLink="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/svg/google-contacts.svg"
			/>
			<main>
				<NavigationManager>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Outlet />
					</Suspense>
				</NavigationManager>
			</main>
		</div>
	)
}
