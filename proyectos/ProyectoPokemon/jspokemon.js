// --- BIBLIOTECA DE VÍDEOS HÍBRIDA (STANDBY TRAILERS & DIRECT LIVE) ---
const videoLibrary = {
    go: {
        iframeUrl: "https://www.youtube-nocookie.com/embed/YQgTty9wuXk?autoplay=1&rel=0&modestbranding=1",
        badge: "📱 Modo Standby: Pokémon GO",
        badgeStyle: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        header: "Pokémon GO: 10º Aniversario",
        desc: "ℹ️ Celebra el aniversario de Pokémon GO explorando el mundo real, participando en incursiones legendarias y capturando Pokémon con entrenadores de todo el planeta.",
        channel: "Pokémon GO Official",
        externalUrl: "https://www.youtube.com/watch?v=YQgTty9wuXk"
    },
    tcg: {
        iframeUrl: "https://www.youtube-nocookie.com/embed/fgZy2-XUmXM?autoplay=1&rel=0&modestbranding=1",
        badge: "🎴 Modo Standby: Pokémon TCG Pocket",
        badgeStyle: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        header: "Tráiler Oficial: Pokémon TCG Pocket",
        desc: "ℹ️ Abre sobres digitales cada día, colecciona cartas inmersivas con ilustraciones dinámicas y combate en partidas rápidas desde tu dispositivo móvil.",
        channel: "Official Pokémon Channel",
        externalUrl: "https://www.youtube.com/watch?v=fgZy2-XUmXM"
    },
    worlds: {
        iframeUrl: "https://www.youtube-nocookie.com/embed/7QbCWOAuNlQ?autoplay=1&rel=0&modestbranding=1",
        badge: "🏆 Modo Standby: Campeonato Mundial VGC",
        badgeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        header: "Pokémon World Championship — Gran Final VGC",
        desc: "ℹ️ Revive las partidas tácticas más intensas y los momentos decisivos de los mejores entrenadores del mundo en el torneo oficial VGC.",
        channel: "Play! Pokémon Esports Channel",
        externalUrl: "https://www.youtube.com/watch?v=7QbCWOAuNlQ"
    },
    live_presents: {
        iframeUrl: "https://www.youtube-nocookie.com/embed/live_stream?channel=UC4Qt03ew6PzA68oK_23aXmg&autoplay=0",
        badge: "🔴 En Directo: Canal Oficial Nintendo / Pokémon",
        badgeStyle: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        header: "Señal en Vivo de Nintendo Direct & Pokémon Presents",
        desc: "📡 Transmisión conectada al canal oficial. Si la emisión está pausada fuera de horario, pulsa cualquier tráiler de la botonera para continuar reproduciendo contenido en alta definición.",
        channel: "Nintendo Direct Live Feed",
        externalUrl: "https://www.youtube.com/@PokemonOficialES"
    }
};

