import fs from 'fs'

type Level = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export default {
	debug(...args: string[]) {
		if (process.env['NODE_NEV'] === 'production') return
		doLog('DEBUG', ...args)
	},
	info(...args: string[]) {
		doLog('INFO', ...args)
	},
	warn(...args: string[]) {
		doLog('WARN', ...args)
	},
	error(...args: Array<string[number] | any[number]>) {
		doLog('ERROR', ...args)
	}
}

//? Make a log directory if log file doesn't exsist
const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir)
}

//? define the time format
function getTime() {
	let now = new Date()
	return now.toLocaleString('he')
}

function isError(e: string | any) {
	return e && e.stack && e.message
}

function doLog(level: Level, ...args: string[]) {
	const strs = args.map((arg) =>
		typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg)
	)

	var line = strs.join(' | ')
	line = `${getTime()} - ${level} - ${line}\n`
	console.log(line)
	fs.appendFile('./logs/backend.log', line, (err: any) => {
		if (err) console.log('FATAL: cannot write to log file')
	})
}
