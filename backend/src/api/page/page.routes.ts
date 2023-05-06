import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getPages, addPage, updatePage, removePage } from './page.controller.js'
const router = express.Router()

router.get('/', log, getPages)
router.post('/', log, addPage)
router.put('/:pageName', log, updatePage)
router.delete('/:pageName', log, removePage)

export { router }
