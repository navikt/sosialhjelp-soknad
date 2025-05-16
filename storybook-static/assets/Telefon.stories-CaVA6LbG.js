import{j as b}from"./jsx-runtime-DoEZbXM1.js";import{T as y}from"./Telefon-DTISRvU0.js";import{f as M}from"./index-BZkcKs8Z.js";import"./jsx-runtime-Bw5QeaCk.js";import"./index-DLaZd78E.js";import"./index-94rxSlfo.js";import"./context-CfBM28uJ.js";const{useArgs:S}=__STORYBOOK_MODULE_PREVIEW_API__,I={tags:["autodocs"],component:y,argTypes:{isMutating:{control:{type:"boolean"}},telefonnummer:{control:{type:"object"}}}},x=()=>{const[r,a]=S();return b.jsx(y,{...r,setTelefonnummer:_=>a({telefonnummer:{...r.telefonnummer??{},..._}})})},e=(r,a)=>({name:r,args:{telefonnummer:a,setTelefonnummer:M(),isMutating:!1},render:x}),m=e("KRR har et mobilnummer",{telefonnummerBruker:void 0,telefonnummerRegister:"+4798765432"}),n=e("KRR har et fastnummer",{telefonnummerBruker:void 0,telefonnummerRegister:"+4722222222"}),t=e("KRR har utenlandsk nummer",{telefonnummerBruker:void 0,telefonnummerRegister:"+12127365000"}),o=e("Bruker og KRR har et nummer",{telefonnummerBruker:"+4798765432",telefonnummerRegister:"+4798765433"}),s=e("Bruker men ikke KRR har et nummer",{telefonnummerBruker:"+443031237300"});var u,l,i;m.parameters={...m.parameters,docs:{...(u=m.parameters)==null?void 0:u.docs,source:{originalSource:`storyTemplate("KRR har et mobilnummer", {
  telefonnummerBruker: undefined,
  telefonnummerRegister: "+4798765432"
})`,...(i=(l=m.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var c,p,f;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`storyTemplate("KRR har et fastnummer", {
  telefonnummerBruker: undefined,
  telefonnummerRegister: "+4722222222"
})`,...(f=(p=n.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var R,d,g;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`storyTemplate("KRR har utenlandsk nummer", {
  telefonnummerBruker: undefined,
  telefonnummerRegister: "+12127365000"
})`,...(g=(d=t.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var k,B,T;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`storyTemplate("Bruker og KRR har et nummer", {
  telefonnummerBruker: "+4798765432",
  telefonnummerRegister: "+4798765433"
})`,...(T=(B=o.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var K,h,H;s.parameters={...s.parameters,docs:{...(K=s.parameters)==null?void 0:K.docs,source:{originalSource:`storyTemplate("Bruker men ikke KRR har et nummer", {
  telefonnummerBruker: "+443031237300"
})`,...(H=(h=s.parameters)==null?void 0:h.docs)==null?void 0:H.source}}};const N=["RegisterHarMobilnummer","RegisterHarFastnummer","RegisterHarUtenlandsk","BrukerHarMobilnummer","BrukerHarUtenlandskNummer"];export{o as BrukerHarMobilnummer,s as BrukerHarUtenlandskNummer,n as RegisterHarFastnummer,m as RegisterHarMobilnummer,t as RegisterHarUtenlandsk,N as __namedExportsOrder,I as default};
