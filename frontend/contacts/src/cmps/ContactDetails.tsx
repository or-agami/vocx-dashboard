import React from 'react'
import { useParams } from 'react-router-dom'

// Todo(low): Real ContactDetails
export default function ContactDetails() {
	const { contactId } = useParams()
	return (
		<>
			<h1>Contact Details Works!</h1>
			<h2>Contact ID: {contactId}</h2>
		</>
	)
}
