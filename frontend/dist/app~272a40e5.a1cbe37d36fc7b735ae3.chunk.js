(window.webpackJsonp=window.webpackJsonp||[]).push([[0,13],{"modules/levels/niveles":function(e,a,t){"use strict";t.r(a),t.d(a,"Niveles",(function(){return i}));var i=function(){function e(){}return e.prototype.tour=function(){introJs().start()},e}()},"modules/levels/niveles.html":function(e,a,t){var i=t("Rxnk"),r=t("qouW"),s=t("9Jsn"),l=t("mrGr"),o=t("iTKJ"),n=t("5lGw"),c=i(r),d=i(s),u=i(l),m='<template> <require from=../../resources/attributes/tooltip></require> <require from=../../resources/elements/paginator></require> <app-header></app-header> <div data-step=1 data-intro=Niveles slot=content class=body-slot> <a class="btn btn-outline-info" id=boton click.delegate=tour() role=button ref=botonTour>Tour</a> <img src='+c+' alt="" class=fondoHome> <div class=niveles id=nivel1> <h1 class=base1>Básico</h1> <a href=problemas/colegios><img src='+d+' alt="" data-step=2 data-intro="Si nunca has resuelto ningun ejercicio, este nivel es para ti" class=base1></a> <div class=naveNivel1> <a href=problemas/colegios><img src='+u+' alt="" class=nave></a> </div> </div> <div class=niveles id=nivel2> <h1 class=base2>Intermedio</h1> <a href=problemas/colegios><img src='+i(o)+' alt="" data-step=3 data-intro="Si ya has resuelto los problemas del nivel 1, este nivel es para ti" class=base2></a> <div class=naveNivel2> <a href=problemas/colegios><img src='+u+' alt="" class=nave></a> </div> </div> <div class=niveles id=nivel3> <h1 class=base3>Avanzado</h1> <a href=problemas/colegios><img src='+i(n)+' alt="" data-step=4 data-intro="Si ya has resuelto los problemas del nivel 2, este nivel es para ti" class=base3></a> <div class=naveNivel3> <a href=problemas/colegios><img src='+u+' alt="" class=nave></a> </div> </div> </div> </template>';e.exports=m},"modules/material/categories-high-school/categories-high-school":function(e,a,t){"use strict";t.r(a),function(e){t.d(a,"GeneralMaterialsHighSchool",(function(){return c}));var i,r=t("aurelia-framework"),s=t("4ysu"),l=t("oHge"),o=t("W1ll"),n=t("x4W3"),c=Object(r.f)(o.a,o.b,o.i,s.d)(i=function(){function a(e,a,t,i){this.alertService=e,this.authService=a,this.problemsService=t,this.routerService=i,this.categories=[],this.newCategory="",this.categoryEditId=null,this.categoryEditName="",this.categoryRemoveId=null,this.categoryRemoveName="",this.enums=n.d}var t=a.prototype;return t.activate=function(e,a){this.routeConfig=a},t.created=function(){this.getCategories()},t.createCategory=function(){var a=this;this.problemsService.createCategory(this.newCategory,this.enums.typeCategory.school).then((function(){a.getCategories(),a.alertService.showMessage(l.b.categoryCreated),e("#new-category").modal("hide")})).catch((function(){a.alertService.showMessage(l.b.unknownError),e("#new-category").modal("hide")}))},t.getCategories=function(){var e=this;this.problemsService.getCategories(this.enums.typeCategory.school).then((function(a){e.categories=a.categories,0===e.categories.length&&e.alertService.showMessage(l.b.categoriesEmpty)})).catch((function(a){401===a.status?e.alertService.showMessage(l.b.permissionsError):e.alertService.showMessage(l.b.unknownError)}))},t.showEditCategory=function(a,t){this.categoryEditId=a,this.categoryEditName=t,e("#edit-category").modal("show")},t.showRemoveCategory=function(a,t){this.categoryRemoveId=a,this.categoryRemoveName=t,e("#remove-category").modal("show")},t.editCategory=function(){var a=this;this.problemsService.editCategory(this.categoryEditId,this.categoryEditName).then((function(){a.categories.find((function(e){return e.id===a.categoryEditId})).name=a.categoryEditName,a.alertService.showMessage(l.b.categoryEdited),e("#edit-category").modal("hide")})).catch((function(t){401===t.status||403===t.status?a.alertService.showMessage(l.b.permissionsError):500===t.status?a.alertService.showMessage(l.b.serverError):a.alertService.showMessage(l.b.unknownError),e("#edit-category").modal("hide")}))},t.removeCategory=function(){var a=this;this.problemsService.removeCategory(this.categoryRemoveId).then((function(){a.categories.splice(a.categories.findIndex((function(e){return e.id===a.categoryRemoveId})),1),a.alertService.showMessage(l.b.categoryRemoved),e("#remove-category").modal("hide")})).catch((function(t){401===t.status||403===t.status?a.alertService.showMessage(l.b.permissionsError):500===t.status?a.alertService.showMessage(l.b.serverError):a.alertService.showMessage(l.b.unknownError),e("#remove-category").modal("hide")}))},t.tour=function(){introJs().start()},a}())||i}.call(this,t("EVdn"))},"modules/material/categories-high-school/categories-high-school.html":function(e,a,t){e.exports='<template> <require from=../../../resources/attributes/tooltip></require> <a class="btn btn-outline-info" id=boton click.delegate=tour() role=button ref=botonTour>Tour</a> <div data-step=1 data-intro="Aquí encontrarás todo el material necesario para tu apredizaje" class="container ufps-container-logged"> <h1 class=text-right>Materiales Training Center High School</h1> <hr> <div repeat.for="category of categories" class="col-12 col-md-6 col-lg-4 col-xl-3 ufps-card-container"> <div data-step=2 class=ufps-card> <div class="ufps-card-title ufps-card-material"> <span if.bind=authService.isAdmin() class="ufps-edit-category fas fa-pencil-alt" data-toggle=tooltip title="Editar el nombre de la categoría" click.delegate="showEditCategory(category.id, category.name)" tooltip></span> <span if.bind=authService.isAdmin() class="ufps-remove-category fas fa-times-circle" data-toggle=tooltip title="Eliminar categoría" click.delegate="showRemoveCategory(category.id, category.name)" tooltip></span> <h1><a route-href="route: category-material-high-school; params.bind: {id:category.id}">${category.name}</a></h1> </div> </div> </div> <div if.bind=authService.isAdmin() class="col-xs-12 col-sm-6 col-md-4 col-lg-3 ufps-card-new ufps-card-container"> <div class=ufps-card data-toggle=modal data-target=#new-category> <div class=ufps-card-title> <h1> <i class="fas fa-plus-circle"></i> </h1> </div> <div class="col-12 ufps-card-link"> Nueva categoría </div> <div class=fix></div> </div> </div> <div class=fix></div> <div class=ufps-separator></div> </div> <div if.bind=authService.isAdmin() class="modal fade" id=new-category tabindex=-1 role=dialog aria-labelledby=new-category> <div class=modal-dialog role=document> <div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <h4 class=modal-title>Nueva categoría</h4> <br> <form submit.delegate=createCategory()> <div class=input-group> <input type=text class=form-control placeholder="Nombre de la categoría" value.bind=newCategory required> <span class=input-group-btn> <input type=submit class="btn btn-secondary ufps-btn-secondary" value=Agregar> </span> </div> </form> </div> </div> </div> </div> <div if.bind=authService.isAdmin() class="modal fade" id=edit-category tabindex=-1 role=dialog aria-labelledby=edit-category> <div class=modal-dialog role=document> <div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <h4 class=modal-title>Cambiar nombre de la categoría</h4> <br> <form submit.delegate=editCategory()> <div class=input-group> <input type=text class=form-control value.bind=categoryEditName required> <span class=input-group-btn> <input type=submit class="btn btn-secondary ufps-btn-secondary" value=Cambiar> </span> </div> </form> </div> </div> </div> </div> <div if.bind=authService.isAdmin() class="modal fade" id=remove-category tabindex=-1 role=dialog aria-labelledby=remove-category> <div class=modal-dialog role=document> <div class=modal-content> <div class="modal-header text-center"> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <h4 class=modal-title>¿Estás seguro de eliminar la categoría ${categoryRemoveName}?</h4> <br> <p>Esto no eliminará los problemas de dicha categoría, pero quedarán sin clasificar</p> <button class="btn btn-secondary ufps-btn-secondary" click.delegate=removeCategory()>Si</button> <button class="btn btn-secondary ufps-btn-secondary" data-dismiss=modal aria-label=Close>No</button> </div> </div> </div> </div> </template>'},"modules/material/category-material-high-school/category-material-high-school":function(e,a,t){"use strict";t.r(a),function(e){t.d(a,"CategoryMaterial",(function(){return v}));var i,r,s,l,o=t("aurelia-framework"),n=t("4ysu"),c=t("oHge"),d=t("x4W3"),u=t("W1ll");function m(e,a,t,i){t&&Object.defineProperty(e,a,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function h(e,a,t,i,r){var s={};return Object.keys(i).forEach((function(e){s[e]=i[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=t.slice().reverse().reduce((function(t,i){return i(e,a,t)||t}),s),r&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(r):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,a,s),s=null),s}var v=Object(o.f)(u.a,u.b,u.h,u.c,n.d)((s=h((r=function(){function a(e,a,t,i,r){m(this,"page",s,this),m(this,"filterChange",l,this),this.alertService=e,this.authService=a,this.materialService=t,this.categoryService=i,this.routerService=r,this.materials=[],this.newMaterial=new d.e,this.numberOfItems=[3,7,11,15],this.sortOptions=["Id","Nombre"],this.filterChange=!1,this.limit=7,this.sort="Id",this.by="Ascendente",this.page=1,this.totalPages=1,this.typeCategory=d.d.typeCategory.school}var t=a.prototype;return t.filterChangeChanged=function(e,a){void 0!==a&&this.getMaterial()},t.pageChanged=function(e,a){void 0!==a&&this.getMaterial()},t.activate=function(e,a){this.routeConfig=a,this.id=e.id,this.newMaterial.category=this.id,this.validateTypeCategory(),this.getMaterial()},t.validateTypeCategory=function(){var e=this;this.categoryService.getCategory(this.id).then((function(a){a.category.type!==e.typeCategory&&e.routerService.navigate("")})).catch((function(a){401===a.status||403===a.status?e.alertService.showMessage(c.b.permissionsError):500===a.status?e.alertService.showMessage(c.b.serverError):e.alertService.showMessage(c.b.unknownError),e.routerService.navigate("")}))},t.getMaterial=function(){var e=this;this.materialService.getCategoryMaterial(this.id,this.page,this.limit,"Nombre"===this.sort?"name":void 0,"Ascendente"===this.by?"asc":"desc").then((function(a){if(e.materials=[],e.category=a.meta.categoryName,e.totalPages=a.meta.totalPages,0!==e.totalPages)for(var t=0;t<a.data.length;t++)e.materials.push(new d.e(a.data[t].id,a.data[t].name));else e.alertService.showMessage(c.b.materialsEmpty)})).catch((function(a){404===a.status?e.alertService.showMessage(c.b.materialDoesNotExist):e.alertService.showMessage(c.b.serverError)}))},t.showRemoveMaterial=function(a,t){this.materialToRemove=a,this.materialToRemoveName=t,e("#remove-material").modal("show")},t.createMaterial=function(){var a=this;this.materialService.createMaterial(this.newMaterial).then((function(t){a.alertService.showMessage(c.b.addedMaterial),a.getMaterial(),a.newMaterial=new d.e,a.newMaterial.category=a.id,e("#new-material").modal("hide")})).catch((function(){a.alertService.showMessage(c.b.serverError),e("#new-material").modal("hide")}))},t.removeMaterial=function(){var a=this;this.materialService.remove(this.materialToRemove).then((function(t){a.alertService.showMessage(c.b.materialRemoved),a.getMaterial(),e("#remove-material").modal("hide")})).catch((function(){a.alertService.showMessage(c.b.serverError),e("#remove-material").modal("hide")}))},t.tour=function(){introJs().start()},a}()).prototype,"page",[o.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=h(r.prototype,"filterChange",[o.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i=r))||i}.call(this,t("EVdn"))},"modules/material/category-material-high-school/category-material-high-school.html":function(e,a,t){e.exports='<template> <require from=../../../resources/attributes/tooltip></require> <require from=../../../resources/elements/filter></require> <require from=../../../resources/elements/paginator></require> <a class="btn btn-outline-info" id=boton click.delegate=tour() role=button ref=botonTour>Tour</a> <div data-step=1 data-intro="Aquí podras estudiar los temas que hay según la categoría que elegiste" class="container ufps-container-logged"> <ol class=breadcrumb> <li class=breadcrumb-item> <a href=/ >Categorías</a> </li> <li class="breadcrumb-item active">Materiales de "${category}"</li> </ol> <h1 class=text-right>${category}</h1> <hr> <filter number-of-items.bind=numberOfItems sort-options.bind=sortOptions filter-change.bind=filterChange limit.bind=limit sort.bind=sort by.bind=by text-to-show.bind="\'materiales\'" language-flag.bind=false></filter> <div repeat.for="material of materials" class="col-12 col-md-6 col-lg-4 col-xl-3 ufps-card-container"> <div data-step=2 data-intro="Puedes elegir el tema que quieras o necesites" class=ufps-card> <div class="ufps-card-title ufps-card-material"> <span if.bind=authService.isAdmin() click.delegate="showRemoveMaterial(material.id, material.name)" class="ufps-remove-category fas fa-times-circle" data-toggle=tooltip title="Eliminar este material" tooltip></span> <h1><a route-href="route: specificMaterial; params.bind: {id:material.id}">${material.name}</a></h1> </div> </div> </div> <div if.bind=authService.authenticated class="col-12 col-md-6 col-lg-4 col-xl-3 ufps-card-new ufps-card-container"> <div class=ufps-card data-toggle=modal data-target=#new-material> <div class=ufps-card-title> <h1> <i class="fas fa-plus-circle fa-2x fa-lg"></i> </h1> </div> <div class="col-12 ufps-card-link"> Subir material </div> <div class=fix></div> </div> </div> <div class=fix></div> <paginator page.bind=page total-pages.bind=totalPages></paginator> </div> <div if.bind=authService.authenticated class="modal fade" id=new-material tabindex=-1 role=dialog aria-labelledby=new-material> <div class="modal-dialog modal-lg" role=document> <div class=modal-content> <div class=modal-header> <h4 class=modal-title>Añadir material</h4> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <br> </div> <div class=modal-body> <form enctype=multipart/form-data submit.delegate=createMaterial()> <input type=text class=form-control placeholder=Nombre value.bind=newMaterial.name required> <br> <input type=text class=form-control placeholder=Descripcion value.bind=newMaterial.description> <br> <label for=selectType>Tipo:</label> <input type=radio name=selectType checked.bind=newMaterial.isPdf model.bind=true> PDF <input type=radio name=selectType checked.bind=newMaterial.isPdf model.bind=false> URL <br> <input if.bind=!newMaterial.isPdf type=text class=form-control placeholder=Url value.bind=newMaterial.url> <input if.bind=newMaterial.isPdf type=file class=form-control-file files.bind=newMaterial.pdf accept=.pdf> <br> <div class=modal-footer> <p class=text-center if.bind=authService.isStudent()>Aparecerá en la plataforma una vez sea aprobado por un administrador.</p> <input type=submit class="btn btn-secondary ufps-btn-secondary" value=Añadir> </div> </form> </div> </div> </div> </div>  <div if.bind=authService.isAdmin() class="modal fade" id=remove-material tabindex=-1 role=dialog aria-labelledby=remove-material> <div class=modal-dialog role=document> <div class=modal-content> <div class="modal-header text-center"> <h4 class=modal-title>¿Estás seguro de eliminar el material \'${materialToRemoveName}\'?</h4> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <br> </div> <div class=modal-body> <p>Esta acción no puede ser revertida.</p> </div> <div class=modal-footer> <button class="btn btn-secondary ufps-btn-secondary" click.delegate=removeMaterial()>Si</button> <button class="btn btn-secondary ufps-btn-secondary" data-dismiss=modal aria-label=Close>No</button> </div> </div> </div> </div> </template>'},"modules/material/category-material/category-material":function(e,a,t){"use strict";t.r(a),function(e){t.d(a,"CategoryMaterial",(function(){return v}));var i,r,s,l,o=t("aurelia-framework"),n=t("4ysu"),c=t("oHge"),d=t("x4W3"),u=t("W1ll");function m(e,a,t,i){t&&Object.defineProperty(e,a,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function h(e,a,t,i,r){var s={};return Object.keys(i).forEach((function(e){s[e]=i[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=t.slice().reverse().reduce((function(t,i){return i(e,a,t)||t}),s),r&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(r):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,a,s),s=null),s}var v=Object(o.f)(u.a,u.b,u.h,n.d,u.c)((s=h((r=function(){function a(e,a,t,i,r){m(this,"page",s,this),m(this,"filterChange",l,this),this.alertService=e,this.authService=a,this.materialService=t,this.routerService=i,this.categoryService=r,this.materials=[],this.newMaterial=new d.e,this.numberOfItems=[3,7,11,15],this.sortOptions=["Id","Nombre"],this.filterChange=!1,this.limit=7,this.sort="Id",this.by="Ascendente",this.page=1,this.totalPages=1,this.typeCategory=d.d.typeCategory.university}var t=a.prototype;return t.filterChangeChanged=function(e,a){void 0!==a&&this.getMaterial()},t.pageChanged=function(e,a){void 0!==a&&this.getMaterial()},t.activate=function(e,a){this.routeConfig=a,this.id=e.id,this.newMaterial.category=this.id,this.validateTypeCategory(),this.getMaterial()},t.validateTypeCategory=function(){var e=this;this.categoryService.getCategory(this.id).then((function(a){a.category.type!==e.typeCategory&&e.routerService.navigate("/")})).catch((function(a){401===a.status||403===a.status?e.alertService.showMessage(c.b.permissionsError):500===a.status?e.alertService.showMessage(c.b.serverError):e.alertService.showMessage(c.b.unknownError),e.routerService.navigate("/")}))},t.getMaterial=function(){var e=this;this.materialService.getCategoryMaterial(this.id,this.page,this.limit,"Nombre"===this.sort?"name":void 0,"Ascendente"===this.by?"asc":"desc").then((function(a){if(e.materials=[],e.category=a.meta.categoryName,e.totalPages=a.meta.totalPages,0!==e.totalPages)for(var t=0;t<a.data.length;t++)e.materials.push(new d.e(a.data[t].id,a.data[t].name));else e.alertService.showMessage(c.b.materialsEmpty)})).catch((function(a){404===a.status?e.alertService.showMessage(c.b.materialDoesNotExist):e.alertService.showMessage(c.b.serverError)}))},t.showRemoveMaterial=function(a,t){this.materialToRemove=a,this.materialToRemoveName=t,e("#remove-material").modal("show")},t.createMaterial=function(){var a=this;this.materialService.createMaterial(this.newMaterial).then((function(t){a.alertService.showMessage(c.b.addedMaterial),a.getMaterial(),a.newMaterial=new d.e,a.newMaterial.category=a.id,e("#new-material").modal("hide")})).catch((function(){a.alertService.showMessage(c.b.serverError),e("#new-material").modal("hide")}))},t.removeMaterial=function(){var a=this;this.materialService.remove(this.materialToRemove).then((function(t){a.alertService.showMessage(c.b.materialRemoved),a.getMaterial(),e("#remove-material").modal("hide")})).catch((function(){a.alertService.showMessage(c.b.serverError),e("#remove-material").modal("hide")}))},t.tour=function(){introJs().start()},a}()).prototype,"page",[o.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=h(r.prototype,"filterChange",[o.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i=r))||i}.call(this,t("EVdn"))},"modules/material/category-material/category-material.html":function(e,a,t){e.exports='<template> <require from=../../../resources/attributes/tooltip></require> <require from=../../../resources/elements/filter></require> <require from=../../../resources/elements/paginator></require> <a class="btn btn-outline-info" id=boton click.delegate=tour() role=button ref=botonTour>Tour</a> <div data-step=1 data-intro="Aquí podras estudiar los temas que hay según la categoría que elegiste" class="container ufps-container-logged"> <ol class=breadcrumb> <li class=breadcrumb-item> <a href=/ >Categorías</a> </li> <li class="breadcrumb-item active">Materiales de "${category}"</li> </ol> <h1 class=text-right>${category}</h1> <hr> <filter number-of-items.bind=numberOfItems sort-options.bind=sortOptions filter-change.bind=filterChange limit.bind=limit sort.bind=sort by.bind=by text-to-show.bind="\'materiales\'" language-flag.bind=false></filter> <div repeat.for="material of materials" class="col-12 col-md-6 col-lg-4 col-xl-3 ufps-card-container"> <div data-step=2 data-intro="Puedes elegir el tema que quieras o necesites" class=ufps-card> <div class="ufps-card-title ufps-card-material"> <span if.bind=authService.isAdmin() click.delegate="showRemoveMaterial(material.id, material.name)" class="ufps-remove-category fas fa-times-circle" data-toggle=tooltip title="Eliminar este material" tooltip></span> <h1><a route-href="route: specificMaterial; params.bind: {id:material.id}">${material.name}</a></h1> </div> </div> </div> <div if.bind=authService.authenticated class="col-12 col-md-6 col-lg-4 col-xl-3 ufps-card-new ufps-card-container"> <div class=ufps-card data-toggle=modal data-target=#new-material> <div class=ufps-card-title> <h1> <i class="fas fa-plus-circle fa-2x fa-lg"></i> </h1> </div> <div class="col-12 ufps-card-link"> Subir material </div> <div class=fix></div> </div> </div> <div class=fix></div> <paginator page.bind=page total-pages.bind=totalPages></paginator> </div> <div if.bind=authService.authenticated class="modal fade" id=new-material tabindex=-1 role=dialog aria-labelledby=new-material> <div class="modal-dialog modal-lg" role=document> <div class=modal-content> <div class=modal-header> <h4 class=modal-title>Añadir material</h4> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <br> </div> <div class=modal-body> <form enctype=multipart/form-data submit.delegate=createMaterial()> <input type=text class=form-control placeholder=Nombre value.bind=newMaterial.name required> <br> <input type=text class=form-control placeholder=Descripcion value.bind=newMaterial.description> <br> <label for=selectType>Tipo:</label> <input type=radio name=selectType checked.bind=newMaterial.isPdf model.bind=true> PDF <input type=radio name=selectType checked.bind=newMaterial.isPdf model.bind=false> URL <br> <input if.bind=!newMaterial.isPdf type=text class=form-control placeholder=Url value.bind=newMaterial.url> <input if.bind=newMaterial.isPdf type=file class=form-control-file files.bind=newMaterial.pdf accept=.pdf> <br> <div class=modal-footer> <p class=text-center if.bind=authService.isStudent()>Aparecerá en la plataforma una vez sea aprobado por un administrador.</p> <input type=submit class="btn btn-secondary ufps-btn-secondary" value=Añadir> </div> </form> </div> </div> </div> </div>  <div if.bind=authService.isAdmin() class="modal fade" id=remove-material tabindex=-1 role=dialog aria-labelledby=remove-material> <div class=modal-dialog role=document> <div class=modal-content> <div class="modal-header text-center"> <h4 class=modal-title>¿Estás seguro de eliminar el material \'${materialToRemoveName}\'?</h4> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <br> </div> <div class=modal-body> <p>Esta acción no puede ser revertida.</p> </div> <div class=modal-footer> <button class="btn btn-secondary ufps-btn-secondary" click.delegate=removeMaterial()>Si</button> <button class="btn btn-secondary ufps-btn-secondary" data-dismiss=modal aria-label=Close>No</button> </div> </div> </div> </div> </template>'},"modules/material/material":function(e,a,t){"use strict";t.r(a),t.d(a,"Material",(function(){return i}));var i=function(){function e(){}return e.prototype.configureRouter=function(e,a){e.map([{route:"",name:"material",moduleId:"modules/material/category-material/category-material",title:"Material",settings:{roles:["admin","coach","student"]}},{route:"/material/:id",name:"specificMaterial",moduleId:"modules/material/specific-material/specific-material",title:"Material",settings:{roles:["admin","coach","student"]}},{route:["/colegios/categorias"],name:"categories-high-school",moduleId:"modules/material/categories-high-school/categories-high-school",title:"Training Center High School- Categorías",settings:{roles:["admin","coach","student"]}},{route:["/colegios/categorias/categoria/:id"],name:"category-material-high-school",moduleId:"modules/material/category-material-high-school/category-material-high-school",title:"Training Center High School- Materiales de estudio",settings:{roles:["admin","coach","student"]}}]),this.router=a},e}()},"modules/material/material.html":function(e,a){e.exports="<template> <div slot=content class=body-slot> <router-view></router-view> </div> </template>"},"modules/material/public-material/public-material":function(e,a,t){"use strict";t.r(a),t.d(a,"PublicMaterial",(function(){return h}));var i,r,s,l,o=t("aurelia-framework"),n=(t("4ysu"),t("oHge")),c=t("x4W3"),d=t("W1ll");function u(e,a,t,i){t&&Object.defineProperty(e,a,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function m(e,a,t,i,r){var s={};return Object.keys(i).forEach((function(e){s[e]=i[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=t.slice().reverse().reduce((function(t,i){return i(e,a,t)||t}),s),r&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(r):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,a,s),s=null),s}var h=Object(o.f)(d.a,d.b,d.h)((s=m((r=function(){function e(e,a,t){u(this,"page",s,this),u(this,"filterChange",l,this),this.alertService=e,this.authService=a,this.materialService=t,this.materials=[],this.numberOfItems=[4,8,12,16],this.sortOptions=["Id","Nombre"],this.filterChange=!0,this.limit=8,this.sort="Id",this.by="Ascendente",this.page=1,this.totalPages=1,this.getMaterial()}var a=e.prototype;return a.filterChangeChanged=function(e,a){void 0!==a&&this.getMaterial()},a.pageChanged=function(e,a){void 0!==a&&this.getMaterial()},a.getMaterial=function(){var e=this;this.materialService.getPublicMaterial(this.page,this.limit,"Nombre"===this.sort?"name":void 0,"Ascendente"===this.by?"asc":"desc").then((function(a){if(e.materials=[],e.totalPages=a.meta.totalPages,0!==e.totalPages)for(var t=0;t<a.data.length;t++)e.materials.push(new c.e(a.data[t].id,a.data[t].name));else e.alertService.showMessage(n.b.materialsEmpty)})).catch((function(a){404===a.status?e.alertService.showMessage(n.b.materialDoesNotExist):e.alertService.showMessage(n.b.serverError)}))},e}()).prototype,"page",[o.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=m(r.prototype,"filterChange",[o.h],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i=r))||i},"modules/material/public-material/public-material.html":function(e,a,t){e.exports='<template> <require from=../../../resources/elements/filter></require> <require from=../../../resources/elements/paginator></require> <div slot=content class=body-slot> <app-header></app-header> <div class=container> <br> <filter number-of-items.bind=numberOfItems sort-options.bind=sortOptions filter-change.bind=filterChange limit.bind=limit sort.bind=sort by.bind=by text-to-show.bind="\'materiales\'" language-flag.bind=false></filter> <div repeat.for="material of materials" class="col-sm-12 col-md-6 col-lg-4 col-xl-3 ufps-card-container"> <a href=/material-publico/${material.id}> <div class=ufps-card> <div class="ufps-card-title ufps-card-material"> <span if.bind=authService.isAdmin() class="ufps-edit-category fas fa-pencil-alt" data-toggle=tooltip title="Editar este material" tooltip></span> <span if.bind=authService.isAdmin() class="ufps-remove-category fas fa-times-circle" data-toggle=tooltip title="Eliminar este material" tooltip></span> <h1>${material.name}</h1> </div> </div> </a> </div> <div class=fix></div> <paginator page.bind=page total-pages.bind=totalPages></paginator> </div> </div> </template> '},"modules/material/specific-material/specific-material":function(e,a,t){"use strict";t.r(a),t.d(a,"SpecificMaterial",(function(){return c}));var i,r=t("aurelia-framework"),s=t("4ysu"),l=t("oHge"),o=t("x4W3"),n=t("W1ll"),c=Object(r.f)(n.a,n.b,n.h,s.d)(i=function(){function e(e,a,t,i){this.alertService=e,this.authService=a,this.materialService=t,this.routerService=i}var a=e.prototype;return a.activate=function(e,a){this.routeConfig=a,this.id=e.id,this.getMaterial()},a.getMaterial=function(){var e=this;this.materialService.getMaterial(this.id).then((function(a){var t=a.material;e.category=a.material.category,-1!==t.url.search("youtube.com")&&(t.url=t.url.replace("watch?v=","embed/")),-1!==t.url.search("youtu.be")&&(t.url=t.url.replace("youtu.be/","youtube.com/embed/")),-1!==t.url.search("/usr/src/app/files/materials/")&&(t.url=l.a.apiUrl+"materials/pdf/"+t.url.replace("/usr/src/app/files/materials/","")),e.material=new o.e(t.id,t.name,t.number,t.description,void 0,t.url)})).catch((function(a){404===a.status?e.alertService.showMessage(l.b.materialDoesNotExist):e.alertService.showMessage(l.b.serverError),e.routerService.navigate("")}))},a.tour=function(){introJs().start()},e}())||i},"modules/material/specific-material/specific-material.html":function(e,a){e.exports='<template> <a class="btn btn-outline-info" id=boton click.delegate=tour() role=button ref=botonTour>Tour</a> <div class="container text-center"> <ol class="breadcrumb text-left"> <li class=breadcrumb-item> <a href=/ >Categorías</a> </li> <li class=breadcrumb-item> <a href=/materials/${category.id}>Materiales de "${category.name}"</a> </li> <li class="breadcrumb-item active">${material.name}</li> </ol> <div data-step=1 data-intro="Aquí podras visualizar el material del tema y llenarte de conocimiento" class=row> <div class="col-xl-10 offset-lg-1"> <h2>${material.name}</h2> <p>${material.description}</p> <div class=ufps-container-iframe> <iframe src=${material.url} width=100% class=ufps-iframe title=${material.name}></iframe> </div> </div> </div> <div class=row> <p class=text-center> <a href=${material.url} target=_blank>Abrir en pestaña externa</a> </p> </div> </div> </template> '},"modules/material/specific-public-material/specific-public-material":function(e,a,t){"use strict";t.r(a),t.d(a,"SpecificPublicMaterial",(function(){return c}));var i,r=t("aurelia-framework"),s=t("4ysu"),l=t("oHge"),o=t("x4W3"),n=t("W1ll"),c=Object(r.f)(n.a,n.b,n.h,s.d)(i=function(){function e(e,a,t,i){this.alertService=e,this.authService=a,this.materialService=t,this.routerService=i}var a=e.prototype;return a.activate=function(e,a){this.routeConfig=a,this.id=e.id,this.getMaterial()},a.getMaterial=function(){var e=this;this.materialService.getMaterial(this.id).then((function(a){var t=a.material;e.category=a.material.category,e.material=new o.e(t.id,t.name,t.number,t.description,void 0,t.url.replace("watch?v=","embed/"))})).catch((function(a){404===a.status?e.alertService.showMessage(l.b.materialDoesNotExist):e.alertService.showMessage(l.b.serverError),e.routerService.navigate("")}))},e}())||i},"modules/material/specific-public-material/specific-public-material.html":function(e,a){e.exports='<template> <div slot=content class=body-slot> <app-header></app-header> <div class="container text-center"> <ol class="breadcrumb text-left"> <li class=breadcrumb-item> <a href=/material-publico>Material público</a> </li> <li class="breadcrumb-item active">${material.name}</li> </ol> <div class=row> <div class="col-lg-10 col-lg-offset-1"> <h2>${material.name}</h2> <p>${material.description}</p> <div class=ufps-container-iframe> <iframe src=${material.url} width=100% class=ufps-iframe title=${material.name}></iframe> </div> </div> </div> <div class=row> <p class=text-center> <a href=${material.url} target=_blank>Abrir en pestaña externa</a> </p> </div> </div> </div> </template> '},"modules/partners/partners":function(e,a,t){"use strict";t.r(a),t.d(a,"Partners",(function(){return r}));var i=t("wo0w"),r=function(){function e(){this.col=void 0,this.getJson()}return e.prototype.getJson=function(){this.col=i},e}()},"modules/partners/partners.html":function(e,a){e.exports='<template> <div slot=content class=body-slot> <app-header></app-header> <div class="row row-cols-1 row-cols-md-4 g-4 mt-5 m-5"> <div class=col repeat.for="c of col"> <div class=card style=width:18rem> <img class=card-img-top src=${c.foto} alt=img-perfil> <div class=card-body> <h5>${c.nombre}</h5> <a href=${c.linkedin} target=_blank class="btn ufps-btn-sign">Linkedin</a> <a href=${c.github} target=_blank class="btn ufps-btn-sign">Github</a> </div> </div> </div> </div> </div> </template>'}}]);
//# sourceMappingURL=app~272a40e5.a1cbe37d36fc7b735ae3.bundle.map