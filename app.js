const $=id=>document.getElementById(id);
let DATA=null;

/* ---------- toast ---------- */
let toastT=null;
function toast(m){const t=$("toast");t.textContent=m;t.classList.remove("hidden");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.add("hidden"),2200);}

/* ---------- side menu ---------- */
const menu=$("sideMenu"),ov=$("menuOverlay");
$("menuBtn").onclick=()=>{menu.classList.add("open");ov.classList.remove("hidden");};
const closeMenu=()=>{menu.classList.remove("open");ov.classList.add("hidden");};
$("menuClose").onclick=closeMenu; ov.onclick=closeMenu;
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
$("mDl").onclick=e=>{e.preventDefault();closeMenu();$("dlbar").scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>$("url").focus(),600);};

/* ---------- theme ---------- */
function setTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem("stp_theme",t);$("themeBtn").textContent=t==="dark"?"🌙":"☀️";}
setTheme(localStorage.getItem("stp_theme")||"dark");
$("themeBtn").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");

/* ---------- language ---------- */
const I18N={
en:{h1a:"TikTok Video",h1b:"Downloader",sub1:"Download TikTok videos in HD quality",sub2:"— no watermark, no hassle!",b1:"⚡ HD Quality",b2:"🛡️ No Watermark",b3:"⚡ Fast Download",b4:"📲 All Devices",ph:"Paste TikTok video link here…",dlbtn:"⬇️ Download →",paste:"Paste from clipboard",fetching:"Fetching video…",hd:"HD — No Watermark",wm:"With Watermark",mp3:"MP3 Audio",f1t:"No Watermark",f1d:"Get clean videos without any TikTok watermark.",f2t:"HD Quality",f2d:"Download in HD, Full HD & 4K quality.",f3t:"Fast & Easy",f3d:"Quick download with one click.",f4t:"Multiple Formats",f4d:"MP4, MP3 (Audio) and more formats.",f5t:"Works on All Devices",f5d:"Mobile, Tablet, Desktop — everywhere.",f6t:"100% Free",f6d:"No hidden charges. Always free.",favt:"My Favorites",favempty:"No favorites yet — tap 🤍 on any video to save it here!",histt:"Download History",histempty:"Nothing downloaded yet.",clear:"Clear history",trt:"Trending",trd:"Check out the most popular TikTok videos!",vm:"View More →",pt:"Go Premium",pd:"Unlock more features and enjoy an ad-free experience!",p1:"Faster downloads",p2:"No ads",p3:"Premium support",pb:"Get Premium →",n1:"Home",n2:"Downloader",n3:"Favorites",n4:"History",n5:"Profile",m_home:"Home",m_dl:"Downloader",m_fav:"Favorites",m_hist:"History",m_faq:"FAQ"},
ur:{h1a:"ٹک ٹاک ویڈیو",h1b:"ڈاؤنلوڈر",sub1:"ٹک ٹاک ویڈیوز HD میں ڈاؤنلوڈ کریں",sub2:"— بغیر واٹرمارک، بغیر جھنجھٹ!",b1:"⚡ HD کوالٹی",b2:"🛡️ بغیر واٹرمارک",b3:"⚡ تیز ڈاؤنلوڈ",b4:"📲 ہر ڈیوائس",ph:"ٹک ٹاک لنک یہاں پیسٹ کریں…",dlbtn:"⬇️ ڈاؤنلوڈ →",paste:"کلپ بورڈ سے پیسٹ کریں",fetching:"ویڈیو لائی جا رہی ہے…",hd:"HD — بغیر واٹرمارک",wm:"واٹرمارک کے ساتھ",mp3:"MP3 آڈیو",f1t:"بغیر واٹرمارک",f1d:"بغیر واٹرمارک صاف ویڈیوز حاصل کریں۔",f2t:"HD کوالٹی",f2d:"HD، فل HD اور 4K میں ڈاؤنلوڈ کریں۔",f3t:"تیز اور آسان",f3d:"ایک کلک میں فوری ڈاؤنلوڈ۔",f4t:"کئی فارمیٹس",f4d:"MP4، MP3 (آڈیو) اور مزید۔",f5t:"ہر ڈیوائس پر",f5d:"موبائل، ٹیبلٹ، ڈیسکٹاپ — ہر جگہ۔",f6t:"100% مفت",f6d:"کوئی خفیہ چارجز نہیں۔ ہمیشہ مفت۔",favt:"میرے پسندیدہ",favempty:"ابھی کچھ نہیں — کسی ویڈیو پر 🤍 دبائیں!",histt:"ڈاؤنلوڈ ہسٹری",histempty:"ابھی کچھ ڈاؤنلوڈ نہیں ہوا۔",clear:"ہسٹری صاف کریں",trt:"ٹرینڈنگ",trd:"مقبول ترین ٹک ٹاک ویڈیوز دیکھیں!",vm:"مزید دیکھیں →",pt:"پریمیم لیں",pd:"مزید فیچرز اور بغیر اشتہار تجربہ!",p1:"تیز ڈاؤنلوڈ",p2:"بغیر اشتہار",p3:"پریمیم سپورٹ",pb:"پریمیم لیں →",n1:"ہوم",n2:"ڈاؤنلوڈر",n3:"پسندیدہ",n4:"ہسٹری",n5:"پروفائل",m_home:"ہوم",m_dl:"ڈاؤنلوڈر",m_fav:"پسندیدہ",m_hist:"ہسٹری",m_faq:"سوالات"}};
function setLang(l){
  localStorage.setItem("stp_lang",l);$("langBtn").textContent=(l==="ur"?"🇵🇰 اردو":"EN")+" ▾";
  document.querySelectorAll("[data-i]").forEach(el=>{const k=el.dataset.i;if(I18N[l][k])el.textContent=I18N[l][k];});
  document.querySelectorAll("[data-i-ph]").forEach(el=>{el.placeholder=I18N[l][el.dataset.iPh]||el.placeholder;});
  $("langMenu").classList.add("hidden");
}
setLang(localStorage.getItem("stp_lang")||"en");
$("langBtn").onclick=e=>{e.stopPropagation();$("langMenu").classList.toggle("hidden");};
document.addEventListener("click",()=>$("langMenu").classList.add("hidden"));
document.querySelectorAll("#langMenu button").forEach(b=>b.onclick=e=>{e.stopPropagation();setLang(b.dataset.lang);toast(b.dataset.lang==="ur"?"اردو منتخب!":"English selected!");});

