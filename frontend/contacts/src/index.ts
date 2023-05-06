import('./bootstrap').then(({ mount }) => {
	const localRoot = document.getElementById('contacts-local')

	mount({
		mountPoint: localRoot!,
		routingStrategy: 'browser'
	})
})

export {}
