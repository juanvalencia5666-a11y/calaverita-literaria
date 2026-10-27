const P=[
["Llegó la Flaca en silencio,","con su rebozo de olvido,","y tocó, bien educada,","la puerta de tu postigo."],
["—No vengo por ti —te dijo—,","que aún te falta mucho andar;","vengo a ver cuántos abrazos","dejaste sin regalar."],
["Traigo anotado en mi libreta","tu “mañana la llamaré”,","tus cartas sin escribir","y el “luego te lo diré”."],
["Y no presumas, compadre,","de tu cartera o tu fama:","aquí todos vamos flacos","y nadie estrena su cama."],
["Pero escucha lo que importa,","que a todos nos va a llegar:","solo muere del todo aquel","a quien dejan de nombrar."],
["Por eso, cada noviembre,","cuando el cempasúchil prenda","su camino de oro y fuego,","tus muertos hallan la senda."],
["Se despidió con un guiño","y su sombra se fue lenta:","“Vive, compadre, hoy mismo,","que yo guardo bien la cuenta.”"]];
const $=s=>document.querySelector(s);
$('#poem').innerHTML=P.map((s,i)=>`<p class="st" id="s${i}">${s.map((l,j)=>`<span class="ln" data-i="${i*4+j}">${l}</span>`).join('<br>')}</p>`).join('');

