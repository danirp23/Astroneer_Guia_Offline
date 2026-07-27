/* ============================================================
   ESTADO DE LA APLICACIÓN
   ============================================================ */
let currentSection = 'inicio';
let favorites = new Set(JSON.parse(localStorage.getItem('astropedia_favs') || '[]'));

function saveFavs(){
  localStorage.setItem('astropedia_favs', JSON.stringify([...favorites]));
}
function toggleFav(id, ev){
  if(ev) ev.stopPropagation();
  if(favorites.has(id)){ favorites.delete(id); showToast('Eliminado de favoritos'); }
  else { favorites.add(id); showToast('Añadido a favoritos ⭐'); }
  saveFavs();
  render();
}
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer=setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ============================================================
   MENÚ LATERAL
   ============================================================ */
// MENU se completa después de definir SECTIONS_CONFIG
let MENU = [];
function initMenu(){
  MENU = [
    {id:'inicio', label:'Inicio', icon:'https://danirp23.github.io/Astroneer_Guia_Offline/assets/objects/Icon_Shelter.webp'},
    {id:'avanzada', label:'Búsqueda avanzada', icon:'🔍'},
    {id:'naturales', label:SECTIONS_CONFIG.naturales.label, icon:SECTIONS_CONFIG.naturales.icon},
    {id:'refinados', label:SECTIONS_CONFIG.refinados.label, icon:SECTIONS_CONFIG.refinados.icon},
    //{id:'compuestos', label:'Recursos compuestos', icon:''},
    {id:'gases', label:SECTIONS_CONFIG.gases.label, icon:SECTIONS_CONFIG.gases.icon},
    {id:'quimica', label:SECTIONS_CONFIG.quimica.label, icon:SECTIONS_CONFIG.quimica.icon},
    {id:'objetos', label:SECTIONS_CONFIG.objetos.label, icon:SECTIONS_CONFIG.objetos.icon},
    {id:'vehiculos', label:SECTIONS_CONFIG.vehiculos.label, icon:SECTIONS_CONFIG.vehiculos.icon},
    {id:'Estación de tren', label:SECTIONS_CONFIG.estacion_tren.label, icon:SECTIONS_CONFIG.estacion_tren.icon},
    {id:'automatizacion', label:SECTIONS_CONFIG.automatizacion.label, icon:SECTIONS_CONFIG.automatizacion.icon},
    {id:'favoritos', label:'Favoritos', icon:'⭐'},
    {id:'planetas', label:SECTIONS_CONFIG.planetas.label, icon:SECTIONS_CONFIG.planetas.icon},
    {id:'tecnologia', label:SECTIONS_CONFIG.arbol_tecnologico.label, icon:SECTIONS_CONFIG.arbol_tecnologico.icon}
  ];
}

/* ============================================================
   CONFIGURACIÓN DE SECCIONES (Títulos e íconos centralizados)
   ============================================================ */
const SECTIONS_CONFIG = {
  naturales: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Terrain_Tool.webp',
    label: 'Recursos naturales',
    description: 'Materiales que se extraen directamente del terreno con la Herramienta de Terreno o la Centrifugadora de Tierra.'
  },
  refinados: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Smelting_Furnace.webp',
    label: 'Recursos refinados',
    description: 'Se obtienen fundiendo recursos naturales en la Fundidora (Smelting Furnace).'
  },
  compuestos: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Chemistry_Lab.webp',
    label: 'Recursos compuestos',
    description: 'Se sintetizan en el Laboratorio Químico combinando dos o más recursos, a veces con un gas.'
  },
  gases: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Atmospheric_Condenser.webp',
    label: 'Gases',
    description: 'Recursos atmosféricos recolectados con el Condensador Atmosférico; su disponibilidad varía por planeta.'
  },
  quimica: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Chemistry_Lab.webp',
    label: 'Laboratorio de química',
    description: 'El Chemistry Lab combina dos (o tres) recursos —a veces con un gas de por medio— para crear los materiales más avanzados del juego. Pulsa cualquier compuesto para ver su árbol de fabricación completo.'
  },
  objetos: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Tier_Large.webp',
    label: 'Objetos imprimibles',
    description: 'Estructuras y objetos que se fabrican en las impresoras, con sus materiales y utilidad.'
  },
  vehiculos: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Rover.webp',
    label: 'Vehículos',
    description: 'Rovers, remolques y vehículos aéreos para explorar y transportar recursos.'
  },
  estacion_tren: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Rail_Station.webp',
    label: 'Estación de tren',
    description: 'El sistema de trenes permite transporte masivo y automatizado sobre raíles.'
  },
  automatizacion: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Crane.webp',
    label: 'Automatización',
    description: 'Brazos, extractores y sensores para que tu base funcione sola.'
  },
  planetas: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/planets/Icon_Sylva.webp',
    label: 'Planetas',
    description: 'Cinco planetas y dos lunas conforman el sistema de Astroneer. Cada uno tiene recursos primarios, secundarios y una combinación única de gases.'
  },
  arbol_tecnologico: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/tree-fam.png',
    label: 'Árbol tecnológico',
    description: 'Progresión aproximada de investigación: cada nivel se apoya en los materiales desbloqueados en el anterior. Los Bytes se consiguen investigando recursos y objetos de exploración en la Cámara de Investigación.'
  }
};

