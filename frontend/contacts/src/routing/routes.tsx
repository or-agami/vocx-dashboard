import React, { lazy } from 'react'
import { Layout } from '../cmps/Layout'

const Home = lazy(() => import('../cmps/Home'))
const ContactList = lazy(() => import('../cmps/ContactList'))
const ContactDetails = lazy(() => import('../cmps/ContactDetails'))

export const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'my-contacts',
				element: <ContactList />
			},
			{
				path: 'my-contacts/:contactId',
				element: <ContactDetails />
			}
		]
	}
]
