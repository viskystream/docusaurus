/* eslint-disable import/no-mutable-exports */
/* eslint-disable consistent-return */
import path from 'path';
import config from 'config';
import fs from 'fs';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import Logger from '@livelyvideo/log';
import { versionNumber } from './version';

// setup main log object
export let log: Logger | undefined;

const logLevels = [
	'debug',
	'info',
	'notice',
	'warn',
	'error',
	'fatal',
];

const pad = (num: number) => (num > 9 ? '' : '0') + num;

function nameGenerator(time: Date, index: number) {
	const filePath = path.parse(config.get('logFile'));
	if (!index || !time) {
		// log filename
		return filePath.base;
	}
	const year = time.getFullYear();
	const month = pad(time.getMonth() + 1);
	const day = pad(time.getDate());
	const hour = pad(time.getHours());
	const minute = pad(time.getMinutes());
	const second = pad(time.getSeconds());
	// filename for rotated logs
	return `${year}${month}${day}${hour}${minute}${second}.${filePath.base}`;
}

const initLogger = function initLogger(initLevel) {
	if (log && initLevel) { // log if re-init
		log.info('re-init Logger', {
			initLevel,
			location: config.get('logFile') || 'stdout',
		});
	}
	log = new Logger({
		inject: { ver: versionNumber || undefined }, // additional data to inject into all logs
		defaultLevel: 'warn', // default level
		levels: logLevels, // all levels
		stderrBreak: 'debug', // level at which to start using stderr instead of stdout
		level: initLevel || config.get('logLevel'), // level at which to start writing logs
		stderrStreams: [process.stderr],
		stdoutStreams: [process.stdout],
		pretty: config.has('logPretty') ? config.get('logPretty') : false, // pretty print json (or not)
	});
	// if logging to file, setup now with rotation

	const logFile = config.has('logFile') ? config.get<string>('logFile') : '';

	if (logFile.length) {
		const filePath = path.parse(logFile);
		try { // Check if the file path exists and if it is writable
			fs.accessSync(filePath.dir, fs.constants.F_OK | fs.constants.W_OK); // eslint-disable-line no-bitwise
		} catch (err) {
			log.error('log path not accessible', {
				msg: 'logging to stdout/stderr',
				logFile,
				err: err.message,
			});
			return;
		}
		const logStream = rfs.createStream(nameGenerator, {
			path: filePath.dir,
			size: '50M', // rotate every 50 MegaBytes written
			interval: '1d', // rotate daily
			immutable: true, // needed to send logs to logstash through filebeat
			maxFiles: 10,
		});
		// set logger to use rotating stream
		log.setStreams([logStream], [logStream]);
		// handle events emitted by rfs
		logStream.on('error', (err) => {
			// here are reported blocking errors
			// once this event is emitted, the stream will be closed as well
			log.error('logger', {
				err: err.message,
			});
		});
		logStream.on('open', (filename) => {
			// no rotated file is open (emitted after each rotation as well)
			// filename: useful if immutable option is true
			log.info('logger', {
				msg: 'open',
				filename,
			});
		});
		logStream.on('removed', (filename, number) => {
			// rotation job removed the specified old rotated file
			// number == true, the file was removed to not exceed maxFiles
			// number == false, the file was removed to not exceed maxSize
			log.info('logger', {
				msg: 'removed',
				filename,
				number,
			});
		});
		logStream.on('rotation', () => {
			// rotation job started
			log.info('logger', {
				msg: 'rotation started',
			});
		});
		logStream.on('rotated', (filename) => {
			// rotation job completed with success producing given filename
			log.info('logger', {
				msg: 'rotation completed',
				filename,
			});
		});
		logStream.on('warning', (err) => {
			// here are reported non blocking errors
			log.warn('logger', {
				err: err.message,
			});
		});
	} else {
		log.warn('no logfile set');
	}
};

// init logger on require (pass null to use config log level)
initLogger(null);

// module.exports = log;
// module.exports.reinitLogger = initLogger;

function nameGeneratorAccessLog(time: Date, index: number) {
	const filePath = path.parse(config.get('accessLogFile'));
	if (!time) {
		// log filename
		return filePath.base;
	}
	const year = time.getFullYear();
	const month = pad(time.getMonth() + 1);
	const day = pad(time.getDate());
	const hour = pad(time.getHours());
	const minute = pad(time.getMinutes());
	if (!index) {
		// log filename with date
		return `${year}${month}${day}${hour}${minute}.${filePath.base}`;
	}
	// filename for compressed logs
	return `${year}${month}${day}${hour}${minute}.${filePath.base}.${index}.gz`;
}

export const initAccessLog = () => {
	const filePath = path.parse(config.get('accessLogFile'));
	try { // Check if the file path exists and if it is writable
		fs.accessSync(filePath.dir, fs.constants.F_OK | fs.constants.W_OK); // eslint-disable-line no-bitwise
	} catch (err) {
		log.error('access log path not accessible', {
			logFile: config.get('accessLogFile'),
			err: err.message,
		});
		return;
	}
	morgan.format('combinedtime', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"'
		+ ' :status :res[content-length] ":referrer" ":user-agent" :response-time ms');
	const accessLog = rfs.createStream(nameGeneratorAccessLog, {
		path: filePath.dir,
		interval: '1d', // rotate daily
		size: '250M', // rotate every 250 MegaBytes written
		maxFiles: 30,
	});
	accessLog.on('error', (err) => {
		// here are reported blocking errors
		// once this event is emitted, the stream will be closed as well
		log.error('access log', {
			err: err.message,
		});
	});
	accessLog.on('open', (filename) => {
		// no rotated file is open (emitted after each rotation as well)
		// filename: useful if immutable option is true
		log.info('access log', {
			msg: 'open',
			filename,
		});
	});
	accessLog.on('removed', (filename, number) => {
		// rotation job removed the specified old rotated file
		// number == true, the file was removed to not exceed maxFiles
		// number == false, the file was removed to not exceed maxSize
		log.info('access log', {
			msg: 'removed',
			filename,
			number,
		});
	});
	accessLog.on('rotation', () => {
		// rotation job started
		log.info('access log', {
			msg: 'rotation started',
		});
	});
	accessLog.on('rotated', (filename) => {
		// rotation job completed with success producing given filename
		log.info('access log', {
			msg: 'rotation completed',
			filename,
		});
	});
	accessLog.on('warning', (err) => {
		// here are reported non blocking errors
		log.warn('access log', {
			err: err.message,
		});
	});
	return morgan('combinedtime', { stream: accessLog });
};

// export {
// 	log,
// 	initLogger,
// 	initAccessLog,
// };
