const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

window.addEventListener("load",()=>{
  setTimeout(()=>$("#loader")?.classList.add("hidden"),850);
});

const nav=$("#navbar"), navLinks=$("#navLinks"), toggle=$("#navToggle");
window.addEventListener("scroll",()=>{
  nav?.classList.toggle("scrolled",scrollY>40);
  let current="hero";
  $$("section[id]").forEach(sec=>{if(scrollY>=sec.offsetTop-150) current=sec.id});
  $$(".nav-links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
},{passive:true});

toggle?.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in-view");reveal.unobserve(e.target)}}),{threshold:.12});
$$("[data-reveal]").forEach(x=>reveal.observe(x));

const glow=$("#cursorGlow");
window.addEventListener("pointermove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}},{passive:true});

const canvas=$("#bgCanvas"),ctx=canvas?.getContext("2d");
let dots=[];
function resize(){if(!canvas)return;canvas.width=innerWidth;canvas.height=innerHeight;dots=Array.from({length:Math.min(80,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.3}))}
function draw(){if(!ctx)return;ctx.clearRect(0,0,canvas.width,canvas.height);dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>innerWidth)d.vx*=-1;if(d.y<0||d.y>innerHeight)d.vy*=-1;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle="rgba(255,26,26,.45)";ctx.fill()});requestAnimationFrame(draw)}
resize();draw();addEventListener("resize",resize);

const projects={
pegasus:{title:"Pegasus-Pro",desc:"Android-focused offensive security tooling created as an educational/lab project. The project explores mobile security concepts, controlled testing workflows and security-oriented application architecture.",stack:["Python","Android","Offensive Security"],note:"Use only in authorized labs, test devices and environments where you have explicit permission."},
fake:{title:"Blockchain-Based Fake Profile Detection",desc:"A security and machine-learning project concept combining a React interface, Python backend, MongoDB, blockchain concepts and XGBoost/SHAP-oriented analysis for identifying suspicious profile behavior.",stack:["React","Python","MongoDB","Blockchain","XGBoost","SHAP"],note:"The project is positioned as a security/detection system rather than a claim of perfect classification."},
onion:{title:"Onion Web Development & Security",desc:"A Tor-based web application project using Nginx and PHP, exploring routing, authentication, sessions, server configuration, security controls, error handling and deployment considerations.",stack:["Tor","Nginx","PHP","Linux","Web Security"],note:"Security testing and deployment should be performed only on infrastructure you own or are authorized to assess."},
ddos:{title:"DDoS Attack & Stress Testing Tool",desc:"A controlled-load testing project for studying traffic behavior, server resilience, monitoring and defensive response under authorized test conditions.",stack:["Python","Networking","Linux","Testing"],note:"Designed for controlled environments. Do not use traffic-generation tooling against systems without explicit authorization."},
dft:{title:"DFT — Digital Forensics Toolkit",desc:"A PySide6-based digital forensics toolkit concept designed to bring forensic workflows into a practical desktop interface with a security-focused visual experience.",stack:["Python","PySide6","Digital Forensics"],note:"Forensic work should preserve evidence integrity and follow the rules of the environment or investigation."},
torsec:{title:"TORSEC — Identity Rotation Framework",desc:"A Python privacy-engineering framework concept using Tor, Stem and SOCKS5 to explore controlled identity rotation and privacy-aware network workflows.",stack:["Python","Tor","Stem","SOCKS5"],note:"Privacy tooling is intended for legitimate privacy, research and authorized testing use."}
};
const modal=$("#projectModal");
$$(".project-btn").forEach(btn=>btn.addEventListener("click",()=>{
  const p=projects[btn.dataset.project]; if(!p)return;
  $("#modalKicker").textContent="PROJECT DETAILS";
  $("#modalTitle").textContent=p.title;
  $("#modalDescription").textContent=p.desc;
  $("#modalStack").innerHTML=p.stack.map(x=>`<span>${x}</span>`).join("");
  $("#modalNote").textContent=p.note;
  modal.classList.add("open");
}));
$("#modalClose")?.addEventListener("click",()=>modal.classList.remove("open"));
modal?.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal?.classList.remove("open")});
