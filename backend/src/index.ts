import logger from './services/logger.service.js'
import { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'

const app = express()
const httpServer = http.createServer(app)

app.use(express.json())
if (process.env['NODE_ENV'] === 'production') {
	app.use(express.static(path.resolve(__dirname, 'public')))
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
		credentials: true
	}
	app.use(cors(corsOptions))
}

//?- Routes
import { router as pageRoutes } from './api/page/page.routes.js'

app.use('/api/page', pageRoutes)

app.get('/**', (_req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env['PORT'] || 3030
httpServer.listen(port, () => {
	logger.info('Server is running on port: ' + port)
})
