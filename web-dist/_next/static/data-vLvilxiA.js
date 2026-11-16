import*as e from"node:path";import*as t from"node:fs";import"node:crypto";var n={must:60,watch:30,echo:10,seed:10};function r(e){return(n[e.level??``]??10)+20*(e.sources?.length??0)+8*(e.links?.length??0)+(e.is_new?25:0)}var i=`行业动态`,a={rules:[[`安全`,[`漏洞`,`攻击`,`后门`,`泄露`,`入侵`,`恶意软件`]],[`政策与监管`,[`监管`,`出口管制`,`国会`,`禁令`,`法规`,`审查`,`制裁`,`听证`,`法案`]],[`开源`,[`开源`,`开放权重`,`GitHub`,`llama.cpp`,`open source`,`Open Source`]],[`商业与资本`,[`IPO`,`融资`,`收购`,`财报`,`股价`,`辞职`,`董事会`,`CEO`,`上市`,`估值`,`裁员`]],[`Agent 与应用`,[`Agent`,`agent`,`智能体`,`钱包`,`Wallet`,`Copilot`,`助手`]],[`AI 模型`,[`模型`,`Gemini`,`GPT`,`Claude`,`DeepSeek`,`LLM`,`发布`,`推出`,`版本`]]],fallback:i};function o(e,t,n=a){for(let r of[e??``,t??``])for(let[e,t]of n.rules)if(t.some(e=>r.includes(e)))return e;return n.fallback}function s(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function c(e,t){if(typeof e!=`string`||e.trim()===``||!Array.isArray(t))return null;let n=t.filter(e=>typeof e==`string`&&e!==``);return n.length>0?[e,n]:null}function l(e){if(!s(e))return null;let t=e.categories;if(t==null)return null;let n=[],r={},a=i,o=(e,t,n)=>{let i={};typeof t==`string`&&t!==``&&(i.en=t),typeof n==`string`&&n!==``&&(i.ja=n),Object.keys(i).length>0&&(r[e]=i)},l=e=>{if(!s(e))return;let t=c(e.name,e.keywords);t&&(n.push(t),o(t[0],e.en,e.ja))};if(Array.isArray(t))for(let e of t)l(e);else if(s(t)){if(typeof t.fallback==`string`&&t.fallback!==``&&(a=t.fallback),o(a,t.fallback_en,t.fallback_ja),Array.isArray(t.rules))for(let e of t.rules)l(e);else for(let[e,r]of Object.entries(t)){if(e===`fallback`||e===`fallback_en`||e===`fallback_ja`)continue;let t=c(e,r);t&&n.push(t)}}if(n.length===0)return null;let u={rules:n,fallback:a};return Object.keys(r).length>0&&(u.i18n=r),u}var u=new Set([`index`,`rising`,`seeds`,`echoes`,`categories`,`sources`,`archive`,`about`,`feed`,`sitemap`,`robots`,`llms`,`track-record`,`submit`,`data`]);function d(e,t){let n=(e??``).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g,`-`);return n=n.replace(/-+/g,`-`).replace(/^-+|-+$/g,``),n=[...n].slice(0,48).join(``),n=n.replace(/^-+|-+$/g,``),n||t}var ee=new Set([`the`,`and`,`for`,`with`,`from`,`that`,`this`,`new`,`its`,`are`,`was`]);function te(e){let t=e??``,n=[...t.matchAll(/[A-Za-z][A-Za-z0-9\-]{2,}/g)].map(e=>e[0]).filter(e=>!ee.has(e.toLowerCase())),r=[],i=e=>{let t=(e??``).trim();t&&!r.includes(t)&&r.push(t)};n.forEach((e,t)=>{i(e),t+1<n.length&&(i(`${n[t]} ${n[t+1]}`),i(`${n[t]}-${n[t+1]}`))});for(let e of t.matchAll(/[\u4e00-\u9fff]{2,}/g)){let t=e[0];i([...t].length<=8?t:[...t].slice(0,4).join(``))}return i(t),r.slice(0,10)}function f(e){return new Set((e??``).toLowerCase().match(/[A-Za-z0-9]+|[\u4e00-\u9fff]/g)??[])}var p=e.join(`state`,`seen-topics.json`);function m(e){return String(e).padStart(2,`0`)}function ne(){let e=new Date;return`${e.getFullYear()}-${m(e.getMonth()+1)}-${m(e.getDate())}`}function re(e=p){if(!t.existsSync(e))return{topics:[]};let n=JSON.parse(t.readFileSync(e,`utf-8`));return n.topics??=[],n}function ie(n,r=p){let i=e.dirname(e.resolve(r));t.mkdirSync(i,{recursive:!0});let a=e.join(i,`.seen-topics-${Date.now()}-${Math.floor(Math.random()*1e9)}.tmp`);try{t.writeFileSync(a,JSON.stringify(n,null,2),`utf-8`),t.renameSync(a,r)}catch(e){throw t.existsSync(a)&&t.unlinkSync(a),e}}function h(e){return{due:null,result:null,checked_on:null,_first_seen:e}}function ae(e,t,n,r,i){let a=i??ne();for(let i of e.topics)if(i.name===t){i.last_seen=a;for(let e of n)i.sources.includes(e)||i.sources.push(e);return i.history.push({date:a,grade:r}),(i.review===null||i.review===void 0)&&(i.review=h(i.first_seen)),i}let o={name:t,first_seen:a,last_seen:a,sources:[...n],history:[{date:a,grade:r}],review:h(a)};return e.topics.push(o),o}e.join(`state`,`vocab.json`);function oe(e,t){let n=e.title??``;if(n.includes(`Anthropic`))return[`arc:anthropic`,`Anthropic IPO`];if([`黄仁勋`,`英伟达`,`Nvidia`].some(e=>n.includes(e)))return[`arc:nvidia`,`黄仁勋 / Nvidia 风波`];let r=f(n),i=null,a=0;for(let e of t){let t=0;for(let n of f(e.name))r.has(n)&&(t+=1);t>a&&(i=e,a=t)}return i!==null&&a>=6?[`led:${i.name}`,i.name]:[`own:${n}`,n]}function g(e,t,n){let r=new Map,i=[];e.forEach((e,a)=>{for(let s of e.items){let[c,l]=oe(s,t),u=r.get(c);u||(u={key:c,name:l,apps:[],id:``,slug:``},r.set(c,u),i.push(c));let d={edition:a,date:e.date,slot:e.slot??null,published:e.published_at??null,category:o(s.title??``,s.body??``,n),title:s.title??l,level:s.level===`seed`?`echo`:s.level??null,heat:s._heat,rank:s._rank,sources:s.sources??[],links:s.links??[],body:s.body??``,action:s.action??``,...s.i18n?{i18n:s.i18n}:{},...s.plugins?{plugins:s.plugins}:{},is_new:!!s.is_new,heat_delta:null,rank_delta:null};u.apps.push(d)}});let a=new Set;return i.forEach((e,t)=>{let n=r.get(e);n.id=`t${String(t+1).padStart(2,`0`)}`;let i=d(n.apps[0].title,n.id),o=i,s=2;for(;a.has(o)||u.has(o)||o.startsWith(`edition-`)||o.startsWith(`category-`)||o.startsWith(`level-`)||o.startsWith(`board-`);)o=`${i}-${s}`,s+=1;a.add(o),n.slug=o,n.name=e.startsWith(`arc:`)?n.name:n.apps[n.apps.length-1].title,n.apps.forEach((e,t)=>{if(t===0)e.heat_delta=null,e.rank_delta=null;else{let r=n.apps[t-1];e.heat_delta=e.heat-r.heat,e.rank_delta=r.rank-e.rank}})}),i.map(e=>r.get(e))}var _={"🔥":`must`,"👀":`watch`,"🌱":`echo`,"🌀":`echo`};function se(){return{groups:[],total:0,reviewed:0,hits:0,first_review:``}}function v(e){let t=se(),n=null;for(let r of e.split(/\r\n|\r|\n/)){let e=/^##\s+(\d{4}-\d{2}-\d{2})\s+(.+?)（复核日\s*(\d{4}-\d{2}-\d{2})）\s*$/.exec(r);if(e){n={date:e[1],label:e[2].trim(),review_date:e[3],entries:[]},t.groups.push(n);continue}if(n===null||!r.startsWith(`|`))continue;let i=r.trim().replace(/^\|+/,``).replace(/\|+$/,``).split(`|`).map(e=>e.trim());if(i.length!==4||!(i[0]in _))continue;let a={level:_[i[0]],emoji:i[0],topic:i[1],criteria:i[2],result:i[3],review_date:n.review_date};n.entries.push(a),t.total+=1,a.result&&(t.reviewed+=1,a.result.includes(`命中`)&&!a.result.includes(`未命中`)&&(t.hits+=1))}let r=t.groups.filter(e=>e.entries.length>0).map(e=>e.review_date);return t.first_review=r.length>0?r.reduce((e,t)=>e<t?e:t):``,t}var ce=`
:root{--bg:#0a0e13;--panel:#0d1319;--line:#26303d;--ink:#e8eef5;--sub:#93a5bb;--faint:#5f7189;
 --teal:#5eead4;--green:#4ade80;--red:#fb7185;--amber:#f5b83d;--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);line-height:1.6;
 font-family:"Avenir Next","Segoe UI",system-ui,"PingFang SC","Microsoft YaHei",sans-serif}
.wrap{max-width:1060px;margin:0 auto;padding:26px 18px 50px}
a{color:var(--teal);text-decoration:none} a:hover{text-decoration:underline}
header.mast{display:flex;align-items:center;gap:12px;border:1px solid var(--line);
 background:var(--panel);padding:12px 16px;border-radius:8px}
header.mast svg{width:30px;height:30px}header.mast img.mastmark{width:30px;height:30px}
.wordmark{font-size:13px;letter-spacing:.32em;font-weight:700}
.pg-title{font-size:21px;font-weight:800}
nav.tabs{display:flex;gap:8px;margin:14px 0 0}
nav.tabs a{border:1px solid var(--line);border-radius:6px;padding:5px 14px;color:var(--sub);font-size:13.5px}
nav.tabs a.on{color:var(--ink);border-color:var(--teal);background:rgba(94,234,212,.07)}
.timeline{display:flex;align-items:flex-start;margin:30px 2px 14px;position:relative}
.timeline::before{content:"";position:absolute;left:0;right:0;top:5px;border-top:1px solid var(--line)}
.tick{flex:1;text-align:center;position:relative}
.tick a{color:var(--faint);font-size:12px;display:block;padding-top:20px}
.tick::before{content:"";position:absolute;top:0;left:50%;margin-left:-5px;width:9px;height:9px;
 border-radius:50%;border:1px solid var(--faint);background:var(--bg)}
.tick.on a{color:var(--beam,#f5d97e);font-weight:700}
.tick.on::before{background:#f5d97e;border-color:#f5d97e}
.tl-label{color:var(--faint);font-size:12px;margin-top:14px}
.panel{border:1px solid var(--line);background:var(--panel);border-radius:8px;padding:6px 16px 14px;margin-top:18px}
.panel-h{display:flex;justify-content:space-between;padding:10px 0 6px;font-weight:700;font-size:15px}
.panel-h .r{color:var(--faint);font-weight:400;font-size:12.5px}
.row{display:flex;align-items:center;gap:13px;padding:11px 0;border-top:1px solid rgba(255,255,255,.05)}
.row:first-of-type{border-top:none}
.rank{font-size:17px;font-weight:800;width:24px;text-align:center;color:#7d8ea6;font-family:var(--mono)}
.rank.top{color:var(--amber)}
.rtitle{flex:1;min-width:0;font-size:15px;font-weight:600}
.rtitle a{color:var(--ink)} .rtitle a:hover{color:var(--teal);text-decoration:none}
.avatars{display:flex;align-items:center;flex:none}
.av{width:24px;height:24px;border-radius:50%;margin-left:-7px;border:2px solid var(--panel);
 display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:#0b1017}
.av:first-child{margin-left:0}
.avimg{width:24px;height:24px;border-radius:50%;margin-left:-7px;border:2px solid var(--panel);
 background:#fff;object-fit:cover;flex:none}
.src-ic{width:30px;height:30px;margin-left:0}
.spark{flex:none;color:#38bdf8;display:flex;align-items:center}
.prank{display:inline;font-size:10.5px;color:var(--faint);font-weight:400;font-family:var(--mono)}
.rank{display:flex;align-items:baseline;gap:6px;width:auto;min-width:70px;text-align:left}
.hdelta{font-size:11.5px;font-family:var(--mono);color:var(--faint)}
.hdelta.up{color:var(--green)} .hdelta.down{color:var(--red)} .hdelta.new{color:var(--amber)}
.heat{display:flex;align-items:center;gap:10px}
.heat .hv{text-align:right}
.mast-ctl{display:flex;gap:8px;margin-left:auto;align-items:center}
.theme-btn{border:1px solid var(--line);background:none;color:var(--sub);border-radius:6px;
 padding:4px 10px;cursor:pointer;font-size:13px}
.theme-btn:hover{color:var(--teal);border-color:var(--teal)}
.langs{display:flex;gap:6px}
.langs a{border:1px solid var(--line);border-radius:6px;padding:4px 9px;font-size:12px;color:var(--sub)}
.langs a.on{color:var(--ink);border-color:var(--teal)}
.ticks-scroll{overflow-x:auto;scrollbar-width:thin;padding-bottom:10px}
.timeline.tight{flex-wrap:nowrap}
.timeline.tight .tick{flex:none;min-width:118px}
.tick.dim a{visibility:hidden}
.srctops{font-size:12px;color:var(--sub)}
[data-theme="light"]{--bg:#f4f1ea;--panel:#fffdf7;--line:#d8d1bd;--ink:#1b2430;--sub:#5d6b7a;
 --faint:#8b96a5;--teal:#0d9488}
[data-theme="light"] .row{border-top-color:rgba(0,0,0,.07)}
[data-theme="light"] th,[data-theme="light"] td{border-top-color:rgba(0,0,0,.08)}
[data-theme="light"] .detail{color:#3d4756}
[data-theme="light"] .spark{color:#0284c7}
[data-theme="light"] .badge{background:rgba(0,0,0,.04)}
[data-theme="light"] details{border-top-color:rgba(0,0,0,.14)}
.avimg:first-child{margin-left:0}
.time{flex:none;color:var(--faint);font-size:12px;font-family:var(--mono)}
.tag{flex:none;font-size:11px;color:var(--teal);border:1px solid rgba(94,234,212,.35);
 border-radius:4px;padding:0 6px}
.more-n{margin-left:6px;font-size:11.5px;color:var(--sub);border:1px solid var(--line);border-radius:999px;padding:1px 7px}
.heat{flex:none;text-align:right;font-family:var(--mono)}
.heat b{font-size:16.5px}
.heat span{color:var(--faint);font-size:11.5px}
.deltas{flex:none;display:flex;flex-direction:column;gap:2px;min-width:86px}
.dchip{font-size:11.5px;font-family:var(--mono);border:1px solid var(--line);border-radius:4px;padding:0 6px;color:var(--sub)}
.dchip.up{color:var(--green);border-color:rgba(74,222,128,.4)}
.dchip.down{color:var(--red);border-color:rgba(251,113,133,.4)}
.dchip.new{color:var(--amber);border-color:rgba(245,184,61,.45)}
table{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:12px;line-height:1.55}
th,td{border-top:1px solid rgba(255,255,255,.06);padding:11px 12px;text-align:left;vertical-align:top}
th{color:var(--faint);font-weight:600;font-size:12px}
td.n,th.n{font-family:var(--mono)}
.badge{display:inline-block;font-size:11.5px;font-weight:700;padding:1.5px 9px;border:1px solid var(--line);
 border-radius:999px;background:rgba(255,255,255,.04)}
.big-heat{font-family:var(--mono);font-size:52px;font-weight:800;line-height:1}
.detail{color:#c3cedd;font-size:14.5px}
.detail p{margin:7px 0}
details{margin-top:10px;border-top:1px dashed rgba(255,255,255,.12);padding-top:9px}
summary{cursor:pointer;color:var(--teal);font-size:13px;font-weight:600;list-style:none}
summary::-webkit-details-marker{display:none}
details ul{margin:7px 0 2px;padding-left:18px}
details li{font-size:12.5px;margin:3px 0;word-break:break-all}
details a{color:var(--sub)}
.pager{display:flex;gap:8px;justify-content:center;margin-top:16px}
.pager a,.pager span{border:1px solid var(--line);border-radius:6px;padding:4px 13px;font-size:13px;color:var(--sub)}
.pager span.on{color:var(--ink);border-color:var(--teal)}
footer{margin-top:26px;color:var(--faint);font-size:12.5px;border-top:1px solid var(--line);padding-top:13px}
@media (max-width: 720px){
  .wrap{padding:0 10px 40px}
  .mast{flex-wrap:wrap;gap:8px}
  .brand{font-size:19px}
  .tabs{flex-wrap:nowrap;overflow-x:auto;white-space:nowrap;scrollbar-width:none;padding-bottom:6px}
  .tabs::-webkit-scrollbar{display:none}
  .tabs a{flex:none}
  .panel{padding:12px}
  h1.pg-title{font-size:19px}
  .row{flex-wrap:wrap;gap:5px 8px;padding:10px 0;align-items:flex-start}
  .rank{order:1;min-width:0;font-size:15px;gap:4px}
  .rtitle{order:2;flex:1 1 52%;font-size:14.5px}
  .heat{order:3;margin-left:auto}
  .hv b{font-size:18px}
  .tag{order:6} .time{order:7} .avas{order:8} .row .note{order:9}
  .slider-row{gap:8px}
  .stats{flex-wrap:wrap;gap:12px 18px}
  .big{font-size:30px}
  table{display:block;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}
  .about-body{font-size:14px}
}
.copy{margin-top:10px}
.copy a{color:var(--sub)}
.share{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:14px}
.sh{border:1px solid var(--line);border-radius:6px;padding:4px 11px;font-size:12.5px;
 color:var(--sub);background:none;cursor:pointer;font-family:inherit;text-decoration:none}
.sh:hover{color:var(--teal);border-color:var(--teal)}
.sh{display:inline-flex;align-items:center;gap:5px}
.sh svg{flex:none}
a.tag{text-decoration:none}
a.badge{text-decoration:none;color:inherit}
.tagchips{display:flex;flex-wrap:wrap;gap:8px}
.tagchip{border:1px solid var(--line);border-radius:999px;padding:4px 12px;font-size:13px;color:var(--sub);text-decoration:none}
.tagchip:hover{color:var(--teal);border-color:var(--teal)}
.orig ul{margin:6px 0 0;padding-left:18px}
.orig li{margin:3px 0;word-break:break-all;font-size:13.5px}
.tagchip.on{color:var(--ink);border-color:var(--teal);font-weight:700}
.cfgchips{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 2px 43px}
.cfg{font-size:11px;border:1px solid var(--line);border-radius:999px;padding:1px 8px;color:var(--sub);font-family:var(--mono)}
.cfg.off{color:var(--red);border-color:var(--red)}
.cfgrule{margin:0 0 4px 43px}
.cfgpre{font-family:var(--mono);font-size:12px;line-height:1.6;white-space:pre;overflow-x:auto;background:rgba(127,127,127,.07);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0 12px 43px;color:var(--sub)}
.cfgpre.full{margin-left:0}
.subh{font-weight:700;margin:16px 0 2px}
.ol-list{margin:6px 0 4px;padding-left:20px}
.ol-list li{margin:6px 0;line-height:1.65}
.tips{margin:6px 0 4px;padding-left:18px}
.tips li{margin:5px 0;line-height:1.65}
.help{margin:12px 0 4px}
.help summary{cursor:pointer;color:var(--teal);font-size:13.5px}
.helpbody{color:var(--sub);font-size:13.5px;line-height:1.75;padding:8px 2px 2px}
.helpbody b{color:var(--ink)}
.detail p{margin:12px 0 18px;line-height:1.85}
.orig{margin-top:24px}
.cfgdet{margin:2px 0 10px 43px}
.cfgdet summary{cursor:pointer;color:var(--sub);font-size:12.5px;font-family:var(--mono)}
.cfgdet .cfgpre{margin:8px 0 4px 0}
td a{color:var(--teal)}
.note{color:var(--faint);font-size:12.5px}
.slider-box{display:flex;align-items:center;gap:14px;border:1px solid var(--line);
 background:var(--panel);border-radius:8px;padding:10px 16px;margin-top:12px}
.slider-box input[type=range]{flex:1;accent-color:#5eead4;height:28px;cursor:pointer}
.slider-cap{color:var(--faint);font-size:12px;white-space:nowrap}
.slider-cur{font-family:var(--mono);font-size:13px;color:var(--ink);white-space:nowrap}
@media (max-width:700px){.avatars{display:none}.time{display:none}.deltas{min-width:74px}}
`,y={zh:{site_name:`浪尖雷达 Breaker Delta`,pg_title:`浪尖雷达`,tabs:[`🌊 海浪榜`,`📈 涨潮榜`,`🌀 回波`,`🌀 投波`,`🗂️ 分类`,`📡 数据源`,`🏆 战绩`,`📚 归档`,`ℹ️ 关于`,`📖 文档`],wave:`浪高`,carried:`结转`,new:`NEW 首现`,rank:`排名`,prev:`前`,tags_title:`🏷️ 标签`,editions_n:`{n} 期`,copy_link:`复制链接`,copied:`已复制`,ly1:`源头层`,ly2:`发酵层`,ly3:`验证层`,cfg_per:`每源 {v} 条`,cfg_top:`Top {v}`,cfg_limit:`上限 {v}`,cfg_stars:`日均 ★ ≥ {v}`,cfg_acc:`账号 ≥ {v}`,cfg_verify:`仅验证`,cfg_on:`启用`,cfg_off:`已禁用`,rising_empty:`本期没有上涨的话题：与上一时间点相比浪高都没有上升（新上榜话题计入涨潮榜）。`,cfg_title:`⚙️ 配置（设置文件原文）`,src_topics_title:`贡献的话题`,src_topic_meta:`出现 {n} 次 · 最近 {d}`,creator_title:`✍️ 创作参考`,ol_short:`短贴大纲`,ol_long:`长文大纲`,tips_title:`写作 tips`,cr_src:`框架取自公开写作 skills：tweet-writer（钩子公式 / PAS）、Hormozi 四段、Dan Koe 节奏`,cr_hooks:`钩子三选一（钩子决定 80–90%，先写钩子再写正文）`,hk_num:`数字型`,hk_gap:`好奇缺口`,hk_signal:`信号型`,cr_pas:`正文骨架 · PAS（问题 → 放大 → 事实）`,pas_p:`问题`,pas_a:`放大`,pas_s:`事实`,cr_hz:`骨架 · Hormozi 四段（观点 → 故事 → 理由 → 软 CTA）`,hz1:`一个观点`,hz2:`故事与证据`,hz3:`理由，不是步骤`,hz4:`软 CTA`,hz1_hint:`用一句话写下主张；先从「建议动作」里提炼，写不出就是还没想清`,hz3_hint:`从技术、商业、使用者三个角度各写一条理由——讲为什么成立，不讲怎么做`,hz4_txt:`结尾轻带一句即可：后续会继续追踪它的浪高变化，想跟进的可以收藏这页`,traj:`浪高轨迹`,tips_s:`短贴 tips`,tips_l:`长文 tips`,ol_hook:`钩子`,ol_fact:`核心事实`,ol_why:`为什么重要`,ol_data:`数据`,ol_src:`出处`,ol_title2:`标题`,ol_lead:`导语`,ol_timeline:`事件时间线`,ol_detail:`关键细节`,ol_impact:`影响与判断`,ol_next:`后续观察`,ol_next_txt:`关注后续扫描里浪高和排名的变化`,resonance:`{n} 个来源共振`,wave_rank:`浪高 {h} · 排名 #{r}`,heat_help_t:`浪高是怎么计算的？`,heat_help:`<b>浪高</b> = 基础分 + 共振 + 证据 + 首现加分，不设上限。基础分按等级：🔥必看 60、👀关注 30、🌀回波 10；每多一个<b>独立来源</b> +20（同一来源组的多个链接只算一个来源）；每条<b>原文链接</b> +8；话题<b>第一次出现</b> +25。一个话题至少要有 2 个独立来源才算热点，单来源只记为回波。某一期没有新动态的话题，按上一次的浪高<b>结转</b>进当前榜单，涨跌是和上一个时间点的全榜相比。`,slider:`时间滑块`,current:`当前`,hist:`历史快照`,count:`共 {n} 条`,board_title:`🌊 海浪榜 · 全部话题`,seeds_title:`🌀 回波`,seeds_r:`单源或早期信号 · 近 3 期`,rising_title:`📈 涨潮榜 · 浪高涨幅`,rising_r:`共 {n} 条上涨`,cat_r:`{n} 个话题`,archive_title:`📚 往期归档`,archive_r:`共 {n} 期`,archive_row:`共 {n} 条 · 头名：`,sources_title:`📡 数据源`,sources_r:`共 {n} 个来源 · 按出现次数排序`,src_stats:`域名 {dom} · 贡献 {a} 个话题 · 出现 {b} 次 · 覆盖 {c} 期 · 首次 {d} · 最近 {e}`,cur_wave:`当前浪高`,board_rank:`海浪榜排名`,share:`分享到`,chart:`🌊 海浪图 · 浪高走势`,th:[`期次`,`浪高`,`排名`,`等级`,`较上次`,`当期标题`,`数据源`,`原文链接`],first:`首现`,action:`建议动作`,orig_links:`原文链接`,orig:`原文`,sub_form:`标题：
链接：
理由：`,foot_about:`关于本站`,docs_back:`🌊 雷达主页`,theme:`切换主题`,snap_title:`🌊 海浪榜 · {x} 快照`,page_of:`第 {p}/{n} 页`,desc_default:`浪尖雷达 Breaker Delta：海浪榜、涨潮榜与回波追踪，用浪高量化话题走势，每个话题一张海浪图。`,desc_seeds:`最近三期里首次出现、还在发酵的回波。`,desc_rising:`浪高涨幅最大的话题，正在涨潮的热点。`,desc_sources:`浪尖雷达的全部数据源与各自贡献的话题统计。`,desc_about:`浪尖雷达是什么、浪高算法、页面导览与作者信息。`,desc_landing:`Breaker Delta 产品介绍：定位与原理、公开战绩、与 Google Trends 和聚合器的对比、常见问题与路线图。`,landing_title:`产品介绍`,desc_docs:`浪尖雷达 Breaker Delta 使用文档：快速开始、看懂站点、CLI、配置、Skill 与 MCP、Chrome 扩展、自建与部署。`,desc_track:`浪尖雷达战绩复盘：每一期必看与关注话题的登记台账与 14 天复核结果。`,tr_title:`🏆 战绩 · 复盘台账`,tr_intro:`把每一期的 🔥必看 / 👀关注 逐条登记，14 天后按预设标准复核命中与否。本页由仓库里的 track-record.md 在构建时生成，台账只登记已发布期次，不事后改判。`,tr_total:`已登记`,tr_reviewed:`已复核`,tr_hit_rate:`命中率`,tr_first_review:`首批复核 {d}（到期后回填结果，未到期不提前计算命中率）`,tr_criteria_t:`判定标准`,tr_criteria:`<ul class="tips"><li><b>命中</b>：复核日时，该话题在追踪源内持续发酵（后续期次再现 / 讨论量级维持或上升），或预设的事件检查点如期发生并获得主流覆盖。</li><li><b>未命中</b>：14 天内无后续声量、无事件进展，或事实被证伪。</li><li><b>话题弧合并</b>：同一话题跨多期出现时，按首次上榜日期计，复核时合并为一个话题弧评分，各期条目保留。</li><li><b>事实核查优先</b>：标注事实核查优先的条目，以官方 / 主流媒体证实或证伪直接定命中 / 未命中。</li></ul>`,tr_th:[`级别`,`话题`,`复核标准`,`复核日`,`结果`],tr_pending:`待复核`,desc_submit:`向浪尖雷达投波：提交单源、新鲜、有一手链接的早期信号。`,sub_title:`🌀 投波 · 提交一个回波`,sub_intro:`你刷到一个还没热起来、但可能是回波的信号？投给雷达。投来的回波先进收件清单，下一期扫描时去重、查共振，够格才进回波榜——不承诺收录。`,sub_good_t:`什么算好回波`,sub_good:`<ul class="tips"><li><b>单源</b>：目前只有一处在说，还没有多家跟进——这正是回波的样子。</li><li><b>新</b>：刚出现不久（仓库、帖子、产品、论文越新越好），不是已经上热搜的旧闻。</li><li><b>有一手链接</b>：给出原始页面（仓库 / 原帖 / 官网 / 论文），不要二手搬运合集。</li><li><b>一句话理由</b>：为什么你觉得它会成浪，一句话就够。</li></ul>`,sub_issue_t:`方式一 · GitHub Issue 投波`,sub_issue_btn:`去 GitHub 提投波 Issue →`,sub_issue_note:`链接已预填标题与正文模板（标题 / 链接 / 理由），补齐即可提交。没有 GitHub 账号时，用下方书签工具生成同样格式的文本，发给作者代投。`,sub_bm_t:`方式二 · 书签小工具（bookmarklet）`,sub_bm_btn:`🌀 投波到浪尖雷达`,sub_bm_note:`把这个链接拖到浏览器书签栏；在任意页面点它，就会带着当前页标题 + 链接打开本页，并生成下面这份可复制的投波文本。`,sub_prefill_t:`投波文本（可复制）`,sub_cta:`🌀 发现一个还没热起来的信号？点这里投波 →`},en:{site_name:`Breaker Delta`,pg_title:`Breaker Delta`,tabs:[`🌊 Wave Board`,`📈 Rising`,`🌀 Echoes`,`🌀 Submit`,`🗂️ Categories`,`📡 Sources`,`🏆 Track Record`,`📚 Archive`,`ℹ️ About`,`📖 Docs`],wave:`Wave`,carried:`carried`,new:`NEW`,rank:`Rank`,prev:`was`,tags_title:`🏷️ Tags`,editions_n:`{n} editions`,copy_link:`Copy link`,copied:`Copied`,ly1:`source layer`,ly2:`fermentation layer`,ly3:`verification layer`,cfg_per:`{v} per feed`,cfg_top:`Top {v}`,cfg_limit:`limit {v}`,cfg_stars:`★/day ≥ {v}`,cfg_acc:`accounts ≥ {v}`,cfg_verify:`verify only`,cfg_on:`enabled`,cfg_off:`disabled`,rising_empty:`No topics rose versus the previous time point (new entries count as rising).`,cfg_title:`⚙️ Config (verbatim from the settings file)`,src_topics_title:`Contributed topics`,src_topic_meta:`{n} appearances · latest {d}`,creator_title:`✍️ For creators`,ol_short:`Short-post outline`,ol_long:`Long-form outline`,cr_src:`Frameworks from public writing skills: tweet-writer (hook formulas / PAS), Hormozi's four parts, Dan Koe's rhythm`,cr_hooks:`Three hook options (the hook decides 80–90% — write it first)`,hk_num:`Specific result`,hk_gap:`Curiosity gap`,hk_signal:`Signal`,cr_pas:`Body skeleton · PAS (Problem → Agitate → Facts)`,pas_p:`Problem`,pas_a:`Agitate`,pas_s:`Facts`,cr_hz:`Skeleton · Hormozi's four parts (Idea → Story → Reasons → Soft CTA)`,hz1:`One idea`,hz2:`Story & evidence`,hz3:`Reasons, not steps`,hz4:`Soft CTA`,hz1_hint:`State your claim in one sentence — distill it from the suggested action; if you can't, the angle isn't clear yet`,hz3_hint:`One reason each from the tech, business and user angles — argue why it is true, not how to do it`,hz4_txt:`End lightly: I will keep tracking its wave height — bookmark this page to follow along`,traj:`Wave trail`,tips_s:`Short-post tips`,tips_l:`Long-form tips`,tips_title:`Writing tips`,ol_hook:`Hook`,ol_fact:`Key facts`,ol_why:`Why it matters`,ol_data:`Data`,ol_src:`Sources`,ol_title2:`Title`,ol_lead:`Lead`,ol_timeline:`Timeline`,ol_detail:`Key details`,ol_impact:`Impact & take`,ol_next:`What to watch`,ol_next_txt:`Watch how its wave height and rank move in later scans`,resonance:`{n} sources in resonance`,wave_rank:`Wave {h} · rank #{r}`,heat_help_t:`How is wave height calculated?`,heat_help:`<b>Wave height</b> = base + resonance + evidence + first-appearance bonus, uncapped. Base by level: 🔥 Must-see 60, 👀 Watch 30, 🌀 Echo 10; +20 per <b>independent source</b> (multiple links from one source group count once); +8 per <b>original link</b>; +25 on a topic's <b>first appearance</b>. A topic needs at least 2 independent sources to count as a hotspot; a single source stays a echo. Topics with no new development are <b>carried forward</b> at their last wave height, and deltas compare against the previous time point's full board.`,slider:`Time slider`,current:`current`,hist:`snapshot`,count:`{n} topics`,board_title:`🌊 Wave Board · All topics`,seeds_title:`🌀 Echoes`,seeds_r:`Single-source / early signals · last 3 editions`,rising_title:`📈 Rising · Wave gains`,rising_r:`{n} rising`,cat_r:`{n} topics`,archive_title:`📚 Archive`,archive_r:`{n} editions`,archive_row:`{n} topics · Top: `,sources_title:`📡 Data sources`,sources_r:`{n} sources · by appearances`,src_stats:`{dom} · feeds {a} topics · {b} appearances · {c} editions · first {d} · latest {e}`,cur_wave:`Current wave`,board_rank:`Board rank`,share:`Share`,chart:`🌊 Wave chart`,th:[`Edition`,`Wave`,`Rank`,`Level`,`Change`,`Title`,`Sources`,`Links`],first:`First seen`,action:`Suggested action`,orig_links:`Original links`,orig:`Original`,sub_form:`Title:
Link:
Why it matters:`,foot_about:`About`,docs_back:`🌊 Radar home`,theme:`Toggle theme`,snap_title:`🌊 {x} snapshot`,page_of:`Page {p}/{n}`,desc_default:`Breaker Delta wave board: every topic quantified as a wave height and tracked over time.`,desc_seeds:`Topics that first appeared in the last three editions and are still brewing.`,desc_rising:`Topics with the biggest wave-height gains.`,desc_sources:`All data sources and the topics each one feeds.`,desc_about:`What Breaker Delta is, the wave-height formula, page guide and author info.`,desc_landing:`Breaker Delta landing: what it is, how resonance scoring works, the public track record, comparison with Google Trends and aggregators, FAQ and roadmap.`,landing_title:`Why Breaker Delta`,desc_docs:`Breaker Delta documentation: getting started, reading the site, CLI, configuration, Skill and MCP, the Chrome extension, and deploying your own instance.`,desc_track:`Breaker Delta track record: every Must-read and Watch pick, registered in advance and reviewed after 14 days.`,tr_title:`🏆 Track Record`,tr_intro:`Every 🔥 Must-read / 👀 Watch pick is registered as published and reviewed 14 days later against criteria set in advance. This page is generated at build time from track-record.md in the repo; entries are never rewritten after the fact.`,tr_total:`Registered`,tr_reviewed:`Reviewed`,tr_hit_rate:`Hit rate`,tr_first_review:`First review batch due {d} (results are filled in when due — no hit rate is computed before then)`,tr_criteria_t:`Judgement criteria`,tr_criteria:`<ul class="tips"><li><b>Hit</b>: at review time the topic is still developing in the tracked sources (reappears in later editions / discussion holds or grows), or its preset event checkpoint happens on schedule with mainstream coverage.</li><li><b>Miss</b>: no follow-up signal within 14 days, no event progress, or the facts are debunked.</li><li><b>Topic arcs merged</b>: a topic appearing across editions is dated from its first appearance and scored as one arc at review time; every edition's entry is kept.</li><li><b>Fact-check first</b>: entries marked fact-check first are decided directly by official / mainstream confirmation or debunking.</li></ul>`,tr_th:[`Level`,`Topic`,`Review criteria`,`Review date`,`Result`],tr_pending:`Pending`,desc_submit:`Submit a echo to Breaker Delta: a single-source, fresh signal with a first-hand link.`,sub_title:`🌀 Submit a echo`,sub_intro:`Spotted a signal that has not heated up yet but might be a echo? Send it to the radar. Submissions land in an inbox first; the next scan deduplicates and checks for resonance — only qualifying echoes reach the Echoes board, and inclusion is not promised.`,sub_good_t:`What makes a good echo`,sub_good:`<ul class="tips"><li><b>Single-source</b>: only one place is talking about it so far — that is exactly what a echo looks like.</li><li><b>Fresh</b>: newly appeared (the newer the repo, post, product or paper, the better), not yesterday's headline.</li><li><b>First-hand link</b>: link the original page (repo / original post / official site / paper), not a roundup.</li><li><b>One-line reason</b>: why you think it will become a wave, in one sentence.</li></ul>`,sub_issue_t:`Option 1 · Submit via GitHub Issue`,sub_issue_btn:`Open a echo Issue on GitHub →`,sub_issue_note:`The link prefills the title and body template (title / link / reason) — just fill it in. Without a GitHub account, use the bookmarklet below to generate the same format and send it to the author.`,sub_bm_t:`Option 2 · Bookmarklet`,sub_bm_btn:`🌀 Send echo to Breaker Delta`,sub_bm_note:`Drag this link to your bookmarks bar. On any page, clicking it opens this page with that page's title + URL and generates the copyable echo text below.`,sub_prefill_t:`Echo text (copyable)`,sub_cta:`🌀 Spotted a signal that has not heated up yet? Submit a echo →`},ja:{site_name:`浪尖レーダー Breaker Delta`,pg_title:`浪尖レーダー`,tabs:[`🌊 ウェーブボード`,`📈 上昇`,`🌀 エコー`,`🌀 エコー投稿`,`🗂️ カテゴリ`,`📡 ソース`,`🏆 戦績`,`📚 アーカイブ`,`ℹ️ 概要`,`📖 ドキュメント`],wave:`波高`,carried:`繰越`,new:`NEW`,rank:`順位`,prev:`前`,tags_title:`🏷️ タグ`,editions_n:`{n} 号`,copy_link:`リンクをコピー`,copied:`コピー済み`,ly1:`一次ソース`,ly2:`発酵層`,ly3:`検証層`,cfg_per:`各 {v} 件`,cfg_top:`Top {v}`,cfg_limit:`上限 {v}`,cfg_stars:`★/日 ≥ {v}`,cfg_acc:`アカウント ≥ {v}`,cfg_verify:`検証のみ`,cfg_on:`有効`,cfg_off:`無効`,rising_empty:`前期比で上昇したトピックはありません（新規登場は上昇として数えます）。`,cfg_title:`⚙️ 設定（設定ファイル原文）`,src_topics_title:`寄与したトピック`,src_topic_meta:`{n} 回登場 · 最新 {d}`,creator_title:`✍️ クリエイター向け`,ol_short:`短文アウトライン`,ol_long:`長文アウトライン`,cr_src:`枠組みは公開ライティング skills から：tweet-writer（フック公式 / PAS）、Hormozi の4部、Dan Koe のリズム`,cr_hooks:`フック3案（フックが 80–90% を決める。まずフックから書く）`,hk_num:`数字型`,hk_gap:`好奇ギャップ`,hk_signal:`シグナル型`,cr_pas:`本文の骨格 · PAS（問題 → 拡大 → 事実）`,pas_p:`問題`,pas_a:`拡大`,pas_s:`事実`,cr_hz:`骨格 · Hormozi の4部（主張 → 物語 → 理由 → ソフト CTA）`,hz1:`一つの主張`,hz2:`物語と証拠`,hz3:`理由であって手順ではない`,hz4:`ソフト CTA`,hz1_hint:`主張を一文で書く。まず「おすすめアクション」から抽出を。書けないなら角度が定まっていない`,hz3_hint:`技術・ビジネス・利用者の三つの角度から理由を一つずつ——「なぜ成り立つか」を書き、「どうやるか」は書かない`,hz4_txt:`締めは軽く：今後も波高の変化を追跡します。フォローしたい方はこのページを保存どうぞ`,traj:`波高の軌跡`,tips_s:`短文 tips`,tips_l:`長文 tips`,tips_title:`執筆 tips`,ol_hook:`フック`,ol_fact:`要点`,ol_why:`なぜ重要か`,ol_data:`データ`,ol_src:`出典`,ol_title2:`タイトル`,ol_lead:`リード`,ol_timeline:`タイムライン`,ol_detail:`詳細`,ol_impact:`影響と見方`,ol_next:`今後の注目点`,ol_next_txt:`後のスキャンで波高と順位がどう動くか注目`,resonance:`{n} ソースが共振`,wave_rank:`波高 {h}・順位 #{r}`,heat_help_t:`波高はどう計算される？`,heat_help:`<b>波高</b> = 基礎点 + 共振 + 証拠 + 初登場ボーナス（上限なし）。基礎点はレベル別：🔥必見 60、👀注目 30、🌀エコー 10。<b>独立ソース</b>1つにつき +20（同一グループの複数リンクは1つとして計算）、<b>原文リンク</b>1件につき +8、<b>初登場</b>で +25。ホットな話題には独立ソースが2つ以上必要で、単一ソースはエコー扱い。新しい動きがない話題は前回の波高で<b>繰り越し</b>され、増減は前時点の全ボードとの比較です。`,slider:`時間スライダー`,current:`現在`,hist:`スナップショット`,count:`{n} 件`,board_title:`🌊 ウェーブボード · 全トピック`,seeds_title:`🌀 エコー`,seeds_r:`単一ソース・初期シグナル · 直近3号`,rising_title:`📈 上昇 · 波高の伸び`,rising_r:`{n} 件上昇`,cat_r:`{n} 件`,archive_title:`📚 アーカイブ`,archive_r:`全{n}号`,archive_row:`{n} 件 · トップ：`,sources_title:`📡 データソース`,sources_r:`全{n}ソース · 出現回数順`,src_stats:`{dom} · {a} 件に寄与 · {b} 回出現 · {c} 号カバー · 初出 {d} · 最新 {e}`,cur_wave:`現在の波高`,board_rank:`ボード順位`,share:`共有`,chart:`🌊 波高チャート`,th:[`号`,`波高`,`順位`,`レベル`,`前回比`,`タイトル`,`ソース`,`リンク`],first:`初登場`,action:`おすすめアクション`,orig_links:`原文リンク`,orig:`原文`,sub_form:`タイトル：
リンク：
理由：`,foot_about:`概要`,docs_back:`🌊 レーダーホーム`,theme:`テーマ切替`,snap_title:`🌊 {x} スナップショット`,page_of:`{p}/{n} ページ`,desc_default:`浪尖レーダー：全トピックを波高で定量化し、推移を追跡するウェーブボード。`,desc_seeds:`直近3号で初登場し、まだ発酵中のトピック。`,desc_rising:`波高の伸びが最大のトピック。`,desc_sources:`全データソースと各ソースが寄与したトピック。`,desc_about:`浪尖レーダーについて、波高の計算式、ページ案内と作者情報。`,desc_landing:`Breaker Delta の製品紹介：位置づけと仕組み、公開戦績、Google Trends やアグリゲータとの比較、FAQ とロードマップ。`,landing_title:`製品紹介`,desc_docs:`Breaker Delta ドキュメント（英語版）。`,desc_track:`浪尖レーダーの戦績：必読・注目の各トピックを事前登録し、14日後に復核した台帳。`,tr_title:`🏆 戦績 · 復核台帳`,tr_intro:`各号の 🔥必読 / 👀注目 を1件ずつ登録し、14日後に事前に決めた基準で命中かどうかを復核します。このページはリポジトリの track-record.md からビルド時に生成され、登録後に書き換えることはありません。`,tr_total:`登録済み`,tr_reviewed:`復核済み`,tr_hit_rate:`命中率`,tr_first_review:`初回復核は {d}（期限が来てから結果を記入します。それまで命中率は計算しません）`,tr_criteria_t:`判定基準`,tr_criteria:`<ul class="tips"><li><b>命中</b>：復核時点でトピックが追跡ソース内で発酵し続けている（後の号に再登場 / 議論量が維持または上昇）、または事前に設定したイベントのチェックポイントが予定通り起きて主流メディアに報じられた場合。</li><li><b>未命中</b>：14日以内に続報がなく、イベントの進展もない、または事実が否定された場合。</li><li><b>話題アーク統合</b>：複数号に登場するトピックは初登場日を起点とし、復核時は一つのアークとして採点します。各号の記録は残します。</li><li><b>事実確認を優先</b>：事実確認優先と記した項目は、公式 / 主流メディアの確認または否定で直接判定します。</li></ul>`,tr_th:[`レベル`,`トピック`,`復核基準`,`復核日`,`結果`],tr_pending:`復核待ち`,desc_submit:`浪尖レーダーへエコーを投稿：単一ソースで新鮮な、一次リンク付きの初期シグナル。`,sub_title:`🌀 エコーを投稿`,sub_intro:`まだ熱くなっていないけれどエコーになりそうなシグナルを見つけたら、レーダーに送ってください。投稿はまず受信箱に入り、次のスキャンで重複排除と共振チェックを行います。エコーボードに載るのは基準を満たしたものだけで、掲載は保証しません。`,sub_good_t:`良いエコーとは`,sub_good:`<ul class="tips"><li><b>単一ソース</b>：今のところ1か所だけが取り上げている——それがエコーの姿です。</li><li><b>新しい</b>：登場したばかり（リポジトリ・投稿・製品・論文は新しいほど良い）。すでに話題の旧聞ではありません。</li><li><b>一次リンク</b>：元のページ（リポジトリ / 元投稿 / 公式サイト / 論文）へのリンクを。まとめ記事は不可。</li><li><b>一文の理由</b>：なぜ大きくなると思うか、一文で十分です。</li></ul>`,sub_issue_t:`方法1 · GitHub Issue で投稿`,sub_issue_btn:`GitHub で投稿 Issue を開く →`,sub_issue_note:`リンクにはタイトルと本文テンプレート（タイトル / リンク / 理由）が入力済みです。GitHub アカウントがない場合は、下のブックマークレットで同じ形式のテキストを作って作者に送ってください。`,sub_bm_t:`方法2 · ブックマークレット`,sub_bm_btn:`🌀 浪尖レーダーに送る`,sub_bm_note:`このリンクをブックマークバーにドラッグしてください。任意のページでクリックすると、そのページのタイトル + URL を持ってこのページが開き、下のコピー用テキストが生成されます。`,sub_prefill_t:`投稿テキスト（コピー可）`,sub_cta:`🌀 まだ熱くなっていないシグナルを見つけたら、ここから投稿 →`}},le={zh:`<section class="panel"><div class="panel-h"><span>关于浪尖雷达</span></div>
<div class="detail">
<p>浪尖雷达（Breaker Delta）是一个热点追踪站：多源扫描科技与 AI 话题，用自有算法把每个话题量化成一个「浪高」，并持续追踪它的涨落。做这个站的目的很具体——让内容创作者能快速拿到可编辑、可发布的新闻素材：每个话题都有独立页面，给出正文、建议动作、数据源和原文链接。</p>
<p>发布频度不固定：可以是日报、早晚报，也可以是小时报，期次只是标签，每一期的结构都一样。</p>
<h3 style="margin:16px 0 6px">浪高怎么算</h3>
<p>浪高 v2（参考 AIHOT 的量级，不设上限）：等级基分（必看 60 / 关注 30 / 回波 10）+ 共振 20×来源数 + 证据 8×链接数 + 首现 25。一个话题至少要有 2 个独立来源互相印证才算热点，单源的先记为回波。</p>
<p>排名是某个时间点上全部已知话题按浪高排序的结果（每页 100 个，超出分页）；升降对比的是上一个时间点。本期没有更新的话题，按最近一次的浪高结转并标注「结转」，不会假装是新数据。</p>
<h3 style="margin:16px 0 6px">页面导览</h3>
<p><a href="index.html">海浪榜</a>：全部话题按浪高排名，带时间滑块回看任意时间点。<a href="rising.html">涨潮榜</a>：浪高涨幅最大的话题。<a href="echoes.html">回波</a>：最近首次出现、还在发酵的话题。<a href="submit.html">投波</a>：把你发现的单源新信号投进来。<a href="track-record.html">战绩</a>：每期必看与关注的登记台账和复核结果。<a href="categories.html">分类</a>：按安全 / 政策与监管 / 开源 / 商业与资本 / Agent 与应用 / AI 模型 / 行业动态浏览。<a href="sources.html">数据源</a>：每个来源贡献了哪些话题。<a href="archive.html">往期归档</a>：每一期的完整榜单快照。每个话题页有一张「海浪图」，画的是它的浪高走势，图上的点可以点进对应那一期。</p>
<h3 style="margin:16px 0 6px">技术说明</h3>
<p>每一期的内容以 Markdown 保存在 GitHub 仓库里，可以直接阅读；站点由 Breaker Delta 引擎（Bun）在构建时生成静态 HTML。话题页的原文链接带 nofollow。列表里的来源图标是各站的 favicon，构建时抓取并缓存在本地，每次构建用条件请求校验，站点换了图标缓存会自动更新。海浪榜首页有一段小脚本驱动时间滑块（无第三方库），其余页面没有可执行脚本；禁用 JS 时首页显示最新一期，时间轴链接照常打开每期快照。界面语言在构建设置里选择（TS_LANGS），构建出两种以上语言时页面上才显示语言切换。</p>
<h3 style="margin:16px 0 6px">作者与订阅</h3>
<p>作者 Dai：<a href="https://github.com/daiyanze/breaker-delta" rel="noopener">GitHub 仓库</a> · <a href="https://x.com/daiyanze" rel="noopener">X @daiyanze</a> · <a href="feed.xml">RSS</a> · <a href="atom.xml">Atom</a></p>
<p class="note">© 2026 Dai</p>
</div></section>`,en:`<section class="panel"><div class="panel-h"><span>About Breaker Delta</span></div>
<div class="detail">
<p>Breaker Delta （浪尖雷达） tracks tech and AI topics from many sources and quantifies each topic as a "wave height" that rises and falls over time. Its purpose is practical: give content creators ready-to-edit, ready-to-publish news material. Every topic has its own page with the story, a suggested action, its data sources and original links.</p>
<p>Publishing frequency is not fixed: daily, twice a day, or hourly — an edition is just a label, and every edition has the same structure.</p>
<h3 style="margin:16px 0 6px">How the wave height works</h3>
<p>Wave v2 (scale referenced from AIHOT, uncapped): level base (Must-read 60 / Watch 30 / Echo 10) + resonance 20×sources + evidence 8×links + 25 when first seen. A topic needs at least two independent sources to count as a hotspot; single-source signals start as echoes.</p>
<p>Ranks compare all known topics at one point in time (100 per page); deltas compare with the previous point in time. Topics not updated in an edition are carried forward at their last wave height and marked "carried" — never dressed up as fresh data.</p>
<h3 style="margin:16px 0 6px">Pages</h3>
<p><a href="index.html">Wave Board</a>: all topics ranked by wave height, with a time slider. <a href="rising.html">Rising</a>: biggest wave gains. <a href="echoes.html">Echoes</a>: newly appeared topics. <a href="submit.html">Submit a echo</a>: send in a single-source signal you spotted. <a href="track-record.html">Track Record</a>: the registered ledger of picks and their review results. <a href="categories.html">Categories</a>. <a href="sources.html">Sources</a>: what each source feeds. <a href="archive.html">Archive</a>: full snapshot of every edition. Each topic page carries a wave chart of its history.</p>
<h3 style="margin:16px 0 6px">Tech notes</h3>
<p>Editions are kept as Markdown in the GitHub repo and built into static HTML by the Breaker Delta engine (Bun). Original links on topic pages are nofollow. Source icons are each site's favicon, fetched and cached at build time with conditional revalidation. The board's time slider is one small script (no libraries); other pages run no scripts. Interface languages are a build setting (TS_LANGS); the language switcher appears only when more than two languages are built.</p>
<h3 style="margin:16px 0 6px">Author & feeds</h3>
<p>By Dai: <a href="https://github.com/daiyanze/breaker-delta" rel="noopener">GitHub</a> · <a href="https://x.com/daiyanze" rel="noopener">X @daiyanze</a> · <a href="feed.xml">RSS</a> · <a href="atom.xml">Atom</a></p>
<p class="note">© 2026 Dai</p>
</div></section>`,ja:`<section class="panel"><div class="panel-h"><span>浪尖レーダーについて</span></div>
<div class="detail">
<p>浪尖レーダー（Breaker Delta）は、テクノロジーと AI のトピックを複数ソースから追跡し、各トピックを「波高」として定量化して推移を追うサイトです。目的は具体的で、コンテンツ制作者が編集・公開しやすいニュース素材を素早く手に入れられること。各トピックには専用ページがあり、本文、おすすめアクション、データソース、原文リンクを掲載しています。</p>
<p>発行頻度は固定ではありません。日刊、朝夕刊、時間刊でも、号はラベルにすぎず構造は同じです。</p>
<h3 style="margin:16px 0 6px">波高の計算</h3>
<p>波高 v2（AIHOT のスケールを参考、上限なし）：レベル基礎点（必読 60 / 注目 30 / エコー 10）+ 共鳴 20×ソース数 + 根拠 8×リンク数 + 初出 25。ホットなトピックには独立したソースが最低2つ必要で、単一ソースはまず「エコー」として記録します。</p>
<p>順位はある時点の全トピックを波高で並べたもの（1ページ100件）。前回比は直前の時点との比較です。その号で更新されなかったトピックは前回の波高を「繰越」として明示し、新しいデータのふりはしません。</p>
<h3 style="margin:16px 0 6px">ページ案内</h3>
<p><a href="index.html">ウェーブボード</a>：全トピックを波高順に、時間スライダー付き。<a href="rising.html">上昇</a>：波高の伸びが最大。<a href="echoes.html">エコー</a>：初登場のトピック。<a href="submit.html">エコー投稿</a>：見つけた単一ソースのシグナルを送れます。<a href="track-record.html">戦績</a>：登録台帳と復核結果。<a href="categories.html">カテゴリ</a>。<a href="sources.html">ソース</a>：各ソースの寄与。<a href="archive.html">アーカイブ</a>：各号の完全なスナップショット。各トピックページには波高チャートがあります。</p>
<h3 style="margin:16px 0 6px">技術メモ</h3>
<p>各号の内容は Markdown として GitHub リポジトリに保存され、Breaker Delta エンジン（Bun）が静的 HTML にビルドします。原文リンクは nofollow。ソースのアイコンは各サイトの favicon で、ビルド時に取得してローカルにキャッシュし、条件付きリクエストで検証します。時間スライダーは小さなスクリプト1つ（ライブラリなし）で、その他のページにスクリプトはありません。表示言語はビルド設定（TS_LANGS）で選び、3言語以上ビルドしたときだけ言語切替が表示されます。</p>
<h3 style="margin:16px 0 6px">作者とフィード</h3>
<p>作者 Dai：<a href="https://github.com/daiyanze/breaker-delta" rel="noopener">GitHub</a> · <a href="https://x.com/daiyanze" rel="noopener">X @daiyanze</a> · <a href="feed.xml">RSS</a> · <a href="atom.xml">Atom</a></p>
<p class="note">© 2026 Dai</p>
</div></section>`},ue={en:`<section class="panel"><div class="panel-h"><span>Breaker Delta · Catch it before it breaks.</span></div>
<div class="detail">
<p style="font-size:19px;font-weight:700;line-height:1.45;margin:4px 0 8px">Open-source radar that spots emerging topics before they trend — scored by cross-source resonance, not volume.</p>
<p>Breaker Delta watches 40+ sources — Hacker News, GitHub, Reddit, arXiv, official blogs and more — and turns every emerging topic into a <b>wave height</b>: how strong the signal is, where it came from, and whether it is still rising. Single-source noise stays an <b>echo</b>; a topic becomes a wave only when independent sources start moving together.</p>
<p style="margin:12px 0 4px"><a href="index.html" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>▶ See the live board</b></a>&nbsp; <a href="{{DOCS}}docs-deploy.html" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>Deploy your own</b></a>&nbsp; <a href="https://github.com/daiyanze/breaker-delta" rel="noopener" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>GitHub</b></a></p>
</div></section>
<section class="panel"><div class="panel-h"><span>How it works</span></div>
<div class="detail">
<ol class="ol-list">
<li><b>Fetch</b> — scheduled scans pull candidates from 40+ sources. Each source bundle counts once, so syndicated copies cannot fake resonance.</li>
<li><b>Resonance check</b> — a topic needs at least 2 independent sources to count as a hotspot. Single-source items are filed as echoes 🌀 and kept an eye on.</li>
<li><b>Wave height</b> — every topic gets an uncapped score: grade base + 20 × sources + 8 × links + 25 on first sighting, tracked over time as a wave chart on its own page.</li>
<li><b>Grading</b> — picks are graded Must-read 🔥 / Watch 👀 / Echo 🌀 by an AI agent under a published methodology, with the reasoning shown on the topic page.</li>
<li><b>Review</b> — every Must / Watch pick enters a public track record and is re-checked 14 days later. Hits and misses both stay on the record.</li>
</ol>
</div></section>
<section class="panel"><div class="panel-h"><span>Proof, not promises</span></div>
<div class="detail">
<p>The public instance has been running since 2026-11-11. Every graded pick is registered in the open <a href="track-record.html">track record</a> before its outcome is known — no cherry-picking after the fact.</p>
<p>The first 14-day review lands on <b>2026-11-25</b>: hit rate, average lead time over mainstream coverage, and case timelines will be published here as soon as it is done.</p>
</div></section>
<section class="panel"><div class="panel-h"><span>How it compares</span></div>
<div class="detail">
<table><tr><th></th><th>Breaker Delta</th><th>Google Trends</th><th>Feedly / aggregators</th></tr>
<tr><td><b>When you see it</b></td><td>Before it trends — first sightings and resonance</td><td>After search volume spikes</td><td>After publication, by recency and popularity</td></tr>
<tr><td><b>What counts as hot</b></td><td>Cross-source resonance (≥ 2 independent sources)</td><td>Search volume</td><td>Volume and engagement</td></tr>
<tr><td><b>Your data</b></td><td>Yours — self-hosted, plain files in your own repo</td><td>The platform's</td><td>The platform's</td></tr>
<tr><td><b>Your field</b></td><td>Presets swap sources, categories and keywords per industry</td><td>Generic</td><td>Your feeds, their ranking</td></tr>
<tr><td><b>Accountability</b></td><td>Public track record, reviewed 14 days later</td><td>—</td><td>—</td></tr></table>
</div></section>
<section class="panel"><div class="panel-h"><span>FAQ</span></div>
<div class="detail">
<h3 style="margin:12px 0 6px">Is it free and open source?</h3>
<p>Yes — Apache 2.0. Self-hosting costs nothing beyond your own machine or a free-tier host, and the public instance is free to read.</p>
<h3 style="margin:12px 0 6px">Who owns the data?</h3>
<p>You do. An instance's editions, topic ledger and track record live in your own data directory or repo; the engine stores no instance data.</p>
<h3 style="margin:12px 0 6px">Do I need an LLM API key?</h3>
<p>No. Grading is done by an AI agent you already use, following the Breaker Delta Skill, and pushed into your instance. The server never holds a key.</p>
<h3 style="margin:12px 0 6px">Can I aim it at my own industry?</h3>
<p>Yes — that is what presets are: sources, categories, keyword defaults and an industry brief in one swappable pack. The setup wizard Skill interviews you and writes the config. The built-in example is ai-tech.</p>
<h3 style="margin:12px 0 6px">What is this site, then?</h3>
<p>breakerdelta.com is the author's own instance running the ai-tech preset. Same engine you can deploy — its data is his, the code is everyone's.</p>
</div></section>
<section class="panel"><div class="panel-h"><span>Roadmap</span></div>
<div class="detail">
<p>The next presets are chosen by vote — finance, gaming, biotech and e-commerce are on the list. Vote or propose yours in <a href="https://github.com/daiyanze/breaker-delta/issues" rel="noopener">GitHub Issues</a>. The panel plugin system has landed: creator, investor and watchlist panels on topic pages, enabled per instance in config. Also coming: a dynamic Cloudflare deployment form. The Docker form and this static form stay.</p>
</div></section>`,zh:`<section class="panel"><div class="panel-h"><span>浪尖雷达 · 浪起之前，先有回波</span></div>
<div class="detail">
<p style="font-size:19px;font-weight:700;line-height:1.45;margin:4px 0 8px">开源的热点雷达，在话题成浪之前发现它 —— 看跨源共振，不看声量。</p>
<p>浪尖雷达持续扫描 40+ 个信源 —— Hacker News、GitHub、Reddit、arXiv、官方博客等 —— 把每个新话题量化成一个<b>浪高</b>：信号有多强、来自哪里、还在不在涨。单源的噪音只记为<b>回波</b>；只有多个独立信源同时动起来，话题才算成浪。</p>
<p style="margin:12px 0 4px"><a href="index.html" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>▶ 看实时榜单</b></a>&nbsp; <a href="{{DOCS}}docs-deploy.html" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>部署你自己的</b></a>&nbsp; <a href="https://github.com/daiyanze/breaker-delta" rel="noopener" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>GitHub</b></a></p>
</div></section>
<section class="panel"><div class="panel-h"><span>原理</span></div>
<div class="detail">
<ol class="ol-list">
<li><b>抓取</b> —— 定时扫描从 40+ 信源拉候选；每个信源包只算一个来源，转载刷不出共振。</li>
<li><b>共振判定</b> —— 话题至少要有 2 个独立来源互相印证才算热点；单源的先记为回波 🌀，继续观察。</li>
<li><b>浪高</b> —— 每个话题有一个不设上限的分数：等级基分 + 20×来源数 + 8×链接数 + 首现 25，并在话题页上画成海浪图持续追踪。</li>
<li><b>分级</b> —— 由 AI agent 按公开的方法论判成必看 🔥 / 关注 👀 / 回波 🌀，理由写在话题页上。</li>
<li><b>复核</b> —— 每条必看与关注都登记进公开战绩台账，14 天后逐条复核；命中和打脸都留着。</li>
</ol>
</div></section>
<section class="panel"><div class="panel-h"><span>用战绩说话</span></div>
<div class="detail">
<p>官方实例自 2026-11-11 起运行。每条分级在结果出来之前就登记进公开的<a href="track-record.html">战绩台账</a> —— 事后挑好的说，不算数。</p>
<p>第一批 14 天复核在 <b>2026-11-25</b>：命中率、平均领先主流报道的时间、典型案例时间线，复核完成即公布在这里。</p>
</div></section>
<section class="panel"><div class="panel-h"><span>对比</span></div>
<div class="detail">
<table><tr><th></th><th>浪尖雷达</th><th>Google Trends</th><th>Feedly / 聚合器</th></tr>
<tr><td><b>什么时候看到</b></td><td>成浪之前 —— 首现与共振</td><td>搜索量已经冲高之后</td><td>发布之后，按时近与热度排</td></tr>
<tr><td><b>什么算热</b></td><td>跨源共振（≥ 2 个独立来源）</td><td>搜索量</td><td>声量与互动</td></tr>
<tr><td><b>数据归谁</b></td><td>归你 —— 自部署，普通文件存在你自己的仓库</td><td>平台的</td><td>平台的</td></tr>
<tr><td><b>能不能换行业</b></td><td>preset 整体换信源、分类与关键词</td><td>通用</td><td>源是你的，排序是它的</td></tr>
<tr><td><b>判断可不可查</b></td><td>公开台账，14 天复核</td><td>—</td><td>—</td></tr></table>
</div></section>
<section class="panel"><div class="panel-h"><span>常见问题</span></div>
<div class="detail">
<h3 style="margin:12px 0 6px">免费吗？开源吗？</h3>
<p>是 —— Apache 2.0 开源。自部署除你自己的机器或免费额度主机外不花钱，官方实例免费阅读。</p>
<h3 style="margin:12px 0 6px">数据归谁？</h3>
<p>归你。实例的期次、话题台账和战绩都存在你自己的数据目录或仓库里，引擎不存任何实例数据。</p>
<h3 style="margin:12px 0 6px">需要 LLM API key 吗？</h3>
<p>不需要。分级由你已经在用的 AI agent 按 Breaker Delta 的 Skill 完成并推送进你的实例，服务器不持有任何 key。</p>
<h3 style="margin:12px 0 6px">能换成我自己的行业吗？</h3>
<p>能 —— 这正是 preset 的用途：信源、分类、关键词默认值和行业简报打包成一个可整体替换的包。向导 Skill 会采访你并写好配置；内置的例子是 ai-tech。</p>
<h3 style="margin:12px 0 6px">那这个站是什么？</h3>
<p>breakerdelta.com 是作者自己的实例，跑 ai-tech preset。和你可以部署的是同一个引擎 —— 数据是他的，代码是大家的。</p>
</div></section>
<section class="panel"><div class="panel-h"><span>路线图</span></div>
<div class="detail">
<p>下一批 preset 由投票决定 —— 金融、游戏、生物科技、电商已在名单上。去 <a href="https://github.com/daiyanze/breaker-delta/issues" rel="noopener">GitHub Issues</a> 投票或提你的行业。插件系统已经落地：话题页的创作 / 投资研判 / 追番面板，按实例在 config 里启停。还在路上：Cloudflare 动态部署形态；Docker 形态与现在的静态形态都会保留。</p>
</div></section>`,ja:`<section class="panel"><div class="panel-h"><span>浪尖レーダー · 波が立つ前に、まず反響がある</span></div>
<div class="detail">
<p style="font-size:19px;font-weight:700;line-height:1.45;margin:4px 0 8px">オープンソースのホットトピック・レーダー。量ではなく、複数ソースの共鳴で「波になる前」を捉えます。</p>
<p>浪尖レーダーは Hacker News、GitHub、Reddit、arXiv、公式ブログなど 40 以上のソースを継続的に走査し、新しいトピックを<b>波高</b>として定量化します：シグナルの強さ、出所、まだ上昇中かどうか。単一ソースのノイズは<b>エコー</b>として記録するだけ。複数の独立したソースが同時に動き始めて初めて「波」になります。</p>
<p style="margin:12px 0 4px"><a href="index.html" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>▶ ライブボードを見る</b></a>&nbsp; <a href="{{DOCS}}docs-deploy.html" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>自分でデプロイ</b></a>&nbsp; <a href="https://github.com/daiyanze/breaker-delta" rel="noopener" style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;text-decoration:none"><b>GitHub</b></a></p>
</div></section>
<section class="panel"><div class="panel-h"><span>仕組み</span></div>
<div class="detail">
<ol class="ol-list">
<li><b>取得</b> —— 定期スキャンが 40 以上のソースから候補を集めます。ソースの束は1つとして数えるため、転載では共鳴を偽装できません。</li>
<li><b>共鳴判定</b> —— ホットなトピックには独立したソースが最低2つ必要です。単一ソースはエコー 🌀 として記録し、観察を続けます。</li>
<li><b>波高</b> —— 各トピックに上限なしのスコア：レベル基礎点 + 20×ソース数 + 8×リンク数 + 初出 25。トピックページの波形チャートで推移を追います。</li>
<li><b>格付け</b> —— AI エージェントが公開された方法論に従い、必読 🔥 / 注目 👀 / エコー 🌀 に格付けし、理由をトピックページに明記します。</li>
<li><b>復核</b> —— 必読と注目の全件を公開台帳に登録し、14 日後に1件ずつ復核します。当たりも外れも記録に残ります。</li>
</ol>
</div></section>
<section class="panel"><div class="panel-h"><span>実績で示す</span></div>
<div class="detail">
<p>公式インスタンスは 2026-11-11 から稼働中。すべての格付けは結果が分かる前に公開の<a href="track-record.html">戦績台帳</a>へ登録されます —— 後から良いものだけ選ぶことはできません。</p>
<p>最初の14日復核は <b>2026-11-25</b>：命中率、主流報道に対する平均リードタイム、代表事例のタイムラインを、完了次第ここに公開します。</p>
</div></section>
<section class="panel"><div class="panel-h"><span>比較</span></div>
<div class="detail">
<table><tr><th></th><th>浪尖レーダー</th><th>Google Trends</th><th>Feedly / アグリゲータ</th></tr>
<tr><td><b>いつ見えるか</b></td><td>波になる前 —— 初出と共鳴</td><td>検索量が跳ねた後</td><td>公開後、新しさと人気順</td></tr>
<tr><td><b>何を「熱い」とするか</b></td><td>複数ソースの共鳴（独立ソース ≥ 2）</td><td>検索量</td><td>量とエンゲージメント</td></tr>
<tr><td><b>データの所有者</b></td><td>あなた —— セルフホスト、自分のリポジトリに通常ファイルで保存</td><td>プラットフォーム</td><td>プラットフォーム</td></tr>
<tr><td><b>業界の切替</b></td><td>preset でソース・カテゴリ・キーワードを一式交換</td><td>汎用</td><td>フィードは自分、順位付けは相手</td></tr>
<tr><td><b>検証可能性</b></td><td>公開台帳、14 日ごとに復核</td><td>—</td><td>—</td></tr></table>
</div></section>
<section class="panel"><div class="panel-h"><span>FAQ</span></div>
<div class="detail">
<h3 style="margin:12px 0 6px">無料でオープンソースですか？</h3>
<p>はい —— Apache 2.0 です。セルフホストは自分のマシンや無料枠のホスト以外に費用がかからず、公式インスタンスは無料で読めます。</p>
<h3 style="margin:12px 0 6px">データは誰のものですか？</h3>
<p>あなたのものです。インスタンスの各号・トピック台帳・戦績は自分のデータディレクトリやリポジトリに保存され、エンジン側にインスタンスデータは残りません。</p>
<h3 style="margin:12px 0 6px">LLM の API キーは必要ですか？</h3>
<p>不要です。格付けは、あなたが普段使う AI エージェントが Breaker Delta の Skill に従って行い、あなたのインスタンスへ push します。サーバーがキーを持つことはありません。</p>
<h3 style="margin:12px 0 6px">自分の業界向けにできますか？</h3>
<p>できます —— それが preset です：ソース、カテゴリ、キーワードの初期値、業界ブリーフを1つの交換可能なパックにまとめます。セットアップウィザードの Skill が対話で聞き取り、設定を書き出します。内蔵の例は ai-tech です。</p>
<h3 style="margin:12px 0 6px">では、このサイトは何ですか？</h3>
<p>breakerdelta.com は作者自身のインスタンスで、ai-tech preset を運用しています。あなたがデプロイできるのと同じエンジン —— データは作者のもの、コードはみんなのものです。</p>
</div></section>
<section class="panel"><div class="panel-h"><span>ロードマップ</span></div>
<div class="detail">
<p>次の preset は投票で決まります —— 金融、ゲーム、バイオテクノロジー、EC が候補です。<a href="https://github.com/daiyanze/breaker-delta/issues" rel="noopener">GitHub Issues</a> で投票や提案をどうぞ。プラグインシステムは実装済みです（トピックページの創作 / 投資判断 / ウォッチリストパネル、config で有効化）。Cloudflare の動的デプロイ形態も予定しています。Docker 形態と現在の静的形態は残ります。</p>
</div></section>`},b={"Hacker News":`news.ycombinator.com`,"Google News":`news.google.com`,"Google News 多家":`news.google.com`,TechCrunch:`techcrunch.com`,Reddit:`reddit.com`,"Reddit r/artificial":`reddit.com`,"Reddit r/LocalLLaMA":`reddit.com`,"Reddit r/technology":`reddit.com`,GitHub:`github.com`,"GitHub Trending":`github.com`,"Hugging Face":`huggingface.co`,"Hugging Face 博客":`huggingface.co`,"Product Hunt":`producthunt.com`,CNBC:`cnbc.com`,WSJ:`wsj.com`,NYT:`nytimes.com`,Reuters:`reuters.com`,"The Verge":`theverge.com`,BBC:`bbc.com`,WIRED:`wired.com`,X:`x.com`,OpenRouter:`openrouter.ai`,VentureBeat:`venturebeat.com`,Anthropic:`anthropic.com`,"Anthropic 官方":`anthropic.com`,DeepMind:`deepmind.google`,CBS:`cbsnews.com`,"Microsoft Research":`microsoft.com`,"LangChain Blog":`langchain.com`,"Google Blog":`blog.google`,"Ollama Blog":`ollama.com`,"Databricks Blog":`databricks.com`,"Cloudflare Blog":`cloudflare.com`,"GitHub Changelog":`github.blog`,"Mozilla Blog":`mozilla.org`,SemiAnalysis:`semianalysis.com`,"One Useful Thing":`oneusefulthing.org`,Platformer:`platformer.news`,"YC Blog":`ycombinator.com`,LessWrong:`lesswrong.com`,"Stack Exchange":`stackexchange.com`,"Federal Register":`federalregister.gov`,"llama.cpp Releases":`github.com`,"vLLM Releases":`github.com`,"Claude Code Releases":`github.com`,Interconnects:`interconnects.ai`,"Ahead of AI":`magazine.sebastianraschka.com`,"Dwarkesh Podcast":`dwarkesh.com`,"USA Today":`usatoday.com`,"blog.google":`blog.google`,"Google 官方博客":`blog.google`,"Google 官方":`blog.google`,Bloomberg:`bloomberg.com`,Bluesky:`bsky.app`,"Microsoft 365 状态页":`microsoft.com`,"OpenAI 官方博客":`openai.com`,"The Decoder":`the-decoder.com`,Fortune:`fortune.com`,"The Guardian":`theguardian.com`,"Mastodon 趋势":`mastodon.social`,"Wikipedia 热读榜":`wikipedia.org`,"Crypto Briefing":`cryptobriefing.com`,Dealroom:`dealroom.co`,"SEC S-1/A":`sec.gov`,"SEC S-1 修订稿":`sec.gov`,"webdevs.ro":`webdevs.ro`,"edge0.ai":`edge0.ai`},x={must:{zh:`必看`,en:`Must-read`,ja:`必読`},watch:{zh:`关注`,en:`Watch`,ja:`注目`},echo:{zh:`回波`,en:`Echo`,ja:`エコー`}},de={安全:{en:`Security`,ja:`セキュリティ`},政策与监管:{en:`Policy`,ja:`政策・規制`},开源:{en:`Open Source`,ja:`オープンソース`},商业与资本:{en:`Business`,ja:`ビジネス`},"Agent 与应用":{en:`Agents & Apps`,ja:`エージェント`},"AI 模型":{en:`AI Models`,ja:`AIモデル`},行业动态:{en:`Industry`,ja:`業界動向`}},S={安全:`security`,政策与监管:`policy`,开源:`open-source`,商业与资本:`business`,"Agent 与应用":`agent`,"AI 模型":`ai-models`,行业动态:`industry`},C={"hacker news":`hackernews`,"show hn":`show_hn`,github:`github`,"github trending":`github`,x:`x`,"product hunt":`producthunt`,"hugging face":`huggingface`,openrouter:`openrouter`,civitai:`civitai`,arxiv:`arxiv`,bluesky:`bluesky`,"google news":`google_news`,"google news 多家":`google_news`,"google trends":`google_trends`,lobsters:`lobsters`,"dev.to":`devto`,dev:`devto`,wikipedia:`wikipedia`,"app store":`app_store`,"daily papers":`daily_papers`,"hf spaces":`hf_spaces`,"hugging face spaces":`hf_spaces`,"federal register":`federal_register`,"stack exchange":`stackexchange`,"github releases":`gh_releases`,"google blog":`official_blogs`,"llama.cpp releases":`gh_releases`,"vllm releases":`gh_releases`,"claude code releases":`gh_releases`},fe=[`官方`,`official`,`openai`,`deepmind`,`anthropic`,`mistral`,`nvidia`,`blog.google`,`bair`,`langchain`,`ollama`,`databricks`,`cloudflare`,`mozilla`,`federal register`,`changelog`],pe=`techcrunch.the verge.wired.ars technica.the decoder.venturebeat.fortune.cnbc.reuters.bbc.nyt.wsj.cbs.usa today.the guardian.bloomberg.forbes.technology review.techmeme.the information.semafor.semianalysis.platformer.lesswrong.one useful thing.y combinator.yc blog.stack exchange`.split(`.`),w={pilot:{zh:`试跑`,en:`Pilot`,ja:`パイロット`},morning:{zh:`早报`,en:`Morning`,ja:`朝刊`},evening:{zh:`晚报`,en:`Evening`,ja:`夕刊`}},me={must:[`🔥`,`必看`],watch:[`👀`,`关注`],echo:[`🌀`,`回波`]},he={zh:`zh-CN`,en:`en`,ja:`ja`},ge={zh:`中文`,en:`EN`,ja:`日本語`},_e={"Anthropic 官方":{en:`Anthropic (official)`,ja:`Anthropic 公式`},"Anthropic 官方 X（ClaudeDevs）":{en:`Anthropic on X (ClaudeDevs)`,ja:`Anthropic 公式 X（ClaudeDevs）`},"Google News 多家":{en:`Google News (multiple outlets)`,ja:`Google News（複数メディア）`},"Google 官方":{en:`Google (official)`,ja:`Google 公式`},"Google 官方博客":{en:`Google Blog`,ja:`Google 公式ブログ`},"Hugging Face 博客":{en:`Hugging Face Blog`,ja:`Hugging Face ブログ`},"Mastodon 趋势":{en:`Mastodon Trending`,ja:`Mastodon トレンド`},"Microsoft 365 状态页":{en:`Microsoft 365 Status`,ja:`Microsoft 365 ステータス`},"OpenAI 官方博客":{en:`OpenAI Blog`,ja:`OpenAI 公式ブログ`},"Perplexity 官方 X":{en:`Perplexity on X`,ja:`Perplexity 公式 X`},"SEC S-1 修订稿":{en:`SEC S-1 amendment`,ja:`SEC S-1 修正届出`},"Wikipedia 热读榜":{en:`Wikipedia Most Read`,ja:`Wikipedia 人気記事`},多家分析博客:{en:`Analyst blogs (multiple)`,ja:`分析ブログ（複数）`},官方:{en:`Official`,ja:`公式`},新华社:{en:`Xinhua`,ja:`新華社`},社交传播:{en:`Social media`,ja:`SNS 拡散`}},ve={"Anthropic IPO":{en:`Anthropic IPO`,ja:`Anthropic IPO`},"黄仁勋 / Nvidia 风波":{en:`Jensen Huang / Nvidia turmoil`,ja:`ジェンスン・フアン / Nvidia 騒動`}};new Set(`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-~`.split(``));function ye(e,t){return e?e[t]??e.en??e.zh??``:``}var be=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);function xe(e){let t=new Map,n=null,r=[],i=()=>{n!==null&&t.set(n,r.join(`
`).replace(/\s+$/,``))},a=!1;for(let t of e.split(`
`)){if(/^sources:\s*$/.test(t)){a=!0;continue}if(!a)continue;if(t!==``&&!t.startsWith(` `)&&!t.startsWith(`#`)&&!t.startsWith(`	`))break;let e=/^  ([A-Za-z0-9_]+):\s*$/.exec(t);e?(i(),n=e[1],r=[t.slice(2)]):n!==null&&r.push(t.startsWith(`  `)?t.slice(2):t)}return i(),t}function T(e){let t=e.toLowerCase(),n=be(C,t)?C[t]:null;return!n&&t.startsWith(`reddit`)&&(n=`reddit`),!n&&t.startsWith(`mastodon`)&&(n=`mastodon`),!n&&fe.some(n=>t.includes(n)||e.includes(n))&&(n=`official_blogs`),!n&&pe.some(e=>t.includes(e))&&(n=`tech_media`),!n&&t.includes(`sitemap`)&&(n=`sitemaps`),n}function Se(e,t){let n=T(e);return n?t.get(n)??null:null}new TextEncoder;function Ce(e){let t=!1,n=!1;for(let r=0;r<e.length;r++){let i=e[r];if(i===`'`&&!n)t=!t;else if(i===`"`&&!t&&(r===0||e[r-1]!==`\\`))n=!n;else if(i===`#`&&!t&&!n&&(r===0||e[r-1]===` `||e[r-1]===`	`))return e.slice(0,r)}return e}function E(e){let t=[],n=0,r=!1,i=!1,a=``;for(let o of e){if(o===`'`&&!i)r=!r;else if(o===`"`&&!r)i=!i;else if(!r&&!i){if(o===`[`||o===`{`)n+=1;else if(o===`]`||o===`}`)--n;else if(o===`,`&&n===0){t.push(a),a=``;continue}}a+=o}return a.trim()&&t.push(a),t}function we(e){if(!/^[+-]?\d(?:_?\d)*$/.test(e))return null;let t=parseInt(e.replace(/_/g,``),10);return Number.isNaN(t)?null:t}function Te(e){if(/^[+-]?(inf|infinity)$/i.test(e))return e.startsWith(`-`)?-1/0:1/0;if(/^[+-]?nan$/i.test(e))return NaN;if(!/^[+-]?(?:\d(?:_?\d)*)?(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d+)?$/.test(e)||!/\d/.test(e))return null;let t=parseFloat(e.replace(/_/g,``));return Number.isNaN(t)?null:t}function D(e){let t=e.trim();if(t===``||t===`~`||t===`null`||t===`Null`||t===`NULL`)return null;if(t===`true`||t===`True`||t===`TRUE`)return!0;if(t===`false`||t===`False`||t===`FALSE`)return!1;if(t===`|`||t===`>`||t.startsWith(`|-`)||t.startsWith(`>-`)||t.startsWith(`|+`)||t.startsWith(`>+`)||t.startsWith(`&`)||t.startsWith(`*`)||t.startsWith(`!`))throw Error(`yaml subset: unsupported construct: ${JSON.stringify(t)}`);if(t.length>=2&&t[0]===`"`&&t[t.length-1]===`"`)return t.slice(1,-1).replace(/\\"/g,`"`).replace(/\\n/g,`
`).replace(/\\\\/g,`\\`);if(t.length>=2&&t[0]===`'`&&t[t.length-1]===`'`)return t.slice(1,-1).replace(/''/g,`'`);if(t.startsWith(`[`)&&t.endsWith(`]`)){let e=t.slice(1,-1).trim();return e?E(e).map(e=>D(e)):[]}if(t.startsWith(`{`)&&t.endsWith(`}`)){let e=t.slice(1,-1).trim(),n={};for(let t of E(e)){let e=t.indexOf(`:`),r=e>=0?t.slice(0,e):t,i=e>=0?t.slice(e+1):``;n[String(D(r))]=D(i)}return n}let n=we(t);if(n!==null)return n;let r=Te(t);return r===null?t:r}var O=/^([^:\s][^:]*?):(\s+(.*))?$/;function Ee(e){let t=[];for(let n of e.split(`
`)){let e=Ce(n.replace(/\r$/,``)).replace(/\s+$/,``);if(!e.trim())continue;let r=e.length-e.replace(/^ +/,``).length;t.push({indent:r,content:e.trim()})}return t}function k(e,t,n){if(t>=e.length)return[null,t];if(e[t].content.startsWith(`- `)||e[t].content===`-`){let r=[];for(;t<e.length&&e[t].indent===n&&(e[t].content.startsWith(`- `)||e[t].content===`-`);){let i=e[t].content.slice(1).trim();if(!i){let i=t+1<e.length?e[t+1].indent:n+1,[a,o]=k(e,t+1,i);r.push(a),t=o}else if(O.exec(i)&&!i.startsWith(`[`)&&!i.startsWith(`{`)&&!i.startsWith(`"`)&&!i.startsWith(`'`)){let a=n+2,o=[{indent:a,content:i}],s=t+1;for(;s<e.length&&e[s].indent>n;)o.push(e[s]),s+=1;let[c]=k(o,0,a);r.push(c),t=s}else r.push(D(i)),t+=1}return[r,t]}let r={};for(;t<e.length&&e[t].indent===n&&!e[t].content.startsWith(`- `);){let i=O.exec(e[t].content);if(!i)throw Error(`yamlmini: cannot parse line: '${e[t].content}'`);let a=String(D(i[1])),o=i[3];if(o)r[a]=D(o),t+=1;else if(t+1<e.length&&e[t+1].indent>n){let[n,i]=k(e,t+1,e[t+1].indent);r[a]=n,t=i}else r[a]=null,t+=1}return[r,t]}function De(e){let t=Ee(e);if(t.length===0)return{};let[n]=k(t,0,t[0].indent);return n}function A(e){return De(e)}var Oe=[{manifestText:`id: creator
api: 1
order: 10
name:
  zh: "创作参考"
  en: "For Creators"
  ja: "クリエイター向け"
description:
  zh: "话题页的写作参考面板：短贴钩子、PAS 框架、长文大纲与写作提示。内容由话题自身数据模板拼装，无需分级注入。"
  en: "The creator reference panel on topic pages: short-post hooks, a PAS frame, a long-form outline and writing tips, assembled from the topic's own data — no grading injection needed."
  ja: "トピックページの執筆参考パネル：短文フック、PAS フレーム、長文アウトラインと執筆ヒント。話題自身のデータから組み立てるため、分級注入は不要。"
slots:
  - panel
`,panelText:`head:
  title:
    zh: "✍️ 创作参考"
    en: "✍️ For creators"
    ja: "✍️ クリエイター向け"
  right:
    zh: "框架取自公开写作 skills：tweet-writer（钩子公式 / PAS）、Hormozi 四段、Dan Koe 节奏"
    en: "Frameworks from public writing skills: tweet-writer (hook formulas / PAS), Hormozi's four parts, Dan Koe's rhythm"
    ja: "枠組みは公開ライティング skills から：tweet-writer（フック公式 / PAS）、Hormozi の4部、Dan Koe のリズム"
blocks:
  - type: "subh"
    text:
      zh: "短贴大纲"
      en: "Short-post outline"
      ja: "短文アウトライン"
  - type: "note"
    margin: 8
    text:
      zh: "钩子三选一（钩子决定 80–90%，先写钩子再写正文）"
      en: "Three hook options (the hook decides 80–90% — write it first)"
      ja: "フック3案（フックが 80–90% を決める。まずフックから書く）"
  - type: "olist"
    items:
      - label:
          zh: "数字型"
          en: "Specific result"
          ja: "数字型"
        format:
          zh: "「{name}」——浪高冲到 {heat}，{n} 个来源同时在报。"
          en: "“{name}” — wave height {heat}, {n} sources reporting at once."
          ja: "「{name}」——波高 {heat}、{n} ソースが同時に報道。"
      - label:
          zh: "好奇缺口"
          en: "Curiosity gap"
          ja: "好奇ギャップ"
        format:
          zh: "{hook} 但真正值得看的，不是这件事本身。"
          en: "{hook} But the thing worth watching is not the event itself."
          ja: "{hook} ただし本当に見るべきは、出来事そのものではない。"
      - label:
          zh: "信号型"
          en: "Signal"
          ja: "シグナル型"
        format:
          zh: "信号不在热闹那边：「{name}」已经排到第 {rank}，还在发酵。"
          en: "The signal is not where the noise is: “{name}” is already at #{rank} and still developing."
          ja: "シグナルは騒がしい側にない：「{name}」はすでに {rank} 位で、まだ発酵中。"
  - type: "note"
    margin: 10
    text:
      zh: "正文骨架 · PAS（问题 → 放大 → 事实）"
      en: "Body skeleton · PAS (Problem → Agitate → Facts)"
      ja: "本文の骨格 · PAS（問題 → 拡大 → 事実）"
  - type: "olist"
    items:
      - label:
          zh: "问题"
          en: "Problem"
          ja: "問題"
        format:
          zh: "{hook}"
          en: "{hook}"
          ja: "{hook}"
      - label:
          zh: "放大"
          en: "Agitate"
          ja: "拡大"
        format:
          zh: "{action}"
          en: "{action}"
          ja: "{action}"
        when: "action"
      - label:
          zh: "事实"
          en: "Facts"
          ja: "事実"
        format:
          zh: "{body}<br>{dataLine} · 出处：{sourcesLine}"
          en: "{body}<br>{dataLine} · Sources：{sourcesLine}"
          ja: "{body}<br>{dataLine} · 出典：{sourcesLine}"
  - type: "subh"
    text:
      zh: "短贴 tips"
      en: "Short-post tips"
      ja: "短文 tips"
  - type: "tips"
    lists:
      zh:
        - "单贴越短越好：一口气读完为准；英文单贴 110 字符内表现最佳（tweet-writer）。"
        - "第一小时最关键：发在受众活跃的时段；链接放文末或回复里，别占正文开头。"
        - "具体数字 > 形容词：「浪高 209、5 个来源同时报」比「非常火」可信得多。"
        - "钩子公式轮换用：数字型 / 好奇缺口 / 反差观点 / 问题 / 故事，别连用同一种。"
        - "Thread 每条独立成立，第一条必须是能单独转发的钩子。"
      en:
        - "Shorter wins: one breath per post; under ~110 characters performs best for single posts (tweet-writer)."
        - "The first hour is critical: post when your audience is active; put links at the end or in a reply, not up front."
        - "Specific numbers beat adjectives: 'wave 209, 5 sources at once' over 'it's huge'."
        - "Rotate hook formulas: specific result / curiosity gap / contrarian / question / story."
        - "In a thread, every post must stand alone; the first one must work as a standalone hook."
      ja:
        - "短いほど良い：一息で読める長さに。英語の単独ポストは110文字以内が最適（tweet-writer）。"
        - "最初の一時間が勝負：読者が活発な時間帯に投稿し、リンクは末尾か返信へ。"
        - "形容詞より具体的な数字：「波高209、5ソース同時報道」は「すごく話題」より信頼される。"
        - "フック公式は使い回す：数字型 / 好奇ギャップ / 逆張り / 質問 / 物語。"
        - "スレッドは各ポストが独立して成立すること。最初の一件は単独で通用するフックに。"
  - type: "subh"
    text:
      zh: "长文大纲"
      en: "Long-form outline"
      ja: "長文アウトライン"
  - type: "note"
    margin: 8
    text:
      zh: "骨架 · Hormozi 四段（观点 → 故事 → 理由 → 软 CTA）"
      en: "Skeleton · Hormozi's four parts (Idea → Story → Reasons → Soft CTA)"
      ja: "骨格 · Hormozi の4部（主張 → 物語 → 理由 → ソフト CTA）"
  - type: "olist"
    items:
      - label:
          zh: "一个观点"
          en: "One idea"
          ja: "一つの主張"
        format:
          zh: "用一句话写下主张；先从「建议动作」里提炼，写不出就是还没想清"
          en: "State your claim in one sentence — distill it from the suggested action; if you can't, the angle isn't clear yet"
          ja: "主張を一文で書く。まず「おすすめアクション」から抽出を。書けないなら角度が定まっていない"
      - label:
          zh: "故事与证据"
          en: "Story & evidence"
          ja: "物語と証拠"
        format:
          zh: "{firstTitle} → {lastTitle}（浪高轨迹：{traj}）"
          en: "{firstTitle} → {lastTitle}（Wave trail：{traj}）"
          ja: "{firstTitle} → {lastTitle}（波高の軌跡：{traj}）"
      - label:
          zh: "理由，不是步骤"
          en: "Reasons, not steps"
          ja: "理由であって手順ではない"
        format:
          zh: "从技术、商业、使用者三个角度各写一条理由——讲为什么成立，不讲怎么做"
          en: "One reason each from the tech, business and user angles — argue why it is true, not how to do it"
          ja: "技術・ビジネス・利用者の三つの角度から理由を一つずつ——「なぜ成り立つか」を書き、「どうやるか」は書かない"
      - label:
          zh: "软 CTA"
          en: "Soft CTA"
          ja: "ソフト CTA"
        format:
          zh: "结尾轻带一句即可：后续会继续追踪它的浪高变化，想跟进的可以收藏这页"
          en: "End lightly: I will keep tracking its wave height — bookmark this page to follow along"
          ja: "締めは軽く：今後も波高の変化を追跡します。フォローしたい方はこのページを保存どうぞ"
  - type: "subh"
    text:
      zh: "长文 tips"
      en: "Long-form tips"
      ja: "長文 tips"
  - type: "tips"
    lists:
      zh:
        - "一篇只讲一个观点：主张说不成一句话，就先别动笔（Hormozi）。"
        - "理由不是步骤：从心理、经济、行为、竞争等角度把观点讲透，目标 4–6 条。"
        - "节奏参考 Dan Koe：约 40% 短句独立成段、40% 对話式中句、20% 长段展开。"
        - "动笔前先定角度：同一话题列几个角度，选信息增量最大的一个（Substack 写作流程）。"
        - "说服靠具体：真实数字、真实案例、时间线——形容词最廉价。"
      en:
        - "One piece, one idea: if the claim does not fit in one sentence, do not start writing (Hormozi)."
        - "Reasons, not steps: argue the idea from psychological, economic, behavioral and competitive angles — aim for 4–6."
        - "Rhythm after Dan Koe: ~40% ultra-short paragraphs, ~40% conversational medium, ~20% longer expansive passages."
        - "Pick the angle before drafting: list several angles for the same topic, take the one with the most new information (Substack workflow)."
        - "Persuasion is concrete: real numbers, real cases, a timeline — adjectives are the cheapest currency."
      ja:
        - "一本に主張は一つ：一文で言えないなら、まだ書くな（Hormozi）。"
        - "理由は手順ではない：心理・経済・行動・競合など複数の角度から主張を裏付ける。目標4–6個。"
        - "リズムは Dan Koe 参考：約40%が短い独立段落、40%が会話的な中丈、20%が長い展開。"
        - "書く前に角度を決める：同じ話題で角度をいくつか挙げ、情報量が最大のものを選ぶ（Substack の流れ）。"
        - "説得は具体で：実数、実例、タイムライン。形容詞は一番安い。"
`,hasSchema:!1},{manifestText:`id: investor
api: 1
order: 20
requires_data: true
name:
  zh: "投资研判"
  en: "Investment Read"
  ja: "投資見通し"
description:
  zh: "话题页的投资研判面板：影响方向、受影响标的、时间尺度、逻辑与风险。由分级 agent 按 schema 产出结构化研判，无产出的话题不显示。"
  en: "An investment-read panel on topic pages: direction, affected tickers, horizon, logic and risks — structured output from the grading agent; topics without output show nothing."
  ja: "トピックページの投資見通しパネル：方向、関連銘柄、時間軸、ロジックとリスク。分級エージェントの構造化出力がある話題だけに表示。"
slots:
  - panel
  - grading
`,panelText:`head:
  title:
    zh: "📈 投资研判"
    en: "📈 Investment Read"
    ja: "📈 投資見通し"
blocks:
  - type: "fields"
    items:
      - label: { zh: "影响方向", en: "Direction", ja: "方向" }
        field: "direction"
      - label: { zh: "受影响标的", en: "Tickers", ja: "関連銘柄" }
        field: "tickers"
      - label: { zh: "时间尺度", en: "Horizon", ja: "時間軸" }
        field: "horizon"
      - label: { zh: "逻辑", en: "Logic", ja: "ロジック" }
        field: "logic"
      - label: { zh: "风险与反证", en: "Risks", ja: "リスク" }
        field: "risks"
disclaimer:
  zh: "本研判由 AI 按公开信息生成，是研究视角与核查清单，不构成投资建议，更不是买卖指令；据此操作，风险自担。"
  en: "Generated by AI from public information. A research lens and a checklist — not investment advice and never a buy/sell instruction. You act at your own risk."
  ja: "公開情報から AI が生成した調査視点とチェックリストであり、投資助言ではなく売買指示でもありません。判断は自己責任で。"
`,hasSchema:!0},{manifestText:`id: watchlist
api: 1
order: 20
requires_data: true
name:
  zh: "追番建议"
  en: "Watchlist Pick"
  ja: "追番おすすめ"
description:
  zh: "话题页的追番建议面板：作品与媒介、连载状态、入坑理由、追更节奏与适合人群。由分级 agent 按 schema 产出，无产出的话题不显示。"
  en: "A watchlist panel on topic pages: work and medium, serialization status, why to start, pacing advice and who it is for — from the grading agent's structured output only."
  ja: "トピックページの追番パネル：作品と媒体、連載状況、入坑理由、追更ペースと向いている人。構造化出力がある話題だけに表示。"
slots:
  - panel
  - grading
`,panelText:`head:
  title:
    zh: "📺 追番建议"
    en: "📺 Watchlist Pick"
    ja: "📺 追番おすすめ"
blocks:
  - type: "fields"
    items:
      - label: { zh: "作品", en: "Work", ja: "作品" }
        field: "work"
      - label: { zh: "媒介", en: "Medium", ja: "媒体" }
        field: "medium"
      - label: { zh: "状态", en: "Status", ja: "状況" }
        field: "status"
      - label: { zh: "入坑理由", en: "Why start", ja: "入坑理由" }
        field: "reason"
      - label: { zh: "追更节奏", en: "Pacing", ja: "追更ペース" }
        field: "pace"
      - label: { zh: "适合人群", en: "For", ja: "向いている人" }
        field: "audience"
`,hasSchema:!0}];function j(e){return A(e)??{}}function M(e,t,n,r){let i=j(e);if(!i.id||typeof i.id!=`string`)throw Error(`plugin at ${r}: plugin.yaml has no string id`);if(i.api!==void 0&&i.api!==1)throw Error(`plugin "${i.id}": unsupported api ${String(i.api)}`);let a=j(t);if(!a.head||!Array.isArray(a.blocks))throw Error(`plugin "${i.id}": panel.yaml needs a head and a blocks list`);return{id:i.id,order:typeof i.order==`number`?i.order:100,requiresData:i.requires_data??n,head:a.head,blocks:a.blocks,disclaimer:a.disclaimer}}function ke(n){let r=e.join(n,`plugin.yaml`),i=e.join(n,`panel.yaml`);return!t.existsSync(r)||!t.existsSync(i)?null:M(t.readFileSync(r,`utf-8`),t.readFileSync(i,`utf-8`),t.existsSync(e.join(n,`schema.yaml`)),n)}function Ae(n,r,i){let a=new Map,o=!1;for(let[i,s]of[e.join(n,`plugins`),e.join(r,`plugins`)].entries())try{if(!t.existsSync(s))continue;for(let n of t.readdirSync(s)){let r=e.join(s,n);if(!t.statSync(r).isDirectory())continue;let i=ke(r);i&&a.set(i.id,i)}i===0&&(o=!0)}catch{}if(!o)for(let e of Oe){let t=M(e.manifestText,e.panelText,e.hasSchema,`bundled plugin`);a.has(t.id)||a.set(t.id,t)}let s=i.plugins??{},c=[];for(let e of a.values()){let t=s[e.id]?.enabled;(e.id===`creator`?t??!0:t??!1)&&c.push(e)}return c.sort((e,t)=>e.order-t.order||e.id.localeCompare(t.id)),c}function N(e,t){let n=y[e]?.[t]??y.zh?.[t];return typeof n==`string`?n:``}function je(e,t){let n=y[e]?.[t]??y.zh?.[t];return Array.isArray(n)?n:[]}function P(e,t){return e.replace(/\{(\w+)\}/g,(e,n)=>String(t[n]??``))}var Me=`
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS editions (
  idx INTEGER PRIMARY KEY,
  date TEXT NOT NULL,
  slot TEXT,
  published_at TEXT,
  raw TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS ledger (
  name TEXT PRIMARY KEY,
  raw TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS topics (
  key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  ord INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS appearances (
  topic_key TEXT NOT NULL,
  edition_idx INTEGER NOT NULL,
  app_ord INTEGER NOT NULL,
  heat INTEGER NOT NULL,
  raw TEXT NOT NULL,
  PRIMARY KEY (topic_key, app_ord)
);
CREATE INDEX IF NOT EXISTS appearances_by_edition ON appearances (edition_idx);
`,F={pilot:0,morning:1,evening:2};function I(e){let t=e.map(({name:e,text:t})=>{let n=/(\d{4}-\d{2}-\d{2})-(\w+)/.exec(e);if(!n)throw Error(`edition filename does not parse: ${e}`);return{name:e,text:t,date:n[1],slot:n[2],order:F[n[2]]??9}});t.sort((e,t)=>e.date<t.date?-1:e.date>t.date?1:e.order-t.order);let n=[];for(let{text:e,slot:i}of t){let t=JSON.parse(e);t.slot==null&&i in F&&(t.slot=i);for(let e of t.items)e._heat=r(e);[...t.items].sort((e,t)=>t._heat-e._heat).forEach((e,t)=>{e._rank=t+1}),n.push(t)}return n}function Ne(n){let r=e.join(n,`editions`),i=[];try{i=t.readdirSync(r).filter(e=>e.endsWith(`.json`))}catch{i=[]}return I(i.map(n=>({name:n,text:t.readFileSync(e.join(r,n),`utf-8`)})))}function Pe(n){let r=e.join(n,`state`,`seen-topics.json`);return t.existsSync(r)?JSON.parse(t.readFileSync(r,`utf-8`)).topics??[]:[]}function Fe(n){let r=e.join(n,`config.yaml`);return t.existsSync(r)?t.readFileSync(r,`utf-8`):null}function L(n){let r=e.join(n,`track-record.md`);return t.existsSync(r)?t.readFileSync(r,`utf-8`):null}function R(e){return e?A(e)??{}:{}}var Ie=class{constructor(e){this.dir=e}async load(){let e=Fe(this.dir);return{editions:Ne(this.dir),ledger:Pe(this.dir),config:R(e),configText:e,trackRecord:L(this.dir),topics:null}}};async function z(e,t){return new(await(import(`node:sqlite`))).DatabaseSync(e,{readOnly:t})}function Le(e,t){let n=new Map,r=[];for(let t of e){let e={key:t.key,name:t.name,slug:t.slug,id:``,apps:[]};n.set(e.key,e),r.push(e)}for(let e of t){let t=n.get(e.topic_key);t&&t.apps.push(JSON.parse(e.raw))}return r}var B=class{constructor(e){this.dbPath=e}async load(){let e=await z(this.dbPath,!0);try{let t=e.prepare(`SELECT raw FROM editions ORDER BY idx`).all().map(e=>JSON.parse(e.raw)),n=e.prepare(`SELECT raw FROM ledger`).all().map(e=>JSON.parse(e.raw)),r=e.prepare(`SELECT value FROM config WHERE key = 'config.yaml'`).get(),i=e.prepare(`SELECT value FROM config WHERE key = 'track-record.md'`).get(),a=e.prepare(`SELECT key, name, slug FROM topics ORDER BY ord`).all(),o=e.prepare(`SELECT topic_key, raw FROM appearances ORDER BY topic_key, app_ord`).all();return{editions:t,ledger:n,config:R(r?.value??null),configText:r?.value??null,trackRecord:i?.value??null,topics:Le(a,o)}}finally{e.close()}}};function Re(e,t){let n=R(t.configText),r=g(t.editions,t.ledger,l(n)??void 0);e.exec(Me),e.exec(`BEGIN IMMEDIATE`);let i=0;try{for(let t of[`editions`,`ledger`,`config`,`topics`,`appearances`,`meta`])e.exec(`DELETE FROM ${t}`);let n=e.prepare(`INSERT INTO editions (idx, date, slot, published_at, raw) VALUES (?, ?, ?, ?, ?)`);t.editions.forEach((e,t)=>{n.run(t,e.date,e.slot??null,e.published_at??null,JSON.stringify(e))});let a=e.prepare(`INSERT INTO ledger (name, raw) VALUES (?, ?)`);for(let e of t.ledger)a.run(e.name,JSON.stringify(e));t.configText!==null&&e.prepare(`INSERT INTO config (key, value) VALUES ('config.yaml', ?)`).run(t.configText),t.trackRecord!==null&&e.prepare(`INSERT INTO config (key, value) VALUES ('track-record.md', ?)`).run(t.trackRecord);let o=e.prepare(`INSERT INTO topics (key, name, slug, ord) VALUES (?, ?, ?, ?)`),s=e.prepare(`INSERT INTO appearances (topic_key, edition_idx, app_ord, heat, raw) VALUES (?, ?, ?, ?, ?)`);r.forEach((e,t)=>{o.run(e.key,e.name,e.slug,t),e.apps.forEach((t,n)=>{s.run(e.key,t.edition,n,t.heat,JSON.stringify(t)),i+=1})}),e.prepare(`INSERT INTO meta (key, value) VALUES ('schema_version', ?)`).run(`1`),t.sourceDir&&e.prepare(`INSERT INTO meta (key, value) VALUES ('source_dir', ?)`).run(t.sourceDir),e.exec(`COMMIT`)}catch(t){throw e.exec(`ROLLBACK`),t}return i}async function V(e){let t=await fetch(e);if(!t.ok)throw Error(`remote data: GET ${e} -> ${t.status}`);return t.text()}async function H(e){let t=await fetch(e);if(t.status===404)return null;if(!t.ok)throw Error(`remote data: GET ${e} -> ${t.status}`);return t.text()}var ze=class{constructor(e){this.base=e}async load(){let e=this.base.replace(/\/+$/,``),t=JSON.parse(await V(`${e}/editions.json`));if(!Array.isArray(t.editions))throw Error(`remote data: editions.json has no editions[] list`);let n=t.editions.filter(e=>typeof e==`string`),r=I(await Promise.all(n.map(async t=>({name:t,text:await V(`${e}/editions/${t}`)})))),i=await H(`${e}/state/seen-topics.json`),a=i?JSON.parse(i).topics??[]:[],o=await H(`${e}/config.yaml`),s=await H(`${e}/track-record.md`);return{editions:r,ledger:a,config:R(o),configText:o,trackRecord:s,topics:null}}},U=[`zh`,`en`,`ja`];function Be(e){return U.includes(e)}function W(){return process.env.BD_DATA_DIR?e.resolve(process.env.BD_DATA_DIR):e.resolve(process.cwd(),`../../../breaker-delta-data`)}function Ve(){return process.env.BD_DB_PATH?e.resolve(process.env.BD_DB_PATH):null}function He(){return process.env.BD_ENGINE_DIR?e.resolve(process.env.BD_ENGINE_DIR):e.resolve(process.cwd(),`../..`)}function G(){return process.env.BD_DATA_BASE?process.env.BD_DATA_BASE.replace(/\/+$/,``):null}function Ue(){let t=G();return t?new ze(t):process.env.BD_DB_PATH?new B(e.resolve(process.env.BD_DB_PATH)):new Ie(W())}function We(e,t){for(let n of e){let e=null;for(let r of n.apps){let i=t[r.edition]?.get(n.key);r.board_rank=i?i.rank:r.rank,r.board_rank_delta=e===null?null:e-r.board_rank,e=r.board_rank}}}function Ge(e,t){let n=Array.from({length:t},()=>[]);for(let r of e)for(let e of r.apps)e.edition>=0&&e.edition<t&&n[e.edition].push([r,e]);let r=[],i=new Map,a=new Map;for(let e=0;e<t;e++){for(let[t,r]of n[e])i.set(t.key,{topic:t,app:r,heat:r.heat,carried:!1,rank:0,heatDelta:null,rankDelta:null});let t=new Map;for(let[n,r]of i)t.set(n,{...r,carried:r.app.edition!==e});[...t.values()].sort((e,t)=>t.heat-e.heat).forEach((e,t)=>{e.rank=t+1;let n=a.get(e.topic.key);e.heatDelta=n?e.heat-n.heat:null,e.rankDelta=n?n.rank-e.rank:null}),r.push(t),a=new Map([...t].map(([e,t])=>[e,{heat:t.heat,rank:t.rank}]))}return We(e,r),r}var K=null,q=0;function Ke(){K=null}function qe(){if(!G())return 1/0;let e=Number(process.env.BD_DATA_TTL_MS??12e4);return Number.isFinite(e)&&e>0?e:12e4}function Je(){return K&&Date.now()-q<qe()||(q=Date.now(),K=(async()=>{let e=await Ue().load(),t=G()??W(),n=e.topics??g(e.editions,e.ledger,l(e.config)??void 0),r=new Map(n.map(e=>[e.slug,e])),i=Ge(n,e.editions.length),a=Ae(He(),t,e.config);return{dataDir:t,editions:e.editions,topics:n,bySlug:r,states:i,panelDefs:a,config:e.config,configText:e.configText,trackRecord:e.trackRecord}})(),K.catch(()=>{K=null})),K}function J(e){let t=e.states[e.states.length-1];return t?[...t.values()].sort((e,t)=>e.rank-t.rank):[]}function Y(e,t){let n=e.i18n?.[t];return{title:n?.title||e.title,body:n?.body||e.body,action:n?.action||e.action}}function Ye(e,t){if(t!==`zh`){let n=ve[e.name]?.[t];if(n)return n}let n=e.apps.find(t=>t.title===e.name),r=e.apps[e.apps.length-1];return Y(n??r,t).title}function X(e){return Object.prototype.hasOwnProperty.call(S,e)?S[e]:d(e,`category`)}function Xe(e){let t=new Map;for(let n of J(e))t.set(n.app.category,(t.get(n.app.category)??0)+1);return[...t.entries()].map(([e,t])=>({name:e,key:X(e),count:t})).sort((e,t)=>t.count-e.count)}function Z(e){let t=e.published_at??``;return[...t].length>=16?`${[...t].slice(0,10).join(``)} ${[...t].slice(11,16).join(``)}`:e.date}var Q={pilot:`试跑`,morning:`早报`,evening:`晚报`};function Ze(e,t){return e.slot!=null&&w[e.slot]?w[e.slot][t]||Q[e.slot]||e.slot:e.slot==null?``:Q[e.slot]??e.slot}function Qe(e,t,n){return n===`zh`?t:l(e.config)?.i18n?.[t]?.[n]??de[t]?.[n]??t}function $e(e,t){return((e==null?void 0:x[e])??x.echo)[t]}function et(e,t){return t===`zh`?e:_e[e]?.[t]||e}function tt(e){let t=[...e.published??``];return t.length>=16?`${t.slice(5,10).join(``)} ${t.slice(11,16).join(``)}`:[...e.date??``].slice(5).join(``)}function $(e){if(!e)return null;let t=Date.parse(e);return Number.isNaN(t)?null:{ms:t,aware:/([zZ]|[+-]\d{2}:?\d{2})$/.test(e.trim())}}function nt(e,t){let n=e.apps.filter(e=>e.edition<=t.edition);try{let e=$(t.published??``);if(e===null)throw Error(`unparseable`);let r=[];for(let t of n){if(!t.published)continue;let n=$(t.published);if(n===null)throw Error(`unparseable`);if(n.aware!==e.aware)throw Error(`naive/aware mix`);(e.ms-n.ms)/1e3<=86400&&r.push(t)}if(r.length>=2)return r.map(e=>e.heat)}catch{}return n.slice(-6).map(e=>e.heat)}function rt(e){let t=new Map;for(let n of e.topics)for(let e of n.apps)for(let r of e.sources){let i=t.get(r);i||(i={apps:0,topics:new Map,lastEi:-1,firstEi:10**9,eds:new Set,topicApps:new Map,topicLast:new Map},t.set(r,i)),i.apps+=1,i.topics.set(n.slug,n),i.lastEi=Math.max(i.lastEi,e.edition),i.firstEi=Math.min(i.firstEi,e.edition),i.eds.add(e.edition),i.topicApps.set(n.slug,(i.topicApps.get(n.slug)??0)+1),i.topicLast.set(n.slug,Math.max(i.topicLast.get(n.slug)??-1,e.edition))}let n=new Map,r=new Map,i=new Set(u);for(let e of t.keys()){let t=`source-`+d(e,`src`),a=t+`.html`,o=2;for(;i.has(a);)a=`${t}-${o}.html`,o+=1;i.add(a);let s=a.replace(/\.html$/,``);n.set(e,s),r.set(s,e)}return{stats:t,fileBase:n,byBase:r}}function it(e,t,n,r){return P(N(t,`src_stats`),{dom:b[r]??`—`,a:n.topics.size,b:n.apps,c:n.eds.size,d:Z(e.editions[n.firstEi]),e:Z(e.editions[n.lastEi])})}function at(e,t){let n=e=>e===`index`?`/${t}`:e.startsWith(`category-`)?`/${t}/category/${e.slice(9)}`:e.startsWith(`source-`)?`/${t}/source/${e}`:e.startsWith(`edition-`)?`/${t}/edition/${e.slice(8)}`:e.startsWith(`level-`)?`/${t}/level/${e.slice(6)}`:e===`track-record`?`/${t}/track-record`:`/${t}/${e}`;return e.replace(/href="feed\.xml"/g,`href="${t===`zh`?`/feed.xml`:`/${t}/feed.xml`}"`).replace(/href="atom\.xml"/g,`href="${t===`zh`?`/atom.xml`:`/${t}/atom.xml`}"`).replace(/href="([a-z0-9][a-z0-9-]*)\.html"/g,(e,t)=>`href="${n(t)}"`).replace(/href="([^"]+?)\.html"/g,(e,n)=>`href="/${t}/topic/${n}"`)}export{T as A,v as B,B as C,N as D,P as E,he as F,a as G,ie as H,ue as I,l as K,ge as L,ye as M,le as N,je as O,ce as P,me as R,tt as S,Re as T,ae as U,re as V,te as W,Ze as _,W as a,it as b,Je as c,J as d,$e as f,at as g,G as h,Xe as i,xe as j,Se as k,Ke as l,Ye as m,X as n,Ve as o,Y as p,r as q,Qe as r,Z as s,U as t,Be as u,rt as v,z as w,nt as x,et as y,b as z};