const messageRouter = require('../components/jobs/router');
const userRouter = require('../components/user/router');

module.exports = (server) => {
    server.use('/jobs', messageRouter);
    server.use('/users', userRouter);
}