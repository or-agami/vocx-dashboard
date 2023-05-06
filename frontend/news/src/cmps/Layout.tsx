import React from 'react'
import { SideBar, SideNavLink } from './SideBar'
import { TiStarburst } from 'react-icons/ti'
import { AiFillFire, AiFillHeart } from 'react-icons/ai'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { NavigationManager } from './NavigationManager'

const navLinks: SideNavLink[] = [
	{
		name: 'For you',
		path: '',
		icon: AiFillFire
	},
	{
		name: 'New',
		path: 'new',
		icon: TiStarburst
	},
	{
		name: 'Saved',
		path: 'saved',
		icon: AiFillHeart
	}
]

export const Layout = () => {
	return (
		<div className="news">
			<SideBar
				navLinks={navLinks}
				iconLink="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/png/photoview.png"
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
