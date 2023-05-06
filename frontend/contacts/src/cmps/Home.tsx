import React from 'react'
import TotalStats from './TotalStat'
import { TfiStatsUp } from 'react-icons/tfi'

const totalDemoData = {
	title: 'Total Contacts',
	icon: TfiStatsUp,
	value: 15
}

export default function Home() {
	return (
		<div className="home">
			<TotalStats total={totalDemoData} />
		</div>
	)
}
