export type Todo = {
	_id: string
	title: string
	isDone: boolean
	date: number
}

export type RoutingStrategy = 'memory' | 'browser'
