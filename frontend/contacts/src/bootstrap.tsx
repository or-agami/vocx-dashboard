import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './routing/router-factory'
import { RoutingStrategy } from './types'
import { ThemeProvider } from './ThemeProvider'
import './index.scss'

type Props = {
	mountPoint: HTMLElement
	initialPathname?: string
	routingStrategy?: RoutingStrategy
}

const mount = ({ mountPoint, initialPathname, routingStrategy }: Props) => {
	const router = createRouter({ strategy: routingStrategy, initialPathname })
	const root = createRoot(mountPoint)
	root.render(
		<>
			<RouterProvider router={router} />
			{routingStrategy === 'browser' && <ThemeProvider />}
		</>
	)

	return () => queueMicrotask(() => root.unmount())
}

export { mount }
