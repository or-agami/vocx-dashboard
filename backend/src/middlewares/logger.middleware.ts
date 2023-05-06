import { NextFunction, Request, Response } from 'express'
import logger from '../services/logger.service.js'

export async function log(_req: Request, _res: Response, next: NextFunction) {
	logger.info('Req was made')
	next()
}
