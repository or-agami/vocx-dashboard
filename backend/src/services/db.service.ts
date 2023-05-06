import logger from './logger.service.js'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Page } from '../models/page.js'

//? var for init and store db connection
var db: Low<Data>
const dbName = 'dash_pages_db'

type Data = {
	pages: Page[]
}

export const dbService = {
	getCollection
}

async function getCollection(collectionName: keyof Data) {
	try {
		await connect()
		return {
			getAll: getAll.bind(null, collectionName),
			findOne: findOne.bind(null, collectionName),
			insertOne: insertOne.bind(null, collectionName),
			updateOne: updateOne.bind(null, collectionName),
			deleteOne: deleteOne.bind(null, collectionName)
		}
	} catch (err) {
		logger.error('Failed to get lowdb data', err)
		throw err
	}
}

async function connect(): Promise<Low<Data>> {
	if (db) return db
	// Configure lowdb to write data to JSON file
	const defaultData: Data = { pages: [] }
	const adapter = new JSONFile<Data>(`${dbName}.json`)
	db = new Low<Data>(adapter, defaultData)
	try {
		// Read data from JSON file, this will set db.data content
		// If JSON file doesn't exist, defaultData is used instead
		await db.read()
		return db
	} catch (err) {
		logger.error('Cannot connect to DB', err)
		throw err
	}
}

function getAll(collectionName: keyof Data) {
	return db.data[collectionName]
}

function findOne(collectionName: keyof Data, idKey: keyof Page, idVal: Page[keyof Page]) {
	return db.data[collectionName].find((item) => item[idKey] === idVal)
}

function insertOne(collectionName: keyof Data, page: Page) {
	// page._id = makeid() //? 👈 No need for id per assignment requirements
	db.data[collectionName].unshift(page)
	db.write()
	return db.data[collectionName]
}

function updateOne(collectionName: keyof Data, idKey: keyof Page, updatedPage: Page) {
	const itemIdx = db.data[collectionName].findIndex((item) => item[idKey] === updatedPage[idKey])
	db.data[collectionName].splice(itemIdx, 1, updatedPage)
	db.write()
	return db.data[collectionName]
}

function deleteOne(collectionName: keyof Data, idKey: keyof Page, idVal: Page[keyof Page]) {
	const itemIdx = db.data[collectionName].findIndex((item) => item[idKey] === idVal)
	db.data[collectionName].splice(itemIdx, 1)
	db.write()
	return db.data[collectionName]
}
