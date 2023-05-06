import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons/lib'

export type SideNavLink = {
	name: string
	path: string
	icon: IconType
}

type Props = {
	navLinks: SideNavLink[]
	iconLink?: string
}

export const SideBar = ({ navLinks, iconLink }: Props) => {
	return (
		<section className="flex-column align-center space-between side-bar">
			<div className="img-container">
				<img
					src={iconLink}
					alt="Dashboard Icon"
				/>
			</div>
			<nav className="nav">
				<ul className="flex-column links">
					{navLinks.map((navLink) => (
						<li
							key={navLink.name}
							className="nav-link-container">
							<NavLink
								className="flex align-center nav-link"
								to={navLink.path}
								end={!navLink.path}>
								<span className="svg-icon-container">
									<navLink.icon size="1.3rem" />
								</span>
								{navLink.name}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}
