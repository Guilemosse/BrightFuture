
/* BrightFuture V1.1 – aprimoramentos visuais não invasivos ao protótipo */
(()=>{'use strict';
const find=(s)=>document.querySelector(s);
const pref='bf_visual_v11_dark';
const toggle=find('#bfDarkMode');
try{const dark=localStorage.getItem(pref)==='1';document.body.classList.toggle('bf-dark',dark);if(toggle)toggle.checked=dark}catch{}
toggle?.addEventListener('change',e=>{document.body.classList.toggle('bf-dark',e.target.checked);try{localStorage.setItem(pref,e.target.checked?'1':'0')}catch{}});
const searches=[['#subjectSearch','#subjectList','.col-lg-6'],['#taskSearch','#taskList','.col-md-6'],['#noticeSearch','#noticeList','.app-card']];
const apply=([input,list,selector])=>{const q=find(input)?.value.trim().toLocaleLowerCase('pt-BR')||'';const root=find(list);if(!root)return;root.querySelectorAll(selector).forEach(el=>{el.style.display=!q||el.textContent.toLocaleLowerCase('pt-BR').includes(q)?'':'none'})};
searches.forEach(spec=>{find(spec[0])?.addEventListener('input',()=>apply(spec));const root=find(spec[1]);if(root&&window.MutationObserver){new MutationObserver(()=>apply(spec)).observe(root,{childList:true})}});
const alert=find('#homeDeadlineAlert');if(alert){const now=new Date();const due=new Date('2026-10-30T23:59:00');const days=Math.ceil((due-now)/86400000);const msg=alert.querySelector('.small');if(msg)msg.textContent=days>=0&&days<=7?`Projeto Front-End: entrega em ${days} dia(s).`:'Consulte atividades e avaliações no calendário.';}
})();
