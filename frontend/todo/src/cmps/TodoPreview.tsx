import React from 'react'
import { Todo } from '../types'

export default function TodoPreview({ todo }: { todo: Todo }) {
	return (
		<li className="flex align-center space-between todo-preview">
			<h1 className="title">{todo.title}</h1>
			<h2>{todo.isDone ? '✅' : '⬜'}</h2>
		</li>
	)
}
