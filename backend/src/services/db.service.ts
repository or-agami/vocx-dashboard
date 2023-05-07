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

type CollectionName = keyof Data
type Item = Data[CollectionName][number]
type ItemKey = keyof Data[CollectionName][number]
type ItemValue = Data[CollectionName][number][ItemKey]

export const dbService = {
	getCollection
}

async function getCollection(collectionName: CollectionName) {
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

function getAll(collectionName: CollectionName) {
	return db.data[collectionName]
}

function findOne(collectionName: CollectionName, idKey: ItemKey, idVal: ItemValue) {
	return db.data[collectionName].find((item) => item[idKey] === idVal)
}

function insertOne(collectionName: CollectionName, item: Item) {
	// item._id = makeid() //? 👈 No need for id per assignment requirements
	db.data[collectionName].unshift(item)
	db.write()
	return db.data[collectionName]
}

function updateOne(collectionName: CollectionName, idKey: ItemKey, updatedItem: Item) {
	const itemIdx = db.data[collectionName].findIndex((item) => item[idKey] === updatedItem[idKey])
	db.data[collectionName].splice(itemIdx, 1, updatedItem)
	db.write()
	return db.data[collectionName]
}

function deleteOne(collectionName: CollectionName, idKey: ItemKey, idVal: ItemValue) {
	const itemIdx = db.data[collectionName].findIndex((item) => item[idKey] === idVal)
	db.data[collectionName].splice(itemIdx, 1)
	db.write()
	return db.data[collectionName]
}
