/* ============================================================
   ESTADO DE LA APLICACIÓN
   ============================================================ */
let currentSection = 'inicio';
let favorites = new Set(JSON.parse(localStorage.getItem('astropedia_favs') || '[]'));
const THEME_STORAGE_KEY = 'astropedia_theme';
const THEMES = ['default','sylva','desolo','calidor','vesania','novus','glacio','atrox'];

function applyTheme(theme){
  const selected = THEMES.includes(theme) ? theme : 'default';
  if(selected==='default') delete document.body.dataset.theme;
  else document.body.dataset.theme = selected;
  document.querySelectorAll('.theme-option').forEach(button=>{
    const active = button.dataset.theme===selected;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  const current = document.getElementById('theme-picker-current');
  if(current) current.textContent = document.querySelector(`.theme-option[data-theme="${selected}"]`).dataset.themeLabel;
}
function setTheme(theme){
  const selected = THEMES.includes(theme) ? theme : 'default';
  localStorage.setItem(THEME_STORAGE_KEY,selected);
  applyTheme(selected);
}
function initTheme(){
  applyTheme(localStorage.getItem(THEME_STORAGE_KEY) || 'default');
}

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
    {id:'especiales', label:SECTIONS_CONFIG.especiales.label, icon:SECTIONS_CONFIG.especiales.icon},
    {id:'quimica', label:SECTIONS_CONFIG.quimica.label, icon:SECTIONS_CONFIG.quimica.icon},
    {id:'objetos', label:SECTIONS_CONFIG.objetos.label, icon:SECTIONS_CONFIG.objetos.icon},
    {id:'vehiculos', label:SECTIONS_CONFIG.vehiculos.label, icon:SECTIONS_CONFIG.vehiculos.icon},
    {id:'Estación de tren', label:SECTIONS_CONFIG.estacion_tren.label, icon:SECTIONS_CONFIG.estacion_tren.icon},
    {id:'automatizacion', label:SECTIONS_CONFIG.automatizacion.label, icon:SECTIONS_CONFIG.automatizacion.icon},
    {id:'favoritos', label:'Favoritos', icon:'⭐'},
    {id:'planetas', label:SECTIONS_CONFIG.planetas.label, icon:SECTIONS_CONFIG.planetas.icon},
    {id:'arbol_recursos', label:SECTIONS_CONFIG.arbol_recursos.label, icon:SECTIONS_CONFIG.arbol_recursos.icon}
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
  especiales: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/resources/Icon_EXO_Chip.webp',
    label: 'Recursos especiales',
    description: 'Recursos que no pertenecen a las categorías naturales, refinadas, atmosféricas o compuestas.'
  },
  quimica: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/Icon_Chemistry_Lab.webp',
    label: 'Laboratorio de química',
    description: 'El Laboratorio Químico combina dos o tres recursos —a veces con un gas— para crear recursos compuestos. Pulsa cualquier compuesto para ver su árbol de fabricación completo.'
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
    description: 'Cinco planetas y dos lunas conforman el sistema de Astroneer. Cada uno destaca por recursos representativos y una combinación única de gases.'
  },
  arbol_recursos: {
    icon: 'https://danirp23.github.io/Astroneer_Guia_Offline/assets/menu/tree-fam.png',
    label: 'Árbol de recursos',
    description: 'Explora cómo se obtienen, refinan y combinan los recursos de Astroneer.'
  }
};

