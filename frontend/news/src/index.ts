import('./bootstrap').then(({ mount }) => {
	const localRoot = document.getElementById('news-local')

	mount({
		mountPoint: localRoot!,
		routingStrategy: 'browser'
	})
})

export {}