/* ---------- trending ---------- */
const TRENDS=[["tk1","1.4M","Trending",""],["tk2","2.3M","Nature","blue"],["tk3","987K","Cute","purple"],["tk4","1.8M","Motivation","orange"],["tk5","3.1M","Funny",""],["tk6","2.7M","Dance","blue"],["tk7","1.1M","Pets","purple"],["tk8","4.2M","Viral","orange"]];
let trendN=0;
function addTrends(n){
  const g=$("trendGrid");
  for(let i=0;i<n&&trendN<TRENDS.length;i++,trendN++){
    const [s,v,tag,cls]=TRENDS[trendN];
    const d=document.createElement("div");d.className="tcard";
    d.innerHTML=`<img src="https://picsum.photos/seed/${s}/300/400" loading="lazy" alt=""><span class="play">▶</span><span class="views">▷ ${v}</span><em class="tag ${cls}">${tag}</em>`;
    d.onclick=()=>toast("🔗 "+tag+" — paste a TikTok link above to download!");
    g.appendChild(d);
  }
  if(trendN>=TRENDS.length)$("viewMore").style.display="none";
}
addTrends(4);
$("viewMore").onclick=()=>addTrends(4);

/* ---------- premium + profile modals ---------- */
const openM=id=>$(id).classList.remove("hidden"), closeM=id=>$(id).classList.add("hidden");
$("premBtn").onclick=()=>openM("premModal");
$("profBtn").onclick=e=>{e.preventDefault();updateStats();openM("profModal");};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeM(b.dataset.close));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.add("hidden");}));
document.querySelectorAll("[data-plan]").forEach(b=>b.onclick=()=>{closeM("premModal");toast("👑 "+b.dataset.plan+" plan coming soon!");});
function updateStats(){
  $("stDl").textContent=(JSON.parse(localStorage.getItem("stp_hist")||"[]")).length;
  $("stFav").textContent=(JSON.parse(localStorage.getItem("stp_fav")||"[]")).length;
}

/* ---------- favorites ---------- */
function getFav(){try{return JSON.parse(localStorage.getItem("stp_fav")||"[]");}catch(e){return[];}}
function renderFav(){
  const g=$("favGrid"),f=getFav();g.innerHTML="";
  $("favEmpty").style.display=f.length?"none":"block";
  f.forEach((v,i)=>{
    const d=document.createElement("div");d.className="tcard";
    d.innerHTML=`<img src="${v.cover}" loading="lazy" alt=""><button class="fav-del">✕</button><span class="views">${v.author}</span>`;
    d.querySelector("img").onclick=()=>{if(v.url){$("url").value=v.url;$("dlbar").scrollIntoView({behavior:"smooth",block:"center"});}};
    d.querySelector(".fav-del").onclick=e=>{e.stopPropagation();const a=getFav();a.splice(i,1);localStorage.setItem("stp_fav",JSON.stringify(a));renderFav();updateStats();};
    g.appendChild(d);
  });
}
$("favBtn").onclick=()=>{
  if(!DATA)return;
  const f=getFav();
  const item={author:"@"+(DATA.author?.unique_id||"tiktok"),title:DATA.title||"",cover:DATA.cover||"",url:$("url").value,at:Date.now()};
  if(f.some(x=>x.url===item.url)){toast("Already in favorites!");return;}
  f.unshift(item);localStorage.setItem("stp_fav",JSON.stringify(f.slice(0,30)));
  $("favBtn").textContent="❤️";$("favBtn").classList.add("loved");renderFav();updateStats();toast("🤍 Saved to favorites!");
};
renderFav();