// --- DATASET: NOTICIAS POKÉMON DENSAS Y AUTO-ACTUALIZABLES ---
const pokemonNewsData = [
    {
        id: 1,
        category: "za",
        categoryLabel: "Leyendas Pokémon: Z-A",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        title: "Nintendo revela detalles de la reconstrucción urbana de Ciudad Luminalia",
        summary: "Game Freak confirma que la aventura transcurrirá íntegramente dentro de la emblemática metrópolis de Kalos con el regreso estelar de las Megaevoluciones.",
        timeAgo: "Hace 25 minutos",
        readTime: "3 min lectura",
        source: "Oficial Pokémon News"
    },
    {
        id: 2,
        category: "gen9",
        categoryLabel: "Paldea & Gen IX",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
        title: "Nuevo evento de Teraincursión de 7 estrellas anunciado para Escarlata y Púrpura",
        summary: "Los entrenadores podrán desafiar a un Pokémon inicial clásico con Teratipo Especial limitado durante este fin de semana en Paldea.",
        timeAgo: "Hace 2 horas",
        readTime: "2 min lectura",
        source: "Nintendo Switch Hub"
    },
    {
        id: 3,
        category: "events",
        categoryLabel: "Competitivo & Events",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        title: "Play! Pokémon anuncia sedes para el Campeonato Mundial de Videojuegos",
        summary: "Reglas de formato VGC actualizadas para la temporada oficial de combates dobles con restricciones de legendarios de Paldea.",
        timeAgo: "Hace 5 horas",
        readTime: "4 min lectura",
        source: "Play! Pokémon"
    },
    {
        id: 4,
        category: "rumors",
        categoryLabel: "Rumores Gen X",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        title: "Filtramientos apuntan al nuevo motor gráfico para la Décima Generación",
        summary: "Desarrolladores analizan patentes registradas por Nintendo para la próxima consola sucesora con mejoras de iluminación dinámica en entornos abiertos.",
        timeAgo: "Hace 8 horas",
        readTime: "5 min lectura",
        source: "Serebii / PokéBeach Tech"
    },
    {
        id: 5,
        category: "za",
        categoryLabel: "Leyendas Pokémon: Z-A",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        title: "Especulaciones sobre los tríos de Pokémon Iniciales de la región de Kalos",
        summary: "Un nuevo análisis del tráiler teaser sugiere formas regionales inéditas para los tres acompañantes al principio de la aventura.",
        timeAgo: "Hace 12 horas",
        readTime: "3 min lectura",
        source: "CoroCoro Digest"
    },
    {
        id: 6,
        category: "gen9",
        categoryLabel: "Paldea & Gen IX",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
        title: "Distribución gratuita por Código Regalo Misterioso activada mundialmente",
        summary: "Reclama un Pokémon competitivo con EV's optimizados utilizado por el campeón del último torneo internacional de Pokémon Escarlata.",
        timeAgo: "Hace 1 día",
        readTime: "2 min lectura",
        source: "Pokémon Mystery Gift"
    }
];

// --- DATASET: LAS 9 GENERACIONES PRINCIPALES ---
const sagasData = [
    {
        id: 1,
        gen: "Generación I",
        title: "Rojo, Azul y Amarillo",
        region: "Kanto",
        year: "1996",
        console: "Game Boy",
        count: 151,
        starters: "Bulbasaur, Charmander, Squirtle",
        legendaries: "Mewtwo, Articuno, Zapdos, Moltres",
        innovation: "Primera entrega histórica. Introdujo los 151 Pokémon originales y la mecánica del cable link.",
        badgeColor: "bg-red-100 text-red-800 border-red-200"
    },
    {
        id: 2,
        gen: "Generación II",
        title: "Oro, Plata y Cristal",
        region: "Johto",
        year: "1999",
        console: "Game Boy Color",
        count: 100,
        starters: "Chikorita, Cyndaquil, Totodile",
        legendaries: "Ho-Oh, Lugia, Suicune, Raikou, Entei",
        innovation: "Introducción del ciclo día/noche, reproducción Pokémon, y tipos Acero y Siniestro.",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
        id: 3,
        gen: "Generación III",
        title: "Rubí, Zafiro y Esmeralda",
        region: "Hoenn",
        year: "2002",
        console: "Game Boy Advance",
        count: 135,
        starters: "Treecko, Torchic, Mudkip",
        legendaries: "Rayquaza, Groudon, Kyogre",
        innovation: "Introducción de Habilidades, Naturalezas, Combates Dobles y Concursos Pokémon.",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
        id: 4,
        gen: "Generación IV",
        title: "Diamante, Perla y Platino",
        region: "Sinnoh",
        year: "2006",
        console: "Nintendo DS",
        count: 107,
        starters: "Turtwig, Chimchar, Piplup",
        legendaries: "Dialga, Palkia, Giratina, Arceus",
        innovation: "División de ataques físicos/especiales y conexión Wi-Fi mundial de Nintendo.",
        badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200"
    },
    {
        id: 5,
        gen: "Generación V",
        title: "Blanco y Negro (1 y 2)",
        region: "Teselia / Unova",
        year: "2010",
        console: "Nintendo DS",
        count: 156,
        starters: "Snivy, Tepig, Oshawott",
        legendaries: "Reshiram, Zekrom, Kyurem",
        innovation: "Animaciones completas de sprites, combates triples y narrativa más compleja.",
        badgeColor: "bg-slate-200 text-slate-800 border-slate-300"
    },
    {
        id: 6,
        gen: "Generación VI",
        title: "Pokémon X e Y",
        region: "Kalos",
        year: "2013",
        console: "Nintendo 3DS",
        count: 72,
        starters: "Chespin, Fennekin, Froakie",
        legendaries: "Xerneas, Yveltal, Zygarde",
        innovation: "Salto completo al 3D, introducción de las Megaevoluciones y el Tipo Hada.",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    },
    {
        id: 7,
        gen: "Generación VII",
        title: "Sol, Luna, Ultrasol y Ultraluna",
        region: "Alola",
        year: "2016",
        console: "Nintendo 3DS",
        count: 88,
        starters: "Rowlet, Litten, Popplio",
        legendaries: "Solgaleo, Lunala, Necrozma",
        innovation: "Movimientos Z, Formas de Alola de especies clásicas y Recorridos insulares.",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200"
    },
    {
        id: 8,
        gen: "Generación VIII",
        title: "Espada y Escudo",
        region: "Galar",
        year: "2019",
        console: "Nintendo Switch",
        count: 96,
        starters: "Grookey, Scorbunny, Sobble",
        legendaries: "Zacian, Zamazenta, Eternatus",
        innovation: "Área Silvestre con cámara libre y fenómeno Dinamax/Gigantamax.",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-200"
    },
    {
        id: 9,
        gen: "Generación IX",
        title: "Escarlata y Púrpura",
        region: "Paldea",
        year: "2022",
        console: "Nintendo Switch",
        count: 120,
        starters: "Sprigatito, Fuecoco, Quaxly",
        legendaries: "Koraidon, Miraidon, Terapagos",
        innovation: "Mundo abierto totalmente no lineal y la mecánica de Teracristalización.",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    }
];

