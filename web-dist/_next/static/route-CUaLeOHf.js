import{F as e,c as t,t as n}from"./data-vLvilxiA.js";import{t as r}from"./feeds-BW24l8ES.js";async function i(){let i=[...(await t()).topics].sort((e,t)=>t.apps[t.apps.length-1].heat-e.apps[e.apps.length-1].heat).slice(0,10).map(e=>`- [${e.apps[e.apps.length-1].title}](${r}topic/${encodeURIComponent(e.slug)})`).join(`
`),a=n.map(t=>`- [${e[t]}](${r}${t===`zh`?``:`${t}/`})`).join(`
`),o=process.env.BD_DOCS_URL??`https://docs.breakerdelta.com/`,s=`# 浪尖雷达 Breaker Delta

> 用「浪高」量化话题走势的热点雷达：海浪榜（全部话题按浪高排名）、涨潮榜（浪高涨幅）、回波（新出现的话题），每个话题有独立页面与海浪图（浪高历史走势）。

## 主要页面\n- [海浪榜](${r})\n- [产品介绍 Landing](${r}en/landing)\n- [涨潮榜](${r}rising)\n- [回波](${r}echoes)\n- [分类](${r}categories)\n- [数据源](${r}sources)\n- [战绩](${r}track-record)\n- [投波](${r}submit)\n- [关于](${r}about)\n- [文档 Docs](${o}docs.html)\n- [Docs (English)](${o}en/docs.html)\n- [往期归档](${r}archive)\n- [RSS](${r}feed.xml)\n- [Atom](${r}atom.xml)\n\n## 语言版本\n${a}\n\n## 当前浪高最高的话题\n${i}\n`;return new Response(s,{headers:{"content-type":`text/plain; charset=utf-8`}})}export{i as GET};