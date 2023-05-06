import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import '../styles/pages/ErrorPage.scss'

export default function ErrorPage() {
	const error = useRouteError() as Error
	console.error('error from ErrorPage:', error)

	return (
		<div className="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<a
				className="home-link"
				href="/">
				Go back to home
			</a>
			{isRouteErrorResponse(error) ? (
				<div className="flex-column">
					<i>Error code: {error.status}</i>
					<i>Error status: {error.statusText}</i>
					<i>{error.data}</i>
				</div>
			) : (
				<i>Error message: {error.message} </i>
			)}
		</div>
	)
}
