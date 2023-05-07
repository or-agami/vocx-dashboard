import { storageService } from './async-storage.service'

const STORAGE_KEY = 'articles'

export const newsService = {
	query,
	getById,
	save,
	remove
}
//? mock service for http request (example in query fn)

export type NewsArticle = {
	_id: string
	title: string
	content: string
	publishedAt: number
}

//? Demo Data
const demoArtilcles: NewsArticle[] = [
	{
		_id: '12345',
		title: 'Lorem Ipsum',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper purus eget nisl blandit consequat. Sed eget tincidunt massa, vel commodo ante. Ut dapibus semper sapien, vitae euismod velit facilisis et. Donec auctor justo vel sapien lobortis interdum. Sed mollis, purus nec pulvinar facilisis, nulla erat lobortis risus, id malesuada sapien tortor vel dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eget tellus eu lorem interdum pretium. Sed sollicitudin sapien eget libero laoreet tempor.',
		publishedAt: 1679443200000
	},
	{
		_id: '67890',
		title: 'Lorem Ipsum Dolor Sit Amet',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel ante ut purus lobortis hendrerit vitae vel enim. Ut ornare felis in justo pulvinar tincidunt. Suspendisse nec sem id mi faucibus auctor. Duis eu dolor tincidunt, vestibulum nisi in, vestibulum mauris. Etiam non enim nunc. Sed auctor sapien velit, eu vestibulum metus tempus eget. Nunc id ligula a est consectetur malesuada. Nullam a malesuada turpis, et euismod ipsum. Donec lobortis ligula in velit pretium, ut tristique magna malesuada. Sed luctus elit nec risus convallis euismod. Suspendisse potenti. Aenean facilisis maximus nulla, sit amet ultrices lorem fringilla vel.',
		publishedAt: 1681257600000
	},
	{
		_id: '24680',
		title: 'Sed Diam Nonummy Nibh',
		content:
			'Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
		publishedAt: 1672963200000
	},
	{
		_id: '13579',
		title: 'Lorem Ipsum Ipsum',
		content:
			'Lorem ipsum ipsum, et nunc vulputate purus, a pellentesque tortor diam sed magna. Aenean tempus odio sit amet velit hendrerit tincidun',
		publishedAt: 1675641600000
	}
]

async function query(): Promise<NewsArticle[]> {
	// return httpService.get('articles') //? 👈 Example for backend request

	//? Only for local storage use
	const articles = (await storageService.get(STORAGE_KEY)) as NewsArticle[]
	if (articles && articles.length > 0) return articles

	//? 👇 Save demo data to local storage if it's empty
	_saveDemoData()
	return demoArtilcles
}

function getById(articleId: string) {
	return storageService.get(STORAGE_KEY, articleId)
}

function remove(articleId: string) {
	return storageService.remove(STORAGE_KEY, articleId)
}

function save(article: NewsArticle) {
	return article._id
		? storageService.put(STORAGE_KEY, article)
		: storageService.post(STORAGE_KEY, article)
}

function _saveDemoData() {
	storageService.postMany(STORAGE_KEY, demoArtilcles)
}