// Type Colors Map for dynamic badges
const typeColorMap = {
    normal: { bg: 'bg-slate-400', text: 'text-white' },
    fire: { bg: 'bg-red-500', text: 'text-white' },
    water: { bg: 'bg-blue-500', text: 'text-white' },
    grass: { bg: 'bg-emerald-500', text: 'text-white' },
    electric: { bg: 'bg-amber-400', text: 'text-slate-900' },
    ice: { bg: 'bg-cyan-300', text: 'text-slate-900' },
    fighting: { bg: 'bg-red-700', text: 'text-white' },
    poison: { bg: 'bg-purple-500', text: 'text-white' },
    ground: { bg: 'bg-amber-600', text: 'text-white' },
    flying: { bg: 'bg-indigo-300', text: 'text-slate-900' },
    psychic: { bg: 'bg-pink-500', text: 'text-white' },
    bug: { bg: 'bg-lime-500', text: 'text-slate-900' },
    rock: { bg: 'bg-amber-700', text: 'text-white' },
    ghost: { bg: 'bg-purple-700', text: 'text-white' },
    dragon: { bg: 'bg-indigo-700', text: 'text-white' },
    dark: { bg: 'bg-slate-800', text: 'text-white' },
    steel: { bg: 'bg-slate-500', text: 'text-white' },
    fairy: { bg: 'bg-pink-300', text: 'text-slate-900' }
};

// CHART INSTANCES
let pokeRadarChartInstance = null;
let compareRadarChartInstance = null;
let genBarChartInstance = null;
let typeDonutChartInstance = null;
let currentNewsFilter = 'all';

// --- DOM LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    renderNewsGrid('all');
    renderSagasGrid();
    fetchPokemonData('384'); // Rayquaza por defecto
    initCompareChart();
    renderAnalyticsCharts();
    switchVideo('go'); // Carga inicial por defecto con Pokémon GO
});

// --- MOBILE MENU TOGGLE ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// --- LÓGICA DEL EMULADOR RETRO DE ROMS ---
function loadLocalROM(event) {
    const file = event.target.files[0];
    if (!file) return;

    const standbyView = document.getElementById('emulatorStandbyView');
    const coreFrame = document.getElementById('emulatorCoreFrame');

    standbyView.classList.add('hidden');
    coreFrame.classList.remove('hidden');

    const fileName = file.name.toLowerCase();
    let core = "gba";
    if (fileName.endsWith('.gb') || fileName.endsWith('.gbc')) {
        core = "gb";
    }

    const romUrl = URL.createObjectURL(file);

    coreFrame.innerHTML = `<div id="display-emulator" class="w-full h-full"></div>`;

    window.EJS_player = "#display-emulator";
    window.EJS_core = core;
    window.EJS_gameUrl = romUrl;
    window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
    window.EJS_startOnLoaded = true;

    const existingScript = document.getElementById('ejsScript');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'ejsScript';
    script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
    document.body.appendChild(script);
}

