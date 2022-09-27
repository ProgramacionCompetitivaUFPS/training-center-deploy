(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"c/xF":function(t,e,o){var n,i;!function(r,s){n=[o("EVdn")],void 0!==(i=function(t){return r.Tour=s(t)}.apply(e,n))&&(t.exports=i)}(window,(function(t){var e;return e=window.document,function(){function o(e){var o,n,i;this._showPopoverAndOverlay=(o=this._showPopoverAndOverlay,n=this,function(){return o.apply(n,arguments)});try{i=window.localStorage}catch(t){i=!1}this._options=t.extend({name:"tour",steps:[],container:"body",autoscroll:!0,keyboard:!0,storage:i,debug:!1,backdrop:!1,backdropContainer:"body",backdropPadding:0,redirect:!0,orphan:!1,duration:!1,delay:!1,basePath:"",template:'<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> <button class="btn btn-sm btn-default" data-role="end">End tour</button> </div> </div>',afterSetState:function(t,e){},afterGetState:function(t,e){},afterRemoveState:function(t){},onStart:function(t){},onEnd:function(t){},onShow:function(t){},onShown:function(t){},onHide:function(t){},onHidden:function(t){},onNext:function(t){},onPrev:function(t){},onPause:function(t,e){},onResume:function(t,e){},onRedirectError:function(t){}},e),this._force=!1,this._inited=!1,this._current=null,this.backdrops=[]}return o.prototype.addSteps=function(t){var e,o,n;for(e=0,o=t.length;e<o;e++)n=t[e],this.addStep(n);return this},o.prototype.addStep=function(t){return this._options.steps.push(t),this},o.prototype.getStep=function(e){if(null!=this._options.steps[e])return t.extend({id:"step-"+e,path:"",host:"",placement:"right",title:"",content:"<p></p>",next:e===this._options.steps.length-1?-1:e+1,prev:e-1,animation:!0,container:this._options.container,autoscroll:this._options.autoscroll,backdrop:this._options.backdrop,backdropContainer:this._options.backdropContainer,backdropPadding:this._options.backdropPadding,redirect:this._options.redirect,reflexElement:this._options.steps[e].element,backdropElement:this._options.steps[e].element,orphan:this._options.orphan,duration:this._options.duration,delay:this._options.delay,template:this._options.template,onShow:this._options.onShow,onShown:this._options.onShown,onHide:this._options.onHide,onHidden:this._options.onHidden,onNext:this._options.onNext,onPrev:this._options.onPrev,onPause:this._options.onPause,onResume:this._options.onResume,onRedirectError:this._options.onRedirectError},this._options.steps[e])},o.prototype.init=function(t){return this._force=t,this.ended()?(this._debug("Tour ended, init prevented."),this):(this.setCurrentStep(),this._initMouseNavigation(),this._initKeyboardNavigation(),this._onResize((e=this,function(){return e.showStep(e._current)})),this._onScroll(function(t){return function(){return t._showPopoverAndOverlay(t._current)}}(this)),null!==this._current&&this.showStep(this._current),this._inited=!0,this);var e},o.prototype.start=function(t){var e;return null==t&&(t=!1),this._inited||this.init(t),null===this._current&&(e=this._makePromise(null!=this._options.onStart?this._options.onStart(this):void 0),this._callOnPromiseDone(e,this.showStep,0)),this},o.prototype.next=function(){var t;return t=this.hideStep(this._current,this._current+1),this._callOnPromiseDone(t,this._showNextStep)},o.prototype.prev=function(){var t;return t=this.hideStep(this._current,this._current-1),this._callOnPromiseDone(t,this._showPrevStep)},o.prototype.goTo=function(t){var e;return e=this.hideStep(this._current,t),this._callOnPromiseDone(e,this.showStep,t)},o.prototype.end=function(){var o,n,i;return i=this,o=function(o){if(t(e).off("click.tour-"+i._options.name),t(e).off("keyup.tour-"+i._options.name),t(window).off("resize.tour-"+i._options.name),t(window).off("scroll.tour-"+i._options.name),i._setState("end","yes"),i._inited=!1,i._force=!1,i._clearTimer(),null!=i._options.onEnd)return i._options.onEnd(i)},n=this.hideStep(this._current),this._callOnPromiseDone(n,o)},o.prototype.ended=function(){return!this._force&&!!this._getState("end")},o.prototype.restart=function(){return this._removeState("current_step"),this._removeState("end"),this._removeState("redirect_to"),this.start()},o.prototype.pause=function(){var t;return(t=this.getStep(this._current))&&t.duration?(this._paused=!0,this._duration-=(new Date).getTime()-this._start,window.clearTimeout(this._timer),this._debug("Paused/Stopped step "+(this._current+1)+" timer ("+this._duration+" remaining)."),null!=t.onPause?t.onPause(this,this._duration):void 0):this},o.prototype.resume=function(){var t,e;return(t=this.getStep(this._current))&&t.duration?(this._paused=!1,this._start=(new Date).getTime(),this._duration=this._duration||t.duration,this._timer=window.setTimeout((e=this,function(){return e._isLast()?e.next():e.end()}),this._duration),this._debug("Started step "+(this._current+1)+" timer with duration "+this._duration),null!=t.onResume&&this._duration!==t.duration?t.onResume(this,this._duration):void 0):this},o.prototype.hideStep=function(e,o){var n,i,r,s,a;if(s=this.getStep(e))return this._clearTimer(),r=this._makePromise(null!=s.onHide?s.onHide(this,e):void 0),a=this,i=function(n){var i,r;if((i=t(s.element)).data("bs.popover")||i.data("popover")||(i=t("body")),i.popover("destroy").removeClass("tour-"+a._options.name+"-element tour-"+a._options.name+"-"+e+"-element").removeData("bs.popover"),s.reflex&&t(s.reflexElement).removeClass("tour-step-element-reflex").off(a._reflexEvent(s.reflex)+".tour-"+a._options.name),s.backdrop&&((r=null!=o&&a.getStep(o))&&r.backdrop&&r.backdropElement===s.backdropElement||a._hideOverlayElement(s)),null!=s.onHidden)return s.onHidden(a)},n=s.delay.hide||s.delay,"[object Number]"==={}.toString.call(n)&&n>0?(this._debug("Wait "+n+" milliseconds to hide the step "+(this._current+1)),window.setTimeout(function(t){return function(){return t._callOnPromiseDone(r,i)}}(this),n)):this._callOnPromiseDone(r,i),r},o.prototype.showStep=function(t){var o,n,i,r,s,a,p;if(this.ended())return this._debug("Tour ended, showStep prevented."),this;if((a=this.getStep(t))&&(s=t<this._current,n=this._makePromise(null!=a.onShow?a.onShow(this,t):void 0),this.setCurrentStep(t),o=function(){switch({}.toString.call(a.path)){case"[object Function]":return a.path();case"[object String]":return this._options.basePath+a.path;default:return a.path}}.call(this),!a.redirect||!this._isRedirect(a.host,o,e.location)||(this._redirect(a,t,o),this._isJustPathHashDifferent(a.host,o,e.location))))return p=this,r=function(e){if(p._isOrphan(a)){if(!1===a.orphan)return p._debug("Skip the orphan step "+(p._current+1)+".\nOrphan option is false and the element does not exist or is hidden."),void(s?p._showPrevStep():p._showNextStep());p._debug("Show the orphan step "+(p._current+1)+". Orphans option is true.")}if(a.autoscroll?p._scrollIntoView(t):p._showPopoverAndOverlay(t),a.duration)return p.resume()},i=a.delay.show||a.delay,"[object Number]"==={}.toString.call(i)&&i>0?(this._debug("Wait "+i+" milliseconds to show the step "+(this._current+1)),window.setTimeout(function(t){return function(){return t._callOnPromiseDone(n,r)}}(this),i)):this._callOnPromiseDone(n,r),n},o.prototype.getCurrentStep=function(){return this._current},o.prototype.setCurrentStep=function(t){return null!=t?(this._current=t,this._setState("current_step",t)):(this._current=this._getState("current_step"),this._current=null===this._current?null:parseInt(this._current,10)),this},o.prototype.redraw=function(){return this._showOverlayElement(this.getStep(this.getCurrentStep()))},o.prototype._setState=function(t,e){var o;if(this._options.storage){o=this._options.name+"_"+t;try{this._options.storage.setItem(o,e)}catch(t){t.code===DOMException.QUOTA_EXCEEDED_ERR&&this._debug("LocalStorage quota exceeded. State storage failed.")}return this._options.afterSetState(o,e)}return null==this._state&&(this._state={}),this._state[t]=e},o.prototype._removeState=function(t){var e;return this._options.storage?(e=this._options.name+"_"+t,this._options.storage.removeItem(e),this._options.afterRemoveState(e)):null!=this._state?delete this._state[t]:void 0},o.prototype._getState=function(t){var e,o;return this._options.storage?(e=this._options.name+"_"+t,o=this._options.storage.getItem(e)):null!=this._state&&(o=this._state[t]),void 0!==o&&"null"!==o||(o=null),this._options.afterGetState(t,o),o},o.prototype._showNextStep=function(){var t,e,o,n;return o=this.getStep(this._current),n=this,e=function(t){return n.showStep(o.next)},t=this._makePromise(null!=o.onNext?o.onNext(this):void 0),this._callOnPromiseDone(t,e)},o.prototype._showPrevStep=function(){var t,e,o,n;return o=this.getStep(this._current),n=this,e=function(t){return n.showStep(o.prev)},t=this._makePromise(null!=o.onPrev?o.onPrev(this):void 0),this._callOnPromiseDone(t,e)},o.prototype._debug=function(t){if(this._options.debug)return window.console.log("Bootstrap Tour '"+this._options.name+"' | "+t)},o.prototype._isRedirect=function(t,e,o){var n;return!(null==t||""===t||!("[object RegExp]"==={}.toString.call(t)&&!t.test(o.origin)||"[object String]"==={}.toString.call(t)&&this._isHostDifferent(t,o)))||(n=[o.pathname,o.search,o.hash].join(""),null!=e&&""!==e&&("[object RegExp]"==={}.toString.call(e)&&!e.test(n)||"[object String]"==={}.toString.call(e)&&this._isPathDifferent(e,n)))},o.prototype._isHostDifferent=function(t,e){switch({}.toString.call(t)){case"[object RegExp]":return!t.test(e.origin);case"[object String]":return this._getProtocol(t)!==this._getProtocol(e.href)||this._getHost(t)!==this._getHost(e.href);default:return!0}},o.prototype._isPathDifferent=function(t,e){return this._getPath(t)!==this._getPath(e)||!this._equal(this._getQuery(t),this._getQuery(e))||!this._equal(this._getHash(t),this._getHash(e))},o.prototype._isJustPathHashDifferent=function(t,e,o){var n;return(null==t||""===t||!this._isHostDifferent(t,o))&&(n=[o.pathname,o.search,o.hash].join(""),"[object String]"==={}.toString.call(e)&&(this._getPath(e)===this._getPath(n)&&this._equal(this._getQuery(e),this._getQuery(n))&&!this._equal(this._getHash(e),this._getHash(n))))},o.prototype._redirect=function(o,n,i){var r;return t.isFunction(o.redirect)?o.redirect.call(this,i):(r="[object String]"==={}.toString.call(o.host)?""+o.host+i:i,this._debug("Redirect to "+r),this._getState("redirect_to")!==""+n?(this._setState("redirect_to",""+n),e.location.href=r):(this._debug("Error redirection loop to "+i),this._removeState("redirect_to"),null!=o.onRedirectError?o.onRedirectError(this):void 0))},o.prototype._isOrphan=function(e){return null==e.element||!t(e.element).length||t(e.element).is(":hidden")&&"http://www.w3.org/2000/svg"!==t(e.element)[0].namespaceURI},o.prototype._isLast=function(){return this._current<this._options.steps.length-1},o.prototype._showPopoverAndOverlay=function(t){var e;if(this.getCurrentStep()===t&&!this.ended())return(e=this.getStep(t)).backdrop&&this._showOverlayElement(e),this._showPopover(e,t),null!=e.onShown&&e.onShown(this),this._debug("Step "+(this._current+1)+" of "+this._options.steps.length)},o.prototype._showPopover=function(e,o){var n,i,r,s,a,p;if(t(".tour-"+this._options.name).remove(),s=t.extend({},this._options),r=this._isOrphan(e),e.template=this._template(e,o),r&&(e.element="body",e.placement="top"),(n=t(e.element)).addClass("tour-"+this._options.name+"-element tour-"+this._options.name+"-"+o+"-element"),e.options&&t.extend(s,e.options),e.reflex&&!r&&t(e.reflexElement).addClass("tour-step-element-reflex").off(this._reflexEvent(e.reflex)+".tour-"+this._options.name).on(this._reflexEvent(e.reflex)+".tour-"+this._options.name,(p=this,function(){return p._isLast()?p.next():p.end()})),a=!0===e.smartPlacement&&-1===e.placement.search(/auto/i),n.popover({placement:a?"auto "+e.placement:e.placement,trigger:"manual",title:e.title,content:e.content,html:!0,animation:e.animation,container:e.container,template:e.template,selector:e.element}).popover("show"),(i=n.data("bs.popover")?n.data("bs.popover").tip():n.data("popover").tip()).attr("id",e.id),"fixed"===n.css("position")&&i.css("position","fixed"),this._reposition(i,e),r)return this._center(i)},o.prototype._template=function(e,o){var n,i,r,s,a,p;return p=e.template,this._isOrphan(e)&&"[object Boolean]"!=={}.toString.call(e.orphan)&&(p=e.orphan),r=(n=(a=t.isFunction(p)?t(p(o,e)):t(p)).find(".popover-navigation")).find('[data-role="prev"]'),i=n.find('[data-role="next"]'),s=n.find('[data-role="pause-resume"]'),this._isOrphan(e)&&a.addClass("orphan"),a.addClass("tour-"+this._options.name+" tour-"+this._options.name+"-"+o),e.reflex&&a.addClass("tour-"+this._options.name+"-reflex"),e.prev<0&&r.addClass("disabled").prop("disabled",!0).prop("tabindex",-1),e.next<0&&i.addClass("disabled").prop("disabled",!0).prop("tabindex",-1),e.duration||s.remove(),a.clone().wrap("<div>").parent().html()},o.prototype._reflexEvent=function(t){return"[object Boolean]"==={}.toString.call(t)?"click":t},o.prototype._reposition=function(o,n){var i,r,s,a,p,h,u;if(a=o[0].offsetWidth,r=o[0].offsetHeight,p=(u=o.offset()).left,h=u.top,(i=t(e).outerHeight()-u.top-o.outerHeight())<0&&(u.top=u.top+i),(s=t("html").outerWidth()-u.left-o.outerWidth())<0&&(u.left=u.left+s),u.top<0&&(u.top=0),u.left<0&&(u.left=0),o.offset(u),"bottom"===n.placement||"top"===n.placement){if(p!==u.left)return this._replaceArrow(o,2*(u.left-p),a,"left")}else if(h!==u.top)return this._replaceArrow(o,2*(u.top-h),r,"top")},o.prototype._center=function(e){return e.css("top",t(window).outerHeight()/2-e.outerHeight()/2)},o.prototype._replaceArrow=function(t,e,o,n){return t.find(".arrow").css(n,e?50*(1-e/o)+"%":"")},o.prototype._scrollIntoView=function(e){var o,n,i,r,s,a,p,h,u;if(p=this.getStep(e),!(o=t(p.element)).length)return this._showPopoverAndOverlay(e);switch(n=t(window),s=o.offset().top,r=o.outerHeight(),h=n.height(),a=0,p.placement){case"top":a=Math.max(0,s-h/2);break;case"left":case"right":a=Math.max(0,s+r/2-h/2);break;case"bottom":a=Math.max(0,s+r-h/2)}return this._debug("Scroll into view. ScrollTop: "+a+". Element offset: "+s+". Window height: "+h+"."),i=0,t("body, html").stop(!0,!0).animate({scrollTop:Math.ceil(a)},(u=this,function(){if(2==++i)return u._showPopoverAndOverlay(e),u._debug("Scroll into view.\nAnimation end element offset: "+o.offset().top+".\nWindow height: "+n.height()+".")}))},o.prototype._onResize=function(e,o){return t(window).on("resize.tour-"+this._options.name,(function(){return clearTimeout(o),o=setTimeout(e,100)}))},o.prototype._onScroll=function(e,o){return t(window).on("scroll.tour-"+this._options.name,(function(){return clearTimeout(o),o=setTimeout(e,100)}))},o.prototype._initMouseNavigation=function(){var o;return o=this,t(e).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='prev']").off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='next']").off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='end']").off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='pause-resume']").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='next']",function(t){return function(e){return e.preventDefault(),t.next()}}(this)).on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='prev']",function(t){return function(e){if(e.preventDefault(),t._current>0)return t.prev()}}(this)).on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='end']",function(t){return function(e){return e.preventDefault(),t.end()}}(this)).on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='pause-resume']",(function(e){var n;return e.preventDefault(),(n=t(this)).text(o._paused?n.data("pause-text"):n.data("resume-text")),o._paused?o.resume():o.pause()}))},o.prototype._initKeyboardNavigation=function(){var o;if(this._options.keyboard)return t(e).on("keyup.tour-"+this._options.name,(o=this,function(t){if(t.which)switch(t.which){case 39:return t.preventDefault(),o._isLast()?o.next():o.end();case 37:if(t.preventDefault(),o._current>0)return o.prev()}}))},o.prototype._makePromise=function(e){return e&&t.isFunction(e.then)?e:null},o.prototype._callOnPromiseDone=function(t,e,o){return t?t.then((n=this,function(t){return e.call(n,o)})):e.call(this,o);var n},o.prototype._showBackground=function(o,n){var i,r,s,a,p,h,u,l,c;for(s=t(e).height(),c=t(e).width(),l=[],a=0,p=(u=["top","bottom","left","right"]).length;a<p;a++)switch(h=u[a],i=null!=(r=this.backdrops)[h]?r[h]:r[h]=t("<div>",{class:"tour-backdrop "+h}),t(o.backdropContainer).append(i),h){case"top":l.push(i.height(n.offset.top>0?n.offset.top:0).width(c).offset({top:0,left:0}));break;case"bottom":l.push(i.offset({top:n.offset.top+n.height,left:0}).height(s-(n.offset.top+n.height)).width(c));break;case"left":l.push(i.offset({top:n.offset.top,left:0}).height(n.height).width(n.offset.left>0?n.offset.left:0));break;case"right":l.push(i.offset({top:n.offset.top,left:n.offset.left+n.width}).height(n.height).width(c-(n.offset.left+n.width)));break;default:l.push(void 0)}return l},o.prototype._showOverlayElement=function(e){var o,n;return 0===(o=t(e.backdropElement)).length?n={width:0,height:0,offset:{top:0,left:0}}:(n={width:o.innerWidth(),height:o.innerHeight(),offset:o.offset()},o.addClass("tour-step-backdrop"),e.backdropPadding&&(n=this._applyBackdropPadding(e.backdropPadding,n))),this._showBackground(e,n)},o.prototype._hideOverlayElement=function(e){var o,n,i;for(n in t(e.backdropElement).removeClass("tour-step-backdrop"),i=this.backdrops)(o=i[n])&&void 0!==o.remove&&o.remove();return this.backdrops=[]},o.prototype._applyBackdropPadding=function(t,e){return"object"==typeof t?(null==t.top&&(t.top=0),null==t.right&&(t.right=0),null==t.bottom&&(t.bottom=0),null==t.left&&(t.left=0),e.offset.top=e.offset.top-t.top,e.offset.left=e.offset.left-t.left,e.width=e.width+t.left+t.right,e.height=e.height+t.top+t.bottom):(e.offset.top=e.offset.top-t,e.offset.left=e.offset.left-t,e.width=e.width+2*t,e.height=e.height+2*t),e},o.prototype._clearTimer=function(){return window.clearTimeout(this._timer),this._timer=null,this._duration=null},o.prototype._getProtocol=function(t){return(t=t.split("://")).length>1?t[0]:"http"},o.prototype._getHost=function(t){return(t=(t=t.split("//")).length>1?t[1]:t[0]).split("/")[0]},o.prototype._getPath=function(t){return t.replace(/\/?$/,"").split("?")[0].split("#")[0]},o.prototype._getQuery=function(t){return this._getParams(t,"?")},o.prototype._getHash=function(t){return this._getParams(t,"#")},o.prototype._getParams=function(t,e){var o,n,i,r,s;if(1===(r=t.split(e)).length)return{};for(s={},o=0,n=(r=r[1].split("&")).length;o<n;o++)s[(i=(i=r[o]).split("="))[0]]=i[1]||"";return s},o.prototype._equal=function(t,e){var o,n,i,r,s,a;if("[object Object]"==={}.toString.call(t)&&"[object Object]"==={}.toString.call(e)){if(r=Object.keys(t),s=Object.keys(e),r.length!==s.length)return!1;for(n in t)if(a=t[n],!this._equal(e[n],a))return!1;return!0}if("[object Array]"==={}.toString.call(t)&&"[object Array]"==={}.toString.call(e)){if(t.length!==e.length)return!1;for(n=o=0,i=t.length;o<i;n=++o)if(a=t[n],!this._equal(a,e[n]))return!1;return!0}return t===e},o}()}))}}]);
//# sourceMappingURL=vendors~cc0898aa.852c6b9f3a4155613e8a.bundle.map