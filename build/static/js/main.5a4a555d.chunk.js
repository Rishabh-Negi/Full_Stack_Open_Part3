(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),c=n(14),a=n.n(c),s=n(3),i=n(0),u=function(e){var t=e.persons,n=Object(o.useState)([]),r=Object(s.a)(n,2),c=r[0],a=r[1],u=Object(o.useState)(""),l=Object(s.a)(u,2),d=l[0],m=l[1];return Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{children:["filter shown with  ",Object(i.jsx)("input",{value:d,onChange:function(e){m(e.target.value),""!==e.target.value?a(t.filter((function(t){return t.name.toLowerCase().startsWith(e.target.value.toLowerCase())}))):a([]),c.map((function(e){return console.log(e.name)}))}})]}),c.map((function(e,t){return Object(i.jsxs)("div",{children:[e.name," ",e.number]},e.name+t)}))]})},l=n(4),d=n.n(l),m="/api/persons",f={getAll:function(){return d.a.get(m).then((function(e){return e.data}))},update:function(e,t){return d.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},addContact:function(e){return d.a.post(m,e).then((function(e){return e.data}))},removeContact:function(e){return d.a.delete("".concat(m,"/").concat(e)).then((function(e){return e}))}},j=function(e){var t=e.persons,n=e.setPersons,r=e.setError,c=Object(o.useState)(""),a=Object(s.a)(c,2),u=a[0],l=a[1],d=Object(o.useState)(""),m=Object(s.a)(d,2),j=m[0],b=m[1];return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{onSubmit:function(e){e.preventDefault();var o,c=!1;if(t.forEach((function(e){e.name.toLowerCase()===u.toLowerCase()&&(c=!0,o=e)})),c){if(window.confirm(u+" is already added to phonebook , replace the old number with a new one?")){var a={name:o.name,number:j};f.update(o.id,a).then((function(e){n(t.map((function(t){return t.id!==e.id?t:e}))),r({message:"Updated ".concat(u),color:"green"}),setTimeout((function(){r({message:null,color:"green"})}),2e3)})).catch((function(e){console.log("error",e),r({message:"Information of ".concat(u," has already been removed from server"),color:"red"}),setTimeout((function(){r({message:null,color:"green"})}),2e3)}))}}else{var s={name:u,number:j};f.addContact(s).then((function(e){console.log(e),n(t.concat(e)),r({message:"Added ".concat(u),color:"green"}),setTimeout((function(){r({message:null,color:"green"})}),2e3)})).catch((function(e){r("Error: Not Added"),setTimeout((function(){r({message:null,color:"red"})}),2e3)}))}l(""),b("")},children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:u,onChange:function(e){console.log(e.target.value),l(e.target.value)}})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:j,onChange:function(e){console.log(e.target.value),b(e.target.value)}})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},b=function(e){var t=e.persons,n=e.setPersons,o=e.setError,r=function(e){var r=t.filter((function(t){return t.id.toString()===e.target.id}));if(window.confirm("Delete ".concat(r[0].name," ?"))){f.removeContact(e.target.id).then((function(e){console.log(e),o({message:"Deleted ".concat(r[0].name),color:"green"}),setTimeout((function(){o({message:null,color:"red"})}),2e3)})).catch((function(e){console.log("error",e),o({message:"Information of ".concat(r[0].name," has already been removed from server"),color:"red"}),setTimeout((function(){o({message:null,color:"green"})}),2e3)}));var c=t.filter((function(t){return t.id.toString()!==e.target.id}));n(c)}};return Object(i.jsx)("div",{children:t.map((function(e,t){return Object(i.jsxs)("div",{children:[e.name," ",e.number,Object(i.jsx)("button",{id:e.id,onClick:r,children:" delete"})]},e.name+t)}))})},g=function(e){var t=e.error;if(null===t.message)return null;var n={color:t.color,background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return Object(i.jsx)("div",{style:n,children:t.message})},h=function(){var e=Object(o.useState)([]),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)({message:null,color:"red"}),a=Object(s.a)(c,2),l=a[0],d=a[1];return Object(o.useEffect)((function(){f.getAll().then((function(e){console.log(e),r(e)})).catch((function(e){console.log("error",e),d({message:"some error happened...",color:"red"}),setTimeout((function(){d({message:null,color:"green"})}),2e3)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(g,{error:l}),Object(i.jsx)(u,{persons:n}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(j,{persons:n,setPersons:r,setError:d}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(b,{persons:n,setPersons:r,setError:d})]})};a.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(h,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.5a4a555d.chunk.js.map