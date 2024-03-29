'use strict'

const express = require('express')
const submissions = express.Router()
const userCtrl = require('../controllers/users')
const auth = require('../middlewares/auth')

/**
 * Handler for '/contests' routes
 */

submissions.get('/:submission', auth.isAuth, userCtrl.getSubmission )
submissions.get('/:submission/svgSubmission', auth.isAuth, userCtrl.getSvgSubmission)

module.exports = submissions;
