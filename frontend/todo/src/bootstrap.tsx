import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './routing/router-factory'
import { RoutingStrategy } from './types'
import './index.scss'
import './style.css'
import './helpers.scss'

type Props = {
	mountPoint: HTMLElement
	initialPathname?: string
	routingStrategy?: RoutingStrategy
}

const mount = ({ mountPoint, initialPathname, routingStrategy }: Props) => {
	const router = createRouter({ strategy: routingStrategy, initialPathname })
	const root = createRoot(mountPoint)
	root.render(<RouterProvider router={router} />)

	return () => queueMicrotask(() => root.unmount())
}

export { mount }
