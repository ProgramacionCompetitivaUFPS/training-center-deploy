'use strict'

const User = require('../models').users
const Submissions = require('../models').submissions
const Syllabus = require('../models').syllabuses
const Problems = require('../models').problems
const authService = require('../services/authenticationService')
const path = require('path')
const _ = require('lodash');

/**
 * Users controller 
 */

function removeAccounts(req, res){
  if( req.user.usertype != 2 )
    return res.status(401).send({ error: 'No se encuentra autorizado' })
  
  if( !req.body.users )
    return res.status(400).send({ error: 'Datos incompletos' })
  
    User.destroy({
      where: {
        id: req.body.users
      }
    })
    .then(function (deletedRecords) {
          return res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
        return res.status(500).json(error);
    });
}
/**
 * List all the users
 * @param {any} req
 * @param {any} res
 */
function index(req, res) {
  if( req.user.usertype != 2 )
    return res.status(401).send({ error: 'No se encuentra autorizado' })

  let limit = (req.query.limit) ? parseInt(req.query.limit) : 10
  let offset = (req.query.page) ? limit * ( parseInt(req.query.page) - 1 ) : 0

  let condition = {}
  let meta = {}

  if( req.query.type )
      condition.type = req.query.type
  else
      condition.id = { $ne: null }
      
  User.findAndCountAll({
      where: condition,
      attributes: ['id', 'name', 'email', 'code', 'type', 'username'],
      limit: limit,
      offset: offset
  }).then( ( response ) => {
      meta.totalPages = Math.ceil( response.count / limit )
      meta.totalItems = response.count

      if ( offset >= response.count ) {
          return res.status(200).send( { meta } )
      }
      res.status(200).send({ meta: meta, data: response.rows })
  }).catch((err) => {
      return res.status(500).send({ error: `${err}` })
  })
}

/**
 * Registers an student user 
 * @param {any} req
 * @param {any} res
 */
function register(req, res) {
  req.body.type = 0

  User.create(req.body)
    .then(user => {
      return res.sendStatus(201)
    })
    .catch(error => {
      error = _.omit(error, ['parent', 'original', 'sql'])
      return res.status(400).send(error)
    })
}

/**
 * Register an Admin or Coach user
 * @param {any} req
 * @param {any} res
 * @returns
 */
function signUp(req, res) {
  if (req.user.usertype != 2 || req.body.type == 0) {
    return res.status(401).send({ error: 'No se encuentra autorizado' })
  }

  User.create(req.body)
    .then(user => {
      return res.sendStatus(201)
    })
    .catch(error => {
      error = _.omit(error, ['parent', 'original', 'sql'])
      return res.status(400).send(error)
    })
}

function getUser(req,res){
  User.findOne({
    where: {
        id: req.params.id
      },
    attributes: ['id', 'name', 'email', 'code', 'username', 'created_at']
  }).then(function (user) {
    return res.status(200).send( user )
  }).catch(function (err) {
    return res.sendStatus(500)
  })
}

/**
 * Updates the user's password
 * @param {any} req
 * @param {any} res
 * @returns
 */
function recovery(req, res) {
  if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
    return res.status(400).send({ error: 'Datos incompletos' })
  }

  authService.invalidateToken(req.body.token)

  User.update(
    {
      password: req.body.password,
      confirm_password: req.body.confirmPassword
    },
    {
      where: {
        email: req.body.email
      },
      fields: ['password', 'confirm_password'],
      individualHooks: true
    }
  ).then((affectedRows) => {
    if (affectedRows) return res.sendStatus(200)

    return res.status(400).send({ error: 'Datos incorrectos' })
  }).catch((err) => {
    return res.status(500).send({ error: `Ocurrió un error al restablecer la contraseña: ${err}` })
  })
}

function update(req, res) {
  if ( req.params.id != req.user.sub )
    return res.status(401).send({ error: 'No se encuentra autorizado' })

  if( !req.body.name || !req.body.email || !req.body.username )
      return res.status(400).send({ error: 'Datos incompletos' })

  let condition = {
      id: req.params.id
  }

  User.update(
      req.body,
      {
          where: condition
      }
  ).then( ( affectedRows ) => {
      if ( affectedRows > 0 ) return res.status(200).send(req.body)
      return res.status(401).send({ error: 'No se encuentra autorizado' })
  }).catch((err) => {
      return res.sendStatus(500)
  })
}