/* ---------- history ---------- */
function logHist(){
  if(!DATA)return;
  let h=[];try{h=JSON.parse(localStorage.getItem("stp_hist")||"[]");}catch(e){}
  h.unshift({author:"@"+(DATA.author?.unique_id||"tiktok"),title:(DATA.title||"").slice(0,60),cover:DATA.cover||"",at:new Date().toLocaleString()});
  localStorage.setItem("stp_hist",JSON.stringify(h.slice(0,30)));renderHist();
}
function renderHist(){
  const box=$("histList");let h=[];try{h=JSON.parse(localStorage.getItem("stp_hist")||"[]");}catch(e){}
  box.innerHTML="";$("histEmpty").style.display=h.length?"none":"block";$("clearHist").classList.toggle("hidden",!h.length);
  h.forEach(v=>{
    const d=document.createElement("div");d.className="hist-item";
    d.innerHTML=`<img src="${v.cover}" alt=""><div><b>${v.author}</b><small>${v.at}</small></div><button>⬇️</button>`;
    d.querySelector("button").onclick=()=>toast("Paste the link again to re-download!");
    box.appendChild(d);
  });
}
$("clearHist").onclick=()=>{localStorage.removeItem("stp_hist");renderHist();updateStats();toast("History cleared!");};
renderHist();

/* ---------- feature cards + bottom nav ---------- */
document.querySelectorAll(".feat").forEach(c=>c.onclick=()=>{$("dlbar").scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>$("url").focus(),600);});
document.querySelectorAll(".bottomnav a").forEach(a=>a.addEventListener("click",()=>{
  document.querySelectorAll(".bottomnav a").forEach(x=>x.classList.remove("active"));a.classList.add("active");
}));
document.querySelector('.bottomnav a[data-nav="dl"]').addEventListener("click",e=>{e.preventDefault();$("dlbar").scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>$("url").focus(),600);});

/* ---------- core: fetch + download ---------- */
$("paste").onclick=async()=>{
  try{$("url").value=await navigator.clipboard.readText();toast("📋 Pasted!");}
  catch(e){toast("Long-press the box to paste!");}
};
$("fetch").onclick=fetchVideo;
$("url").addEventListener("keydown",e=>{if(e.key==="Enter")fetchVideo();});
function showErr(m){const e=$("err");e.textContent="⚠️ "+m;e.classList.remove("hidden");}
async function fetchVideo(){
  const u=$("url").value.trim();
  if(!u){showErr("Please paste a TikTok link first!");return;}
  if(!/tiktok\.com/i.test(u)){showErr("That doesn't look like a TikTok link!");return;}
  $("err").classList.add("hidden");$("result").classList.add("hidden");$("loading").classList.remove("hidden");
  $("fetch").disabled=true;
  try{
    const r=await fetch("https://www.tikwm.com/api/?url="+encodeURIComponent(u));
    const j=await r.json();
    if(j.code!==0||!j.data||!j.data.play)throw new Error("nf");
    DATA=j.data;render();logHist();
  }catch(e){showErr("Couldn't fetch that video. It may be private/deleted — try another link.");}
  finally{$("loading").classList.add("hidden");$("fetch").disabled=false;}
}
function render(){
  const d=DATA;
  $("preview").src=d.play;$("preview").poster=d.cover||"";
  $("avatar").src=d.author?.avatar||"";
  $("author").textContent="@"+(d.author?.unique_id||"tiktok");
  $("title").textContent=d.title||"";
  const f=n=>n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":(n||0);
  $("likes").textContent="❤️ "+f(d.digg_count);$("comments").textContent="💬 "+f(d.comment_count);$("shares").textContent="🔁 "+f(d.share_count);
  $("favBtn").textContent="🤍";$("favBtn").classList.remove("loved");
  $("result").classList.remove("hidden");
  $("result").scrollIntoView({behavior:"smooth",block:"center"});
  toast("✅ Video ready!");
}
async function save(url,name){
  try{
    const r=await fetch(url);const b=await r.blob();
    const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),5000);toast("⬇️ Download started!");
  }catch(e){window.open(url,"_blank");}
}
$("dlHd").onclick=()=>DATA&&save(DATA.play,"snaptik-hd-"+Date.now()+".mp4");
$("dlWm").onclick=()=>DATA&&save(DATA.wmplay,"snaptik-"+Date.now()+".mp4");
$("dlMp3").onclick=()=>DATA&&save(DATA.music,"snaptik-audio-"+Date.now()+".mp3");
