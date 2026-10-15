(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const scenes=$$('#carousel .scene'),tabs=$$('#facility-tabs button');
const labels=['Commercial buildings','Hospitals','Doctors’ offices','Schools','Workplaces & other facilities'];
const messages=['Convenient snacks and drinks for tenants and guests.','Thoughtful refreshment options for busy care environments.','A welcoming break for patients, visitors and staff.','Convenient choices designed around school needs.','Make the everyday pause a little more convenient.'];
let active=0, timer, startX=null;
function show(i){if(!scenes.length)return;active=(i+scenes.length)%scenes.length;const w=Math.min(innerWidth<700?105:185,innerWidth*.16);
scenes.forEach((el,n)=>{let d=n-active;if(d>2)d-=scenes.length;if(d< -2)d+=scenes.length;const depth=Math.abs(d);el.style.transform='translate3d('+(-d*w)+'px,'+(depth*13-8)+'px,'+(-depth*125)+'px) rotateY('+(d*17)+'deg)';el.style.opacity=depth===0?'1':depth===1?'.72':'.38';el.style.zIndex=String(10-depth);});
tabs.forEach((el,n)=>{el.classList.toggle('active',n===active);el.setAttribute('aria-pressed',String(n===active))});
const kicker=$('#facility-kicker'),copy=$('#facility-text'),cta=$('#facility-cta');if(kicker)kicker.textContent=labels[active].toUpperCase();if(copy)copy.textContent=messages[active];if(cta)cta.href='#location-'+active;
}
function pause(){clearInterval(timer)}function resume(){pause();if(!reduced)timer=setInterval(()=>show(active+1),4200)}
tabs.forEach((b,i)=>b.addEventListener('click',()=>{show(i);resume()}));
const viewport=$('#viewport');if(viewport){viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(active+(e.key==='ArrowRight'?1:-1));resume()}});viewport.addEventListener('pointerdown',e=>{startX=e.clientX;pause()});viewport.addEventListener('pointerup',e=>{if(startX!==null&&Math.abs(e.clientX-startX)>35)show(active+(e.clientX<startX?1:-1));startX=null;resume()});viewport.addEventListener('mouseenter',pause);viewport.addEventListener('mouseleave',resume)}
show(0);resume();
const menu=$('#menu'),nav=$('#nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});$$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}))}
const locationButtons=$$('#location-list article h3 button');
const details=[
'Convenient snack and beverage access for office lobbies, shared spaces and tenant breakrooms.',
'Refreshment options for hospital teams, patients and visitors, with placement suited to facility requirements.',
'Welcoming vending options for waiting rooms, staff areas and medical office buildings.',
'School-appropriate selections and placement plans guided by administrators and facility policies.',
'Flexible vending solutions for workplaces and other community facilities.'
];
locationButtons.forEach((btn,i)=>btn.addEventListener('click',()=>{const article=btn.closest('article');const existing=$('.location-body',article);const open=!existing;$$('#location-list .location-body').forEach(el=>el.remove());locationButtons.forEach((b,n)=>{b.setAttribute('aria-expanded',String(open&&n===i));const span=$('span',b);if(span)span.textContent=open&&n===i?'−':'+'});if(open){const d=document.createElement('div');d.className='location-body';d.id='location-body-'+i;const p=document.createElement('p');p.textContent=details[i];const a=document.createElement('a');a.href='#consultation';a.textContent='Plan for this location ↗';d.append(p,a);article.append(d);show(i)}}));
const dialog=$('#detail-dialog'),dialogContent=$('#dialog-content');function modal(html){if(!dialog||!dialogContent)return;dialogContent.innerHTML=html;if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','')}
$('.close-dialog')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const machines=[['Snack vending','Explore snack assortments that fit your location and audience.'],['Beverage vending','Explore refreshing beverage selections and machine formats.'],['Combination vending','Explore flexible snack-and-drink options for your facility.']];
$$('.machine-card button').forEach((b,i)=>b.addEventListener('click',()=>modal('<h2>'+machines[i][0]+'</h2><p>'+machines[i][1]+'</p><p><a class="button" href="#consultation">Discuss this machine ↗</a></p>')));
$$('[data-policy]').forEach(b=>b.addEventListener('click',()=>modal(b.dataset.policy==='privacy'?'<h2>Privacy</h2><p>This preview does not send your consultation information to a server. Contact us before submitting sensitive information.</p>':'<h2>Accessibility</h2><p>We aim to provide a usable, keyboard-accessible experience. Please contact us if you encounter an accessibility barrier.</p>')));
$$('[data-screen]').forEach(b=>b.addEventListener('click',()=>{$$('[data-screen]').forEach(x=>x.classList.toggle('active',x===b));const data={Products:['Have a favorite?','Suggest a snack or beverage for your location.'],Service:['Need assistance?','Explore how service and restocking requests could work.'],Location:['Your location','Find machine information and location-specific details.']};const v=data[b.dataset.screen];$('#phone-content').innerHTML='<h4>'+v[0]+'</h4><p>'+v[1]+'</p>'}));
const form=$('#consultation-form');form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const summary=Array.from(data.entries()).map(([k,v])=>k+': '+v).join('\n');modal('<h2>Review your request</h2><p>This form is a preview and does not send your information.</p><pre class="request-summary"></pre><button class="button" id="copy-request" type="button">Copy request</button>');$('.request-summary',dialog).textContent=summary;$('#copy-request')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);$('#copy-request').textContent='Copied'}catch{const blob=new Blob([summary],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='creative-cravings-request.txt';a.click();URL.revokeObjectURL(a.href)}})});
if($('#year'))$('#year').textContent=new Date().getFullYear();
if('IntersectionObserver'in window&&!reduced){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});$$('.machine-card,.choice-grid article,.section-heading').forEach(el=>{el.classList.add('reveal');io.observe(el)})}
})();