(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{161:function(t,e,r){var n=r(45),a=r(9),o=r(11),i=r(12).f,s=r(70),c=r(170),u=s("meta"),l=0,f=Object.isExtensible||function(){return!0},d=function(t){i(t,u,{value:{objectID:"O"+ ++l,weakData:{}}})},p=t.exports={REQUIRED:!1,fastKey:function(t,e){if(!a(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,u)){if(!f(t))return"F";if(!e)return"E";d(t)}return t[u].objectID},getWeakData:function(t,e){if(!o(t,u)){if(!f(t))return!0;if(!e)return!1;d(t)}return t[u].weakData},onFreeze:function(t){return c&&p.REQUIRED&&f(t)&&!o(t,u)&&d(t),t}};n[u]=!0},168:function(t,e,r){"use strict";var n=r(169),a=r(171);t.exports=n("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),a)},169:function(t,e,r){"use strict";var n=r(4),a=r(2),o=r(31),i=r(13),s=r(161),c=r(122),u=r(121),l=r(9),f=r(1),d=r(74),p=r(48),v=r(77);t.exports=function(t,e,r){var h=-1!==t.indexOf("Map"),g=-1!==t.indexOf("Weak"),m=h?"set":"add",x=a[t],y=x&&x.prototype,w=x,_={},b=function(t){var e=y[t];i(y,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(g&&!l(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!l(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!l(t))&&e.call(this,0===t?0:t)}:function(t,r){return e.call(this,0===t?0:t,r),this})};if(o(t,"function"!=typeof x||!(g||y.forEach&&!f((function(){(new x).entries().next()})))))w=r.getConstructor(e,t,h,m),s.REQUIRED=!0;else if(o(t,!0)){var R=new w,k=R[m](g?{}:-0,1)!=R,j=f((function(){R.has(1)})),E=d((function(t){new x(t)})),T=!g&&f((function(){for(var t=new x,e=5;e--;)t[m](e,e);return!t.has(-0)}));E||((w=e((function(e,r){u(e,w,t);var n=v(new x,e,w);return null!=r&&c(r,n[m],n,h),n}))).prototype=y,y.constructor=w),(j||T)&&(b("delete"),b("has"),h&&b("get")),(T||k)&&b(m),g&&y.clear&&delete y.clear}return _[t]=w,n({global:!0,forced:w!=x},_),p(w,t),g||r.setStrong(w,t,h),w}},170:function(t,e,r){var n=r(1);t.exports=!n((function(){return Object.isExtensible(Object.preventExtensions({}))}))},171:function(t,e,r){"use strict";var n=r(12).f,a=r(47),o=r(124),i=r(32),s=r(121),c=r(122),u=r(72),l=r(73),f=r(10),d=r(161).fastKey,p=r(26),v=p.set,h=p.getterFor;t.exports={getConstructor:function(t,e,r,u){var l=t((function(t,n){s(t,l,e),v(t,{type:e,index:a(null),first:void 0,last:void 0,size:0}),f||(t.size=0),null!=n&&c(n,t[u],t,r)})),p=h(e),g=function(t,e,r){var n,a,o=p(t),i=m(t,e);return i?i.value=r:(o.last=i={index:a=d(e,!0),key:e,value:r,previous:n=o.last,next:void 0,removed:!1},o.first||(o.first=i),n&&(n.next=i),f?o.size++:t.size++,"F"!==a&&(o.index[a]=i)),t},m=function(t,e){var r,n=p(t),a=d(e);if("F"!==a)return n.index[a];for(r=n.first;r;r=r.next)if(r.key==e)return r};return o(l.prototype,{clear:function(){for(var t=p(this),e=t.index,r=t.first;r;)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete e[r.index],r=r.next;t.first=t.last=void 0,f?t.size=0:this.size=0},delete:function(t){var e=p(this),r=m(this,t);if(r){var n=r.next,a=r.previous;delete e.index[r.index],r.removed=!0,a&&(a.next=n),n&&(n.previous=a),e.first==r&&(e.first=n),e.last==r&&(e.last=a),f?e.size--:this.size--}return!!r},forEach:function(t){for(var e,r=p(this),n=i(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.next:r.first;)for(n(e.value,e.key,this);e&&e.removed;)e=e.previous},has:function(t){return!!m(this,t)}}),o(l.prototype,r?{get:function(t){var e=m(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),f&&n(l.prototype,"size",{get:function(){return p(this).size}}),l},setStrong:function(t,e,r){var n=e+" Iterator",a=h(e),o=h(n);u(t,e,(function(t,e){v(this,{type:n,target:t,state:a(t),kind:e,last:void 0})}),(function(){for(var t=o(this),e=t.kind,r=t.last;r&&r.removed;)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==e?{value:r.key,done:!1}:"values"==e?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),l(e)}}},178:function(t,e,r){"use strict";r.r(e);r(30),r(34),r(75),r(76),r(168),r(25),r(71),r(35),r(123);var n=r(68),a=(r(162),r(163)),o=r(165),i=r(166),s=(r(164),o.geoEquirectangular().scale(1e3).translate([-1650,120])),c=o.geoPath().projection(s),u={props:{selectorPrefix:{type:String,default:"mdv"},yearRange:{type:Array,default:function(){return[]}}},computed:{colorRange:function(){return{total_cases:[0,1e4],total_deaths:[0,200],incident_rate:[0,200],fatality_rate:[0,8.75]}[this.currentType]},stopRange:function(){return{total_cases:[0,1500,3e3,4500,6e3,7500,9e3,1e4],total_deaths:[0,25,50,75,100,125,150,200],incident_rate:[0,25,50,75,100,125,150,200],fatality_rate:[0,1.25,2.5,3.75,5,6.25,7.5,8.75]}[this.currentType]},legendText:function(){return{total_cases:"Number of total cases",total_deaths:"Number of total deaths",incident_rate:"Number of incident rate",fatality_rate:"Number of fatality rate"}[this.currentType]}},data:function(){return{types:["total_cases","total_deaths","incident_rate","fatality_rate"],currentType:"total_cases",currentYear:2018}},mounted:function(){var t=this;this.currentYear=this.yearRange[this.yearRange.length-1],this.fetchResources().then(function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(r){var a,o,s,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(n.a)(r,2),o=a[0],s=a[1],e.next=3,t.transformToMap(s,t.currentType);case 3:return u=e.sent,e.t0=t,e.t1=t,e.next=8,o.json();case 8:e.t2=e.sent,e.t3=u,e.t4=c,e.t5=e.t1.render.call(e.t1,e.t2,e.t3,e.t4),e.t0.renderLegend.call(e.t0,e.t5),Object(i.a)(t.getSelector(".province"),{followCursor:!0,plugins:[i.b],content:function(t){return t.getAttribute("data-tooltip")}});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},watch:{currentYear:function(t){this.rerender(t,this.currentType)},currentType:function(t){this.rerender(this.currentYear,t),this.rerenderLegend(this.currentYear,t)}},methods:{getSelector:function(t){return".".concat(this.selectorPrefix," ").concat(t)},getId:function(t){return"".concat(this.selectorPrefix,"-").concat(t)},render:function(t,e,r){var n=this,a=o.select(this.getSelector(".content")).append("svg").attr("viewBox",[0,0,800,400]);return a.append("g").selectAll("path").data(t.features).join("path").attr("fill",(function(t){return n.color(e.get(t.properties.slug))})).attr("data-name",(function(t){return t.properties.state})).attr("data-tooltip",(function(t){return"".concat(t.properties.state," ").concat(e.get(t.properties.slug))})).attr("stroke","#22292f").attr("stroke-linejoin","round").attr("d",r).attr("id",(function(t){return n.getId(t.properties.slug)})).attr("class","province").on("mouseover",(function(){a.selectAll(".province").transition().style("opacity",.5).attr("stroke","#22292f"),o.select(this).transition().style("opacity",1).attr("stroke","black")})).on("mouseleave",(function(){a.selectAll(".province").transition().style("opacity",1).attr("stroke","#22292f")})),a},renderLegend:function(t){var e=this,r=this.getId("linear-gradient"),n=t.append("defs").attr("class","linear-gradient-wrapper").append("linearGradient").attr("id",r).attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","0%"),a=this.stopRange;n.selectAll("stop").data(a).join("stop").attr("offset",(function(t,e){return"".concat(Math.floor((e+1)/a.length*100),"%")})).attr("stop-color",(function(t){return e.color(t)}));var o=t.append("g").attr("class","legend-wrapper").style("transform","translate(calc(50% - 150px), 375px)");o.append("rect").attr("width",300).attr("height",5).style("fill","url(#".concat(r,")"));var i=a.slice(0,a.length-1),s=o.append("g").attr("transform","translate(-35, 20)");return i.forEach((function(t,e){e%2==0&&s.append("text").attr("x",Math.floor((e+1)/a.length*300)).attr("y",0).style("text-anchor","middle").style("fill","#edf2f7").attr("class","legend-stop").text(t)})),o.append("text").style("text-anchor","middle").style("fill","#edf2f7").attr("x",150).attr("y",-12).attr("class","legend-title").text(this.legendText),t},getResourceUrl:function(t){return this.$devMode?t:this.$url(t)},fetchResources:function(){var t=this.getResourceUrl("/id.geojson"),e=this.getResourceUrl("/dengue-indonesia-".concat(this.currentYear,".csv"));return Promise.all([fetch(t),fetch(e)])},rerender:function(t,e){var r=this;return Object(a.a)(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=r.getResourceUrl("/dengue-indonesia-".concat(t,".csv")),n.t0=r,n.next=4,fetch(a);case 4:return n.t1=n.sent,n.t2=e,n.next=8,n.t0.transformToMap.call(n.t0,n.t1,n.t2);case 8:n.sent.forEach((function(t,e){var n=r.getId(e),a=o.select("#"+n);if(a){a.transition().attr("fill",r.color(t));try{document.getElementById(n)._tippy.setContent("".concat(a.attr("data-name")," ").concat(t))}catch(t){console.log(e)}}}));case 10:case"end":return n.stop()}}),n)})))()},rerenderLegend:function(t,e){var r=o.select(this.getSelector(".content svg"));r.select(".linear-gradient-wrapper").remove(),r.select(".legend-wrapper").remove(),this.renderLegend(r)},color:function(t){return o.scaleQuantize(this.colorRange,o.schemeBlues[7])(t)},transformToMap:function(t,e){return Object(a.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=o,r.next=3,t.text();case 3:return r.t1=r.sent,r.t2=function(t){return[t.slug,+t[e]]},n=r.t0.csvParse.call(r.t0,r.t1,r.t2),r.abrupt("return",new Map(n));case 7:case"end":return r.stop()}}),r)})))()}}},l=r(29),f=Object(l.a)(u,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{class:t.selectorPrefix+" max-w-4xl mb-24 mx-auto overflow-x-hidden"},[r("header",{staticClass:"flex flex-wrap items-center"},[r("h2",{staticClass:"font-semibold text-2xl mx-5 lg:mx-0 pt-4 mb-4 w-full md:w-1/2",attrs:{id:"map-of-dengue-fever"}},[t._v("\n      Map of "+t._s(t.currentType.replace("_"," "))+" in "+t._s(t.currentYear)+"\n    ")]),r("div",{staticClass:"mx-5 lg:mx-0 mb-5 md:mb-0 flex-none flex items-center justify-start md:justify-end w-full md:w-1/2"},[r("select",{directives:[{name:"model",rawName:"v-model.number",value:t.currentYear,expression:"currentYear",modifiers:{number:!0}}],staticClass:"text-gray-800 mr-4",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(e){var r="_value"in e?e._value:e.value;return t._n(r)}));t.currentYear=e.target.multiple?r:r[0]}}},t._l(t.yearRange,(function(e){return r("option",{key:"year-"+e,domProps:{value:e}},[t._v("\n          "+t._s(e)+"\n        ")])})),0),r("select",{directives:[{name:"model",rawName:"v-model",value:t.currentType,expression:"currentType"}],staticClass:"text-gray-800",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.currentType=e.target.multiple?r:r[0]}}},t._l(t.types,(function(e){return r("option",{key:"type-"+e,domProps:{value:e}},[t._v("\n          "+t._s(e.replace("_"," "))+"\n        ")])})),0)])]),t._m(0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"overflow-x-auto"},[e("div",{staticClass:"content min-w-2xl"})])}],!1,null,null,null);e.default=f.exports}}]);