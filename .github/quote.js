(function(){
var WA='254727413364',PH='+254 727 413 364';
/* ===== PRICING: edit these rates (KES). Jamie should confirm them. ===== */
var RATE={ceiling:{flat:1800,stepped:2600,curved:3400},light:2500,paint:350,trim:900,colour:5000,decor:15000,curtain:12000,plan:8000,concept:15000};
var FIN={standard:['Standard',1],premium:['Premium',1.3],luxury:['Luxury',1.7]};
var LOW=0.9,HIGH=1.15; /* estimate range around the calculated total */
/* ===== EMAIL (EmailJS): fill after creating a free account at emailjs.com ===== */
var EM={key:'',service:'',client:'',owner:''};
var $=function(i){return document.getElementById(i)};
var kes=function(n){return 'KES '+Math.round(n).toLocaleString('en-KE')};
var rnd=function(n,s){return Math.round(n/s)*s};
function ke(p){p=(p||'').replace(/[^\d+]/g,'');if(p[0]==='+')p=p.slice(1);
 if(/^0[17]\d{8}$/.test(p))return '254'+p.slice(1);if(/^254[17]\d{8}$/.test(p))return p;if(/^[17]\d{8}$/.test(p))return '254'+p;return null}
function calc(v){
 var area=v.L*v.W*v.rooms,perim=2*(v.L+v.W)*v.rooms,wall=perim*v.H*0.9,m=FIN[v.fin][1],lines=[];
 function add(l,d,a){lines.push({l:l,d:d,a:rnd(a,100)})}
 if(v.s.ceiling){var rt=RATE.ceiling[v.style];add('Gypsum ceiling ('+v.style+')',area.toFixed(1)+' m2 x '+kes(rt*m),area*rt*m)}
 if(v.s.light)add('Lighting design and installation',v.pts*v.rooms+' points x '+kes(RATE.light*m),v.pts*v.rooms*RATE.light*m);
 if(v.s.paint)add('Painting (walls and ceiling)',(wall+area).toFixed(1)+' m2 x '+kes(RATE.paint*m),(wall+area)*RATE.paint*m);
 if(v.s.trim)add('Cornice and skirting finishing',perim.toFixed(1)+' m x '+kes(RATE.trim*m),perim*RATE.trim*m);
 if(v.s.decor)add('Decor artwork and accessories',v.rooms+' room(s) x '+kes(RATE.decor*m),v.rooms*RATE.decor*m);
 if(v.s.curtain)add('Curtains',v.win+' window(s) x '+kes(RATE.curtain*m),v.win*RATE.curtain*m);
 if(v.s.colour)add('Colour selection consultation','Fixed fee',RATE.colour);
 if(v.s.plan)add('Space planning','Fixed fee',RATE.plan);
 if(v.s.concept)add('Design concept (mood board and 3D)','Fixed fee',RATE.concept);
 var sub=lines.reduce(function(t,x){return t+x.a},0);
 return {lines:lines,sub:sub,low:rnd(sub*LOW,500),high:rnd(sub*HIGH,500)}}
function tbl(lines){return '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">'+lines.map(function(x){return '<tr><td style="padding:8px;border-bottom:1px solid #ddd"><b>'+x.l+'</b><br><span style="color:#777;font-size:12px">'+x.d+'</span></td><td style="padding:8px;border-bottom:1px solid #ddd;text-align:right;white-space:nowrap">'+kes(x.a)+'</td></tr>'}).join('')+'</table>'}
function summary(d){return 'Room: '+d.v.L+' m x '+d.v.W+' m x '+d.v.H+' m, '+d.v.rooms+' room(s). Finish: '+FIN[d.v.fin][0]+'. Scope: '+d.r.lines.map(function(x){return x.l}).join(', ')}
function waLink(d){return 'https://wa.me/'+WA+'?text='+encodeURIComponent('Hello Jamie Design, I used your estimate calculator (Ref '+d.ref+').\nName: '+d.name+'\nPhone: '+d.phone+'\nLocation: '+d.loc+'\n'+summary(d)+'\nEstimate: '+kes(d.r.low)+' to '+kes(d.r.high)+'\nPlease contact me to confirm.')}
function pdf(d){
 var J=window.jspdf&&window.jspdf.jsPDF;if(!J){alert('PDF tool did not load. Check your internet connection and try again.');return}
 var D=new J({unit:'mm',format:'a4'}),y=42;
 D.setFillColor(168,31,88);D.rect(0,0,210,30,'F');D.setTextColor(255,255,255);D.setFont('helvetica','bold');D.setFontSize(20);D.text('JAMIE DESIGN',15,15);
 D.setFont('helvetica','normal');D.setFontSize(9);D.text('Gypsum ceilings, interiors and decor',15,22);D.text('ESTIMATE '+d.ref,195,15,{align:'right'});D.text(d.date,195,22,{align:'right'});
 D.setTextColor(36,28,32);D.setFontSize(10);D.setFont('helvetica','bold');D.text('Prepared for',15,y);D.setFont('helvetica','normal');
 D.text([d.name,d.phone,d.email,d.loc],15,y+6);
 D.setFont('helvetica','bold');D.text('Project',110,y);D.setFont('helvetica','normal');
 D.text(D.splitTextToSize(d.v.L+' m x '+d.v.W+' m x '+d.v.H+' m high, '+d.v.rooms+' room(s)\nFinish level: '+FIN[d.v.fin][0],85),110,y+6);
 y=76;D.setFillColor(234,226,220);D.rect(15,y-5,180,8,'F');D.setFont('helvetica','bold');D.text('Item',17,y);D.text('Amount',193,y,{align:'right'});y+=9;
 d.r.lines.forEach(function(x){D.setFont('helvetica','bold');D.setFontSize(10);D.text(x.l,17,y);D.text(kes(x.a),193,y,{align:'right'});
  D.setFont('helvetica','normal');D.setFontSize(8);D.setTextColor(110,100,105);D.text(x.d,17,y+4.5);D.setTextColor(36,28,32);D.setDrawColor(213,201,194);D.line(15,y+7,195,y+7);y+=12});
 y+=4;D.setFontSize(10);D.setFont('helvetica','normal');D.text('Calculated total',17,y);D.text(kes(d.r.sub),193,y,{align:'right'});y+=10;
 D.setFillColor(168,31,88);D.rect(15,y-6,180,12,'F');D.setTextColor(255,255,255);D.setFont('helvetica','bold');D.setFontSize(12);
 D.text('Estimated range: '+kes(d.r.low)+' to '+kes(d.r.high),105,y+2,{align:'center'});y+=18;
 D.setTextColor(36,28,32);D.setFont('helvetica','normal');D.setFontSize(9);
 D.text(D.splitTextToSize('This is an approximate estimate based on the details you entered. The final quotation is confirmed after a site visit and may change with materials, site conditions and design choices. VAT, if applicable, is not included. This estimate is valid for 14 days.',180),15,y);
 D.setFont('helvetica','bold');D.text('Jamie Design  |  Call or WhatsApp '+PH,15,282);
 D.save('Jamie-Design-Estimate-'+d.ref+'.pdf')}
function send(d){
 if(!(window.emailjs&&EM.key&&EM.service&&EM.client))return Promise.resolve(null);
 try{emailjs.init({publicKey:EM.key});
 var p={to_name:d.name,to_email:d.email,to_phone:d.phone,location:d.loc,ref:d.ref,date:d.date,range:kes(d.r.low)+' to '+kes(d.r.high),project:summary(d),breakdown_html:tbl(d.r.lines),wa_link:waLink(d),business_phone:PH};
 return Promise.all([emailjs.send(EM.service,EM.client,p),EM.owner?emailjs.send(EM.service,EM.owner,p):1]).then(function(){return true}).catch(function(){return false})}catch(e){return Promise.resolve(false)}}
var f=$('est');if(!f)return;
f.addEventListener('submit',function(e){
 e.preventDefault();var el=f.elements,msg=$('err');msg.textContent='';
 if(el.company.value)return; /* spam trap */
 var ph=ke(el.phone.value);if(!ph){msg.textContent='Enter a valid Kenyan mobile number, for example 0712 345 678.';el.phone.focus();return}
 var v={L:+el.len.value,W:+el.wid.value,H:+el.hei.value,rooms:Math.max(1,Math.floor(+el.rooms.value||1)),fin:el.fin.value,style:el.style.value,pts:Math.max(0,+el.pts.value||0),win:Math.max(0,+el.win.value||0),s:{}};
 ['ceiling','light','paint','trim','decor','curtain','colour','plan','concept'].forEach(function(k){v.s[k]=el['s_'+k].checked});
 if(!(v.L>=1&&v.L<=50&&v.W>=1&&v.W<=50&&v.H>=2&&v.H<=8)){msg.textContent='Check the room size: length and width 1 to 50 m, height 2 to 8 m.';return}
 if(!Object.keys(v.s).some(function(k){return v.s[k]})){msg.textContent='Select at least one service.';return}
 var r=calc(v),d={v:v,r:r,name:el.name.value.trim(),phone:'+'+ph,email:el.email.value.trim(),loc:el.loc.value.trim(),ref:'JD-'+Date.now().toString(36).toUpperCase().slice(-6),date:new Date().toLocaleDateString('en-GB')};
 var res=$('res');
 res.innerHTML='<h2>Your estimate</h2><p class="lead">Ref '+d.ref+' &middot; '+d.date+'</p>'+tbl(r.lines)+'<p class="range">'+kes(r.low)+' to '+kes(r.high)+'</p><p class="note">Approximate. The final quotation is confirmed after a free site visit. VAT not included.</p><div class="alt"><a class="btn" id="wab" href="'+waLink(d)+'" target="_blank" rel="noopener">Send to Jamie on WhatsApp</a><button class="btn ghost" type="button" id="pdfb">Download PDF</button><a class="btn ghost" href="tel:+'+WA+'">Call us</a></div><p id="mst" class="note" role="status"></p>';
 $('pdfb').onclick=function(){pdf(d)};res.hidden=false;res.scrollIntoView({behavior:'smooth',block:'start'});
 var b=f.querySelector('button[type=submit]');b.disabled=true;
 send(d).then(function(ok){b.disabled=false;var s=$('mst');
  if(ok===true)s.textContent='A copy of this estimate has been emailed to '+d.email+'. Check your spam folder if you do not see it.';
  else if(ok===false)s.textContent='We could not send the email just now. You can still download the PDF or send the estimate to us on WhatsApp.'})});
})();
