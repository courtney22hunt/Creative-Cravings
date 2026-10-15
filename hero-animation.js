(()=>{'use strict';
const scenes=[...document.querySelectorAll('#carousel .scene')],tabs=[...document.querySelectorAll('#facility-tabs button')];if(!scenes.length)return;
const kicker=document.getElementById('facility-kicker'),copy=document.getElementById('facility-text'),cta=document.getElementById('facility-cta');
const names=['COMMERCIAL BUILDINGS','HOSPITALS','DOCTORS’ OFFICES','SCHOOLS','OTHER FACILITIES'],messages=['A convenient break for tenants and visitors.','Refreshments for patients, visitors and care teams.','A welcoming break for patients, visitors and staff.','Thoughtful choices for students and school staff.','Make the everyday pause a little more convenient.'];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let phase=0,previous=performance.now(),paused=false,frame=0,selected=-1;
const speed=.00015; // one full revolution approximately every 33 seconds
function paint(){const width=innerWidth;const radius=width<650?Math.min(120,width*.26):width<1050?185:285;const depthRadius=width<650?105:190;
scenes.forEach((el,i)=>{const theta=phase+i*2*Math.PI/scenes.length;const x=Math.sin(theta)*radius;const z=Math.cos(theta)*depthRadius;const front=(Math.cos(theta)+1)/2;const scale=.76+.24*front;el.style.transform='translate3d('+x.toFixed(2)+'px,'+(-12+22*(1-front)).toFixed(2)+'px,'+z.toFixed(2)+'px) rotateY('+(-Math.sin(theta)*20).toFixed(2)+'deg) scale('+scale.toFixed(3)+')';el.style.opacity=(.38+.62*front).toFixed(3);el.style.zIndex=String(Math.round(front*100))});
const frontIndex=((Math.round((-phase/(2*Math.PI))*scenes.length)%scenes.length)+scenes.length)%scenes.length;
if(frontIndex!==selected){selected=frontIndex;tabs.forEach((b,i)=>{b.classList.toggle('active',i===selected);b.setAttribute('aria-pressed',String(i===selected))});if(kicker)kicker.textContent=names[selected];if(copy)copy.textContent=messages[selected];if(cta)cta.href='#location-'+selected}
}
function tick(now){const dt=Math.min(now-previous,50);previous=now;if(!paused&&!reduced)phase+=dt*speed;paint();frame=requestAnimationFrame(tick)}
function select(i){phase=-i*2*Math.PI/scenes.length;paint()}
tabs.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
const viewport=document.getElementById('viewport');if(viewport){viewport.addEventListener('mouseenter',()=>{paused=true});viewport.addEventListener('mouseleave',()=>{paused=false});let down=null;viewport.addEventListener('pointerdown',e=>{down=e.clientX;paused=true});viewport.addEventListener('pointerup',e=>{if(down!==null&&Math.abs(e.clientX-down)>30)phase+=(e.clientX<down?1:-1)*2*Math.PI/scenes.length;down=null;paused=false});viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();phase+=(e.key==='ArrowRight'?1:-1)*2*Math.PI/scenes.length;paint()}})}
document.addEventListener('visibilitychange',()=>{previous=performance.now()});window.addEventListener('resize',paint);paint();frame=requestAnimationFrame(tick);
})();