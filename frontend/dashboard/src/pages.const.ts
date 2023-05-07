import { Page } from './services/pages.service'

export const availablePages: Page[] = [
	{
		name: 'Contacts',
		path: '/contacts',
		icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/svg/google-contacts.svg',
		cmpName: 'contacts',
		importFunction: () => import('contacts/ContactsIndex'),
		description: 'Simple demo app for contact management'
	},
	{
		name: 'News',
		path: '/news',
		icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/png/photoview.png',
		cmpName: 'news',
		importFunction: () => import('news/NewsIndex'),
		description: 'Simple demo app for news aggregator'
	},
	{
		name: 'Todo',
		path: '/todo',
		icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/png/microsoft-todo.png',
		cmpName: 'todo',
		importFunction: () => import('todo/TodoIndex'),
		description: 'Simple Todos demo app'
	}
]
