const { transports, format, Container } = require('winston');
const { combine, timestamp, label, printf } = format;

const container = new Container();

container.add('http', {
  level: 'info',
  format: combine(
    label({ label: 'Http Logger message' }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${level}]: (${label}) ==> ${message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: './logs/network/notify.log',
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    }),
    new transports.File({
      level: 'error',
      filename: './logs/network/error.log',
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    })
  ],
  exceptionHandlers: [
    new transports.File({
      level: 'error',
      filename: './logs/network/error.log',
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    })
  ],
  exitOnError: false
});

container.add('server', {
  level: 'info',
  format: combine(
    label({ label: 'Server Logger message' }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${level}]: (${label}) ==> ${message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: './logs/server/info.log',
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    }),
    new transports.File({
      level: 'error',
      filename: './logs/server/error.log',
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    })
  ],
  exceptionHandlers: [
    new transports.File({
      level: 'error',
      filename: './logs/server/error.log',
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    })
  ],
  exitOnError: false
});

module.exports = container;
