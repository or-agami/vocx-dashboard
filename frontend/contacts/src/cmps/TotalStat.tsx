import React from 'react'
import { IconType } from 'react-icons/lib'

type Theme = {
	theme?: {
		primary: string
		secondary: string
	}
}

export interface Total extends Theme {
	title: string
	icon: IconType
	value: number
}

const defaultTheme = { primary: '#346263', secondary: '#2fe5a7' }

export default function TotalStats({ total }: { total: Total }) {
	if (!total.theme) total.theme = defaultTheme

	return (
		<div className="flex align-center total-stat">
			<div
				style={{ backgroundColor: total.theme.primary, color: total.theme.secondary }}
				className="svg-icon-container">
				<total.icon
					size="1.2rem"
					strokeWidth={1.2}
				/>
			</div>
			<div className="flex-column content">
				<h2 className="value">{total.value}</h2>
				<h5 className="title">{total.title}</h5>
			</div>
		</div>
	)
}