function countFor(id){
  switch(id){
    case 'naturales': return RESOURCES.filter(r=>r.type==='natural').length;
    case 'refinados': return RESOURCES.filter(r=>r.type==='refined').length;
    case 'compuestos': return RESOURCES.filter(r=>r.type==='composite').length;
    case 'gases': return RESOURCES.filter(r=>r.type==='gas').length;
    case 'quimica': return RESOURCES.filter(r=>r.type==='composite').length;
    case 'objetos': return OBJECTS.length;
    case 'vehiculos': return VEHICLES.length;
    case 'Estación de tren': return TRAINS.length;
    case 'automatizacion': return AUTOMATION.length;
    case 'favoritos': return favorites.size;
    case 'planetas': return PLANETS.length;
    default: return null;
  }
}

function buildMenu(){
  const el = document.getElementById('menu');
  el.innerHTML = MENU.map(m=>{
    const c = countFor(m.id);
    const activeCls = currentSection===m.id ? 'active' : '';
    const iconHtml = m.icon.startsWith('http') ? `<img src="${m.icon}" alt="${m.label}" style="width:20px;height:20px;object-fit:contain;">` : m.icon;
    return `<div class="menu-item ${activeCls}" onclick="navigate('${m.id}')">
      <span class="ic">${iconHtml}</span><span>${m.label}</span>
      ${c!==null ? `<span class="count">${c}</span>` : ''}
    </div>`;
  }).join('');
}

