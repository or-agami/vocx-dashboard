import { Request, Response } from 'express'

import pageService from './page.service.js'
import logger from '../../services/logger.service.js'

export { getPages, addPage, updatePage, removePage }

async function getPages(_req: Request, res: Response) {
	try {
		logger.debug('Getting Pages')
		const pages = await pageService.query()
		res.json(pages)
	} catch (error) {
		logger.error('Failed to get Pages', error)
		res.status(500).send({ err: 'Failed to get Pages' })
	}
}

async function addPage(req: Request, res: Response) {
	try {
		logger.debug('Adding Page')
		const page = req.body
		const addedPage = await pageService.add(page)
		res.json(addedPage)
	} catch (error) {
		logger.error('Failed to add Page', error)
		res.status(500).send({ err: 'Failed to add Page' })
	}
}

async function updatePage(req: Request, res: Response) {
	try {
		logger.debug('Updating Page')
		const page = req.body
		const updatedPage = await pageService.update(page)
		res.json(updatedPage)
	} catch (error) {
		logger.error('Failed to update Page', error)
		res.status(500).send({ err: 'Failed to update Page' })
	}
}

async function removePage(req: Request, res: Response) {
	try {
		logger.debug('Deleting Page')
		const pageName = req.params['pageName'] as string
		const removedPage = await pageService.remove(pageName)
		res.json(removedPage)
	} catch (error) {
		logger.error('Failed to remove Page', error)
		res.status(500).send({ err: 'Failed to remove Page' })
	}
}