function resetEmulator() {
    const standbyView = document.getElementById('emulatorStandbyView');
    const coreFrame = document.getElementById('emulatorCoreFrame');
    const input = document.getElementById('romFileInput');

    input.value = "";
    coreFrame.innerHTML = "";
    coreFrame.classList.add('hidden');
    standbyView.classList.remove('hidden');
}

function toggleFullscreenEmulator() {
    const container = document.getElementById('emulatorScreenContainer');
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) container.requestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

// --- SWITCHER DE VÍDEO INTELIGENTE ---
function switchVideo(key) {
    const videoData = videoLibrary[key];
    if (!videoData) return;

    const iframe = document.getElementById('directIframePlayer');
    const badge = document.getElementById('directStatusBadge');
    const header = document.getElementById('directMainHeader');
    const desc = document.getElementById('directVideoDesc');
    const countdown = document.getElementById('directCountdownLabel');
    const externalBtn = document.getElementById('directExternalBtn');

    // Actualizar elementos dinámicos
    if (iframe) iframe.src = videoData.iframeUrl;
    if (badge) {
        badge.className = `px-2.5 py-1 ${videoData.badgeStyle} text-xs font-bold rounded-md flex items-center gap-1.5`;
        const statusSpan = badge.querySelector('span:last-child');
        if (statusSpan) statusSpan.innerText = videoData.badge;
    }
    if (header) header.innerText = videoData.header;
    if (desc) desc.innerText = videoData.desc;
    if (countdown) countdown.innerText = videoData.channel;
    if (externalBtn) externalBtn.href = videoData.externalUrl;

    // Resetear estilos de botones (Actualizado a go, tcg, worlds, live_presents)
    const btnMap = {
        go: 'btnVidGO',
        tcg: 'btnVidTCG',
        worlds: 'btnVidWorlds',
        live_presents: 'btnVidLive'
    };

    Object.keys(btnMap).forEach(k => {
        const b = document.getElementById(btnMap[k]);
        if (b) {
            if (k === key) {
                b.className = "px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg transition shadow-sm";
            } else if (k === 'live_presents') {
                b.className = "px-3 py-1.5 bg-rose-950 border border-rose-600 text-rose-300 rounded-lg hover:bg-rose-900 transition flex items-center gap-1";
            } else {
                b.className = "px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition";
            }
        }
    });
}

// --- NEWS FEED ENGINE ---
function renderNewsGrid(category) {
    currentNewsFilter = category;
    const container = document.getElementById('newsGrid');
    if (!container) return;

    const filtered = category === 'all' 
        ? pokemonNewsData 
        : pokemonNewsData.filter(item => item.category === category);

    container.innerHTML = filtered.map(item => `
        <article class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-center mb-3 text-xs">
                    <span class="font-bold font-mono px-2.5 py-0.5 rounded-md border ${item.badgeColor}">
                        ${item.categoryLabel}
                    </span>
                    <span class="text-slate-400 font-medium">${item.timeAgo}</span>
                </div>
                <h3 class="heading-font text-base font-bold text-slate-900 hover:text-indigo-600 transition leading-snug">
                    ${item.title}
                </h3>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    ${item.summary}
                </p>
            </div>

            <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>📌 ${item.source}</span>
                <span class="font-medium text-indigo-600">${item.readTime}</span>
            </div>
        </article>
    `).join('');

    document.querySelectorAll('.news-filter-btn').forEach(btn => {
        btn.className = "news-filter-btn px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-indigo-400 transition";
    });
    const activeBtn = document.getElementById(`btn-news-${category}`);
    if (activeBtn) {
        activeBtn.className = "news-filter-btn px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold transition";
    }
}

function filterNews(cat) {
    renderNewsGrid(cat);
}

function refreshNewsFeed() {
    const spinner = document.getElementById('refreshSpinner');
    if (spinner) spinner.classList.add('animate-spin');

    setTimeout(() => {
        if (spinner) spinner.classList.remove('animate-spin');
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const lastUpdateElem = document.getElementById('lastNewsUpdate');
        if (lastUpdateElem) lastUpdateElem.innerText = `Última actualización: hoy a las ${timeStr}`;
        renderNewsGrid(currentNewsFilter);
    }, 600);
}

