(self.webpackChunkandy_polhill=self.webpackChunkandy_polhill||[]).push([[647],{1920:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(7294),a=n(8794),u=n(1149);function l(e){var t=e.children;return r.createElement("div",{className:"post-module--post--2A2V8"},t)}function o(e,t,n,r,a,u,l){try{var o=e[u](l),c=o.value}catch(i){return void n(i)}o.done?t(c):Promise.resolve(c).then(r,a)}var c=n(2656),i=n.n(c);n(5444);function s(e){var t=e.discussionId,n=(0,r.useState)(""),a=n[0],u=n[1],l=(0,r.useState)(""),c=l[0],s=l[1],m=function(){var e,n=(e=i().mark((function e(n){var r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,fetch("https://europe-west2-andypolhill.cloudfunctions.net/receive_comment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({body:a,discussionId:t,name:c})});case 4:return r=e.sent,console.log(r),e.abrupt("return",r.json());case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})),function(){var t=this,n=arguments;return new Promise((function(r,a){var u=e.apply(t,n);function l(e){o(u,r,a,l,c,"next",e)}function c(e){o(u,r,a,l,c,"throw",e)}l(void 0)}))});return function(e){return n.apply(this,arguments)}}();return r.createElement("form",{onSubmit:m},r.createElement("label",null,r.createElement("input",{type:"text",value:c,onChange:function(e){return s(e.target.value)}}),r.createElement("textarea",{value:a,onChange:function(e){return u(e.target.value)}})),r.createElement("input",{type:"submit",value:"Submit"}))}function m(e){var t=e.data.markdownRemark,n=t.frontmatter,o=t.html;return r.createElement(a.Z,null,r.createElement(u.Z,null),r.createElement(l,null,r.createElement("h1",null,n.title),r.createElement("small",null,n.date),r.createElement("div",{dangerouslySetInnerHTML:{__html:o}})),r.createElement(s,{discussionId:n.discussionId}))}},2656:function(e,t,n){e.exports=n(3076)}}]);
//# sourceMappingURL=component---src-pages-markdown-remark-frontmatter-slug-js-71d6214da710c38899ea.js.map