import { Page } from './services/pages.service'
import { lazy } from 'react'

import { mount as contactMount } from 'contacts/ContactsIndex'
import { mount as newsMount } from 'news/NewsIndex'
import { mount as todoMount } from 'todo/TodoIndex'

const RemoteContainer = lazy(() => import('./cmps/RemoteContainer'))
export const availablePages: Page[] = [
	{
		name: 'Contacts',
		path: '/contacts',
		icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/svg/google-contacts.svg',
		cmpName: 'contacts',
		cmp: RemoteContainer,
		mount: contactMount,
		description: 'description placeholder for contacts'
	},
	{
		name: 'News',
		path: '/news',
		icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/png/photoview.png',
		cmpName: 'news',
		cmp: RemoteContainer,
		mount: newsMount,
		description: 'description placeholder for news'
	},
	{
		name: 'Todo',
		path: '/todo',
		icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/png/microsoft-todo.png',
		cmpName: 'todo',
		cmp: RemoteContainer,
		mount: todoMount,
		description: 'description placeholder for todo'
	}
]
