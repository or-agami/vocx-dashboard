import { Page } from '../../models/page.js'
import { dbService } from '../../services/db.service.js'
import logger from '../../services/logger.service.js'

export default { query, remove, add, update }

async function query() {
	try {
		const collection = await dbService.getCollection('pages')
		return collection.getAll()
	} catch (err) {
		logger.error('cannot find pages', err)
		throw err
	}
}

async function remove(pageName: string) {
	try {
		const collection = await dbService.getCollection('pages')
		return collection.deleteOne('cmpName', pageName)
	} catch (err) {
		logger.error(`cannot remove page ${pageName}`, err)
		throw err
	}
}

async function add(page: Page) {
	try {
		const collection = await dbService.getCollection('pages')
		return collection.insertOne(page)
	} catch (err) {
		logger.error('cannot insert page', err)
		throw err
	}
}

async function update(page: Page) {
	try {
		const collection = await dbService.getCollection('pages')
		return collection.updateOne('cmpName', page)
	} catch (err) {
		logger.error(`cannot update page ${page}`, err)
		throw err
	}
}
