(window.webpackJsonp=window.webpackJsonp||[]).push([[51,12],{"modules/SubmissionsStudents/SubmissionsStudents":function(e,t,i){"use strict";i.r(t),function(e){i.d(t,"Submissions",(function(){return h}));var s,o,n,r,a=i("aurelia-framework"),l=i("oHge"),d=i("x4W3"),u=i("W1ll");function c(e,t,i,s){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(s):void 0})}function m(e,t,i,s,o){var n={};return Object.keys(s).forEach((function(e){n[e]=s[e]})),n.enumerable=!!n.enumerable,n.configurable=!!n.configurable,("value"in n||n.initializer)&&(n.writable=!0),n=i.slice().reverse().reduce((function(i,s){return s(e,t,i)||i}),n),o&&void 0!==n.initializer&&(n.value=n.initializer?n.initializer.call(o):void 0,n.initializer=void 0),void 0===n.initializer&&(Object.defineProperty(e,t,n),n=null),n}let h=Object(a.f)(u.a,u.b,u.i,u.j)((n=m((o=class{constructor(e,t,i,s){c(this,"page",n,this),c(this,"filterChange",r,this),this.alertService=e,this.problemService=i,this.authService=t,this.rankingService=s,this.numberOfItems=[10,15,20],this.sortOptions=["Fecha","Dificultad","Tiempo de ejecución"],this.filterChange=!1,this.submissions=[],this.limit=10,this.sort="Fecha",this.by="Descendente",this.page=1,this.downloadActive=!1,this.totalPages=1,this.isABlocklyCode=!1,this.veredictOptions=[{value:"ALL",text:"Cualquier veredicto"},{value:"ACC",text:"Correcto"},{value:"TL",text:"Tiempo límite excedido"},{value:"WA",text:"Respuesta incorrecta"},{value:"RT",text:"Error en tiempo de ejecución"},{value:"CE",text:"Error de compilación"}],this.veredict=this.veredictOptions[0],this.downloadMesagge="Descargar código",this.enums=d.d,this.getSubmissions()}activate(e,t){this.routeConfig=t,this.id=e.id?parseInt(e.id):0,this.getSubmissions()}setVeredict(e){this.veredict=e,this.getSubmissions()}filterChangeChanged(e,t){void 0!==t&&this.getSubmissions()}pageChanged(e,t){void 0!==t&&this.getSubmissions()}getSubmissions(){let e;e="Tiempo de ejecución"===this.sort?"time":"Dificultad"===this.sort?"level":"date";let t=this.veredict.value;"ALL"===t&&(t=null),this.rankingService.getSubmissions(this.id,this.limit,this.page,"Ascendente"===this.by?"ASC":"DESC",e,t).then(e=>{this.totalPages=e.meta.totalPages,this.submissions=[],e.meta.totalItems>0&&(this.submissions=e.data)}).catch(e=>{401===e.status||403===e.status?this.alertService.showMessage(l.b.permissionsError):500===e.status?this.alertService.showMessage(l.b.serverError):this.alertService.showMessage(l.b.unknownError)})}showDate(e){let t=new Date(e);return this.getDate(t)+" - "+this.getTime(t)}getDate(e){return e.getDate()+" de "+["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][e.getMonth()]+" del "+e.getFullYear()}getTime(e){let t="";return e.getHours()<=12?t+=e.getHours()+":":e.getHours()>12&&(t+=e.getHours()-12+":"),t+=(e.getMinutes()<10?"0":"")+e.getMinutes(),e.getHours()<12?t+="AM":t+="PM",t}mapVeredict(e){return"in queue"===e?"En espera":"running"===e?"Ejecutando":"Accepted"===e?"Correcto":"Compilation Error"===e?"Error de compilación":"Time Limit Exceeded"===e?"Tiempo limite excedido":"Runtime Error"===e?"Error en tiempo de ejecución":"Wrong Answer"===e?"Respuesta equivocada":void 0}toFixed(e){return parseFloat(e).toFixed(3)}viewCode(t){this.downloadActive=!1,this.submissionLoaded=t,this.submissionLoaded.code="Cargando código...",e("#submission-detail").modal("show"),this.problemService.getSubmission(this.submissionLoaded.file_name).then(e=>{this.codeDownload=e,this.downloadActive=!0;let i=new FileReader;i.onload=()=>{void 0!==t.blockly_file_name&&null!==t.blockly_file_name?(this.downloadMesagge="Descargar código (Python)",this.isABlocklyCode=!0,this.viewSvgSubmission(t)):(this.downloadMesagge="Descargar código",this.isABlocklyCode=!1,this.submissionLoaded.code=i.result)},i.readAsText(e)}).catch(e=>{401===e.status||403===e.status?this.alertService.showMessage(l.b.permissionsError):500===e.status?this.alertService.showMessage(l.b.serverError):this.alertService.showMessage(l.b.unknownError)}),this.viewLogs(),this.showLogs(0)}viewSvgSubmission(e){this.problemService.getSvgSubmission(this.submissionLoaded.blockly_file_name).then(e=>{this.submissionLoaded.svgUrl=URL.createObjectURL(e)}).catch(e=>{401===e.status||403===e.status?this.alertService.showMessage(l.b.permissionsError):500===e.status?this.alertService.showMessage(l.b.serverError):this.alertService.showMessage(l.b.unknownError)})}downloadCode(){let e;if(e="Java"===this.submissionLoaded.language?"Main.java":"C++"===this.submissionLoaded.language?"main.cpp":"main.py",window.navigator.msSaveOrOpenBlob)window.navigator.msSaveBlob(this.codeDownload,e);else{let t=window.document.createElement("a");t.href=window.URL.createObjectURL(this.codeDownload),t.download=e,document.body.appendChild(t),t.click(),document.body.removeChild(t)}}viewLogs(){this.logsMessagge="No hay mensajes para mostrar";let e="";"Compilation Error"==this.submissionLoaded.verdict?e=".out":"Runtime Error"==this.submissionLoaded.verdict&&(e=".err"),""!=e&&this.problemService.getSubmissionLog(this.submissionLoaded.file_name.split(".")[0]+e).then(e=>{let t=new FileReader;t.onload=()=>{null!=t.result&&(this.logsMessagge=t.result)},t.readAsText(e)}).catch(e=>{401===e.status||403===e.status?this.alertService.showMessage(l.b.permissionsError):500===e.status?this.alertService.showMessage(l.b.serverError):this.alertService.showMessage(l.b.unknownError)})}showLogs(e){document.getElementById("logs-detail").textContent=this.logsMessagge,document.getElementById("code-detail").style.display=e?"none":"block",document.getElementById("view-logs-btn").style.display=e?"none":"block",document.getElementById("view-code-btn").style.display=e?"block":"none",document.getElementById("code-download-btn").style.display=e?"none":"block",document.getElementById("log-detail").style.display=e?"block":"none"}}).prototype,"page",[a.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),r=m(o.prototype,"filterChange",[a.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s=o))||s}.call(this,i("EVdn"))},"modules/SubmissionsStudents/SubmissionsStudents.html":function(e,t,i){e.exports='<template> <require from="../../resources/elements/filter"></require> <require from="../../resources/elements/paginator"></require> <div slot="content" class="body-slot"> <div class="container" if.bind="authService.isCoach() || authService.isAdmin()"> <h1 class="text-right">Envios</h1> <div class="col-lg-12"> <hr> Mostrar solo envios con veredicto: <div class="dropdown dropdown-inline ufps-dropdown"> <button class="btn dropdown-toggle" type="button" id="selectVeredict" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> ${veredict.text} <span class="caret"></span> </button> <ul class="dropdown-menu ufps-dropdown-menu dropdown-mini" aria-labelledby="selectVeredict"> <li repeat.for="i of veredictOptions"> <a click.delegate="setVeredict(i)">${i.text}</a> </li> </ul> </div> <div class="fix"></div> </div> <filter number-of-items.bind="numberOfItems" sort-options.bind="sortOptions" filter-change.bind="filterChange" limit.bind="limit" sort.bind="sort" by.bind="by" text-to-show.bind="\'envios\'" language-flag.bind="false"> </filter> <table> <thead> <tr> <th class="text-center">Problema</th> <th class="text-center">Dificultad</th> <th class="text-center">Fecha de envio</th> <th class="text-center">Veredicto</th> <th class="text-center">Tiempo de ejecución</th> <th class="text-center">Lenguaje</th> <th class="text-center">Código</th> </tr> </thead> <tbody> <tr repeat.for="submission of submissions"> <td class="text-center"> <p if.bind="submission.problem.title_es !== null" class="ufps-name-problem-list ufps-name-problem-list-l"> <a if.bind="submission.problem.category.type == enums.typeCategory.school" href="/problemas/colegios/${submission.problem.id}/detalle/es">${submission.problem.title_es}</a> <a if.bind="submission.problem.category.type == enums.typeCategory.university" href="/problemas/${submission.problem.id}/detalle/es">${submission.problem.title_es}</a> </p> <p if.bind="submission.problem.title_es === null" class="ufps-name-problem-list ufps-name-problem-list-l"> <a if.bind="submission.problem.category.type == enums.typeCategory.school" href="/problemas/colegios/${submission.problem.id}/detalle/en">${submission.problem.title_en}</a> <a if.bind="submission.problem.category.type == enums.typeCategory.university" href="/problemas/${submission.problem.id}/detalle/en">${submission.problem.title_en}</a> </p> </td> <td class="text-center">${submission.problem.level}</td> <td class="text-center">${showDate(submission.created_at)}</td> <td class="text-center" if.bind="submission.status !== \'executed\'">${mapVeredict(submission.status)}</td> <td class="text-center" if.bind="submission.status === \'executed\'">${mapVeredict(submission.verdict)}</td> <td class="text-center">${toFixed(submission.execution_time)}s</td> <td class="text-center">${submission.language}</td> <td class="text-center"> <p class="ufps-name-problem-list ufps-name-problem-list-l"> <a click.delegate="viewCode(submission)">Ver código</a> </p> </td> </tr> <tr if.bind="submissions.length === 0"> <td colspan="7">No has realizado ningún envio.</td> </tr> </tbody> </table> <paginator page.bind="page" total-pages.bind="totalPages"></paginator> </div> <div class="modal fade" id="submission-detail" ref="submissionDetail" tabindex="-1" role="dialog" aria-labelledby="submission-detail"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> <table> <thead> <tr> <th class="text-center">Problema</th> <th class="text-center">Dificultad</th> <th class="text-center">Fecha de envio</th> <th class="text-center">Veredicto</th> <th class="text-center">Tiempo de ejecución</th> <th class="text-center">Lenguaje</th> </tr> </thead> <tbody> <tr> <td class="text-center"> <p if.bind="submissionLoaded.problem.title_es !== null" class="ufps-name-problem-list ufps-name-problem-list-l"> <a if.bind="submissionLoaded.problem.category.type == enums.typeCategory.school" href="/problemas/colegios/${submissionLoaded.problem.id}/detalle/es">${submissionLoaded.problem.title_es}</a> <a if.bind="submissionLoaded.problem.category.type != enums.typeCategory.school" href="/problemas/${submissionLoaded.problem.id}/detalle/es">${submissionLoaded.problem.title_es}</a> </p> <p if.bind="submissionLoaded.problem.title_es === null" class="ufps-name-problem-list ufps-name-problem-list-l"> <a if.bind="submissionLoaded.problem.category.type == enums.typeCategory.school" href="/problemas/colegios/${submissionLoaded.problem.id}/detalle/en">${submissionLoaded.problem.title_es}</a> <a if.bind="submissionLoaded.problem.category.type != enums.typeCategory.school" href="/problemas/${submissionLoaded.problem.id}/detalle/en">${submissionLoaded.problem.title_en}</a> </p> </td> <td class="text-center">${submissionLoaded.problem.level}</td> <td class="text-center">${showDate(submissionLoaded.created_at)}</td> <td class="text-center" if.bind="submissionLoaded.status !== \'executed\'"> ${mapVeredict(submissionLoaded.status)}</td> <td class="text-center" if.bind="submissionLoaded.status === \'executed\'"> ${mapVeredict(submissionLoaded.verdict)}</td> <td class="text-center">${toFixed(submissionLoaded.execution_time)}s</td> <td class="text-center">${submissionLoaded.language}</td> </tr> <tr> <td colspan="6"> <div class="col-12 text-center" id="code-download-btn"> <a click.delegate="downloadCode()" class="btn btn-secondary ufps-btn ufps-btn-secondary text-center" if.bind="downloadActive">${downloadMesagge}</a> <div class="ufps-separator-mini"></div> </div> <div id="code-detail" class="col-12"> <div show.bind="!isABlocklyCode"> <pre>\r\n                            <code> ${submissionLoaded.code} </code>\r\n                        </pre> </div> <div show.bind="isABlocklyCode"> <img src="${submissionLoaded.svgUrl}"> </div> </div> <div class="col-12" id="log-detail"> <pre>\r\n                        <code id="logs-detail">${logsMessage}</code>\r\n                      </pre> </div> <div class="col-12 text-center" id="view-logs-btn"> <a click.delegate="showLogs(1)" class="btn btn-secondary ufps-btn ufps-btn-secondary text-center"> Ver Errores </a> <div class="ufps-separator-mini"></div> </div> <div class="col-12 text-center" id="view-code-btn" style="display:none"> <a click.delegate="showLogs(0)" class="btn btn-secondary ufps-btn ufps-btn-secondary text-center"> Ver Codigo </a> <div class="ufps-separator-mini"></div> </div> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </template>'},x4W3:function(e,t,i){"use strict";i.d(t,"a",(function(){return o})),i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return r})),i.d(t,"e",(function(){return a})),i.d(t,"f",(function(){return s})),i.d(t,"g",(function(){return l})),i.d(t,"h",(function(){return d})),i.d(t,"i",(function(){return u})),i.d(t,"j",(function(){return c})),i.d(t,"d",(function(){return m}));class s{constructor(e,t,i,s,o,n,r,a,l,d,u,c,m,h,b,v,p,g,f,y,w){void 0===e&&(e=void 0),void 0===t&&(t=void 0),void 0===i&&(i=void 0),void 0===s&&(s=void 0),void 0===o&&(o=void 0),void 0===n&&(n=void 0),void 0===r&&(r=void 0),void 0===a&&(a=void 0),void 0===l&&(l=void 0),void 0===d&&(d=void 0),void 0===u&&(u=void 0),void 0===c&&(c=void 0),void 0===m&&(m=void 0),void 0===h&&(h=void 0),void 0===b&&(b=void 0),void 0===v&&(v=void 0),void 0===p&&(p=void 0),void 0===g&&(g=!1),void 0===f&&(f=void 0),void 0===y&&(y=void 0),void 0===w&&(w=void 0),this.id=e,this.titleEN=t,this.titleES=i,this.level=s,this.category=o,this.categoryName=n,this.categoryType=r,this.descriptionEN=a,this.descriptionES=l,this.exampleInput=d,this.exampleOutput=u,this.timeLimit=c,this.input=m,this.output=h,this.author=b,this.authorName=v,this.auxiliarId=p,this.resolved=g,this.submissions=f,this.approval_rate=y,this.submission_count=w}isInEnglish(){return null!=this.titleEN}isInSpanish(){return null!=this.titleES}}class o{constructor(e,t,i,s,o,n,r){this.title=e,this.description=t,this.startDate=i,this.endDate=s,this.problems=o,this.syllabusId=n,this.id=r}adjuntProblems(e){this.problemsLoaded=[];for(let t=0;t<e.length;t++)this.problemsLoaded.push(new s(e[t].id,e[t].title_en,e[t].title_es,e[t].level,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,e[t].assignment_problems.id))}removeProblem(e){for(let t=0;t<this.problemsLoaded.length;t++)if(this.problemsLoaded[t].id===e){this.problemsLoaded.splice(t,1);break}}getStringDate(){let e=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],t=new Date,i=new Date(this.startDate),s=new Date(this.endDate);return t>=s?"Tarea cerrada":t<i?"Inicia el "+i.getDate()+" de "+e[i.getMonth()]+" del "+i.getFullYear():"Cierra el "+s.getDate()+" de "+e[s.getMonth()]+" del "+s.getFullYear()}getStringAvailability(){let e=new Date(this.startDate),t=new Date(this.endDate);return"Disponible desde el "+this.getDate(e)+" a las "+this.getTime(e)+" hasta el "+this.getDate(t)+" a las "+this.getTime(t)}getDate(e){return e.getDate()+" de "+["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][e.getMonth()]+" del "+e.getFullYear()}getTime(e){let t="";return e.getHours()<=12?t+=e.getHours()+":":e.getHours()>12&&(t+=e.getHours()-12+":"),t+=(e.getMinutes()<10?"0":"")+e.getMinutes(),e.getHours()<12?t+="AM":t+="PM",t}}class n{constructor(e){this.name=e,this.totalProblems=0,this.problemsLoaded=[]}setTotalProblems(e){this.totalProblems=e}setProblemsLoaded(e){this.problemsLoaded=[];for(let i=0;i<e.length;i++){var t=new s(e[i].id,e[i].title_en,e[i].title_es,e[i].level,null,null,null,null,null,null,null,null,null,null,e[i].user.name,e[i].user.username,null,!1,e[i].submissions.length,e[i].approval_rate,e[i].submission_count);t.input=e[i].input,t.output=e[i].output,this.problemsLoaded.push(t),e[i].submissions.length>0&&(this.problemsLoaded[i].resolved=!0)}}removeProblem(e){for(let t=0;t<this.problemsLoaded.length;t++)if(this.problemsLoaded[t].id===e){this.problemsLoaded.splice(t,1);break}}}class r{constructor(e,t,i,s,o,n,r,a,l){void 0===e&&(e=void 0),void 0===t&&(t=void 0),void 0===i&&(i=void 0),void 0===s&&(s=void 0),void 0===o&&(o=void 0),void 0===n&&(n=!0),void 0===r&&(r=void 0),void 0===a&&(a=void 0),void 0===l&&(l=void 0),this.title=e,this.description=t,this.initDate=i,this.endDate=s,this.rules=o,this.privacy=n,this.key=r,this.id=a,this.type=l}getSemanticStartDate(){return this.getSemanticDate(new Date(this.initDate))}getSemanticEndDate(){return this.getSemanticDate(new Date(this.endDate))}getSemanticDate(e){let t="";return t=0===e.getHours()?"12:":e.getHours()>12?e.getHours()-12+":":e.getHours()+":",e.getMinutes()<10&&(t+="0"),t+=e.getMinutes(),e.getHours()>=12?t+="PM":t+="AM",e.getDate()+"  de "+["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][e.getMonth()]+" del "+e.getFullYear()+" - "+t}}class a{constructor(e,t,i,s,o,n,r,a){void 0===e&&(e=void 0),void 0===t&&(t=void 0),void 0===i&&(i=void 0),void 0===s&&(s=void 0),void 0===o&&(o=!1),void 0===n&&(n=void 0),void 0===r&&(r=void 0),void 0===a&&(a=void 0),this.id=e,this.name=t,this.category=i,this.description=s,this.isPdf=o,this.url=n,this.pdf=r,this.categoryString=a}}class l{constructor(e,t,i,s,o,n,r,a){void 0===e&&(e=void 0),void 0===t&&(t=void 0),void 0===i&&(i=void 0),void 0===s&&(s=!0),void 0===o&&(o="0000"),void 0===n&&(n=!1),void 0===r&&(r=[]),void 0===a&&(a=void 0),this.id=e,this.title=t,this.description=i,this.privacy=s,this.key=o,this.enrolled=n,this.assignments=[],this.type=a,this.mockAssignments(r)}mockAssignments(e){for(let t=0;t<e.length;t++)this.assignments.push(new o(e[t].tittle,e[t].description,e[t].init_date,e[t].end_date,void 0,this.id,e[t].id))}}class d{constructor(e,t){void 0===e&&(e=null),void 0===t&&(t=null),this.email=e,this.password=t}}class u{constructor(e,t,i,s){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),void 0===s&&(s=null),this.email=e,this.password=t,this.confirmPassword=i,this.token=s}}class c{constructor(e,t,i,s,o,n,r,a,l){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),void 0===s&&(s=null),void 0===o&&(o=null),void 0===n&&(n=null),void 0===r&&(r=null),void 0===a&&(a=null),void 0===l&&(l=null),this.email=e,this.password=t,this.confirmPassword=i,this.name=s,this.username=o,this.code=n,this.type=r,this.id=a,this.institution=l}isValid(){return""!==this.email&&null!=this.email&&(""!==this.password&&null!=this.password&&(""!==this.confirmPassword&&null!=this.confirmPassword&&(""!==this.name&&null!=this.name&&(""!==this.username&&null!=this.username&&(""!==this.type&&null!=this.type&&(""!==this.institution&&null!=this.institution))))))}}class m{}m.typeCategory={school:2,university:1,all:3,getId:e=>"colegio"===e?m.typeCategory.school:"universidad"===e?m.typeCategory.university:null,getNameSpanish:e=>2==e?"Colegio":1==e?"Universidad":null},m.typeInstitution={school:1,university:0,getName:e=>1===e?"school":0===e?"university":null},m.typeContest={school:1,university:0,getName:e=>1==e?"Colegio":0==e?"Universidad":null}}}]);
//# sourceMappingURL=vendors~c13809d1.8c6b23d0c566d155e0dd.bundle.map