'use strict'

const multer = require('multer')
const path = require('path')
var crypto = require ('crypto')
var moment = require('moment')

var multer_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let d = 'inputs'

        if (file.fieldname == 'output') d = 'outputs'

        if (file.fieldname == 'pdf') d = 'materials'

        if (file.fieldname == 'code') d = 'codes'

        if(file.fieldname == 'svgBlocklyCode') d = 'codes/blockly_svg_sources'

        cb(null, path.join(__dirname, `../files/${d}`) )
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(8, function (err, raw) {
            if (err) return cb(err)
            let fieldname = file.originalname

            let ext = '.in'
            if (file.fieldname == 'output') ext = '.out'
            if( file.fieldname == 'input' || file.fieldname == 'output' ) 
                fieldname = raw.toString('hex') + moment() + ext
            if( file.fieldname == 'code' || file.fieldname == 'svgBlocklyCode')
                fieldname = raw.toString('hex') + moment() + path.extname(file.originalname)
            if( file.fieldname == 'pdf')
                fieldname = raw.toString('hex') + moment() + '.pdf'
            cb(null, fieldname )
        })
    }
})

var problemsDataFilter = function (req, file, cb) {
    let ext = path.extname( file.originalname );
    
    if ( ext !== '.txt' && ext !== '.in' && ext !== '.out' ) {
        return cb( new Error('Sólo estan permitidos archivos .txt, .in y .out') )
    }
    cb(null, true)
}

var materialsDataFilter = function (req, file, cb) {
    let ext = path.extname( file.originalname );
    
    if ( ext !== '.pdf' ) {
        return cb( new Error('Sólo estan permitidos archivos .pdf') )
    }
    cb(null, true)
}

var submissionsDataFilter = function (req, file, cb) {
    let ext = path.extname( file.originalname )
    const blocklysubmission = req.headers.blocklysubmission

    if(file.fieldname == 'svgBlocklyCode'){
        if(blocklysubmission == '0' || ext !== '.svg'){
            return cb( new Error('El formato para la subida de soluciones en blockly es incorrecto') )
        }
    }else if(file.fieldname == 'code'){
        if(ext !== '.cpp' && ext !== '.cc' && ext !== '.cxx' && ext !== '.c' && ext !== '.cp' && ext !== '.java' && ext !== '.py') {

            return cb( new Error('Sólo estan permitidos archivos .cpp, .java y .py') ) 
        }
    }

    cb(null, true)
}

module.exports = {
    multer_storage,
    problemsDataFilter,
    materialsDataFilter,
    submissionsDataFilter
};