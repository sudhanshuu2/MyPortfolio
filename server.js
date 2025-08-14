import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to the database!')
    app.listen(config.port, (err) => {
      if (err) console.error(err)
      console.info('Server started on port %s.', config.port)
    })
  })
  .catch((err) => {
    console.error('Mongo connection error:', err && (err.message || err.reason || err))
    process.exit(1)
  })

// Optional: root route here instead of express.js
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to User application." });
// });