function navigate(section){
  currentSection = section;
  window.scrollTo({top:0,behavior:'instant' in window ? 'instant':'auto'});
  closeSidebar();
  render();
}
function openSidebar(){document.getElementById('sidebar').classList.add('open');document.getElementById('sidebar-scrim').classList.add('show');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebar-scrim').classList.remove('show');}

/* ============================================================
   RENDER: helpers comunes
   ============================================================ */
function starRating(n){
  n = Math.max(1,Math.min(5, n||1));
  return '★'.repeat(n) + '☆'.repeat(5-n);
}
function iconCircle(color, icon, size){
  const sz = size||42;
  const iconContent = icon.startsWith('http') ? `<img src="${icon}" style="width:${sz*0.7}px;height:${sz*0.7}px;object-fit:contain;">` : icon;
  return `<div class="res-icon" style="width:${sz}px;height:${sz}px;background:linear-gradient(150deg, ${color}33, ${color}14); color:${color}; box-shadow:inset 0 0 0 1px ${color}44;">${iconContent}</div>`;
}
function typeLabel(t){
  return {natural:'Natural', refined:'Refinado', gas:'Gas', composite:'Compuesto'}[t] || t;
}
function planetName(id){ return PLANET_MAP[id] ? PLANET_MAP[id].name : id; }

function resourceCard(r){
  const fav = favorites.has(r.id);
  return `<div class="res-card" onclick="openResource('${r.id}')">
    <div class="top-row">
      ${iconCircle(r.color, r.icon)}
      <div style="min-width:0;">
        <div class="rc-name">${r.name}</div>
        <div class="rc-en">${r.en}</div>
      </div>
      <button class="fav-btn ${fav?'active':''}" onclick="toggleFav('${r.id}', event)">${fav?'★':'☆'}</button>
    </div>
    <div class="rc-tags">
      <span class="tag">${typeLabel(r.type)}</span>
      <span class="tag">${r.rarity}</span>
    </div>
    <div class="stars">${starRating(r.importance)}</div>
    <div class="rc-desc">${truncate(r.obtain, 100)}</div>
  </div>`;
}

function itemCard(it){
  const fav = favorites.has(it.id);
  const itemIcon = it.icon || '📦';
  return `<div class="res-card" onclick="openItem('${it.id}')">
    <div class="top-row">
      ${iconCircle('#ffb066',itemIcon)}
      <div style="min-width:0;">
        <div class="rc-name">${it.name}</div>
        <div class="rc-en">${it.en}</div>
      </div>
      <button class="fav-btn ${fav?'active':''}" onclick="toggleFav('${it.id}', event)">${fav?'★':'☆'}</button>
    </div>
    <div class="rc-tags"><span class="tag">${it.printer}</span></div>
    <div class="rc-desc">${truncate(it.desc,100)}</div>
  </div>`;
}

function truncate(s,n){ if(!s) return ''; return s.length>n ? s.slice(0,n-1)+'…' : s; }

function makeIconHtml(icon, label){
  if(icon.startsWith('http')) return `<img src="${icon}"> ${label}`;
  return icon + ' ' + label;
}

/* ============================================================
   RENDER: secciones principales
   ============================================================ */
function render(){
  buildMenu();
  const c = document.getElementById('content');
  switch(currentSection){
    case 'inicio': c.innerHTML = renderHome(); break;
    case 'avanzada': c.innerHTML = renderAdvancedSearch(); break;
    case 'naturales': {
      const cfg = SECTIONS_CONFIG.naturales;
      c.innerHTML = renderResourceList('natural', makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'refinados': {
      const cfg = SECTIONS_CONFIG.refinados;
      c.innerHTML = renderResourceList('refined', makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'compuestos': {
      const cfg = SECTIONS_CONFIG.compuestos;
      c.innerHTML = renderResourceList('composite', makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'gases': {
      const cfg = SECTIONS_CONFIG.gases;
      c.innerHTML = renderResourceList('gas', makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'quimica': {
      const cfg = SECTIONS_CONFIG.quimica;
      c.innerHTML = renderChemistry(makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'objetos': {
      const cfg = SECTIONS_CONFIG.objetos;
      c.innerHTML = renderItemList(OBJECTS, makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'vehiculos': {
      const cfg = SECTIONS_CONFIG.vehiculos;
      c.innerHTML = renderItemList(VEHICLES, makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'Estación de tren': {
      const cfg = SECTIONS_CONFIG.estacion_tren;
      c.innerHTML = renderItemList(TRAINS, makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'automatizacion': {
      const cfg = SECTIONS_CONFIG.automatizacion;
      c.innerHTML = renderItemList(AUTOMATION, makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    case 'favoritos': c.innerHTML = renderFavorites(); break;
    case 'planetas': {
      const cfg = SECTIONS_CONFIG.planetas;
      c.innerHTML =renderPlanets(makeIconHtml(cfg.icon, cfg.label), cfg.description)
      break;
    }
    case 'tecnologia':{
      const cfg = SECTIONS_CONFIG.arbol_tecnologico;
      c.innerHTML = renderTechTree(makeIconHtml(cfg.icon, cfg.label), cfg.description);
      break;
    }
    default: c.innerHTML = renderHome();
  }
}

function renderHome(){
  const stats = [
    {n: RESOURCES.filter(r=>r.type==='natural').length, l:'Recursos naturales'},
    {n: RESOURCES.filter(r=>r.type==='refined').length, l:'Recursos refinados'},
    {n: RESOURCES.filter(r=>r.type==='composite').length, l:'Compuestos'},
    {n: RESOURCES.filter(r=>r.type==='gas').length, l:'Gases'},
    {n: OBJECTS.length, l:'Objetos / plataformas'},
    {n: VEHICLES.length + TRAINS.length, l:'Vehículos y trenes'},
    {n: AUTOMATION.length, l:'Piezas de automatización'},
    {n: RESOURCES.filter(r=>r.recipe && r.recipe.length).length, l:'Recetas registradas'},
  ];
  return `
    <div class="section-head">
      <div class="section-eyebrow">Astropedia · v1.0</div>
      <div class="section-title">Enciclopedia offline de Astroneer</div>
      <div class="section-desc">Toda la información sobre recursos, química, objetos, vehículos y planetas del juego, contrastada con la wiki oficial. Usa el buscador de arriba o el menú lateral para navegar. Todo funciona sin conexión a internet.</div>
    </div>
    <div class="stat-grid">
      ${stats.map(s=>`<div class="stat-card"><div class="glow"></div><div class="num">${s.n}</div><div class="lbl">${s.l}</div></div>`).join('')}
    </div>
    <div class="home-grid">
      <div class="panel">
        <h3>⭐ Recursos más importantes</h3>
        <div class="mini-list">
          ${RESOURCES.filter(r=>r.importance>=5).slice(0,8).map(r=>`
            <div class="mini-row" onclick="openResource('${r.id}')">
              ${iconCircle(r.color,r.icon,30)}
              <span class="mi-name">${r.name}</span>
              <span class="mi-sub">${typeLabel(r.type)}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="panel">
        <h3>🌍 Planetas</h3>
        <div class="planet-strip">
          ${PLANETS.map(p=>`<div class="planet-chip" onclick="openPlanet('${p.id}')">${p.icon ? `<img src="${p.icon}" alt="${p.name}" style="width:24px;height:24px;object-fit:contain;">` : ''}<span>${p.name}</span></div>`).join('')}
        </div>
        <h3 style="margin-top:20px;">🧪 Empezar por la química</h3>
        <div class="mini-list">
          ${RESOURCES.filter(r=>r.type==='composite').slice(0,5).map(r=>`
            <div class="mini-row" onclick="openResource('${r.id}')">
              ${iconCircle(r.color,r.icon,30)}
              <span class="mi-name">${r.name}</span>
              <span class="mi-sub">Ver receta →</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAdvancedSearch(){
  return `
    <div class="section-head">
      <div class="section-title">🔎 Búsqueda avanzada</div>
      <div class="section-desc">Filtra los objetos imprimibles por el tipo de impresora que necesitas.</div>
    </div>
    <div class="pill-row" style="margin-bottom:16px;">
      ${['Todas','Mochila','Impresora Pequeña','Impresora Mediana','Impresora Grande']
        .map(p=>`<span class="tag" style="cursor:pointer;" onclick="filterByPrinter('${p}')">${p}</span>`).join('')}
    </div>
    <div class="card-grid" id="advanced-results">${ALL_ITEMS.map(itemCard).join('')}</div>
  `;
}

function filterByPrinter(printer){
  const el = document.getElementById('advanced-results');
  const list = printer==='Todas' ? ALL_ITEMS : ALL_ITEMS.filter(it=>it.printer===printer);
  el.innerHTML = list.map(itemCard).join('');
}

function renderResourceList(type, title, desc){
  const list = RESOURCES.filter(r=>r.type===type);
  return `
    <div class="section-head">
      <div class="section-title">${title}</div>
      <div class="section-desc">${desc}</div>
    </div>
    <div class="card-grid">${list.map(resourceCard).join('')}</div>
  `;
}

function renderChemistry(titleHtml, description){
  const list = RESOURCES.filter(r=>r.type==='composite');
  return `
    <div class="section-head">
      <div class="section-title">${titleHtml}</div>
      <div class="section-desc">${description}</div>
    </div>
    <div class="card-grid">
      ${list.map(r=>`
        <div class="res-card" onclick="openResource('${r.id}')">
          <div class="top-row">
            ${iconCircle(r.color,r.icon)}
            <div><div class="rc-name">${r.name}</div><div class="rc-en">${r.en}</div></div>
          </div>
          <div class="rc-desc">${r.process}</div>
          <div class="pill-row">
            ${r.recipe.map(ing=>`<span class="pill">${iconInline(ing.id)} <span class="qty">${ing.qty}×</span> ${RESOURCE_MAP[ing.id].name}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
function iconInline(id){ 
  const r=RESOURCE_MAP[id]; 
  if(!r) return '❔'; 
  return r.icon.startsWith('http') ? `<img src="${r.icon}" style="width:16px;height:16px;object-fit:contain;">` : r.icon;
}

function renderItemList(list, title, desc){
  return `
    <div class="section-head">
      <div class="section-title">${title}</div>
      <div class="section-desc">${desc}</div>
    </div>
    <div class="card-grid">${list.map(itemCard).join('')}</div>
  `;
}

function renderFavorites(){
  const ids=[...favorites];
  if(ids.length===0){
    return `
      <div class="section-head">
        <div class="section-title">⭐ Favoritos</div>
        <div class="section-desc">Aún no has marcado ningún recurso u objeto como favorito.</div>
      </div>
      <div class="empty-state"><div class="em-ic">⭐</div>Pulsa la estrella en cualquier ficha para guardarla aquí.</div>
    `;
  }
  const resFavs = ids.filter(id=>RESOURCE_MAP[id]);
  const itemFavs = ids.filter(id=>OBJECT_MAP[id]||VEHICLE_MAP[id]||TRAIN_MAP[id]||AUTOMATION_MAP[id]);
  return `
    <div class="section-head">
      <div class="section-title">⭐ Favoritos</div>
      <div class="section-desc">Guardados localmente en tu navegador (localStorage): siguen aquí aunque cierres la app.</div>
    </div>
    <div class="card-grid">
      ${resFavs.map(id=>resourceCard(RESOURCE_MAP[id])).join('')}
      ${itemFavs.map(id=>itemCard(OBJECT_MAP[id]||VEHICLE_MAP[id]||TRAIN_MAP[id]||AUTOMATION_MAP[id])).join('')}
    </div>
  `;
}

function renderPlanets(titleHtml, description){
  return `
    <div class="section-head">
      <div class="section-title">${titleHtml}</div>
      <div class="section-desc">${description}</div>
    </div>
    <div class="planet-grid">
      ${PLANETS.slice().sort((a,b)=>a.order-b.order).map(p=>`
        <div class="planet-card" style="background:linear-gradient(160deg, ${p.color}22, var(--panel));" onclick="openPlanet('${p.id}')">
          <div class="pc-orb" style="background:${p.color};"></div>
          <h3>${p.icon ? `<img src="${p.icon}" alt="${p.name}" style="width:32px;height:32px;object-fit:contain;vertical-align:middle;margin-right:8px;">` : ''}<span>${p.name}</span></h3>
          <div class="sub">${p.level}</div>
          <div class="diff-row">${Array.from({length:5}).map((_,i)=>`<span class="diff-dot ${i<p.difficulty?'on':''}"></span>`).join('')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTechTree(titleHtml, description){
  const tiers = [
    {name:'Nivel 1 · Supervivencia básica', items:['Herramienta de Terreno','Cable de Oxígeno','Tanque de Oxígeno','Generador Pequeño','Impresora Pequeña'], cost:'Gratis / inicial'},
    {name:'Nivel 2 · Primeras estructuras', items:['Horno de Fundición','Impresora Mediana','Almacenamiento Mediano','Plataforma de Intercambio','Cámara de Investigación'], cost:'Bytes bajos'},
    {name:'Nivel 3 · Química y automatización', items:['Laboratorio de Química','Condensador Atmosférico','Brazo Automático','Silo de Almacenamiento Mediano'], cost:'~1600 Bytes (Laboratorio de Química)'},
    {name:'Nivel 4 · Vehículos y expansión', items:['Rover','Tractor','Rover Grande','Impresora Grande','Trituradora Grande'], cost:'Bytes medios'},
    {name:'Nivel 5 · Endgame', items:['Aleación de Nanocarbón','VTOL','Locomotora','Extractor Automático'], cost:'Bytes altos + recursos avanzados'}
  ];
  return `
    <div class="section-head">
      <div class="section-title">${titleHtml}</div>
      <div class="section-desc">${description}</div>
    </div>
    <div class="card-grid" style="grid-template-columns:1fr;">
      ${tiers.map((t,i)=>`
        <div class="panel">
          <h3>${i+1}. ${t.name} <span class="tag" style="margin-left:auto;">${t.cost}</span></h3>
          <div class="pill-row">${t.items.map(x=>`<span class="pill">${x}</span>`).join('')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ============================================================
   DETALLE: recurso individual + árbol de fabricación
   ============================================================ */
function reverseRecipeUses(id){
  // ¿En qué recetas de otros RECURSOS participa este id?
  return RESOURCES.filter(r=> r.recipe && r.recipe.some(ing=>ing.id===id));
}
function itemsUsing(id){
  // ¿En qué OBJETOS/VEHÍCULOS/TRENES/AUTOMATIZACIÓN participa este recurso?
  return ALL_ITEMS.filter(it => it.materials && it.materials.some(m=>m.id===id));
}

function buildTree(id, qty, depth, visited){
  const r = RESOURCE_MAP[id];
  if(!r) return '';
  const label = `<div class="tree-row" onclick="event.stopPropagation();openResource('${id}')">
      ${iconInline(id)} <span class="qty">${qty}×</span> ${r.name} <span style="color:var(--text-faint);font-size:11px;">(${r.en})</span>
    </div>`;
  if(!r.recipe || r.recipe.length===0 || depth>5 || (visited && visited.has(id))){
    return `<div class="tree-node">${label}</div>`;
  }
  const nv = new Set(visited); nv.add(id);
  const children = r.recipe.map(ing=>buildTree(ing.id, ing.qty, depth+1, nv)).join('');
  return `<div class="tree-node">${label}<div class="tree-children">${children}</div></div>`;
}

function openResource(id){
  const r = RESOURCE_MAP[id];
  if(!r) return;
  const fav = favorites.has(id);
  const usedInRecipes = reverseRecipeUses(id);
  const usedInItems = itemsUsing(id);
  const foundHtml = (r.found && r.found.length)
    ? r.found.map(pid=>`<span class="pill" onclick="event.stopPropagation();openPlanet('${pid}')">${PLANET_MAP[pid].icon ? `<img src="${PLANET_MAP[pid].icon}" alt="${PLANET_MAP[pid].name}" style="width:20px;height:20px;object-fit:contain;vertical-align:middle;margin-right:6px;">` : ''}<span>${PLANET_MAP[pid].name}</span></span>`).join('')
    : `<span class="tag">No se extrae de planetas — solo se fabrica</span>`;

  const iconDisplay = r.icon.startsWith('http') ? `<img src="${r.icon}" alt="${r.name}" style="width:50px;height:50px;object-fit:contain;">` : r.icon;
  const html = `
    <div class="detail-head">
      <div class="detail-icon" style="background:linear-gradient(150deg, ${r.color}33, ${r.color}14); color:${r.color}; box-shadow:inset 0 0 0 1px ${r.color}55;">${iconDisplay}</div>
      <div class="detail-title">
        <h2>${r.name} <button class="fav-btn ${fav?'active':''}" style="font-size:20px;" onclick="toggleFav('${r.id}', event); refreshDetail('${r.id}')">${fav?'★':'☆'}</button></h2>
        <div class="en">${r.en}</div>
        <div class="rc-tags">
          <span class="tag">${typeLabel(r.type)}</span>
          <span class="tag">${r.rarity}</span>
          <span class="stars" style="align-self:center;">${starRating(r.importance)}</span>
        </div>
      </div>
      <button class="close-x" onclick="closeDetail()">✕</button>
    </div>
    <div class="detail-body">
      <div class="dsec">
        <h4>Descripción y obtención</h4>
        <p>${r.obtain}</p>
      </div>
      <div class="dsec">
        <h4>Procesamiento</h4>
        <div class="method-flags">
          <span class="mflag ${r.centrifuge?'yes':''}">${r.centrifuge?'✓':'✕'} Centrifugadora de Tierra</span>
          <span class="mflag ${r.furnace?'yes':''}">${r.furnace?'✓':'✕'} Requiere Fundidora</span>
          <span class="mflag ${r.lab?'yes':''}">${r.lab?'✓':'✕'} Requiere Laboratorio Químico</span>
        </div>
        <p style="margin-top:10px;">${r.process || 'No requiere procesamiento adicional.'}</p>
      </div>
      <div class="dsec">
        <h4>Dónde encontrarlo</h4>
        <div class="pill-row">${foundHtml}</div>
      </div>
      ${r.recipe && r.recipe.length ? `
      <div class="dsec">
        <h4>Árbol de fabricación (¿de qué está hecho?)</h4>
        <div class="tree">${buildTree(r.id, 1, 0, new Set())}</div>
      </div>` : ''}
      <div class="dsec">
        <h4>¿Qué se puede fabricar con esto? (árbol inverso)</h4>
        ${ (usedInRecipes.length===0 && usedInItems.length===0) ? '<p>No participa como ingrediente directo de otra receta registrada.</p>' : `
        <div class="pill-row">
          ${usedInRecipes.map(u=>{
            const iconHtml = u.icon.startsWith('http') ? `<img src="${u.icon}" style="width:16px;height:16px;object-fit:contain;vertical-align:middle;margin-right:4px;">` : u.icon;
            return `<span class="pill" onclick="openResource('${u.id}')">${iconHtml} ${u.name}</span>`;
          }).join('')}
          ${usedInItems.map(u=>{
            const itemIconHtml = u.icon && u.icon.startsWith('http') ? `<img src="${u.icon}" style="width:16px;height:16px;object-fit:contain;vertical-align:middle;margin-right:4px;">` : (u.icon || '📦');
            return `<span class="pill" onclick="openItem('${u.id}')">${itemIconHtml} ${u.name}</span>`;
          }).join('')}
        </div>`}
      </div>
      <div class="dsec">
        <h4>Consejos útiles</h4>
        <p>${r.tips}</p>
      </div>
      <div class="dsec">
        <h4>Curiosidad</h4>
        <div class="trivia-box">💡 ${r.trivia}</div>
      </div>
    </div>
  `;
  document.getElementById('detail-modal').innerHTML = html;
  document.getElementById('overlay').classList.add('show');
}
function refreshDetail(id){ openResource(id); }

function openItem(id){
  const it = OBJECT_MAP[id] || VEHICLE_MAP[id] || TRAIN_MAP[id] || AUTOMATION_MAP[id];
  if(!it) return;
  const fav = favorites.has(id);
  const itemIconDisplay = it.icon ? `<img src="${it.icon}" alt="${it.name}" style="width:50px;height:50px;object-fit:contain;">` : '📦';
  const html = `
    <div class="detail-head">
      <div class="detail-icon" style="background:linear-gradient(150deg, #ffb06633, #ffb06614); color:#ffb066;">${itemIconDisplay}</div>
      <div class="detail-title">
        <h2>${it.name} <button class="fav-btn ${fav?'active':''}" style="font-size:20px;" onclick="toggleFav('${it.id}', event); openItem('${it.id}')">${fav?'★':'☆'}</button></h2>
        <div class="en">${it.en}</div>
        <div class="rc-tags"><span class="tag">${it.printer}</span>${it.cat?`<span class="tag">${it.cat}</span>`:''}</div>
      </div>
      <button class="close-x" onclick="closeDetail()">✕</button>
    </div>
    <div class="detail-body">
      <div class="dsec"><h4>Descripción</h4><p>${it.desc}</p></div>
      <div class="dsec">
        <h4>Materiales de fabricación</h4>
        ${it.materials.length ? `<div class="pill-row">${it.materials.map(m=>`<span class="pill" onclick="openResource('${m.id}')">${iconInline(m.id)} <span class="qty">${m.qty}×</span> ${RESOURCE_MAP[m.id] ? RESOURCE_MAP[m.id].name : m.id}</span>`).join('')}</div>`
          : '<p>No requiere materiales (disponible desde el inicio de la partida).</p>'}
        <p style="margin-top:8px;font-size:11.5px;color:var(--text-faint);">* Impresora y materiales confirmados contra la wiki oficial; las cantidades exactas pueden variar 1 unidad según el parche — verifícalas en la impresora in-game si algo no cuadra.</p>
      </div>
      <div class="dsec"><h4>Uso</h4><p>${it.uses}</p></div>
      <div class="dsec"><h4>Consejos</h4><p>${it.tips}</p></div>
    </div>
  `;
  document.getElementById('detail-modal').innerHTML = html;
  document.getElementById('overlay').classList.add('show');
}

function openPlanet(id){
  const p = PLANET_MAP[id];
  if(!p) return;
  const exclusiveResources = RESOURCES.filter(r=>r.found && r.found.length && r.found.every(f=>f===id) && r.found.length===1);
  const html = `
    <div class="detail-head" style="background:linear-gradient(160deg, ${p.color}22, transparent);">
      <div class="detail-icon" style="background:${p.color}22; color:${p.color};">${p.icon ? `<img src="${p.icon}" alt="${p.name}" style="width:60px;height:60px;object-fit:contain;">` : ''}</div>
      <div class="detail-title">
        <h2>${p.name}</h2>
        <div class="en">${p.level}</div>
      </div>
      <button class="close-x" onclick="closeDetail()">✕</button>
    </div>
    <div class="detail-body">
      <div class="dsec"><h4>Descripción</h4><p>${p.desc}</p></div>
      <div class="dsec">
        <h4>Datos clave</h4>
        <div class="kv-grid">
          <div class="kv"><div class="k">Dificultad</div><div class="v">${'●'.repeat(p.difficulty)}${'○'.repeat(5-p.difficulty)}</div></div>
          <div class="kv"><div class="k">Nivel recomendado</div><div class="v">${p.level}</div></div>
          <div class="kv"><div class="k">Recurso primario</div><div class="v">${p.primary}</div></div>
          <div class="kv"><div class="k">Recurso secundario</div><div class="v">${p.secondary}</div></div>
        </div>
      </div>
      <div class="dsec">
        <h4>Recursos destacados</h4>
        <p>${p.exclusive}</p>
      </div>
      <div class="dsec">
        <h4>Gases atmosféricos</h4>
        <div class="pill-row">${p.gases.length ? p.gases.map(g=>{
          const gid=g.toLowerCase();
          return `<span class="pill" onclick="openResource('${gid}')">${iconInline(gid)} ${RESOURCE_MAP[gid]?RESOURCE_MAP[gid].name:g}</span>`;
        }).join('') : '<span class="tag">Sin atmósfera — no se puede usar el Condensador Atmosférico</span>'}</div>
      </div>
      <div class="dsec"><h4>Riesgos</h4><p>${p.risks}</p></div>
      <div class="dsec"><h4>Consejos</h4><div class="trivia-box">💡 ${p.tips}</div></div>
    </div>
  `;
  document.getElementById('detail-modal').innerHTML = html;
  document.getElementById('overlay').classList.add('show');
}

function closeDetail(){
  document.getElementById('overlay').classList.remove('show');
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDetail(); });

/* ============================================================
   BUSCADOR
   ============================================================ */
function searchAll(query){
  const q = query.trim().toLowerCase();
  if(!q) return [];
  const results = [];
  RESOURCES.forEach(r=>{
    if(r.name.toLowerCase().includes(q) || r.en.toLowerCase().includes(q)){
      results.push({id:r.id, name:r.name, cat:typeLabel(r.type), icon:r.icon, color:r.color, kind:'resource'});
    }
  });
  ALL_ITEMS.forEach(it=>{
    if(it.name.toLowerCase().includes(q) || it.en.toLowerCase().includes(q)){
      results.push({id:it.id, name:it.name, cat:it.printer||'Objeto', icon:it.icon||'📦', color:'#ffb066', kind:'item'});
    }
  });
  PLANETS.forEach(p=>{
    if(p.name.toLowerCase().includes(q)){
      results.push({id:p.id, name:p.name, cat:'Planeta', icon:p.icon, color:p.color, kind:'planet'});
    }
  });
  return results.slice(0,30);
}

const searchInput = document.getElementById('search-input');
const searchResultsEl = document.getElementById('search-results');
searchInput.addEventListener('input', ()=>{
  const q = searchInput.value;
  if(!q.trim()){ searchResultsEl.classList.remove('show'); return; }
  const results = searchAll(q);
  if(results.length===0){
    searchResultsEl.innerHTML = `<div class="sr-empty">Sin resultados para "${escapeHtml(q)}"</div>`;
  } else {
    searchResultsEl.innerHTML = results.map(r=>{
      const iconContent = r.icon.startsWith('http') ? `<img src="${r.icon}" style="width:20px;height:20px;object-fit:contain;">` : r.icon;
      return `
      <div class="sr-item" onclick="selectSearchResult('${r.kind}','${r.id}')">
        <div class="sr-ic" style="background:${r.color}22;color:${r.color};">${iconContent}</div>
        <div class="sr-txt"><div class="name">${r.name}</div><div class="cat">${r.cat}</div></div>
      </div>`;
    }).join('');
  }
  searchResultsEl.classList.add('show');
});
document.addEventListener('click', e=>{
  if(!e.target.closest('.search-wrap')) searchResultsEl.classList.remove('show');
});
function selectSearchResult(kind, id){
  searchResultsEl.classList.remove('show');
  searchInput.value='';
  if(kind==='resource') openResource(id);
  else if(kind==='item') openItem(id);
  else if(kind==='planet') openPlanet(id);
}
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ============================================================
   BOTÓN VOLVER ARRIBA
   ============================================================ */
window.addEventListener('scroll', ()=>{
  const btn = document.getElementById('backtop');
  if(window.scrollY > 400) btn.classList.add('show'); else btn.classList.remove('show');
});

/* ============================================================
   INICIO
   ============================================================ */
initMenu();
render();
