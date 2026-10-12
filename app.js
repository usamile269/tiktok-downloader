const $=id=>document.getElementById(id);
let DATA=null;

$("paste").onclick=async()=>{
  try{ $("url").value=await navigator.clipboard.readText(); }
  catch(e){ alert("Clipboard blocked — paste manually (long-press / Ctrl+V)"); }
};
$("fetch").onclick=fetchVideo;
$("url").addEventListener("keydown",e=>{ if(e.key==="Enter") fetchVideo(); });

async function fetchVideo(){
  const u=$("url").value.trim();
  if(!u){ showErr("Please paste a TikTok link first!"); return; }
  if(!/tiktok\.com/i.test(u)){ showErr("That doesn't look like a TikTok link!"); return; }
  $("err").classList.add("hidden");
  $("result").classList.add("hidden");
  $("loading").classList.remove("hidden");
  $("fetch").disabled=true; $("fetch").textContent="⏳ Fetching…";
  try{
    const r=await fetch("https://www.tikwm.com/api/?url="+encodeURIComponent(u));
    const j=await r.json();
    if(j.code!==0||!j.data||!j.data.play){ throw new Error("notfound"); }
    DATA=j.data; render();
  }catch(e){
    showErr("Couldn't fetch that video. It may be private, deleted, or the link is wrong — try another link.");
  }finally{
    $("loading").classList.add("hidden");
    $("fetch").disabled=false; $("fetch").textContent="⬇️ Download";
  }
}

function render(){
  const d=DATA;
  $("preview").src=d.play; $("preview").poster=d.cover||"";
  $("avatar").src=d.author?.avatar||"";
  $("author").textContent="@"+(d.author?.unique_id||"tiktok");
  $("title").textContent=d.title||"";
  const f=n=>n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":n;
  $("likes").textContent="❤️ "+f(d.digg_count||0);
  $("comments").textContent="💬 "+f(d.comment_count||0);
  $("shares").textContent="🔁 "+f(d.share_count||0);
  $("result").classList.remove("hidden");
  $("result").scrollIntoView({behavior:"smooth",block:"center"});
}

function showErr(m){ const e=$("err"); e.textContent="⚠️ "+m; e.classList.remove("hidden"); }

async function save(url,name){
  try{
    const r=await fetch(url); const b=await r.blob();
    const a=document.createElement("a");
    a.href=URL.createObjectURL(b); a.download=name; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),5000);
  }catch(e){ window.open(url,"_blank"); }
}
$("dlHd").onclick=()=>DATA&&save(DATA.play,"snaptik-hd-"+Date.now()+".mp4");
$("dlWm").onclick=()=>DATA&&save(DATA.wmplay,"snaptik-"+Date.now()+".mp4");
$("dlMp3").onclick=()=>DATA&&save(DATA.music,"snaptik-audio-"+Date.now()+".mp3");