function changePassword(req,res){
  if ( req.params.id != req.user.sub )
    return res.status(401).send({ error: 'No se encuentra autorizado' })

  if( !req.body.password || !req.body.confirm_password || !req.body.old_password )
    return res.status(400).send({ error: 'Datos incompletos' })

  User.findOne({
    where: {
        id: req.params.id
      }
  }).then(function (user) {
    if( user.authenticate(req.body.old_password) ){
      User.update(
        req.body,
        {
          where: { id: req.params.id },
          fields: ['password', 'confirm_password'],
          individualHooks: true
        }
      ).then( ( affectedRows ) => {
        if (affectedRows) return res.sendStatus(200)

        return res.status(400).send({ error: 'Datos incorrectos' })
      }).catch((err) => {
          return res.status(400).send( {error: "Error, las contraseñas no coinciden"} )
      })
    } else
      res.status(401).send({ error: 'Contraseña incorrecta' })
  }).catch(function (err) {
    return res.sendStatus(500)
  })
}

function getSyllabus (req,res){
  User.findOne({
       where: {id : req.params.id },
       attributes: ['id'],
       include: [ 
        {
          model: Syllabus,
          as: 'syllabuses',
          attributes: ['id'],
          through: { attributes: [] }
        } 
      ]
  }).then( (ans) => {
      if( ans == null ) return res.sendStatus(404)
      let user = {}
      user.id = ans.id
      user.syllabuses = ans.syllabuses.map( s => s.id )
      return res.status(200).send({ user })
  }).catch( (err) => {
      return res.status(500).send({ error: `${err}` })
  })
}

function getSubmissions (req,res){
  if ( req.params.id != req.user.sub ) 
    return res.status(401).send({ error: 'No se encuentra autorizado' })
  
  if( !req.query.page )
    return res.status(400).send({ error: 'Datos incompletos' })  

  let limit = (req.query.limit) ? parseInt(req.query.limit) : 10
  let order = []
  let offset = (req.query.page) ? limit * ( parseInt(req.query.page) - 1 ) : 0
  let by = (req.query.by) ? req.query.by : 'DESC'
  
  let condition = {
    user_id: req.params.id
  }
  let meta = {}

  order[0] = ['created_at', by]

  if (req.query.sort) {
    if (req.query.sort == 'time') order[0] = ['execution_time', by]
    else if ( req.query.sort == 'level' ) order[0] = [ Problems, 'level', by ]
  }

  if( req.query.condition ){
    if( req.query.condition == 'WA') condition.verdict = 'Wrong Answer'
    else if( req.query.condition == 'TL') condition.verdict = 'Time Limit Exceeded'
    else if( req.query.condition == 'RT') condition.verdict = 'Runtime Error'
    else if( req.query.condition == 'CE') condition.verdict = 'Compilation Error'
    else condition.verdict = 'Accepted'
  }

  Submissions.findAndCountAll({
    where: condition,
    include: [ 
      { model: Problems, attributes: ['title_en', 'id', 'title_es', 'level'] }
    ],
    attributes: ['id', 'language', 'file_name', 'execution_time', 'verdict', 'status', 'created_at'],
    limit: limit,
    order: order,
    offset: offset,
  })
  .then((response) => {
    meta.totalPages = Math.ceil( response.count / limit )
    meta.totalItems = response.count
        
    if ( offset >= response.count ) 
      return res.status(200).send( { meta } )
    return res.status(200).send({ meta: meta, data: response.rows })
  })
  .catch((err) => {
    return res.status(500).send({ error: `${err}` })
  })
}

function getSubmission(req,res){
  return res.sendFile( path.join( path.dirname(__dirname), 'files', 'codes', req.params.submission ) )
}


module.exports = {
  index,
  register,
  signUp,
  recovery,
  changePassword,
  update,
  getSyllabus,
  removeAccounts,
  getSubmissions,
  getSubmission,
  getUser
}