const TX=[
 {d:"22 Oct",t:"Yacht fuel — Port Vell",c:"Travel",e:"🛥️",v:-4350},
 {d:"22 Oct",t:"Dividends — Tech portfolio",c:"Income",e:"📈",v:38200},
 {d:"21 Oct",t:"Dinner for friends (they forgot wallets)",c:"Food",e:"🍽️",v:-1280},
 {d:"21 Oct",t:"Coffee",c:"Food",e:"☕",v:-2.4},
 {d:"20 Oct",t:"Rolex Boutique",c:"Shopping",e:"⌚",v:-18900},
 {d:"19 Oct",t:"Private jet — Barcelona → Tbilisi",c:"Travel",e:"✈️",v:-27500},
 {d:"18 Oct",t:"Salary",c:"Income",e:"💼",v:65000},
 {d:"17 Oct",t:"Tip for the waiter",c:"Food",e:"💶",v:-500},
 {d:"16 Oct",t:"Mercadona",c:"Shopping",e:"🛒",v:-87.35},
 {d:"15 Oct",t:"Bizum from a friend (paying back €5)",c:"Income",e:"🤝",v:5},
 {d:"14 Oct",t:"Netflix, Spotify, HBO, Disney+, everything",c:"Subscriptions",e:"📺",v:-74.96},
 {d:"12 Oct",t:"Ferrari service",c:"Travel",e:"🏎️",v:-3200},
 {d:"10 Oct",t:"Rental income — Barcelona flats",c:"Income",e:"🏢",v:308795},
 {d:"08 Oct",t:"Golf club membership",c:"Subscriptions",e:"⛳",v:-12000},
 {d:"05 Oct",t:"Gift for mum",c:"Shopping",e:"🎁",v:-2400}
];

const fmt=n=>n.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';

function rowHTML(x){
  return `<div class="row" onclick="toast('${x.e} ${x.t.replace(/'/g,"")} · ${fmt(x.v)}')">
    <div class="em">${x.e}</div>
    <div class="d"><div class="t">${x.t}</div><div class="s">${x.d} · ${x.c}</div></div>
    <div class="v ${x.v<0?'neg':'pos'} money-tx">${x.v>0?'+':''}${fmt(x.v)}</div>
  </div>`;
}

document.getElementById('latest').innerHTML=TX.slice(0,5).map(rowHTML).join('');

const cats=['All',...new Set(TX.map(x=>x.c))];
let cur='All';
function renderAll(){
  document.getElementById('chips').innerHTML=cats.map(c=>`<div class="chip ${c===cur?'on':''}" onclick="cur='${c}';renderAll()">${c}</div>`).join('');
  document.getElementById('all').innerHTML=TX.filter(x=>cur==='All'||x.c===cur).map(rowHTML).join('');
  applyHide();
}

let hidden=false;

function countUp(){
  document.querySelectorAll('.money').forEach(el=>{
    const target=+el.dataset.v,start=performance.now(),dur=1600;
    (function step(t){
      const p=Math.min((t-start)/dur,1),e=1-Math.pow(1-p,3);
      if(!hidden)el.textContent=fmt(target*e);
      if(p<1)requestAnimationFrame(step);
    })(start);
  });
}

function applyHide(){
  document.querySelectorAll('.money,.money-tx').forEach(el=>{
    if(hidden){el.dataset.o=el.dataset.o||el.textContent;el.textContent='••••••';}
    else if(el.dataset.o){el.textContent=el.classList.contains('money')?fmt(+el.dataset.v):el.dataset.o;delete el.dataset.o;}
  });
}

function toggleHide(){hidden=!hidden;applyHide();toast(hidden?'Balances hidden 🙈':'Balances visible 💰');}

function go(t){
  document.querySelectorAll('.tab').forEach(s=>s.classList.toggle('on',s.id===t));
  document.querySelectorAll('nav div').forEach(n=>n.classList.toggle('on',n.dataset.t===t));
  window.scrollTo({top:0,behavior:'smooth'});
  if(t==='history')countUp();
}

let tt;
function toast(m){
  const el=document.getElementById('toast');
  el.textContent=m;el.classList.add('show');
  clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('show'),2300);
}

renderAll();
const h=new Date().getHours();
document.getElementById('greet').textContent=(h<12?'Good morning':h<20?'Good afternoon':'Good evening')+',';
setTimeout(()=>{document.getElementById('splash').classList.add('hide');countUp();},2400);
