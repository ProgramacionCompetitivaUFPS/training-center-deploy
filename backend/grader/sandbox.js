'use strict'

const exec = require('child_process').exec
const Config = require('../grader/config.js')
const path = require('path')
const fs = require('fs')

class Sandbox {
  constructor (file_path, file_name, folder, time_limit, input, output, language, input_filename, output_filename, file_xml_name, file_xml_path) {
    this.file_path = file_path /* ruta del codigo a ejecutar */
    this.file_name = file_name /* nombre del archivo de codigo a ejecutar */
    this.folder = folder /* nombre de la carpeta temporal de la ejecucion */
    this.timeLimit = time_limit
    this.input = input /* ruta del archivo input */
    this.output = output /* ruta del archivo output */
    this.language = language
    this.input_filename = input_filename /* nombre del archivo input */
    this.output_filename = output_filename /* nombre del archivo output */
    this.file_xml_name = file_xml_name /* nombre del codigo a mostrar para blockly */
    this.file_xml_path = file_xml_path /* ruta del codigo a mostrar para blockly */
    this.path = path.dirname(__dirname)
    this.execution_directory = path.join( this.path, 'files', folder )
    this.config = new Config()


    this.configureLanguage()
  }

  checkStatus( cb ){
    let container = this.config.containers[this.languageId]
    let ins = 'docker exec ' + container + ' ls '

    exec( ins, (error, stdout, stderr) => {
      if (error){
        cb( false )
        return 
      }
      cb( true )
    })
  }
  
  run (success) {

    this.setUpEnvironment(() => {
      this.execute(success)
    })
  }

  setUpEnvironment (success) {

    let script = 'mkdir ' + this.execution_directory + /* Crea la carpeta temporal */

    ' && cp ' + path.join(__dirname, 'util', this.runner) + ' ' + this.execution_directory + /* Copia los scripts al directorio */

    ' && chmod 777 ' + this.execution_directory + /* Asigna permisos a los scripts */

    ' && cp ' + path.join(this.path, this.input) + ' ' + this.execution_directory + /* Copia el input del problema */
    ' && cp ' + path.join(this.path, this.output) + ' ' + this.execution_directory + /* Copia el output del problema */
    ' && cp ' + path.join(this.path, this.file_path) + ' ' + this.execution_directory + /* Copia el source del usuario */
    ' && mv ' + this.execution_directory + '/' + this.file_name + ' ' + this.execution_directory + '/' + this.fileName + /* Renombrar el fuente para poderlo ejecutar */
    " && sed -i 's/{TL}/" + this.timeLimit + "/g' " + this.execution_directory + '/' + this.runner + /* Reemplazo del TL en el script de shell  */
    " && sed -i 's/{path}/\\/files\\/" + this.folder + '\\/' + "/g' " + this.execution_directory + '/' + this.runner + /* Reemplazo del path del archivo a ejecutar en el script de shell  */
    " && sed -i 's/{code}/" + this.executionFile + "/g' " + this.execution_directory + '/' + this.runner + /* Reemplazo del archivo a ejecutar en el script de shell  */
    " && sed -i 's/{input}/\\/files\\/" + this.folder + '\\/' + this.input_filename + "/g' " + this.execution_directory + '/' + this.runner + /* Reemplazo del archivo de entradas en el script de shell  */
    " && sed -i 's/{folder}/" + this.folder + "/g' " + this.execution_directory + '/' + this.runner /* Reemplazo de la carpeta en el script de shell  */

    //agregando unos comandos adicionales
    if(this.file_xml_name !== '' && this.file_xml_path !== ''){
      script += ' && cp ' + path.join(this.path, this.file_xml_path) + ' ' + this.execution_directory + /* Copia el source de la submission en bloques */
      ' && rm -rf ' + path.join(this.path, this.file_path)// eliminar el source en codigo fuente 
    }

    exec(script, (error, stdout, stderr) => {
            if (error) {
                console.log("*************    HAN OCURRIDO ERRORES  *************")
                console.error( stderr )
                this.removeExecutionFolder()
            } else success()
        }
    )
  }

  configureLanguage () {
    for( let i = 0; i < this.config.langs.length; i++ ){
      if( this.language === this.config.langs[i] ) this.languageId = i
    }

    this.executionFile = this.config.executionFilename[ this.languageId ]
    this.fileName = this.config.filename[ this.languageId]
    this.runner = this.config.runners[ this.languageId ]
  }

  execute (success) {
    let compiler = this.config.compilers[this.languageId]
    compiler = compiler.replace(/{folder}/g, this.folder)
    let container = this.config.containers[this.languageId]
    let ins = 'docker exec ' + container + ' ' + compiler

    console.log("**************** INSTRUCCION ****************")
    console.log(ins)

    exec(ins, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        console.error(stderr)
        success('Compilation Error', '0')
        return
      }
      exec('docker exec ' + container + ' /files/' + this.folder + '/' + this.runner + '  ' + this.timeLimit, (error, stdout, stderr) => {
        console.error(error)
        console.error(stderr)
        let ans = stdout.split('\n')[0]
        let tmp = stderr.split('\n')
        let execTime
        for (let i = 0; i < tmp.length; i++) {
          if (tmp[i].length === 0) continue
          else if (tmp[i].substr(0, 4) === 'real') {
            execTime = tmp[i].substr(7, 5)
            break
          }
        }

        if (ans === 'Timelimit') {
          success('Time Limit Exceeded', this.timeLimit)
          this.removeExecutionFolder()
        } else if (ans === 'Runtime') {
          success('Runtime Error', execTime)
          this.removeExecutionFolder()
        } else this.validateOutput(execTime, success)
      })
    })
  }

  validateOutput (execTime, success) {
    exec('diff ' + path.join(this.execution_directory, 'output.out') + ' ' + path.join(this.execution_directory, this.output_filename), (error, stdout, stderr) => {
      if (error) success('Wrong Answer', execTime)
      else success('Accepted', execTime)
      this.removeExecutionFolder()
    })
  }

  
  /**
   * Elimina la carpeta temporal donde se evalua la submission
   */
  removeExecutionFolder () {
    exec(
      'rm -rf ' + this.execution_directory 
    )
  }
}

module.exports = Sandbox
