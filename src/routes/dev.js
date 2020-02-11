const express = require('express')
const router = express.Router()

require('../controller/dev')(router)

module.exports = router