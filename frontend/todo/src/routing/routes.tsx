import React, { lazy } from 'react'
import { Layout } from '../cmps/Layout'
import { Todo } from '../types'

const Home = lazy(() => import('../cmps/Home'))
const TodoList = lazy(() => import('../cmps/TodoList'))

//? Demo Data
const todos: Todo[] = [
	{
		_id: '269f443a5d64b32ca',
		title: 'Test backend API endpoints',
		isDone: true,
		date: 1682934310015
	},
	{
		_id: '25f6ae9aa24a99fde',
		title: 'Hallie Mclean',
		isDone: false,
		date: 1682961310015
	},
	{
		_id: '252d6acddd183d319',
		title: 'Parsons Norris',
		isDone: true,
		date: 1682964390015
	},
	{
		_id: '2ed1cf349f0b47b4d',
		title: 'Rachel Lowe',
		isDone: false,
		date: 1682864310015
	}
]

export const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home todos={todos} />
			},
			{
				path: 'all',
				element: <TodoList todos={todos} />
			},
			{
				path: 'done',
				element: <TodoList todos={todos.filter((todo) => todo.isDone)} />
			},
			{
				path: 'remain',
				element: <TodoList todos={todos.filter((todo) => !todo.isDone)} />
			}
		]
	}
]