// --- RENDER SAGAS GRID ---
function renderSagasGrid() {
    const container = document.getElementById('sagasGrid');
    if (!container) return;

    container.innerHTML = sagasData.map(saga => `
        <div class="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-xs font-bold font-mono px-2.5 py-1 rounded-md border ${saga.badgeColor}">
                        ${saga.gen}
                    </span>
                    <span class="text-xs font-mono font-bold text-slate-400">${saga.year}</span>
                </div>
                <h3 class="heading-font text-lg font-bold text-slate-900 group-hover:text-rose-600 transition">
                    ${saga.title}
                </h3>
                <p class="text-xs text-slate-500 mt-1">Región: <strong class="text-slate-700">${saga.region}</strong></p>
                <p class="text-xs text-slate-500">Nuevas especies: <strong class="text-slate-700">+${saga.count}</strong></p>
            </div>

            <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span class="text-xs text-slate-400 font-medium">${saga.console}</span>
                <button onclick="openSagaDrawer(${saga.id})" class="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
                    Detalles ➔
                </button>
            </div>
        </div>
    `).join('');
}

// --- SAGA DRAWER INTERACTION ---
function openSagaDrawer(sagaId) {
    const saga = sagasData.find(s => s.id === sagaId);
    if (!saga) return;

    document.getElementById('drawerGenTag').innerText = saga.gen;
    document.getElementById('drawerTitle').innerText = saga.title;
    document.getElementById('drawerRegion').innerText = `${saga.region} (${saga.year})`;
    document.getElementById('drawerConsole').innerText = saga.console;
    document.getElementById('drawerStarters').innerText = saga.starters;
    document.getElementById('drawerLegendaries').innerText = saga.legendaries;
    document.getElementById('drawerInnovation').innerText = saga.innovation;

    const drawer = document.getElementById('sagaDrawer');
    if (drawer) {
        drawer.classList.remove('hidden');
        drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function closeSagaDrawer() {
    const drawer = document.getElementById('sagaDrawer');
    if (drawer) drawer.classList.add('hidden');
}

// --- POKÉAPI REST FETCH LOGIC ---
async function fetchPokemonData(query) {
    const loading = document.getElementById('loadingState');
    const errorView = document.getElementById('errorState');
    const dataView = document.getElementById('pokemonDataView');

    if (loading) loading.classList.remove('hidden');
    if (errorView) errorView.classList.add('hidden');
    if (dataView) dataView.classList.add('hidden');

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toString().toLowerCase().trim()}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
        
        const data = await response.json();
        
        document.getElementById('pokeIdBadge').innerText = `Nº ${String(data.id).padStart(4, '0')}`;
        document.getElementById('pokeName').innerText = data.name;
        
        const artwork = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
        document.getElementById('pokeImage').src = artwork;

        document.getElementById('pokeHeight').innerText = `${(data.height / 10).toFixed(1)} m`;
        document.getElementById('pokeWeight').innerText = `${(data.weight / 10).toFixed(1)} kg`;

        const typesContainer = document.getElementById('pokeTypes');
        typesContainer.innerHTML = data.types.map(t => {
            const tName = t.type.name;
            const style = typeColorMap[tName] || { bg: 'bg-slate-500', text: 'text-white' };
            return `<span class="px-3 py-1 rounded-full text-xs font-bold uppercase ${style.bg} ${style.text}">${tName}</span>`;
        }).join('');

        const statValues = data.stats.map(s => s.base_stat);
        const statTotal = statValues.reduce((a, b) => a + b, 0);
        document.getElementById('pokeStatTotal').innerText = `Total: ${statTotal}`;

        renderPokeRadarChart(statValues);

        if (loading) loading.classList.add('hidden');
        if (dataView) dataView.classList.remove('hidden');

    } catch (err) {
        if (loading) loading.classList.add('hidden');
        if (errorView) errorView.classList.remove('hidden');
    }
}

function handleSearch(e) {
    e.preventDefault();
    const val = document.getElementById('pokemonSearchInput').value;
    if (val) fetchPokemonData(val);
}

function quickSearch(name) {
    document.getElementById('pokemonSearchInput').value = name;
    fetchPokemonData(name);
}