function countFor(id){
  switch(id){
    case 'naturales': return RESOURCES.filter(r=>r.type==='natural').length;
    case 'refinados': return RESOURCES.filter(r=>r.type==='refined').length;
    case 'compuestos': return RESOURCES.filter(r=>r.type==='composite').length;
    case 'gases': return RESOURCES.filter(r=>r.type==='gas').length;
    case 'especiales': return RESOURCES.filter(r=>r.type==='special').length;
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
  return {natural:'Natural', refined:'Refinado', gas:'Gas', composite:'Compuesto', special:'Especial'}[t] || t;
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
  if(window.resourceTreeCy){ window.resourceTreeCy.destroy(); window.resourceTreeCy = null; }
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
    case 'especiales': {
      const cfg = SECTIONS_CONFIG.especiales;
      c.innerHTML = renderResourceList('special', makeIconHtml(cfg.icon, cfg.label), cfg.description);
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
    case 'arbol_recursos': {
      const cfg = SECTIONS_CONFIG.arbol_recursos;
      c.innerHTML = renderResourceTree(makeIconHtml(cfg.icon, cfg.label), cfg.description);
      initResourceTree();
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
    {n: RESOURCES.filter(r=>r.type==='special').length, l:'Recursos especiales'},
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
  const printers = ['Todas','Mochila','Impresora Pequeña','Impresora Mediana','Impresora Grande'];
  return `
    <div class="section-head">
      <div class="section-title">🔎 Búsqueda avanzada</div>
      <div class="section-desc">Filtra los objetos imprimibles por el tipo de impresora que necesitas.</div>
    </div>
    <div class="pill-row" id="printer-pills" style="margin-bottom:16px;">
      ${printers.map(p=>`<span class="tag${p==='Todas'?' tag-active':''}" data-printer="${p}" style="cursor:pointer;" onclick="filterByPrinter('${p}')">${p}</span>`).join('')}
    </div>
    <div class="card-grid" id="advanced-results">${ALL_ITEMS.map(itemCard).join('')}</div>
  `;
}

function filterByPrinter(printer){
  const results = document.getElementById('advanced-results');
  const list = printer==='Todas' ? ALL_ITEMS : ALL_ITEMS.filter(it=>it.printer===printer);
  results.innerHTML = list.map(itemCard).join('');

  document.querySelectorAll('#printer-pills .tag').forEach(pill=>{
    pill.classList.toggle('tag-active', pill.dataset.printer === printer);
  });
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

/* ============================================================
   ÁRBOL DE RECURSOS: prueba visual basada en recetas reales
   ============================================================ */
const RESOURCE_TREE_OUTPUTS = [
  'carbon','glass','tungsten','ceramic','iron','copper','aluminum','titanium','zinc',
  'silicone','rubber','plastic','explosive_powder','steel','tungsten_carbide','aluminum_alloy',
  'hydrazine','graphene','diamond','titanium_alloy','nanocarbon_alloy'
];

function resourceTreeIds(){
  const ids = new Set();
  const addWithIngredients = id=>{
    if(ids.has(id) || !RESOURCE_MAP[id]) return;
    ids.add(id);
    (RESOURCE_MAP[id].recipe || []).forEach(ingredient=>addWithIngredients(ingredient.id));
  };
  RESOURCE_TREE_OUTPUTS.forEach(addWithIngredients);
  return [...ids];
}

function resourceTreeMethod(resource){
  return {natural:'Minería', refined:'Fundición', gas:'Condensador atmosférico', composite:'Laboratorio de química'}[resource.type] || 'Recurso especial';
}

function resourceTreePositions(resources){
  const positions = {};
  const sourceY = {};
  const naturals = resources.filter(resource=>resource.type==='natural').sort((a,b)=>a.name.localeCompare(b.name,'es'));
  const gases = resources.filter(resource=>resource.type==='gas').sort((a,b)=>a.name.localeCompare(b.name,'es'));
  naturals.forEach((resource,index)=>{
    const column = index<7 ? 110 : 315;
    const y = 92 + (index%7)*82;
    positions[resource.id] = {x:column,y}; sourceY[resource.id] = y;
  });
  gases.forEach((resource,index)=>{
    const y = 680 + index*82;
    positions[resource.id] = {x:315,y}; sourceY[resource.id] = y;
  });
  resources.filter(resource=>resource.type==='refined').forEach(resource=>{
    const ingredient = resource.recipe && resource.recipe[0];
    positions[resource.id] = {x:550,y:sourceY[ingredient && ingredient.id] || 92};
  });
  const chemistryStages = {
    rubber:2, plastic:2, aluminum_alloy:2, tungsten_carbide:2, hydrazine:2, silicone:2, explosive_powder:2, steel:2,
    graphene:3, diamond:4, titanium_alloy:4, nanocarbon_alloy:5
  };
  [2,3,4,5].forEach(stage=>{
    resources.filter(resource=>chemistryStages[resource.id]===stage).sort((a,b)=>a.name.localeCompare(b.name,'es')).forEach((resource,index)=>{
      positions[resource.id] = {x:770+(stage-2)*240,y:92+index*86};
    });
  });
  return positions;
}

function renderResourceTree(titleHtml, description){
  return `
    <div class="section-head">
      <div class="section-title">${titleHtml}</div>
      <div class="section-desc">${description}</div>
    </div>
    <div class="resource-tree-controls" aria-label="Controles del árbol de recursos">
      <div class="resource-tree-filters" role="group" aria-label="Filtrar recursos por método">
        <button type="button" class="chip active" data-tree-filter="all" aria-pressed="true" onclick="applyResourceTreeFilter('all',this)">Todos</button>
        <button type="button" class="chip" data-tree-filter="natural" aria-pressed="false" onclick="applyResourceTreeFilter('natural',this)">Minería</button>
        <button type="button" class="chip" data-tree-filter="refined" aria-pressed="false" onclick="applyResourceTreeFilter('refined',this)">Fundición</button>
        <button type="button" class="chip" data-tree-filter="gas" aria-pressed="false" onclick="applyResourceTreeFilter('gas',this)">Gases</button>
        <button type="button" class="chip" data-tree-filter="composite" aria-pressed="false" onclick="applyResourceTreeFilter('composite',this)">Laboratorio de química</button>
      </div>
      <label class="resource-tree-search"><span>⌕</span><input id="resource-tree-search" type="search" placeholder="Buscar recurso..." aria-label="Buscar recurso por nombre en español o inglés" oninput="resourceTreeSearch(this.value)"></label>
      <div class="resource-tree-view-controls">
        <button type="button" class="btn-ghost" aria-label="Centrar árbol de recursos" onclick="resourceTreeCenter()">⊙ Centrar</button>
        <button type="button" class="btn-ghost" aria-label="Restablecer zoom y selección" onclick="resourceTreeReset()">↺ Restablecer</button>
      </div>
    </div>
    <div class="resource-tree-flow" aria-label="Dirección del flujo de recetas: recursos de origen, fundición y química">
      <span>Origen <small>Naturales y gases</small></span><b>→</b><span>Fundición <small>Recursos refinados</small></span><b>→</b><span>Química básica</span><b>→</b><span>Química avanzada</span>
    </div>
    <div class="resource-tree-layout">
      <div class="resource-tree-graph-wrap"><div id="resource-tree-graph" role="application" aria-label="Grafo interactivo de recetas de recursos. Selecciona un recurso para ver sus relaciones."></div></div>
      <aside class="resource-tree-detail" id="resource-tree-detail" aria-live="polite">
        <div class="resource-tree-detail-empty"><span>✦</span><strong>Selecciona un recurso</strong><p>Verás su método, ingredientes, productos relacionados y planetas disponibles.</p></div>
      </aside>
    </div>
  `;
}

function initResourceTree(){
  const container = document.getElementById('resource-tree-graph');
  if(!container) return;
  if(!window.cytoscape){
    container.innerHTML = '<p class="resource-tree-error">No se pudo cargar el grafo. Comprueba tu conexión e inténtalo de nuevo.</p>';
    return;
  }
  const ids = resourceTreeIds();
  const resources = ids.map(id=>RESOURCE_MAP[id]).filter(Boolean);
  const positions = resourceTreePositions(resources);
  const accent = getComputedStyle(document.body).getPropertyValue('--accent-2').trim() || '#ffb066';
  const elements = [
    ...resources.map(resource=>({data:{id:resource.id, label:`${resource.name}\n${resource.en}`, icon:resource.icon, color:resource.color, type:resource.type}, position:positions[resource.id]})),
    ...resources.flatMap(resource=>(resource.recipe || []).filter(ingredient=>ids.includes(ingredient.id)).map(ingredient=>({data:{id:`${ingredient.id}-${resource.id}`, source:ingredient.id, target:resource.id, qty:ingredient.qty>1 ? `${ingredient.qty}×` : ''}})))
  ];
  const cy = window.cytoscape({
    container,
    elements,
    style:[
      {selector:'node', style:{'width':174,'height':64,'shape':'round-rectangle','background-color':'#221c45','background-image':'data(icon)','background-fit':'contain','background-width':38,'background-height':38,'background-position-x':'16px','background-position-y':'50%','border-width':2,'border-color':'data(color)','label':'data(label)','font-family':'Segoe UI, sans-serif','font-size':10.5,'font-weight':700,'color':'#f5eeff','text-wrap':'wrap','text-max-width':96,'text-halign':'center','text-justification':'left','text-valign':'center','text-margin-x':28,'text-outline-width':0}},
      {selector:'node[type="natural"]', style:{'background-color':'#273c35'}},
      {selector:'node[type="refined"]', style:{'background-color':'#303044'}},
      {selector:'node[type="gas"]', style:{'background-color':'#20384d'}},
      {selector:'node[type="composite"]', style:{'background-color':'#3b2d50'}},
      {selector:'edge', style:{'width':2.5,'line-color':accent,'target-arrow-color':accent,'target-arrow-shape':'triangle','arrow-scale':1.1,'curve-style':'bezier','opacity':.76,'label':'data(qty)','font-size':10,'font-weight':700,'color':'#f5eeff','text-background-color':'#1a1436','text-background-opacity':1,'text-background-padding':2}},
      {selector:'.tree-dim', style:{'opacity':.15}},
      {selector:'.tree-selected', style:{'border-width':4,'border-color':'#ffb066','overlay-color':'#ff8a3d','overlay-opacity':.18,'overlay-padding':8}},
      {selector:'.tree-hidden', style:{'display':'none'}}
    ],
    wheelSensitivity:.18,
    minZoom:.35,
    maxZoom:2.2,
    boxSelectionEnabled:false
  });
  window.resourceTreeCy = cy;
  window.resourceTreeIds = ids;
  cy.layout({name:'preset', fit:false, padding:44, animate:false}).run();
  cy.zoom(.72); cy.pan({x:28,y:38});
  cy.on('tap','node',event=>selectResourceTreeNode(event.target));
  cy.on('tap',event=>{ if(event.target===cy) clearResourceTreeSelection(); });
}

function selectResourceTreeNode(node){
  const cy = window.resourceTreeCy;
  if(!cy || !node) return;
  const related = node.closedNeighborhood();
  cy.elements().addClass('tree-dim').removeClass('tree-selected');
  related.removeClass('tree-dim');
  node.addClass('tree-selected');
  renderResourceTreeDetail(RESOURCE_MAP[node.id()], cy);
}

function clearResourceTreeSelection(){
  const cy = window.resourceTreeCy;
  if(!cy) return;
  cy.elements().removeClass('tree-dim tree-selected');
  const detail = document.getElementById('resource-tree-detail');
  if(detail) detail.innerHTML = '<div class="resource-tree-detail-empty"><span>✦</span><strong>Selecciona un recurso</strong><p>Verás su método, ingredientes, productos relacionados y planetas disponibles.</p></div>';
}

function renderResourceTreeDetail(resource, cy){
  const detail = document.getElementById('resource-tree-detail');
  if(!detail || !resource) return;
  const ingredients = (resource.recipe || []).map(ingredient=>{
    const item = RESOURCE_MAP[ingredient.id];
    return item ? `<button type="button" class="resource-tree-link" onclick="selectResourceTreeNode(window.resourceTreeCy.$id('${item.id}'))">${ingredient.qty}× ${item.name}</button>` : '';
  }).join('') || '<span class="resource-tree-muted">No requiere ingredientes.</span>';
  const products = cy.$id(resource.id).outgoers('node').map(node=>RESOURCE_MAP[node.id()]).filter(Boolean).map(item=>`<button type="button" class="resource-tree-link" onclick="selectResourceTreeNode(window.resourceTreeCy.$id('${item.id}'))">${item.name}</button>`).join('') || '<span class="resource-tree-muted">Sin productos dentro de esta prueba.</span>';
  const planets = (resource.found || []).map(id=>PLANET_MAP[id] ? `<span class="resource-tree-planet">${PLANET_MAP[id].name}</span>` : '').join('') || '<span class="resource-tree-muted">No se obtiene en planetas.</span>';
  const icon = resource.icon && resource.icon.startsWith('http') ? `<img src="${resource.icon}" alt="">` : '<span>◆</span>';
  detail.innerHTML = `
    <div class="resource-tree-detail-head"><div class="resource-tree-detail-icon" style="--resource-color:${resource.color}">${icon}</div><div><h3>${resource.name}</h3><p>${resource.en}</p></div></div>
    <span class="resource-tree-type ${resource.type}">${typeLabel(resource.type)} · ${resourceTreeMethod(resource)}</span>
    <p class="resource-tree-obtain">${resource.obtain}</p>
    <section><h4>Ingredientes</h4><div class="resource-tree-link-list">${ingredients}</div></section>
    <section><h4>Productos relacionados</h4><div class="resource-tree-link-list">${products}</div></section>
    <section><h4>Planetas</h4><div class="resource-tree-planets">${planets}</div></section>`;
}

function applyResourceTreeFilter(filter, button){
  const cy = window.resourceTreeCy;
  if(!cy) return;
  clearResourceTreeSelection();
  cy.elements().removeClass('tree-hidden');
  if(filter!=='all'){
    cy.nodes().filter(node=>node.data('type')!==filter).addClass('tree-hidden');
    cy.edges().filter(edge=>edge.source().hasClass('tree-hidden') || edge.target().hasClass('tree-hidden')).addClass('tree-hidden');
  }
  document.querySelectorAll('[data-tree-filter]').forEach(control=>{
    const active = control.dataset.treeFilter===filter;
    control.classList.toggle('active',active);
    control.setAttribute('aria-pressed',String(active));
  });
  if(button) button.focus();
  cy.fit(cy.elements(':visible'),44);
}

function resourceTreeSearch(query){
  const cy = window.resourceTreeCy;
  const normalized = query.trim().toLocaleLowerCase('es');
  if(!cy || !normalized){ clearResourceTreeSelection(); return; }
  const node = cy.nodes().filter(candidate=>{
    const resource = RESOURCE_MAP[candidate.id()];
    return resource && `${resource.name} ${resource.en}`.toLocaleLowerCase('es').includes(normalized);
  }).first();
  if(node && node.length){
    node.removeClass('tree-hidden');
    selectResourceTreeNode(node);
    cy.animate({center:{eles:node}, zoom:Math.max(cy.zoom(),1.05)},{duration:180});
  }
}

function resourceTreeCenter(){ if(window.resourceTreeCy) window.resourceTreeCy.fit(window.resourceTreeCy.elements(':visible'),44); }
function resourceTreeReset(){
  const search = document.getElementById('resource-tree-search');
  if(search) search.value = '';
  applyResourceTreeFilter('all');
  resourceTreeCenter();
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

function planetResourceChip(r){
  return `<span class="planet-resource-chip" onclick="openResource('${r.id}')">
    ${r.icon.startsWith('http') ? `<img src="${r.icon}" alt="${r.name}">` : `<span class="planet-resource-fallback">${r.icon}</span>`}
    <span>${r.name} <em>(${r.en})</em></span>
  </span>`;
}

function togglePlanetResources(button){
  const target=document.getElementById(button.getAttribute('aria-controls'));
  if(!target) return;
  const expanded=button.getAttribute('aria-expanded') === 'true';
  const next=!expanded;
  const text=next ? 'Ocultar todos los recursos' : 'Ver todos los recursos disponibles';
  button.setAttribute('aria-expanded', String(next));
  button.setAttribute('aria-label', text);
  button.querySelector('.planet-resource-toggle-icon').textContent=next ? '▾' : '▸';
  button.querySelector('.planet-resource-toggle-text').textContent=text;
  target.classList.toggle('open', next);
}

function openPlanet(id){
  const p = PLANET_MAP[id];
  if(!p) return;
  const mainResources = (p.mainResources || []).map(resourceId=>RESOURCE_MAP[resourceId]).filter(Boolean);
  const additionalResources = RESOURCES.filter(r=>r.type==='natural' && r.found.includes(id) && !mainResources.some(main=>main.id===r.id));
  const allResourcesId=`planet-all-resources-${p.id}`;
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
        </div>
      </div>
      <div class="dsec">
        <h4>Recursos principales</h4>
        <div class="planet-resource-list">${mainResources.length ? mainResources.map(planetResourceChip).join('') : '<span class="planet-resource-empty">No posee minerales específicos destacados</span>'}</div>
        <button class="planet-resource-toggle" type="button" aria-expanded="false" aria-controls="${allResourcesId}" aria-label="Ver todos los recursos disponibles" onclick="togglePlanetResources(this)">
          <span class="planet-resource-toggle-icon" aria-hidden="true">▸</span>
          <span class="planet-resource-toggle-text">Ver todos los recursos disponibles</span>
        </button>
        <div class="planet-all-resources" id="${allResourcesId}" role="region" aria-label="Todos los recursos naturales disponibles en ${p.name}">
          <div class="planet-all-resources-inner">
            <div class="planet-resource-list">${additionalResources.length ? additionalResources.map(planetResourceChip).join('') : '<span class="planet-resource-empty">No hay recursos naturales adicionales registrados</span>'}</div>
          </div>
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
initTheme();
initMenu();
render();
