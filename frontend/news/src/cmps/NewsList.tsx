import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NewsArticle, newsService } from '../services/news.service'

export default function NewsList({ category = 'new' }: { category?: 'saved' | 'new' | 'hot' }) {
	const savedIds = ['12345', '24680'] //? Demo of saved articles id

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
	return (
		<div className="news-list">
			{articles.length > 0 ? (
				<ul>
					{sortArticlesForDisplay().map((article) => (
						<li
							key={article._id}
							className="article-preview-container">
							<ArticlePreview article={article} />
						</li>
					))}
				</ul>
			) : (
				<SkeletonLoader />
			)}
		</div>
	)
}

const ArticlePreview = ({ article }: { article: NewsArticle }) => {
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

const SkeletonLoader = () => {
	const loadersCount = 3
	return (
		<ul>
			{[...Array(loadersCount)].map((_x, i) => (
				<li key={i}>
					<article className="flex article-preview article-skeleton-loader">
						<div className="img-container animated-background"></div>
						<div className="flex-column space-between content-container">
							<div className="title animated-background"></div>
							<div>
								<div className="content animated-background"></div>
								<div className="content animated-background"></div>
								<div className="content animated-background"></div>
								<div className="content animated-background"></div>
							</div>
						</div>
					</article>
				</li>
			))}
		</ul>
	)
}
