import React from 'react'
import TotalStats, { Total } from './TotalStat'
import { FaCheckSquare, FaSquare, FaTasks } from 'react-icons/fa'
import { Todo } from '../types'

export default function Home({ todos }: { todos: Todo[] }) {
	const totalTasks = todos.length
	const doneTasks = todos.filter((todo) => todo.isDone).length

	const totals: Total[] = [
		{
			icon: FaTasks,
			title: 'Tasks',
			value: totalTasks,
			theme: {
				primary: '#2f3467',
				secondary: '#5d59ff'
			}
		},
		{
			icon: FaCheckSquare,
			title: 'Done',
			value: doneTasks
		},
		{
			icon: FaSquare,
			title: 'Remaining',
			value: totalTasks - doneTasks,
			theme: {
				primary: '#724d70',
				secondary: '#ff69b4'
			}
		}
	]
	return (
		<div className="home">
			<div className="flex align-center stats-container">
				{totals.map((total) => (
					<TotalStats
						key={total.title}
						total={total}
					/>
				))}
			</div>
		</div>
	)
}
