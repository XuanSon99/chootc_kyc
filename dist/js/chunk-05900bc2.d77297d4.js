(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05900bc2"],{2532:function(t,a,i){"use strict";var s=i("23e7"),e=i("5a34"),n=i("1d80"),c=i("577e"),r=i("ab13");s({target:"String",proto:!0,forced:!r("includes")},{includes:function(t){return!!~c(n(this)).indexOf(c(e(t)),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,a,i){var s=i("861d"),e=i("c6b6"),n=i("b622"),c=n("match");t.exports=function(t){var a;return s(t)&&(void 0!==(a=t[c])?!!a:"RegExp"==e(t))}},"5a34":function(t,a,i){var s=i("44e7");t.exports=function(t){if(s(t))throw TypeError("The method doesn't accept regular expressions");return t}},ab13:function(t,a,i){var s=i("b622"),e=s("match");t.exports=function(t){var a=/./;try{"/./"[t](a)}catch(i){try{return a[e]=!1,"/./"[t](a)}catch(s){}}return!1}},caad:function(t,a,i){"use strict";var s=i("23e7"),e=i("4d64").includes,n=i("44d2");s({target:"Array",proto:!0},{includes:function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")},fd3f:function(t,a,i){"use strict";i.r(a);var s=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("main",{staticClass:"blog"},[i("section",{staticClass:"news mowpad"},[i("div",{staticClass:"mowtainer"},[i("div",{staticClass:"blog-head"},[i("div",{staticClass:"mowtit big-title"},[t._v(" "+t._s(t.cateName)+" ")]),t.title?i("div",{staticClass:"search-title"},[i("span",[t._v(t._s(t.$t("search"))+": "+t._s(t.title))])]):t._e(),t.postList[0]?t._e():i("div",{staticClass:"search-title"},[i("span",[t._v("Hiện chưa có bài viết nào")])])]),t.postList[0]?i("div",{staticClass:"mowgrid"},t._l(t.postList,(function(a,s){return i("div",{key:s,staticClass:"item"},[i("div",{staticClass:"image"},[i("img",{attrs:{src:t.image(a.image),alt:a.title},on:{click:function(i){return t.toDetail(a.slug)}}})]),i("div",{staticClass:"content"},[i("h2",{on:{click:function(i){return t.toDetail(a.slug)}}},[t._v(t._s(a.title))]),i("div",{staticClass:"space"},[i("p",{staticClass:"author"},[i("i",{staticClass:"fas fa-user-edit"}),i("span",[t._v(t._s(a.author||"Admin"))])]),i("p",{staticClass:"time"},[i("i",{staticClass:"far fa-calendar-alt"}),i("span",[t._v(t._s(t.formatTime(a.created_at)))])])])])])})),0):i("div",{staticClass:"mowgrid"},t._l(6,(function(t){return i("div",{key:t,staticClass:"item loader"})})),0),i("div",{class:{"btn-all":!0,shadow:!0,disabled:t.btnDisabled},on:{click:function(a){t.currentPage++}}},[t._v(" "+t._s(t.$t("readmore"))+" ")])])])])},e=[],n=(i("caad"),i("2532"),i("99af"),i("c1df")),c={metaInfo:function(){var t={title:"Chợ OTC Việt Nam | ".concat(this.cateName)};return t},data:function(){return{currentPage:1,postList:[],query:"",title:"",btnDisabled:!1,cateName:"Tin tức"}},mounted:function(){this.getList()},methods:{toDetail:function(t){this.$router.push("/bai-viet/"+t)},getList:function(){var t=this,a="en"==this.$i18n.locale?0:1;if(!this.$route.path.includes("tin-tuc"))return this.$route.path.includes("tim-kiem")?(this.query=this.$route.params.id,void this.searchHandle()):void this.CallAPI("get","posts?page=".concat(this.currentPage,"&language=").concat(a),{},(function(a){a.data[0]?(t.btnDisabled=!1,t.postList=a.data):t.btnDisabled=!0}));this.CallAPI("get","categories/".concat(this.$route.params.id,"?page=").concat(this.currentPage,"&language=").concat(a),{},(function(a){a.data[0]?(t.btnDisabled=!1,t.cateName=a.data[0].cate_name,t.postList=a.data):t.btnDisabled=!0}))},searchHandle:function(){var t=this;this.query&&(this.title=this.query,this.CallAPI("get","search?query=".concat(this.$route.params.id),{},(function(a){a.data.data[0]&&(t.btnDisabled=!0,t.postList=a.data.data,a.data.status||(t.title=t.query+" (".concat(t.$t("notresult"),")")))})))},formatTime:function(t){var a=new Date(t);if(t)return n(a).format("MMMM D, YYYY")}},watch:{currentPage:function(){!this.title||this.currentPage>1?this.getList():this.searchHandle()},$route:function(){this.getList(),this.cateName="Tin tức",this.postList=[],this.currentPage=1,this.btnDisabled=!1,this.query="",this.title=""}}},r=c,o=i("2877"),u=Object(o["a"])(r,s,e,!1,null,null,null);a["default"]=u.exports}}]);