const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Node Angular Twitter',
      format: String,
      default: 'Node Angular Twitter'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  sequelize: {
    name: {
      default: 'beebet',
      env: 'DB_NAME'
    },
    user: {
      default: 'postgres',
      env: 'DB_USER'
    },
    password: {
      default: 'postgres',
      env: 'DB_PASSWORD'
    },
    host: {
      default: 'postgres',
      env: 'DB_HOST'
    },
    port: {
      default: 5432,
      env: 'DB_PORT'
    }
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
