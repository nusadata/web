(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{165:function(t,e,a){var n=a(13),s=Date.prototype,r=s.toString,i=s.getTime;new Date(NaN)+""!="Invalid Date"&&n(s,"toString",(function(){var t=i.call(this);return t==t?r.call(this):"Invalid Date"}))},168:function(t,e,a){},169:function(t,e){},181:function(t,e,a){"use strict";var n=a(4),s=a(34),r=a(182),i=a(183),o=a(1),l=1..toFixed,c=Math.floor,d=function(t,e,a){return 0===e?a:e%2==1?d(t,e-1,a*t):d(t*t,e/2,a)};n({target:"Number",proto:!0,forced:l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){l.call({})}))},{toFixed:function(t){var e,a,n,o,l=r(this),u=s(t),m=[0,0,0,0,0,0],p="",h="0",v=function(t,e){for(var a=-1,n=e;++a<6;)n+=t*m[a],m[a]=n%1e7,n=c(n/1e7)},f=function(t){for(var e=6,a=0;--e>=0;)a+=m[e],m[e]=c(a/t),a=a%t*1e7},g=function(){for(var t=6,e="";--t>=0;)if(""!==e||0===t||0!==m[t]){var a=String(m[t]);e=""===e?a:e+i.call("0",7-a.length)+a}return e};if(u<0||u>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(p="-",l=-l),l>1e-21)if(a=(e=function(t){for(var e=0,a=t;a>=4096;)e+=12,a/=4096;for(;a>=2;)e+=1,a/=2;return e}(l*d(2,69,1))-69)<0?l*d(2,-e,1):l/d(2,e,1),a*=4503599627370496,(e=52-e)>0){for(v(0,a),n=u;n>=7;)v(1e7,0),n-=7;for(v(d(10,n,1),0),n=e-1;n>=23;)f(1<<23),n-=23;f(1<<n),v(1,1),f(2),h=g()}else v(0,a),v(1<<-e,0),h=g()+i.call("0",u);return h=u>0?p+((o=h.length)<=u?"0."+i.call("0",u-o)+h:h.slice(0,o-u)+"."+h.slice(o-u)):p+h}})},182:function(t,e,a){var n=a(17);t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},183:function(t,e,a){"use strict";var n=a(34),s=a(15);t.exports="".repeat||function(t){var e=String(s(this)),a="",r=n(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(a+=e);return a}},184:function(t,e,a){"use strict";var n=a(168);a.n(n).a},185:function(t,e,a){"use strict";var n=a(169),s=a.n(n);e.default=s.a},208:function(t,e,a){"use strict";a.r(e);a(27),a(32),a(165),a(181),a(33);var n=a(8),s={metaInfo:function(){return Object(n.a)(Object(n.a)({},this.meta),{},{bodyAttrs:{class:"font-sans bg-gray-900 text-gray-200"},htmlAttrs:{class:"antialiased"}})},props:{selectorPrefix:{type:String,default:"cts"}},computed:{meta:function(){return{title:"Coronavirus Timeline in Indonesia - Nusadata"}}},data:function(){return{scrollY:0,currentDate:new Date("2020-03-02T00:00:00.000Z").getTime(),xFn:null,yFn:null,scrollFn:null,captionsGraph:[{date:"2020-03-02T00:00:00.000Z",value:2},{date:"2020-03-08T00:00:00.000Z",value:14},{date:"2020-03-13T00:00:00.000Z",value:35},{date:"2020-03-16T00:00:00.000Z",value:18},{date:"2020-03-23T00:00:00.000Z",value:65},{date:"2020-04-02T00:00:00.000Z",value:114},{date:"2020-04-10T00:00:00.000Z",value:220},{date:"2020-04-13T00:00:00.000Z",value:316},{date:"2020-04-21T00:00:00.000Z",value:376},{date:"2020-05-06T00:00:00.000Z",value:368},{date:"2020-05-20T00:00:00.000Z",value:693}]}},watch:{scrollY:function(t){var e=this.$page.allCoronavirus.edges[0].node.daily,a=this.xFn.invert(t),n=(0,this.$d3.bisector((function(t){return new Date(t.key)})).left)(e,a),s=e[n]?e[n]:e[e.length-1];this.currentDate=s.key,this.$d3.select(".mouse-per-line-confirmed text").text(Math.ceil(this.yFn.invert(this.yFn(s.jumlah_positif.value)))),this.$d3.select(".mouse-per-line-confirmed circle").style("opacity","1"),this.$d3.select(".mouse-per-line-confirmed").attr("transform","translate(".concat(this.xFn(new Date(s.key)),", ").concat(this.yFn(s.jumlah_positif.value),")"))}},mounted:function(){var t=this;this.scrollY=window.scrollY;var e=document.querySelector("#article-header").getBoundingClientRect(),a=15e3+e.bottom;document.querySelector(".viewbox").setAttribute("style","height: ".concat(a,"px"));var n=document.querySelector(".viewbox").getBoundingClientRect(),s=document.querySelector(".viewbox").offsetWidth,r=window.innerHeight;this.scrollFn=this.$d3.scaleLinear().domain([e.bottom,a]).range([0,s]),document.querySelector(".viewbox").setAttribute("style","height: ".concat(a,"px")),document.querySelector(".content-container").setAttribute("style","position: absolute; top: 0; left: 0"),document.querySelector(".article-container").setAttribute("style","position: absolute; top: 0; left: 0"),window.addEventListener("scroll",(function(){t.scrollY=t.scrollFn(window.scrollY),window.scrollY>=e.bottom?(document.querySelector(".content-container").setAttribute("style","position: fixed; top: 0; left: ".concat(n.left,"px;")),document.querySelector(".article-container").setAttribute("style","position: fixed; top: 0; left: ".concat(n.left,"px;"))):(document.querySelector(".content-container").setAttribute("style","position: absolute; top: 0; left: 0"),document.querySelector(".article-container").setAttribute("style","position: absolute; top: 0; left: 0"))}),{passive:!0}),this.render(this.$page.allCoronavirus.edges[0].node.daily,s,r)},methods:{getSelector:function(t){return".".concat(this.selectorPrefix," ").concat(t)},getId:function(t){return"".concat(this.selectorPrefix,"-").concat(t)},render:function(t,e,a){var n=this.getSelector(".content"),s=e-60,r=a-80;this.$d3.select(n).selectAll("*").remove();var i=this.$d3.select(n).append("svg").attr("width",e).attr("height",a).append("g").attr("transform","translate(".concat(30,", ").concat(40,")")),o=this.createLinearGradient(i,"linear-gradient","#2c5282","#1a202c"),l=this.$d3.scaleTime().domain(this.$d3.extent(t,(function(t){return new Date(t.key)}))).range([0,s]);this.xFn=l;var c=this.$d3.scaleLinear().domain([0,this.$d3.max(t,(function(t){return t.jumlah_positif.value}))]).range([r,0]);this.yFn=c,i.append("path").datum(t).attr("class","area").attr("fill","url(#".concat(o,")")).attr("d",this.$d3.area().x((function(t){return l(new Date(t.key))})).y0(r).y1((function(t){return c(t.jumlah_positif.value)})).curve(this.$d3.curveMonotoneX)),i.append("path").datum(t).attr("class","line").attr("d",this.$d3.line().x((function(t){return l(new Date(t.key))})).y((function(t){return c(t.jumlah_positif.value)})).curve(this.$d3.curveMonotoneX));var d=i.append("g").attr("class","mouse-over-effect").append("g").attr("class","mouse-per-line-confirmed");d.append("circle").attr("r",5).attr("class","circle"),d.append("text").attr("class","text").attr("transform","translate(-5,-10)"),i.append("g").attr("transform","translate(0, ".concat(r,")")).style("font","1rem Manrope").call(this.$d3.axisBottom(l).ticks(5));var u=i.append("g").attr("class","caption-circles"),m=this;this.captionsGraph.forEach((function(t){u.append("circle").attr("r",5).attr("class","caption-circle-donut").attr("cx",l(new Date(t.date))).attr("cy",c(t.value)),u.append("circle").attr("r",8).attr("class","caption-circle").attr("data-x",l(new Date(t.date))).attr("cx",l(new Date(t.date))).attr("cy",c(t.value)).on("click",(function(t,e){var a=+this.getAttribute("data-x"),n=m.scrollFn.invert(a).toFixed(2);window.scrollTo(0,n)}))}))},createLinearGradient:function(t,e,a,n){var s=this.getId(e),r=t.append("defs").attr("class","linear-gradient-wrapper").append("linearGradient").attr("id",s).attr("x1","0%").attr("x2","0%").attr("y1","0%").attr("y2","100%");return r.append("stop").attr("class","start").attr("offset","0%").attr("stop-color",a).attr("stop-opacity",1),r.append("stop").attr("class","end").attr("offset","100%").attr("stop-color",n).attr("stop-opacity",1),s}}},r=(a(184),a(31)),i=a(185),o=Object(r.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{class:t.selectorPrefix+" relative max-w-4xl h-screen mx-auto py-5",attrs:{role:"main"}},[a("div",{staticClass:"z-0 viewbox"},[a("header",{staticClass:"px-5 lg:px-0",attrs:{id:"article-header"}},[a("div",{staticClass:"flex items-center"},[a("g-link",{staticClass:"flex-none text-lg leading-none",attrs:{to:"/"}},[a("span",{staticClass:"font-bold text-gray-200"},[t._v("Nusa")]),a("span",{staticClass:"font-bold text-blue-500"},[t._v("data")])]),a("div",{staticClass:"flex-1 flex justify-end text-right text-sm"},[a("g-link",{staticClass:"py-5 text-gray-500 hover:text-gray-400 mr-5",attrs:{to:"/collections/"}},[t._v("\n              Collections\n            ")]),a("a",{staticClass:"py-5 text-gray-500 hover:text-gray-400",attrs:{href:"https://github.com/nusadata/web"}},[t._v("\n              Repository\n            ")])],1)],1),a("h1",{staticClass:"hidden",attrs:{"aria-hidden":"true"}},[t._v(t._s(t.meta.title))]),t._m(0),a("p",{staticClass:"text-gray-500"},[t._v("This page provides timeline visualization regarding the government actions in response to COVID-19 pandemic starting from the first case to this day. We will update this page regularly following to the latest development of pandemic situation in Indonesia. Best viewed in desktop platform.")]),a("div",{staticClass:"flex flex-col items-center pt-20 pb-10"},[a("p",{staticClass:"text-gray-500"},[t._v("Scroll down to navigate")]),a("span",{staticClass:"text-gray-500"},[a("svg",{staticClass:"css-i6dzq1",attrs:{viewBox:"0 0 24 24",width:"24",height:"24",stroke:"currentColor","stroke-width":"2",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"}},[a("line",{attrs:{x1:"12",y1:"5",x2:"12",y2:"19"}}),a("polyline",{attrs:{points:"19 12 12 19 5 12"}})])])])]),a("div",{staticClass:"relative"},[a("div",{staticClass:"article-container w-1/2 z-10 px-5 lg:px-0"},[a("article",{staticClass:"py-5"},[a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-03-02T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-03-05T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-03-02T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-03-05T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("3 March 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  The first cases\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  President Joko Widodo announced two first positive cases in Indonesia\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/03/02/breaking-jokowi-announces-indonesias-first-two-confirmed-covid-19-cases.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v(")\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-03-08T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-03-11T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-03-08T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-03-11T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("8 March 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Expanded international travel ban\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  Travel restrictions expanded to include several cities in South Korea, Italy and Iran. Visitors from these countries must provide a valid health certificate.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/03/05/covid-19-indonesia-issues-travel-ban-for-hardest-hit-iran-south-korea-italy.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v(")\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-03-13T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-03-15T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-03-13T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-03-15T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("13 March 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Treatment facilities\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  The government designated 132 treatment facilities across Indonesia\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://infeksiemerging.kemkes.go.id/situasi-infeksi-emerging/info-corona-virus/menteri-kesehatan-tetapkan-132-rumah-sakit-rujukan-covid-19/",target:"__blank",rel:"nofollow noopener"}},[t._v("Kementerian Kesehatan")]),t._v(")\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-03-16T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-03-20T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-03-16T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-03-20T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("16 March 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Activities began to be restricted\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  Following to President Joko Widodo call on social distancing, major Jakarta companies started conducting work from home policy [1]. Several regions closed schools and imposed learning activity from home [2]. MUI issued a fatwa to forbid non-compulsory prays in mosque during pandemic [3]. On 17 March, COVID-19 health protocols have been released to public [4].\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source:\n                    [1] "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/03/15/work-from-home-policy-in-effect-at-major-jakarta-companies-over-virus-concerns.html",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v("\n                    [2] "),a("a",{staticClass:"underline",attrs:{href:"https://www.bbc.com/indonesia/indonesia-51769074",rel:"nofollow noopener"}},[t._v("BBC")]),t._v("\n                    [3] "),a("a",{staticClass:"underline",attrs:{href:"https://covid19.go.id/p/protokol/fatwa-majelis-ulama-indonesia-nomor-14-tahun-2020-tentang-penyelenggaran-ibadah-dalam-situasi-terjadi-wabah-covid-19",rel:"nofollow noopener"}},[t._v("Fatwa MUI number 14 2020")]),t._v("\n                    [4] "),a("a",{staticClass:"underline",attrs:{href:"https://www.kompas.com/tren/read/2020/03/17/105258465/berikut-protokol-kesehatan-jika-alami-gejala-virus-corona",target:"__blank",rel:"nofollow noopener"}},[t._v("Kompas.com")]),t._v("\n                  )\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-03-23T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-03-28T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-03-23T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-03-28T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("23 March 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Kemayoran Athletes Village\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  Kemayoran Athletes Village was officially converted to house COVID-19 patients with mild symptoms. This site claimed to be able to house up to 1800 patients.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://nasional.kompas.com/read/2020/03/18/19194761/wisma-atlet-untuk-pasien-covid-19-wapres-ada-1800-tempat-tidur",target:"__blank",rel:"nofollow noopener"}},[t._v("Kompas.com")]),t._v(")\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-03-30T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-04-7T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-03-30T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-04-7T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("30 March 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Not yet lockdown for Jakarta\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  President Joko Widodo refused to impose lockdown on Jakarta.  Bus routes connecting Jakarta and other cities and provinces will remain open following the cancellation of a plan to temporarily suspend operations of AKAP buses.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/03/30/jokowi-refuses-to-impose-lockdown-on-jakarta.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v(")\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-04-02T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-04-05T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-04-02T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-04-05T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("2 April 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Temporary entry ban for all foreign citizens\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  The Directorate General of Immigration in Indonesia temporarily ban entry to the Republic of Indonesia for foreign citizens with several exceptions.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source:\n                    "),a("a",{staticClass:"underline",attrs:{href:"https://www.indonesia.travel/gb/en/news/temporary-entry-ban-for-foreign-citizen-entering-the-republic-of-indonesia",target:"__blank",rel:"nofollow noopener"}},[t._v("indonesia.travel")]),t._v("\n                   )\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-04-10T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-04-12T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-04-10T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-04-12T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("10 April 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Large-scale Social Restrictions (PSBB)\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  The government of DKI Jakarta imposed large-scale social restrictions, followed by several other regions like Bogor, Depok, Bekasi and Tangerang.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source:\n                    "),a("a",{staticClass:"underline",attrs:{href:"https://megapolitan.kompas.com/read/2020/04/07/21552791/psbb-jakarta-mulai-10-april-belajar-tetap-di-rumah-fasilitas-umum-ditutup",target:"__blank",rel:"nofollow noopener"}},[t._v("Kompas.com")]),t._v("\n                   )\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-04-13T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-04-18T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-04-13T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-04-18T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("13 April 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  COVID-19 is a national disaster\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  President Joko Widodo declared COVID-19 as a national disaster after it has infected 4557 people and caused 399 deaths in Indonesia.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://setkab.go.id/presiden-tetapkan-bencana-nonalam-penyebaran-covid-19-sebagai-bencana-nasional/",target:"__blank",rel:"nofollow noopener"}},[t._v("setkab.go.id")]),t._v(")\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-04-21T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-04-25T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-04-21T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-04-25T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("21 April 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Mudik Idul Fitri is banned\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  President Joko Widodo announced his decision to ban Idul Fitri mudik (exodus) starting from 24 April to limit the spread of COVID-19 [1]. To help with this effort, several long distance transportations were banned until at least 31 May [2].\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source:\n                   [1] "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/04/21/breaking-jokowi-bans-mudik-as-ramadan-approaches.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v("\n                   [2] "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/04/23/govt-temporarily-bans-passenger-travel-to-prevent-mudik.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v("\n                  )\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-05-06T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-05-09T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-05-06T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-05-09T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("6 May 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Public transportation was allowed to operate but not for 'mudik'\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  Transportation Minister said that it was possible for the government to allow all means of public transportation to start operations on 7 May to accommodate particular individuals while insisting on banning this year’s Idul Fitri mudik.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/05/06/government-to-allow-public-transportation-to-operate-but-still-bans-mudik.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v("\n                  )\n                ")])])]),a("transition",{attrs:{name:"fade"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.currentDate>=new Date("2020-05-20T00:00:00.000Z").getTime()&&t.currentDate<new Date("2020-05-23T00:00:00.000Z").getTime(),expression:"currentDate >= new Date('2020-05-20T00:00:00.000Z').getTime() &&\n                               currentDate < new Date('2020-05-23T00:00:00.000Z').getTime()"}]},[a("p",{staticClass:"text-gray-500 font-semibold"},[t._v("20 May 2020")]),a("h2",{staticClass:"text-3xl font-bold leading-tight mb-2"},[t._v("\n                  Government tightened security at 'mudik' ban checkpoints\n                ")]),a("p",{staticClass:"mb-2"},[t._v("\n                  The government began to tighten its monitoring of the mudik ban as the Idul Fitri holiday on 24-25 May was approaching. Violators would either be stopped or turned back.\n                ")]),a("p",{staticClass:"text-sm text-gray-500"},[t._v("\n                  (source: "),a("a",{staticClass:"underline",attrs:{href:"https://www.thejakartapost.com/news/2020/05/19/covid-19-govt-to-tighten-security-at-mudik-ban-checkpoints-as-idul-fitri-approaches.html",target:"__blank",rel:"nofollow noopener"}},[t._v("The Jakarta Post")]),t._v("\n                  )\n                ")])])])],1)]),t._m(1)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"font-bold text-4xl pt-10 mb-2"},[e("span",{staticClass:"text-blue-500"},[this._v("Coronavirus")]),this._v(" Timeline")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-container px-5 lg:px-0"},[e("div",{staticClass:"content"})])}],!1,null,null,null);"function"==typeof i.default&&Object(i.default)(o);e.default=o.exports}}]);