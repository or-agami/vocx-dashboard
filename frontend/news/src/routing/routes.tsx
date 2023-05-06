import React, { lazy } from 'react'
import { Layout } from '../cmps/Layout'

const NewsList = lazy(() => import('../cmps/NewsList'))
const ArticleDetails = lazy(() => import('../cmps/ArticleDetails'))

export const routes = [
	{
		path: '/',
		element: <Layout />,
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
