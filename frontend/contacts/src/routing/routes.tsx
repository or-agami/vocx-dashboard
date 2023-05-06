import React, { lazy, Suspense } from 'react'
import { Layout } from '../cmps/Layout'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../cmps/Home'))
const ContactList = lazy(() => import('../cmps/ContactList'))
const ErrorPage = lazy(() => import('../cmps/ErrorPage'))

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		errorElement: (
			<Suspense>
				<ErrorPage />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'my-contacts',
				element: <ContactList />
			}
		]
	}
]
