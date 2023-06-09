import React from 'react'
import { useParams } from 'react-router-dom'
import { newsService, type NewsArticle } from '../services/news.service'
import { useEffect, useState } from 'react'

export default function ArticleDetails() {
	const { articleId } = useParams()

	const [article, setArticle] = useState<NewsArticle>()

	useEffect(() => {
		if (!article) fetchData()
	}, [])

	const fetchData = async () => {
		if (!articleId) return
		const data = (await newsService.getById(articleId)) as NewsArticle
		setArticle(data)
	}

	if (!article) return <SkeletonLoader />
	return (
		<article className="flex-column article-details">
			<div className="img-container">
				<img
					className="article-hero"
					src={`https://picsum.photos/seed/${article._id}/700/200`}
					alt="Article hero"
				/>
			</div>
			<div className="flex-column space-between content-container">
				<h1 className="title">{article.title}</h1>
				<p className="content">{article.content}</p>
			</div>
		</article>
	)
}

const SkeletonLoader = () => {
	return (
		<article className="flex-column article-details article-skeleton-loader">
			<div className="img-container animated-background"></div>
			<div className="flex-column space-between content-container">
				<div className="title animated-background"></div>
				<div>
					<div className="content animated-background"></div>
					<div className="content animated-background"></div>
					<div className="content animated-background"></div>
					<div className="content animated-background"></div>
					<div className="content animated-background"></div>
				</div>
			</div>
		</article>
	)
}
