import React from 'react'
import { Link } from 'react-router-dom'
import { Contact } from '../types'

export default function ContactList() {
	return (
		<ul className="flex-column contact-list">
			{contacts.map((contact) => (
				<li
					key={contact.name}
					className="contact-preview-container">
					<ContactPreview contact={contact} />
				</li>
			))}
		</ul>
	)
}

function ContactPreview({ contact }: { contact: Contact }) {
	return (
		<Link to={contact._id}>
			<div className="flex align-center contact-preview">
				<div className="img-container">
					<img
						className="profile-img"
						src={`https://robohash.org/${contact._id}?set=set5`}
						alt="User profile"
					/>
				</div>
				<div className="contact-info">
					<h1 className="name">{contact.name}</h1>
					<span className="number">{contact.phone}</span>
				</div>
			</div>
		</Link>
	)
}

//? Demo Data
const contacts = [
	{
		_id: '5a56640269f443a5d64b32ca',
		name: 'Ochoa Hyde',
		email: 'ochoahyde@renovize.com',
		phone: '+1 (968) 593-3824'
	},
	{
		_id: '5a5664025f6ae9aa24a99fde',
		name: 'Hallie Mclean',
		email: 'halliemclean@renovize.com',
		phone: '+1 (948) 464-2888'
	},
	{
		_id: '5a56640252d6acddd183d319',
		name: 'Parsons Norris',
		email: 'parsonsnorris@renovize.com',
		phone: '+1 (958) 502-3495'
	},
	{
		_id: '5a566402ed1cf349f0b47b4d',
		name: 'Rachel Lowe',
		email: 'rachellowe@renovize.com',
		phone: '+1 (911) 475-2312'
	}
]
