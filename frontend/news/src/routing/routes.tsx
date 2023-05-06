import React, { Suspense, lazy } from 'react'
import { Layout } from '../cmps/Layout'
import { RouteObject } from 'react-router-dom'

const NewsList = lazy(() => import('../cmps/NewsList'))
const ArticleDetails = lazy(() => import('../cmps/ArticleDetails'))
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
				element: <NewsList category="hot" />
			},
			{
				path: 'new',
				element: <NewsList category="new" />
			},
			{
				path: 'saved',
				element: <NewsList category="saved" />
			},
			{
				path: ':articleId',
				element: <ArticleDetails />
			}
		]
	}
]
