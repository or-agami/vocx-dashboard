import React from 'react'
import TodoPreview from './TodoPreview'
import { Todo } from '../types'

export default function TodoList({ todos }: { todos: Todo[] }) {
	return (
		<div className="todo-list">
			<h1 className="title">Todos:</h1>
			<ul>
				{todos.map((todo) => (
					<div
						key={todo._id}
						className="todo-preview-container">
						<TodoPreview todo={todo} />
					</div>
				))}
			</ul>
		</div>
	)
}
