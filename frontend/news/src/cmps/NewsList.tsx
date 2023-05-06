import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NewsArticle, newsService } from '../news.service'

export default function NewsList({ category = 'new' }: { category?: 'saved' | 'new' | 'hot' }) {
	const savedIds = ['12345', '24680'] //? Demo of saved articles

	const [articles, setArticles] = useState<NewsArticle[]>([])

	useEffect(() => {
		if (articles.length === 0) fetchData()
	}, [])

	const fetchData = async () => {
		const data = await newsService.query()
		setArticles(data)
	}

	const sortArticlesForDisplay = () => {
		const articlesClone = [...articles]
		switch (category) {
			case 'saved':
				return articlesClone.filter((article) => savedIds.includes(article._id))
			case 'new':
				return articlesClone.sort((article) => article.publishedAt)
			case 'hot':
				return articlesClone
			default:
				return articlesClone
		}
	}

	// Todo(low): loader
	return (
		<div className="news-list">
			<ul>
				{articles.length > 0 &&
					sortArticlesForDisplay().map((article) => (
						<li
							key={article._id}
							className="article-preview-container">
							<ArticlePreview article={article} />
						</li>
					))}
			</ul>
		</div>
	)
}

function ArticlePreview({ article }: { article: NewsArticle }) {
	return (
		<Link to={`../${article._id}`}>
			<article className="flex article-preview">
				<div className="img-container">
					<img
						className="profile-img"
						src={`https://picsum.photos/seed/${article._id}/160/200`}
						alt="User profile"
					/>
				</div>
				<div className="flex-column space-between content-container">
					<h1 className="title">{article.title}</h1>
					<p className="content">{article.content}</p>
				</div>
			</article>
		</Link>
	)
}
