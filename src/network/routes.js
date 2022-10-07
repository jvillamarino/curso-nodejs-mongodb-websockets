const messageRouter = require('../components/jobs/router');

module.exports = (server) => {
    server.use('/jobs', messageRouter)
}