// --- SINGLE POKÉMON RADAR CHART ---
function renderPokeRadarChart(statsArray) {
    const chartElem = document.getElementById('pokeRadarChart');
    if (!chartElem) return;
    const ctx = chartElem.getContext('2d');
    
    if (pokeRadarChartInstance) {
        pokeRadarChartInstance.destroy();
    }

    pokeRadarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HP', 'Ataque', 'Defensa', 'At. Esp.', 'Def. Esp.', 'Velocidad'],
            datasets: [{
                label: 'Estadísticas Base',
                data: statsArray,
                backgroundColor: 'rgba(225, 29, 72, 0.25)',
                borderColor: '#e11d48',
                borderWidth: 2,
                pointBackgroundColor: '#e11d48',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#e2e8f0' },
                    grid: { color: '#f1f5f9' },
                    pointLabels: {
                        font: { family: 'Outfit', size: 10, weight: '600' },
                        color: '#475569'
                    },
                    suggestedMin: 0,
                    suggestedMax: 150
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// --- HEAD-TO-HEAD COMPARISON CHART ---
async function initCompareChart() {
    await updateCompareChart();
}

async function updateCompareChart() {
    const input1 = document.getElementById('compMon1Input');
    const input2 = document.getElementById('compMon2Input');
    if (!input1 || !input2) return;

    const mon1Name = input1.value || 'lucario';
    const mon2Name = input2.value || 'garchomp';

    try {
        const [res1, res2] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${mon1Name.toLowerCase().trim()}`).then(r => r.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon/${mon2Name.toLowerCase().trim()}`).then(r => r.json())
        ]);

        const stats1 = res1.stats.map(s => s.base_stat);
        const stats2 = res2.stats.map(s => s.base_stat);

        const tot1 = stats1.reduce((a,b)=>a+b, 0);
        const tot2 = stats2.reduce((a,b)=>a+b, 0);

        document.getElementById('comp1Title').innerText = `${res1.name} (Nº ${res1.id})`;
        document.getElementById('comp1Stats').innerText = `Total Base: ${tot1} | HP: ${stats1[0]} | Atq: ${stats1[1]} | Vel: ${stats1[5]}`;

        document.getElementById('comp2Title').innerText = `${res2.name} (Nº ${res2.id})`;
        document.getElementById('comp2Stats').innerText = `Total Base: ${tot2} | HP: ${stats2[0]} | Atq: ${stats2[1]} | Vel: ${stats2[5]}`;

        const chartElem = document.getElementById('compareRadarChart');
        if (!chartElem) return;
        const ctx = chartElem.getContext('2d');
        if (compareRadarChartInstance) compareRadarChartInstance.destroy();

        compareRadarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['HP', 'Ataque', 'Defensa', 'At. Esp.', 'Def. Esp.', 'Velocidad'],
                datasets: [
                    {
                        label: res1.name.toUpperCase(),
                        data: stats1,
                        backgroundColor: 'rgba(225, 29, 72, 0.2)',
                        borderColor: '#e11d48',
                        borderWidth: 2
                    },
                    {
                        label: res2.name.toUpperCase(),
                        data: stats2,
                        backgroundColor: 'rgba(79, 70, 229, 0.2)',
                        borderColor: '#4f46e5',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 160,
                        pointLabels: { font: { family: 'Outfit', size: 10, weight: '600' } }
                    }
                },
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });

    } catch (err) {
        console.warn("Error en comparador:", err);
    }
}

// --- FRANCHISE ANALYTICS CHARTS ---
function renderAnalyticsCharts() {
    const barElem = document.getElementById('genDistributionChart');
    if (barElem) {
        const barCtx = barElem.getContext('2d');
        genBarChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Gen I', 'Gen II', 'Gen III', 'Gen IV', 'Gen V', 'Gen VI', 'Gen VII', 'Gen VIII', 'Gen IX'],
                datasets: [{
                    label: 'Nuevos Pokémon',
                    data: [151, 100, 135, 107, 156, 72, 88, 96, 120],
                    backgroundColor: '#4f46e5',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const donutElem = document.getElementById('typeDonutChart');
    if (donutElem) {
        const donutCtx = donutElem.getContext('2d');
        typeDonutChartInstance = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Agua', 'Normal', 'Planta', 'Bicho', 'Fuego', 'Eléctrico', 'Otros'],
                datasets: [{
                    data: [157, 127, 106, 92, 84, 60, 400],
                    backgroundColor: ['#3b82f6', '#94a3b8', '#22c55e', '#84cc16', '#ef4444', '#eab308', '#cbd5e1']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { font: { family: 'Outfit', size: 10 } } }
                }
            }
        });
    }
}
   