/* Voz */
let ua=null,lastI=-1;
function mark(i){if(i<0)document.querySelectorAll('.ln.on').forEach(e=>e.classList.remove('on'));document.querySelectorAll('.st').forEach((e,k)=>e.classList.toggle('on',k===i));if(i>=0)$('#s'+i).scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
function toggle(){if(!ua)return;if(!ua.paused){ua.pause();$('#play').textContent='Continuar';return}ua.play()}
$('#play').onclick=toggle;
$('#stop').onclick=()=>{if(ua){ua.pause();ua.currentTime=0}mark(-1);lastI=-9;$('#play').textContent='Escuchar'};
const LT0=[1.44, 3.54, 5.98, 7.82, 9.7, 12.2, 14.28, 16.34, 18.46, 22.36, 24.32, 26.62, 28.32, 30.58, 32.38, 34.76, 37.04, 39.26, 40.96, 43.34, 45.04, 47.56, 49.14, 51.6, 54.58, 56.28, 58.48, 60.48, 62.12];
let LT=LT0.slice(),propo=false,tapping=false,taps=[],key='cal_lt_g6',lastS=-9;const SRC='audio/narracion.m4a';
const LW=P.flat().map(l=>l.length);
function loadLT(){propo=false;LT=LT0.slice();try{const sv=JSON.parse(localStorage.getItem(key));if(Array.isArray(sv)&&sv.length===29)LT=sv;else if(key!=='cal_lt_g6')propo=true}catch(e){if(key!=='cal_lt_g6')propo=true}}
function lineAt(t){if(!propo){for(let i=27;i>=0;i--)if(t>=LT[i]-.04)return i;return -1}const d=ua.duration||1,T=LW.reduce((a,b)=>a+b,0);let c=0;for(let i=0;i<28;i++){c+=LW[i];if(t<=d*c/T)return i}return 27}
function markLine(i){document.querySelectorAll('.ln').forEach(e=>e.classList.toggle('on',+e.dataset.i===i));const s=i<0?-1:i>>2;if(s<0)return;const el=$('#s'+s);if(!el.classList.contains('on'))mark(s)}
function upd(){if(!ua)return;const i=lineAt(ua.currentTime);if(i!==lastI){lastI=i;markLine(i)}}
function tick(){if(!ua||ua.paused)return;if(!tapping)upd();requestAnimationFrame(tick)}
const au=$('#au');
au.onplay=()=>{$('#play').textContent='Pausar';tick()};au.onpause=()=>{if(!au.ended&&!tapping)$('#play').textContent='Continuar'};
au.onseeked=()=>{lastI=-9;upd()};
au.onended=()=>{if(tapping)return;markLine(-1);mark(-1);lastI=-9;$('#play').textContent='Escuchar de nuevo'};
au.onerror=()=>{$('#vmsg').textContent='No pude reproducir la grabación en este navegador.';ua=null;au.hidden=true;$('#vsync').hidden=true};
function useAudio(src,name){au.src=src;au.hidden=false;ua=au;lastI=-9;$('#vsync').hidden=false;$('#vreset').hidden=false;loadLT();$('#vmsg').textContent=name+(propo?' (subrayado aproximado: usa Ajustar sincronía)':'')}
useAudio(SRC,'Tu voz: grabación original');
function tapUI(){$('#tapbtn').textContent='Toca cuando empiece el verso '+(taps.length+1)+' de 28: “'+P.flat()[taps.length]+'”'}
$('#vsync').onclick=()=>{if(!ua)return;$('#stop').click();tapping=true;taps=[];$('#tapbox').hidden=false;tapUI();ua.currentTime=0;ua.play();$('#tapbtn').focus()};
$('#tapbtn').onclick=()=>{taps.push(Math.max(0,+(ua.currentTime-.15).toFixed(2)));markLine(taps.length-1);if(taps.length<28){tapUI();return}taps.push(+((ua.duration||taps[27]+3)).toFixed(2));LT=taps.slice();propo=false;try{localStorage.setItem(key,JSON.stringify(LT))}catch(e){}tapping=false;$('#tapbox').hidden=true;ua.pause();ua.currentTime=0;$('#play').textContent='Escuchar';$('#vmsg').textContent='Sincronía guardada en este dispositivo. Tiempos: '+JSON.stringify(LT)};
$('#vreset').onclick=()=>{$('#stop').click();try{localStorage.removeItem(key)}catch(e){}tapping=false;$('#tapbox').hidden=true;loadLT();$('#vmsg').textContent='Sincronía restablecida'};
$('#go').onclick=()=>{$('#calaverita').scrollIntoView({behavior:'smooth'});if(ua&&ua.paused)setTimeout(toggle,700)};

/* Catrina */
const KB=[
[/^(hola|buenas|buen dia|que tal|saludos|hey)/,"Qué gusto verte con vida. Soy la Catrina, pregúntame lo que quieras."],
[/como estas|como te sientes|como andas/,"De huesos completos y con la sonrisa puesta. ¿Y tú?"],
[/quien te (creo|hizo|programo)|eres (una )?(ia|inteligencia|robot|real)|inteligencia artificial/,"Soy un personaje de esta página: tengo un catálogo amplio de respuestas preparadas sobre el Día de Muertos y las calaveritas. No improviso fuera de él, pero me esfuerzo."],
[/quien eres|que eres|como te llamas|tu nombre|^catrina/,"Me llamo Catrina, aunque de joven me decían la Calavera Garbancera. Me dibujó José Guadalupe Posada y Diego Rivera me puso el nombre que llevo."],
[/edad|cuantos anos|cuando naciste/,"Posada me grabó hacia 1910 y Rivera me bautizó en 1947. Ya cumplí más de un siglo y sigo de fiesta."],
[/donde vives|donde naciste/,"Nací en un grabado y hoy vivo en cada ofrenda, cada papel picado y cada verso."],
[/garbancera/,"Garbancera era una burla para quienes renegaban de su origen para aparentar riqueza europea. Posada dibujó una calavera con sombrero francés para recordarnos que la vanidad también se queda en huesos."],
[/catrin/,"“Catrín” es una palabra popular mexicana para quien viste elegante. Catrina es su forma femenina, y así se quedó mi nombre."],
[/posada/,"José Guadalupe Posada (1852-1913) fue un grabador que llenó las hojas populares de calaveras que bailaban, bebían y criticaban a su sociedad. Sin él yo no existiría."],
[/rivera|mural|alameda|frida/,"Diego Rivera me pintó en 1947 en su mural “Sueño de una tarde dominical en la Alameda Central”, de pie junto a Posada, a él de niño y a Frida Kahlo. Ahí recibí el nombre de Catrina."],
[/calaverit|que es una calavera literaria/,"Una calaverita literaria es un verso con rima que finge que la Muerte ya se llevó a alguien que sigue vivo. Se escribe con humor, cariño y a veces una pizca de verdad."],
[/ejemplo|dame una (calaverita|rima)|escribe.*calaverita|improvisa/,"Va una de bolsillo: “Doña Chela, la chismosa, / presumía sin parar; / la Flaca llegó y le dijo: / «Allá hay mucho que contar».”"],
[/como (se )?(escrib|hace|hago|escribo)|consejo.*(escrib|calaver)|rima/,"Elige a alguien querido, imagina que la Muerte llega por esa persona, escribe cuartetas con rima sencilla y cierra con un giro de humor o ternura. Burla con cariño, nunca para herir."],
[/origen|historia|empez|surg|cuando (inicio|comenz)/,"Hay antecedentes en los rituales mesoamericanos y las fiestas de Fieles Difuntos, pero las calaveras en verso se hicieron famosas en los periódicos mexicanos del siglo XIX, con tono satírico."],
[/sirv|para que|proposito|por que existen|importan/,"Sirven para reírnos del miedo, decir verdades con humor, recordar a quienes queremos y juntarnos a compartir versos."],
[/mictlan|inframundo|donde van los muertos|nueve/,"Para los mexicas, el Mictlán era el lugar de los muertos, con nueve niveles que el alma debía cruzar. Reinaban allí Mictlantecuhtli y Mictecacíhuatl."],
[/mictecacihuatl|mictlantecuhtli|dios|diosa|senora de la muerte/,"Mictecacíhuatl, la “Señora de la muerte”, presidía la fiesta de los muertos entre los mexicas. Mucha gente ve en mí un eco moderno suyo."],
[/xolo|perro/,"En la creencia mexica, un perro acompañaba al alma para cruzar el río del Mictlán. Por eso al xoloitzcuintle se le asocia con este viaje."],
[/cempasuchil|flor|petalo/,"El cempasúchil es la flor de veinte, como se suele traducir del náhuatl. Su color y su aroma guían a las almas de regreso a casa."],
[/papel picado/,"El papel picado adorna las ofrendas con colores y recortes. Se dice que el viento que lo mueve anuncia la visita de las almas."],
[/copal|incienso/,"El copal es una resina aromática que se quema desde tiempos prehispánicos para purificar y llamar a las almas."],
[/vela|veladora|luz|camino/,"Las veladoras iluminan el camino de las almas. Cada una puede representar a un difunto que se espera."],
[/\bsal\b|agua|sed/,"El agua calma la sed del alma tras su largo viaje, y la sal ayuda a conservar el cuerpo y la memoria."],
[/pan|huesito/,"El pan de muerto lleva tiras en forma de huesitos y un círculo al centro que recuerda el ciclo de la vida."],
[/comida|que comer|tamal|mole|platillo/,"En la ofrenda se pone lo que le gustaba al difunto: mole, tamales, fruta, pan, chocolate, y a veces su refresco o su tequila favorito."],
[/ofrenda|altar|como (poner|hacer) una/,"Una ofrenda lleva fotos, flores, velas, agua, sal, pan y lo que le gustaba al difunto. Es una forma de decirle: te seguimos esperando."],
[/azucar|dulce/,"Las calaveras de azúcar se regalan con un nombre en la frente. Quien recibe una se sabe recordado."],
[/1 de noviembre|2 de noviembre|cuando se celebra|fecha|angelito|nino/,"El 1 de noviembre se recuerda a los niños, los “angelitos”, y el 2 a los adultos. La noche del 31 muchas familias ya empiezan a velar."],
[/halloween|brujas|diferencia/,"Halloween ríe del miedo a lo desconocido. El Día de Muertos no asusta: es una visita esperada de familiares que regresan a convivir."],
[/coco|pelicula|peli/,"“Coco”, de Pixar (2017), acercó esta tradición al mundo. Habla de la memoria familiar y de que nadie muere del todo mientras se le recuerda."],
[/desfile|cdmx|ciudad de mexico/,"El desfile de Día de Muertos en la Ciudad de México se volvió popular desde 2016, tras la película “Spectre”, y hoy llena Reforma de alebrijes y catrinas."],
[/oaxaca|janitzio|patzcuaro|michoacan|mixquic|xantolo|region|donde se celebra/,"Pátzcuaro y la isla de Janitzio, en Michoacán, velan en los panteones a la luz de las velas. Oaxaca se llena de comparsas, y la Huasteca celebra el Xantolo."],
[/guatemala|otros paises|latinoamerica|mundo|extranjero/,"En Guatemala, el 1 de noviembre se vuelan barriletes gigantes en Sumpango para comunicarse con los difuntos. Cada región honra a sus muertos a su manera."],
[/unesco|patrimonio/,"En 2008 la UNESCO inscribió la festividad indígena dedicada a los muertos en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad."],
[/musica|cancion|mariachi|bailar/,"En las ofrendas suena la música que le gustaba al difunto. Puede ser un bolero, una ranchera o hasta una cumbia."],
[/maquillaje|disfraz|pintarme|tatuaje/,"Para el maquillaje de Catrina: base blanca, ojos negros bien marcados, nariz de corazón, dientes dibujados y flores en el cabello."],
[/que hacer|como celebr|tradicion|recomiend/,"Arma una ofrenda, cocina algo que el difunto amaba, cuenta sus anécdotas y escribe una calaverita para quienes todavía están contigo."],
[/duelo|perdi|extrano|falleci|luto|murio|triste/,"Lo siento mucho. Poner su foto en la ofrenda y decir su nombre en voz alta ayuda a mantenerlo cerca. Si el dolor pesa demasiado, hablar con alguien de confianza o con un profesional también es una forma de cuidarte."],
[/abuel|familia|recordar|memoria|nombrar/,"Recordar es la forma más humana de ofrenda. Contar su historia, cocinar su plato o decir su nombre mantiene viva a una persona."],
[/miedo|temor|morir|\bmuerte\b|vida|sentido/,"Reír con la Muerte no quita el dolor, pero lo vuelve habitable. Si todos vamos para allá, vale más aprovechar el viaje."],
[/chiste|broma|hazme reir|gracios/,"¿Por qué los esqueletos no pelean entre ellos? Porque no tienen agallas."],
[/poema|verso|lee|declama|recita/,"Sube a la sección “La calaverita” y presiona Escuchar. Hasta puedes poner tu propia voz."],
[/voz|audio|narr|hablar/,"En la sección de la calaverita puedes elegir otra voz del dispositivo o subir tu propia grabación."],
[/gracias|adios|bye|hasta luego|nos vemos/,"A ti, compadre. Vive hoy mismo, que yo guardo bien la cuenta."]];
const PR={sombrero:/sombrero|chistera|gorro/,plumas:/pluma/,flores:/adorno|flores del/,craneo:/\bcalavera\b|craneo|hueso/,ojos:/\bojos?\b|mirada/,nariz:/nariz/,dientes:/diente|sonrisa|boca/,encaje:/encaje|cuello|collar/,vestido:/vestido|ropa|traje/};
const ST={
sombrero:["El sombrero","Posada me dibujó con un enorme sombrero de moda europea, como los que usaba la élite de la época de Porfirio Díaz. Era una burla: quien presume elegancia también termina en calavera."],
plumas:["Las plumas","Las plumas de avestruz eran símbolo de lujo. En el mural de Rivera llevo un boa de plumas que suele interpretarse como guiño a Quetzalcóatl, la serpiente emplumada."],
flores:["Las flores del sombrero","En el grabado original no había flores. Hoy las llevo porque el cempasúchil se volvió inseparable del Día de Muertos: la flor que guía a las almas."],
craneo:["La calavera","La calavera nos iguala: ricos o pobres, todos llegamos a ser hueso. Para Posada y la tradición popular, la muerte es la gran niveladora, y por eso se le pueden decir verdades."],
ojos:["Los ojos","Mis cuencas vacías no juzgan, pero miran. Los aros de color son licencia artística, inspirada en el maquillaje de Catrina que hoy pintan miles de personas."],
nariz:["La nariz","Sin nariz no huelo, pero el aroma del cempasúchil y del copal sí llega a quienes ya no están. Por eso las ofrendas se llenan de olor."],
dientes:["La sonrisa","Mi sonrisa no se borra: es la risa frente a la muerte. De ahí vienen las calaveritas de azúcar y los versos que se cantan con picardía."],
encaje:["El encaje","El cuello de encaje habla del refinamiento del “catrín”. Es el adorno de quien quiere verse impecable, aunque debajo solo haya huesos."],
vestido:["El vestido","El vestido largo recuerda la moda de principios del siglo XX. En el mural de Rivera aparece de cuerpo entero, del brazo de Posada, como invitada de honor del paseo."]};
const FB="Eso no lo sé, y mira que llevo siglos en esto. Pregúntame por el origen de las calaveritas, la ofrenda, las flores, el pan, el Mictlán o cómo escribir una.";
const log=$('#log');
function add(t,c){const p=document.createElement('p');p.className=c;p.textContent=t;log.appendChild(p);log.scrollTop=log.scrollHeight}
function ask(q){if(!q.trim())return;add(q,'me');const n=q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const m=KB.find(k=>k[0].test(n));const pk=Object.keys(PR).find(k=>PR[k].test(n));if(!m&&pk){setTimeout(()=>showPart(pk),350);return}const a=m?m[1]:FB;
setTimeout(()=>{add(a,'bot');},350)}
const QS=['¿Cómo te llamas?','¿Qué es una calaverita?','¿Cómo empezaron?','¿Para qué sirven?','¿Qué es el cempasúchil?','¿Cómo escribo una?','Dame un ejemplo','¿Qué es el Mictlán?','¿Cómo hago una ofrenda?','¿Qué es el papel picado?','¿Qué pasó en la película Coco?','¿Dónde se celebra más?','¿Qué es un catrín?','Cuéntame un chiste','¿Cuándo se celebra?','Perdí a alguien'];let qi=0;
function chips(){const c=$('#chips');c.innerHTML='';for(let i=0;i<6;i++){const t=QS[(qi+i)%QS.length];const b=document.createElement('button');b.className='chip';b.type='button';b.textContent=t;b.onclick=()=>ask(t);c.appendChild(b)}const m=document.createElement('button');m.className='chip';m.type='button';m.textContent='Otras preguntas';m.onclick=()=>{qi=(qi+6)%QS.length;chips()};c.appendChild(m)}chips();
function showPart(k){const[t,x]=ST[k];$('#story').innerHTML='<h4>'+t+'</h4><p>'+x+'</p>';document.querySelectorAll('[data-k]').forEach(e=>e.classList.toggle('sel',e.dataset.k===k&&e.classList.contains('part')));}
Object.keys(ST).forEach(k=>{const b=document.createElement('button');b.className='chip';b.type='button';b.textContent=ST[k][0].replace(/^(El|La|Las|Los) /,'');b.onclick=()=>showPart(k);$('#parts').appendChild(b)});
document.querySelectorAll('.part').forEach(e=>{e.onclick=()=>showPart(e.dataset.k);e.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();showPart(e.dataset.k)}}});
$('#ask').onsubmit=e=>{e.preventDefault();ask($('#q').value);$('#q').value=''};
add("Soy la Catrina. Pregúntame lo que quieras o elige una pregunta.",'bot');

