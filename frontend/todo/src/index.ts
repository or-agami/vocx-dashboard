import('./bootstrap').then(({ mount }) => {
	const localRoot = document.getElementById('todo-local')

	mount({
		mountPoint: localRoot!,
		routingStrategy: 'browser'
	})
})

export {}
