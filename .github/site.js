(function(){
var WA='254727413364',PH='+254 727 413 364',P=document.body.dataset.page;
var nav=[['home','Home','index.html'],['services','Services','services.html'],['portfolio','Portfolio','portfolio.html'],['about','About','about.html'],['contact','Contact','contact.html']];
function links(){return nav.map(function(n){return '<a href="'+n[2]+'"'+(n[0]===P?' aria-current="page"':'')+'>'+n[1]+'</a>'}).join('')}
var Q='estimate.html';
/* Paste Jamie Design's page links between the quotes. Empty ones stay hidden until filled. */
var SOC=[['Facebook','f',''],['Instagram','IG',''],['X','X',''],['LinkedIn','in',''],['WhatsApp','WA','https://wa.me/'+WA]];
function soc(c){return '<div class="social '+c+'">'+SOC.filter(function(s){return s[2]}).map(function(s){return '<a href="'+s[2]+'" target="_blank" rel="noopener" aria-label="'+s[0]+'">'+s[1]+'</a>'}).join('')+'</div>'}
document.body.insertAdjacentHTML('afterbegin',
'<header><div class="wrap bar"><a class="logo" href="index.html" aria-label="Jamie Design home"><b>Jamie</b><span>Design</span></a><nav class="dnav" aria-label="Main">'+links()+'<a class="btn" href="'+Q+'">Get a Quote</a></nav><button class="menu-btn" id="open" aria-label="Open menu" aria-controls="menu" aria-expanded="false"><i></i><i></i></button></div></header>'+
'<div id="menu" role="dialog" aria-modal="true" aria-label="Main menu"><div class="top"><a class="logo" href="index.html"><b style="color:#fff">Jamie</b><span>Design</span></a><button class="close" id="close" aria-label="Close menu">&times;</button></div><nav>'+links()+'<a href="'+Q+'">Get a Quote</a></nav><div class="m-foot">'+soc('')+'<small>'+PH+'</small><small>WhatsApp &middot; Free quotes</small></div></div>');
document.body.insertAdjacentHTML('beforeend',
'<footer><div class="wrap"><div><strong style="font-weight:400;letter-spacing:.2em;text-transform:uppercase">Jamie Design</strong><br>Ceilings, interiors and decor</div><div>'+PH+'<br><a href="https://wa.me/'+WA+'">Chat on WhatsApp</a>'+soc('dark')+'</div><div>&copy; '+new Date().getFullYear()+' Jamie Design</div></div></footer>'+
'<a class="wa" href="https://wa.me/'+WA+'" aria-label="Chat on WhatsApp">WA</a><div class="mbar"><a href="tel:+'+WA+'">Call</a><a href="https://wa.me/'+WA+'">WhatsApp</a><a href="'+Q+'">Get a quote</a></div>');
var menu=document.getElementById('menu'),ob=document.getElementById('open'),cb=document.getElementById('close');
function set(o){menu.classList.toggle('open',o);ob.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';(o?cb:ob).focus()}
ob.onclick=function(){set(true)};cb.onclick=function(){set(false)};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open'))set(false)});

var services=[['Gypsum ceilings','Smooth, modern ceilings with clean joints and perfect finishing.'],['False ceilings','Stepped, curved and recessed designs that add height and character.'],['Lighting design','Cove, spot and pendant layouts planned with the ceiling.'],['Interior finishing','Wall panels, cornices, skirting and trim done neatly.'],['Space planning','Layouts that use every metre well and feel open.'],['Design concepts','Mood boards and concepts you approve before work starts.'],['Painting and decoration','Careful preparation, paint, textures and feature walls.'],['Colour selection','Palettes matched to your light, furniture and mood.'],['Decor artwork','Curated art and accessories to finish the room.'],['Curtains and accessories','Made-to-fit curtains, cushions and finishing touches.']];
/* Replace the b and a values with photo paths such as images/living-before.jpg */
var projects=[
{t:'Living room ceiling',d:'Stepped gypsum ceiling with cove lighting',b:'linear-gradient(160deg,#8c8883,#5d5955)',a:'radial-gradient(circle at 50% 35%,#fff0cf 0,#e9b56b 28%,#7a3350 70%)'},
{t:'Master bedroom',d:'New paint, feature wall and lighting',b:'linear-gradient(160deg,#a9a29c,#6f6a65)',a:'linear-gradient(160deg,#A81F58,#4f0f2c)'},
{t:'Open-plan kitchen',d:'False ceiling, finishing and colour update',b:'linear-gradient(160deg,#9a9690,#625e59)',a:'linear-gradient(160deg,#d8b377,#7c5a2c)'},
{t:'Office reception',d:'Gypsum ceiling, lighting and decor artwork',b:'linear-gradient(160deg,#9d9a96,#5f5c58)',a:'linear-gradient(160deg,#6c7a96,#2f3a52)'}];
function bg(x){return /^images\//.test(x)?'url("'+x+'")':x}
function $(i){return document.getElementById(i)}
var sg=$('svcGrid');
if(sg){var n=+sg.dataset.limit||services.length;services.slice(0,n).forEach(function(s){sg.insertAdjacentHTML('beforeend','<div class="card"><h3>'+s[0]+'</h3><p>'+s[1]+'</p><a href="contact.html?service='+encodeURIComponent(s[0])+'#quote">Get a quote</a></div>')})}
var pg=$('projGrid');
if(pg){var m=+pg.dataset.limit||projects.length;projects.slice(0,m).forEach(function(p){
pg.insertAdjacentHTML('beforeend','<article class="proj"><div class="ba"><div class="layer b" style="background:'+bg(p.b)+';background-size:cover;background-position:center"></div><div class="layer a" style="background:'+bg(p.a)+';background-size:cover;background-position:center"></div><span class="tag l">Before</span><span class="tag r">After</span><div class="handle"></div><input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after: '+p.t+'"></div><h3>'+p.t+'</h3><p>'+p.d+'</p></article>')});
pg.addEventListener('input',function(e){if(e.target.type==='range')e.target.parentNode.style.setProperty('--p',e.target.value+'%')})}
var why=$('why');
if(why)why.innerHTML='<div class="grid"><div class="card"><div class="num">01</div><h3>Craftsmanship</h3><p>Clean lines, smooth finishes and ceilings built to last.</p></div><div class="card"><div class="num">02</div><h3>Quality materials</h3><p>Trusted gypsum boards, paints, fittings and fabrics.</p></div><div class="card"><div class="num">03</div><h3>Attention to detail</h3><p>From cornice joints to cable routing, we finish what others skip.</p></div><div class="card"><div class="num">04</div><h3>Reliable delivery</h3><p>Clear timelines, regular updates and no surprise costs.</p></div></div>';
var st=$('steps');
if(st)st.innerHTML='<div><b>1. Request a quote</b><p>Send your details on WhatsApp.</p></div><div><b>2. Site visit</b><p>We measure and discuss your ideas.</p></div><div><b>3. Design and price</b><p>You approve the concept and quote.</p></div><div><b>4. We build</b><p>Installation, finishing and handover.</p></div>';
var te=$('testi');
if(te){var c='<div class="card"><div class="stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>Add a real client review here.</blockquote><cite>Client name, location</cite></div>';te.innerHTML=c+c+c}
var bd=$('band');
if(bd)bd.outerHTML='<section class="band"><div class="wrap"><h2>Ready to transform your space?</h2><p>Get a free quote today.</p><a class="btn" href="'+Q+'">Get a quote</a></div></section>';
var sel=$('svcSel');
if(sel){services.forEach(function(s){sel.insertAdjacentHTML('beforeend','<option>'+s[0]+'</option>')});sel.insertAdjacentHTML('beforeend','<option>Budget-friendly decor ideas</option><option>Not sure yet</option>');
var q=new URLSearchParams(location.search).get('service');if(q)sel.value=q}
var sh=$('socialHere');if(sh)sh.innerHTML=soc('dark');
var f=$('qform');
if(f)f.addEventListener('submit',function(e){e.preventDefault();
var t='Hello Jamie Design, I would like a quote.\nName: '+f.name.value+'\nPhone: '+f.phone.value+'\nLocation: '+f.loc.value+'\nService: '+f.service.value+'\nProject details: '+f.msg.value;
$('sent').textContent='Opening WhatsApp. Press send there to complete your request.';
window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank','noopener')});

/* WhatsApp: prefilled chat links, floating pill and menu buttons */
var pg=(document.title.split('|')[0]||'your website').trim();
var W='https://wa.me/'+WA+'?text='+encodeURIComponent('Hello Jamie Design, I am on your '+pg+' page and would like to ask about your services.');
document.querySelectorAll('a[href^="https://wa.me/'+WA+'"]').forEach(function(a){if(a.href.indexOf('text=')<0)a.href=W});
var pill=document.querySelector('.wa');if(pill){pill.innerHTML='<span class="wa-i">WA</span><span class="wa-t">Chat on WhatsApp</span>'}
var mf=document.querySelector('.m-foot');if(mf)mf.insertAdjacentHTML('afterbegin','<div class="m-act"><a class="btn wbtn" href="'+W+'">Chat on WhatsApp</a><a class="btn wbtn" href="tel:+'+WA+'">Call now</a></div>');

})();