/* Cempasúchil: marco y lluvia */
(function(){const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const spr=document.createElement('canvas');spr.width=spr.height=96;const s=spr.getContext('2d');s.translate(48,48);
s.fillStyle='rgba(50,15,0,.55)';s.beginPath();s.arc(0,2,36,0,7);s.fill();
[[26,10,17,'#c94a08'],[18,8,13,'#ff8a1c'],[10,6,9,'#ffc23a']].forEach((q,k)=>{for(let i=0;i<16;i++){s.rotate(Math.PI/8);s.fillStyle=q[3];s.beginPath();s.ellipse(0,-q[0]*.9,q[1]*.62,q[2]*.62,0,0,7);s.fill()}s.rotate(.2*k)});
s.fillStyle='#7a2a04';s.beginPath();s.arc(0,0,4.5,0,7);s.fill();
const pt=document.createElement('canvas');pt.width=pt.height=24;const q=pt.getContext('2d');q.translate(12,12);const gr=q.createLinearGradient(0,-10,0,10);gr.addColorStop(0,'#ffc23a');gr.addColorStop(1,'#d9560a');q.fillStyle=gr;q.beginPath();q.ellipse(0,0,5,10,0,0,7);q.fill();
const cv=$('#petals'),x=cv.getContext('2d');let W,H,F=[];
function rnd(a){return()=>(a=a*16807%2147483647)/2147483647}
function mk(p,y){return{p:p,x:Math.random()*W,y:y,s:p?9+Math.random()*8:16+Math.random()*26,v:(p?.5:.3)+Math.random()*.6,d:Math.random()*6,r:Math.random()*6,w:.3+Math.random()*.7,a:.3+Math.random()*.35}}
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}size();addEventListener('resize',size);
if(rm)return;for(let i=0;i<28;i++)F.push(mk(false,Math.random()*H));
(function t(){x.clearRect(0,0,W,H);for(const f of F){f.y+=f.v;f.d+=.01;f.r+=.006*f.w;f.x+=Math.sin(f.d)*.5*f.w;if(f.y>H+40)Object.assign(f,mk(f.p,-40));x.save();x.globalAlpha=f.a;x.translate(f.x,f.y);x.rotate(f.r);x.drawImage(f.p?pt:spr,-f.s/2,-f.s/2,f.s,f.s);x.restore()}requestAnimationFrame(t)})()})();
