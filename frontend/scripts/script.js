const API = '/api';
let products = [];
const el = id => document.getElementById(id);

/* ====== AUDIO ====== */
function spamtonSpeak(filePath) {
  const audio = new Audio(filePath);
  audio.volume = 0.9;
  audio.play().catch(e => console.warn("Audio playback failed:", e));
}

/* ====== Text effects ====== */
function typeWriter(text, target, speed=20) {
  let i=0; target.textContent='';
  const run=()=>{
    if(i<text.length){
      target.textContent += text[i++];
      setTimeout(run, speed + (Math.random()*30));
    }
  };
  run();
}

function showDialog(t, soundFile=null){
  typeWriter(t, el('dialog'), 18);
  if(soundFile) spamtonSpeak(soundFile);
}

/* ====== Product logic apenas API ====== */
async function loadProducts() {
  blink();

  let headers = {};
  const token = localStorage.getItem('jwt_token');
  if(token) headers['Authorization'] = 'Bearer ' + token;

  try {
    const res = await fetch(API + '/products', { headers });
    if(!res.ok) throw new Error('status '+res.status);
    const data = await res.json();
    if(!Array.isArray(data) || data.length === 0) throw new Error('API returned empty or invalid data');
    products = data;
  } catch(e) {
    console.warn('API fetch failed, não carregando produtos.', e);
    products = []; // nenhum produto se falhar
  }

  renderProducts();
}

function renderProducts(){
  const c = el('products');
  if(!c) return;
  c.innerHTML = '';
  el('productCount').textContent = products.length + ' produtos';

  products.forEach(p => {
    const d = document.createElement('div');
    d.className = 'product shimmer';
    d.innerHTML = `
      <h3>${escapeHtml(p.name)}</h3>
      <div class="desc">${escapeHtml(p.description||'')}</div>
      <div class="price">KROMER ${Number(p.price).toFixed(2)}</div>
      <div class="small-meta">estoque: ${p.stock}</div>
      <div class="buy"><button class="btn small" data-id="${p.id}">ver</button></div>
    `;
    c.appendChild(d);

    d.querySelector('button').addEventListener('click', () => {
      spamtonSpeak("/audio/spamton_click.mp3");
      openProduct(p);
    });
  });
}

function openProduct(p) {
  el('modalTitle').textContent = p.name.toUpperCase() + " — SPAMTON OFFER";
  el('modalBody').innerHTML = `
    <strong>Descrição:</strong> ${escapeHtml(p.description||'')}<br/>
    <strong>Preço:</strong> KROMER ${Number(p.price).toFixed(2)}<br/>
    <strong>Estoque:</strong> ${p.stock}`;
  
  el('modal').classList.add('open');
  el('modal').setAttribute('aria-hidden','false');

  el('modalBuy').onclick = () => {
    spamtonSpeak("/audio/spamton_buy.mp3");
    offerPopup(p);
  };
}

function closeModal(){
  el('modal').classList.remove('open');
  el('modal').setAttribute('aria-hidden','true');
}

function offerPopup(p){
  closeModal();
  const msg = [
    `WOW!! YOU GOT A DEAL ON "${p.name.toUpperCase()}"!!!`,
    `BUY NOW FOR ONLY ${Number(p.price).toFixed(2)} KROMER`,
    `ACT FAST, THIS DEAL IS GLITCHING OUT...`
  ];
  showDialog(msg.join('\n\n'), "/audio/spamton_offer.mp3");
}

/* ====== Helpers ====== */
function blink(){ 
  document.body.style.filter='brightness(1.08)'; 
  setTimeout(()=>document.body.style.filter='',180); 
}
function escapeHtml(s){ 
  return String(s||'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); 
}

/* ====== Buttons ====== */
el('btnToken').onclick = async ()=>{
  const v = prompt('Cole o JWT token (ou deixe vazio para remover):');
  if(v){
    localStorage.setItem('jwt_token', v.trim());
    el('statusText').textContent='authorized';
    showDialog('TOKEN SET: YOU ARE AUTHORIZED', "/audio/spamton_token.mp3");
  } else {
    localStorage.removeItem('jwt_token');
    el('statusText').textContent='guest';
    showDialog('TOKEN REMOVED: GUEST MODE', "/audio/spamton_guest.mp3");
  }
  await loadProducts();
};

el('btnGuest').onclick = ()=>{
  localStorage.removeItem('jwt_token');
  el('statusText').textContent='guest';
  showDialog('BROWSING AS GUEST — ENJOY THE DEALS', "/audio/spamton_guest.mp3");
  loadProducts();
};

el('btnRefresh').onclick = ()=>{ 
  spamtonSpeak("/audio/spamton_refresh.mp3");
  loadProducts(); 
};

el('modalClose').onclick = closeModal;
el('modal').addEventListener('click', e=>{
  if(e.target===el('modal')) closeModal();
});

/* ====== Init ====== */
(function init(){
  setTimeout(()=> showDialog("HEY EVERY       ! IT'S ME, SPAMTON G.   SPAMTON!", "/audio/spamton_intro.mp3"), 600);
  if(localStorage.getItem('jwt_token')) el('statusText').textContent='authorized';
  loadProducts();
})();

/* ====== SPAMTON SPEECH + SPRITE ====== */
const spamton = {
  img: document.getElementById('spamton-sprite'),
  lines: [
    { text: "HURRY UP AND BUY!", sound: "/audio/deal.mp3" },
    { text: "DEALS SO GOOD I'LL [$!$$] MYSELF!", sound: "/audio/deal.mp3" },
    { text: "DELICIOUS KROMER", sound: "/audio/deal.mp3" },
    { text: "I’M [[HALF OFF]] TODAY!", sound: "/audio/deal.mp3" },
    { text: "WHAT ARE YOU WAITING FOR?", sound: "/audio/deal.mp3" },
    { text: "WHAT!? YOU WERE SO CLOSE!!", sound: "/audio/deal.mp3" }
  ],
  talk() {
    const line = this.lines[Math.floor(Math.random() * this.lines.length)];
    showDialog(line.text, line.sound);
    this.animateTalk();
  },
  animateTalk() {
    this.img.classList.add("talk");
    this.img.src = "images/spamton_laugh.png";
    setTimeout(() => {
      this.img.classList.remove("talk");
      this.img.src = "images/spamton_idle.png";
    }, 1200);
  },
  react(type) {
    if (type === "buy") {
      this.img.src = "images/spamton_laugh.png";
      spamtonSpeak("/audio/spamton_deal.mp3");
    } else if (type === "error") {
      this.img.src = "images/spamton_angry.png";
      spamtonSpeak("/audio/spamton_angry.mp3");
    } else {
      this.img.src = "images/spamton_talk.png";
      spamtonSpeak("/audio/spamton_talk.mp3");
    }
    setTimeout(() => this.img.src = "images/spamton_idle.png", 1500);
  },
};

/* ====== Fala automática a cada 10 segundos ====== */
setInterval(() => {
  if (Math.random() > 0.5) spamton.talk();
}, 10000);
