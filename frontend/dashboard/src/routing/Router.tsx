import React, { lazy } from 'react'
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom'
import { pagesAtom } from '../store/pages.atom'
import { useAtomValue } from 'jotai'
import { Layout } from '../cmps/Layout'
import ErrorPage from '../pages/ErrorPage'
import Dashboard from '../pages/Dashboard'

const RemoteContainer = lazy(() => import('../cmps/RemoteContainer'))

export function Router() {
	const userPages = useAtomValue(pagesAtom)

	//? Using new router provider react-router-dom api for useRouteError, for more: https://reactrouter.com/en/main/hooks/use-route-error
	return (
		<RouterProvider
			router={createBrowserRouter(
				createRoutesFromElements(
					<Route
						path="/"
						element={<Layout />}
						errorElement={<ErrorPage />}>
						<Route
							index
							element={<Dashboard />}
							errorElement={<ErrorPage />}
						/>
						{userPages.map((page) => (
							<Route
								key={page.cmpName}
								path={`${page.path}/*`}
								element={
									<RemoteContainer
										remoteName={page.cmpName}
										remotePath={page.path}
										importFunction={page.importFunction}
									/>
								}
								errorElement={<ErrorPage />}
							/>
						))}
					</Route>
				)
			)}
		/>
	)
}
