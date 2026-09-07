const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>18),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.body.classList.add('cursor-on');const d=document.querySelector('.cursorDot'),r=document.querySelector('.cursorRing');addEventListener('mousemove',e=>{d.style.left=r.style.left=e.clientX+'px';d.style.top=r.style.top=e.clientY+'px'});document.querySelectorAll('a,button,.node,.plan').forEach(el=>{el.addEventListener('mouseenter',()=>r.classList.add('hover'));el.addEventListener('mouseleave',()=>r.classList.remove('hover'))});document.querySelectorAll('.command').forEach(el=>el.addEventListener('mousemove',e=>{const b=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-b.left)/b.width*100)+'%');el.style.setProperty('--my',((e.clientY-b.top)/b.height*100)+'%')}))}
const demoData={Overview:[['Aarav Mehta','Instagram','HOT','Today'],['Neha Kapoor','Housing.com','WARM','Today'],['Rohan Shah','Website','HOT','Yesterday']],Leads:[['Ishaan Rao','99acres','NEW','2m ago'],['Mira Joshi','MagicBricks','WARM','14m ago'],['Kabir S.','Website','QUALIFIED','1h ago']],Conversations:[['Mira Joshi','WhatsApp','Open','8m ago'],['Aarav Mehta','Website','Qualified','21m ago'],['Neha Kapoor','WhatsApp','Follow-up','44m ago']],Growth:[['Organic Search','SEO','↑','30d'],['Instagram','Campaign','↑','30d'],['Property portals','Referral','→','30d']],['My Plan']:[['Lead management','Included','✓','Starter+'],['Lead scoring','Included','✓','Growth+'],['Automation','Locked','Premium','Upgrade']]};
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const rows=demoData[btn.dataset.tab]||demoData.Overview;document.querySelector('#demoRows').innerHTML=rows.map(r=>`<tr>${r.map((v,i)=>`<td>${i===2?`<span class="pill">${v}</span>`:v}</td>`).join('')}</tr>`).join('')}));
document.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.recommend').textContent='Recommended: '+btn.dataset.plan+' — '+btn.dataset.reason;}));
async function loadPlans(){try{const res=await fetch('https://app.assistq.in/api/public/plans',{headers:{Accept:'application/json'}});if(!res.ok)return;const data=await res.json();const plans=Array.isArray(data)?data:(data.plans||[]);plans.forEach(p=>{const key=String(p.key||p.id||p.name||'').toLowerCase();const card=document.querySelector(`[data-live-plan="${key}"]`);if(!card)return;const monthly=p.monthly??p.price;const setup=p.setup??p.setupFee;const offer=p.foundationOffer||p.offer;if(monthly!=null)card.querySelector('[data-monthly]').textContent='₹'+Number(monthly).toLocaleString('en-IN');if(setup!=null)card.querySelector('[data-setup]').textContent='₹'+Number(setup).toLocaleString('en-IN');if(offer?.active){const f=card.querySelector('[data-found]');const ds=offer.discountedSetup??offer.discounted_setup;const rem=offer.remainingSlots??offer.remaining;if(ds!=null)f.textContent=`Foundation setup ₹${Number(ds).toLocaleString('en-IN')} · ${rem!=null?rem+' of 5 spots currently available':'first 5 clients'}`}})}catch(e){}}
loadPlans();

// AssistQ contact/demo forms
(function(){
  const modal=document.getElementById('demo');
  const openers=document.querySelectorAll('[data-open-form="demo"]');
  const close=()=>{if(modal){modal.hidden=true;document.body.classList.remove('modal-open')}};
  openers.forEach(x=>x.addEventListener('click',e=>{e.preventDefault();if(modal){modal.hidden=false;document.body.classList.add('modal-open');const first=modal.querySelector('input');setTimeout(()=>first?.focus(),50)}}));
  modal?.querySelectorAll('[data-close-modal]').forEach(x=>x.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal&&!modal.hidden)close()});
  document.querySelectorAll('.contactForm').forEach(form=>form.addEventListener('submit',async e=>{
    e.preventDefault(); const status=form.querySelector('.formStatus');
    if(!form.checkValidity()){form.reportValidity();return;}
    const data=Object.fromEntries(new FormData(form).entries()); data.type=form.dataset.formType||'contact'; data.page=location.href; data.utm_source=new URLSearchParams(location.search).get('utm_source')||'';
    status.textContent='Sending…'; form.querySelector('button[type=submit]').disabled=true;
    try{const r=await fetch('https://app.assistq.in/api/public/contact',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});const out=await r.json();if(!r.ok||!out.ok)throw new Error(out.error||'Unable to send request.');status.textContent='Thanks — your request has been sent. We’ll contact you shortly.';form.reset();setTimeout(()=>{if(form.dataset.formType==='demo')close()},900)}catch(err){status.textContent='We could not send this right now. Please email assistq1@gmail.com instead.'}finally{form.querySelector('button[type=submit]').disabled=false}
  }));
})();

// Categorized service explorer
(function(){
  const root=document.querySelector('[data-service-explorer]');
  if(!root)return;
  const tabs=[...root.querySelectorAll('.serviceTab')], panels=[...root.querySelectorAll('.servicePanel')];
  function activate(key){
    tabs.forEach(t=>{const on=t.dataset.service===key;t.classList.toggle('active',on);t.setAttribute('aria-selected',on?'true':'false')});
    panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===key));
  }
  tabs.forEach(t=>t.addEventListener('click',()=>activate(t.dataset.service)));
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    root.querySelector('.serviceStage')?.addEventListener('mousemove',e=>{
      const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      e.currentTarget.style.setProperty('--sx',(x*10).toFixed(2)+'px');
      e.currentTarget.style.setProperty('--sy',(y*8).toFixed(2)+'px');
    });
  }
})();
