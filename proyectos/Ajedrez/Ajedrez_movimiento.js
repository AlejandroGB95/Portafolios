const tableroContenedor = document.getElementById("tablero-contenedor");
const tablero = document.getElementById("tablero");
const estado = document.getElementById("estado");
const nivelIA = document.getElementById("nivel");
const chatHistorial = document.getElementById("chat-historial");

let piezas = [], seleccion = null, turnoBlancas = true, historial = [];
let movRey = {blancas:false, negras:false};
let movTorre = {a1:false,h1:false,a8:false,h8:false};

const valores = {"♙":1,"♖":5,"♘":3,"♗":3,"♕":9,"♔":100,"♟":1,"♜":5,"♞":3,"♝":3,"♛":9,"♚":100};
const piezasBlancas = ["♙","♖","♘","♗","♕","♔"];
const piezasNegras = ["♟","♜","♞","♝","♛","♚"];
const simbolosNotacion = {"♖":"R","♘":"N","♗":"B","♕":"Q","♔":"K", "♜":"r","♞":"n","♝":"b","♛":"q","♚":"k"};

function inicializarTablero(){
  piezas=[
    "♜","♞","♝","♛","♚","♝","♞","♜",
    "♟","♟","♟","♟","♟","♟","♟","♟",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "","","","","","","","",
    "♙","♙","♙","♙","♙","♙","♙","♙",
    "♖","♘","♗","♕","♔","♗","♘","♖"
  ];
  seleccion = null;
  turnoBlancas = true;
  historial = [];
  movRey = {blancas:false, negras:false};
  movTorre = {a1:false,h1:false,a8:false,h8:false};
  estado.textContent = "Turno de Blancas";
  chatHistorial.innerHTML = "";
  dibujarTablero();
}

function dibujarTablero(){
  tablero.innerHTML = "";
  for(let i=0;i<64;i++){
    const casilla = document.createElement("div");
    casilla.className = "casilla " + ((Math.floor(i/8)+i)%2===0?"blanca":"negra");
    casilla.textContent = piezas[i];
    if(piezasBlancas.includes(piezas[i])) casilla.classList.add("blanca-pieza");
    if(piezasNegras.includes(piezas[i])) casilla.classList.add("negra-pieza");
    if(i === seleccion) casilla.classList.add("seleccionada");
    casilla.addEventListener("click",()=>manejarClick(i));
    tablero.appendChild(casilla);
  }
  dibujarCoordenadas();
}

function dibujarCoordenadas() {
    tableroContenedor.querySelectorAll('.coordenada').forEach(e => e.remove());
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numeros = [8, 7, 6, 5, 4, 3, 2, 1];

    letras.forEach((letra, i) => {
        const coordTop = document.createElement('div');
        coordTop.textContent = letra;
        coordTop.className = 'coordenada coordenada-letras';
        coordTop.style.gridColumn = (i + 2);
        coordTop.style.gridRow = 1;
        tableroContenedor.appendChild(coordTop);

        const coordBottom = document.createElement('div');
        coordBottom.textContent = letra;
        coordBottom.className = 'coordenada coordenada-letras';
        coordBottom.style.gridColumn = (i + 2);
        coordBottom.style.gridRow = 10;
        tableroContenedor.appendChild(coordBottom);
    });

    numeros.forEach((numero, i) => {
        const coordLeft = document.createElement('div');
        coordLeft.textContent = numero;
        coordLeft.className = 'coordenada coordenada-numeros';
        coordLeft.style.gridColumn = 1;
        coordLeft.style.gridRow = (i + 2);
        tableroContenedor.appendChild(coordLeft);

        const coordRight = document.createElement('div');
        coordRight.textContent = numero;
        coordRight.className = 'coordenada coordenada-numeros';
        coordRight.style.gridColumn = 10;
        coordRight.style.gridRow = (i + 2);
        tableroContenedor.appendChild(coordRight);
    });
}

function aNotacion(posicion) {
    const fila = Math.floor(posicion / 8);
    const col = posicion % 8;
    return String.fromCharCode(97 + col) + (8 - fila);
}

function generarNotacion(from, to, pieza, piezaCapturada, jaque) {
    let notacion = "";

    if (pieza === "♔" && Math.abs(from - to) === 2) {
        notacion = (to > from) ? "O-O" : "O-O-O";
    } else if (pieza === "♚" && Math.abs(from - to) === 2) {
        notacion = (to > from) ? "O-O" : "O-O-O";
    } else {
        notacion = simbolosNotacion[pieza] || "";
        if (pieza === "♙" || pieza === "♟") {
            if (piezaCapturada) {
                notacion = aNotacion(from)[0] + "x";
            }
        } else if (piezaCapturada) {
            notacion += "x";
        }
        notacion += aNotacion(to);
    }

    if (jaque === "mate") {
        notacion += "#";
    } else if (jaque === "jaque") {
        notacion += "+";
    }

    return notacion;
}

function actualizarChat() {
    chatHistorial.innerHTML = "";
    let jugadaCompleta = "";
    for (let i = 0; i < historial.length; i++) {
        const jugada = historial[i];
        if (i % 2 === 0) {
            const numJugada = (i / 2) + 1;
            jugadaCompleta = `<div class="jugada"><span class="jugada-numero">${numJugada}.</span><span class="jugada-blancas">Blancas: ${jugada.algebraic}</span>`;
            if (historial[i + 1]) {
                jugadaCompleta += `<span class="jugada-negras"> Negras: ${historial[i+1].algebraic}</span>`;
            }
            jugadaCompleta += `</div>`;
            chatHistorial.innerHTML += jugadaCompleta;
        }
    }
    chatHistorial.scrollTop = chatHistorial.scrollHeight;
}

function fila(i){ return Math.floor(i/8); }
function col(i){ return i%8; }
function esBlanca(p){ return piezasBlancas.includes(p); }
function esNegra(p){ return piezasNegras.includes(p); }

function movimientosLegales(i){
  const p = piezas[i];
  if(!p) return [];
  let movs = [];
  const f = fila(i), c = col(i);

  function agregar(j){ if(j>=0 && j<64 && (piezas[j]==="" || esBlanca(piezas[j])!=esBlanca(p))) movs.push(j); }

  if(p==="♙"){
    if(piezas[i-8]==="") movs.push(i-8);
    if(f===6 && piezas[i-16]==="" && piezas[i-8]==="") movs.push(i-16);
    if(c>0 && esNegra(piezas[i-9])) movs.push(i-9);
    if(c<7 && esNegra(piezas[i-7])) movs.push(i-7);
  } else if(p==="♟"){
    if(piezas[i+8]==="") movs.push(i+8);
    if(f===1 && piezas[i+16]==="" && piezas[i+8]==="") movs.push(i+16);
    if(c>0 && esBlanca(piezas[i+7])) movs.push(i+7);
    if(c<7 && esBlanca(piezas[i+9])) movs.push(i+9);
  } else if("♖♜".includes(p)) movs.push(...lineales(i,[-8,8,-1,1]));
  else if("♗♝".includes(p)) movs.push(...lineales(i,[-9,-7,7,9]));
  else if("♕♛".includes(p)) movs.push(...lineales(i,[-8,8,-1,1,-9,-7,7,9]));
  else if("♘♞".includes(p)) [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(s=>{
    const nf=f+s[0], nc=c+s[1]; 
    if(nf>=0&&nf<8&&nc>=0&&nc<8){ 
      const j=nf*8+nc; 
      if(!piezas[j] || esBlanca(piezas[j])!=esBlanca(p)) movs.push(j);
    }
  });
  else if("♔♚".includes(p)){
    for(let df=-1;df<=1;df++) for(let dc=-1;dc<=1;dc++){
      if(df===0 && dc===0) continue;
      const nf=f+df, nc=c+dc;
      if(nf>=0 && nf<8 && nc>=0 && nc<8){
        const j = nf*8+nc;
        if(!piezas[j] || esBlanca(piezas[j])!=esBlanca(p)) movs.push(j);
      }
    }
    if(p==="♔" && !movRey.blancas && piezas[5]==="" && piezas[6]==="" && piezas[7]==="♖" && !reyEnJaque(piezas, true) && !dejaReyEnJaque(4,5)) movs.push(6);
    if(p==="♔" && !movRey.blancas && piezas[1]==="" && piezas[2]==="" && piezas[3]==="" && piezas[0]==="♖" && !reyEnJaque(piezas, true) && !dejaReyEnJaque(4,3)) movs.push(2);
    if(p==="♚" && !movRey.negras && piezas[61]==="" && piezas[62]==="" && piezas[63]==="♜" && !reyEnJaque(piezas, false) && !dejaReyEnJaque(60,61)) movs.push(62);
    if(p==="♚" && !movRey.negras && piezas[57]==="" && piezas[58]==="" && piezas[59]==="" && piezas[56]==="♜" && !reyEnJaque(piezas, false) && !dejaReyEnJaque(60,59)) movs.push(58);
  }
  return movs.filter(j=>!dejaReyEnJaque(i,j));
}

function lineales(i,direcciones){
  const p = piezas[i], movs = [];
  direcciones.forEach(d=>{
    let j=i+d;
    while(j>=0&&j<64){
      if(Math.abs(col(j)-col(j-d))>1 && d!==-8 && d!==8) break;
      if(!piezas[j]) { movs.push(j); j+=d; }
      else { if(esBlanca(piezas[j])!=esBlanca(p)) movs.push(j); break; }
    }
  });
  return movs;
}

function linealesParcial(tab, i, direcciones){
  const p = tab[i], movs = [];
  direcciones.forEach(d=>{
    let j=i+d;
    while(j>=0&&j<64){
      if(Math.abs(col(j)-col(j-d))>1 && d!==-8 && d!==8) break;
      if(!tab[j]) { movs.push(j); j+=d; }
      else { if(esBlanca(tab[j])!=esBlanca(p)) movs.push(j); break; }
    }
  });
  return movs;
}

function dejaReyEnJaque(from,to){
  const copia = piezas.slice();
  copia[to] = copia[from];
  copia[from] = "";
  return reyEnJaque(copia,turnoBlancas);
}

function reyEnJaque(tab,blancas){
  const rey = tab.findIndex(p=>p===(blancas?"♔":"♚"));
  if(rey===-1) return true;
  for(let i=0;i<64;i++){
    if(tab[i] && (blancas?esNegra(tab[i]):esBlanca(tab[i]))){
      const movs = movimientosLegalesParcial(tab,i);
      if(movs.includes(rey)) return true;
    }
  }
  return false;
}

function movimientosLegalesParcial(tab,i){
  const p = tab[i];
  if(!p) return [];
  let movs = [];
  const f = fila(i), c = col(i);

  function agregar(j){ if(j>=0 && j<64 && (tab[j]==="" || esBlanca(tab[j])!=esBlanca(p))) movs.push(j); }

  if(p==="♙"){
    if(tab[i-8]==="") agregar(i-8);
    if(f===6 && tab[i-16]==="" && tab[i-8]==="") agregar(i-16);
    if(c>0 && esNegra(tab[i-9])) agregar(i-9);
    if(c<7 && esNegra(tab[i-7])) agregar(i-7);
  } else if(p==="♟"){
    if(tab[i+8]==="") agregar(i+8);
    if(f===1 && tab[i+16]==="" && tab[i+8]==="") agregar(i+16);
    if(c>0 && esBlanca(tab[i+7])) agregar(i+7);
    if(c<7 && esBlanca(tab[i+9])) agregar(i+9);
  } else if("♖♜".includes(p)) movs.push(...linealesParcial(tab,i,[-8,8,-1,1]));
  else if("♗♝".includes(p)) movs.push(...linealesParcial(tab,i,[-9,-7,7,9]));
  else if("♕♛".includes(p)) movs.push(...linealesParcial(tab,i,[-8,8,-1,1,-9,-7,7,9]));
  else if("♘♞".includes(p)) [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(s=>{
    const nf=f+s[0], nc=c+s[1]; 
    if(nf>=0&&nf<8&&nc>=0&&nc<8){ 
      const j=nf*8+nc; 
      if(!tab[j] || esBlanca(tab[j])!=esBlanca(p)) movs.push(j);
    }
  });
  else if("♔♚".includes(p)){
    for(let df=-1;df<=1;df++) for(let dc=-1;dc<=1;dc++){
        if(df===0 && dc===0) continue;
        const nf=f+df, nc=c+dc;
        if(nf>=0 && nf<8 && nc>=0 && nc<8){
            const j = nf*8+nc;
            if(!tab[j] || esBlanca(tab[j])!=esBlanca(p)) movs.push(j);
        }
    }
  }
 return movs;
}

function manejarClick(i){
  if(!piezas[i] && seleccion===null) return;

  if(seleccion===null){
    if((turnoBlancas && esBlanca(piezas[i])) || (!turnoBlancas && esNegra(piezas[i]))) {
      seleccion=i;
      dibujarTablero();
    }
  } else {
    const legales = movimientosLegales(seleccion);
    if(legales.includes(i)){
      const piezaMover = piezas[seleccion];
      const piezaCapturada = piezas[i] !== "" ? piezas[i] : null;
      
      let jaqueEstado = "";
      let tempPiezas = [...piezas];
      tempPiezas[i] = tempPiezas[seleccion];
      tempPiezas[seleccion] = "";
      if (reyEnJaque(tempPiezas, !turnoBlancas)) {
          const posiblesMovs = obtenerMovimientosLegales(!turnoBlancas, tempPiezas);
          if (posiblesMovs.length === 0) {
              jaqueEstado = "mate";
          } else {
              jaqueEstado = "jaque";
          }
      }

      let notacion;
      if (piezaMover === "♔" && Math.abs(seleccion - i) === 2) {
          if (i === 6) { 
              piezas[6] = "♔"; piezas[5] = "♖"; piezas[4] = ""; piezas[7] = "";
              movRey.blancas = true; movTorre.h1 = true;
          } else { 
              piezas[2] = "♔"; piezas[3] = "♖"; piezas[4] = ""; piezas[0] = "";
              movRey.blancas = true; movTorre.a1 = true;
          }
          notacion = generarNotacion(seleccion, i, piezaMover, null, jaqueEstado);
      } else if (piezaMover === "♚" && Math.abs(seleccion - i) === 2) {
          if (i === 62) {
              piezas[62] = "♚"; piezas[61] = "♜"; piezas[60] = ""; piezas[63] = "";
              movRey.negras = true; movTorre.h8 = true;
          } else {
              piezas[58] = "♚"; piezas[59] = "♜"; piezas[60] = ""; piezas[56] = "";
              movRey.negras = true; movTorre.a8 = true;
          }
          notacion = generarNotacion(seleccion, i, piezaMover, null, jaqueEstado);
      } else {
        piezas[i] = piezaMover;
        piezas[seleccion] = "";
        notacion = generarNotacion(seleccion, i, piezaMover, piezaCapturada, jaqueEstado);
        
        if(piezaMover==="♔") movRey.blancas=true;
        if(piezaMover==="♚") movRey.negras=true;
        if(piezaMover==="♖" && seleccion===56) movTorre.a1=true;
        if(piezaMover==="♖" && seleccion===63) movTorre.h1=true;
        if(piezaMover==="♜" && seleccion===0) movTorre.a8=true;
        if(piezaMover==="♜" && seleccion===7) movTorre.h8=true;
      }

      if(piezaMover==="♙"&&fila(i)===0) piezas[i]="♕";
      if(piezaMover==="♟"&&fila(i)===7) piezas[i]="♛";

      historial.push({from:seleccion,to:i, pieza:piezaMover, algebraic: notacion});
      turnoBlancas = !turnoBlancas;
      seleccion = null;
      dibujarTablero();
      actualizarChat();
      verificarJaqueYJaqueMate();

      if(!turnoBlancas) {
        setTimeout(jugarIA, 300);
      }
    } else {
      seleccion = null;
      dibujarTablero();
    }
  }
}

function verificarJaqueYJaqueMate() {
    const reyBlancoEnJaque = reyEnJaque(piezas, true);
    const reyNegroEnJaque = reyEnJaque(piezas, false);
    
    if (reyNegroEnJaque) {
        const movimientosNegros = obtenerMovimientosLegales(false, piezas);
        if (movimientosNegros.length === 0) {
            estado.textContent = "¡Jaque Mate! ¡Blancas ganan!";
            return true;
        } else {
            estado.textContent = "¡Jaque al Rey Negro!";
        }
    }
    
    if (reyBlancoEnJaque) {
        const movimientosBlancos = obtenerMovimientosLegales(true, piezas);
        if (movimientosBlancos.length === 0) {
            estado.textContent = "¡Jaque Mate! ¡Negras ganan!";
            return true;
        } else {
            estado.textContent = "¡Jaque al Rey Blanco!";
        }
    }
    
    if (!reyBlancoEnJaque && !reyNegroEnJaque) {
        estado.textContent = turnoBlancas ? "Turno de Blancas" : "Turno de Negras";
    }

    return false;
}

function obtenerMovimientosLegales(esBlanca, tableroTemp) {
    const todosLosMovs = [];
    for (let i = 0; i < 64; i++) {
        const pieza = tableroTemp[i];
        if (pieza && ((esBlanca && esBlanca(pieza)) || (!esBlanca && esNegra(pieza)))) {
            const movs = movimientosLegalesParcial(tableroTemp, i);
            movs.forEach(j => {
                const copia = [...tableroTemp];
                copia[j] = copia[i];
                copia[i] = "";
                if (!reyEnJaque(copia, esBlanca)) {
                    todosLosMovs.push([i, j]);
                }
            });
        }
    }
    return todosLosMovs;
}

function movimientosIA(){
  const movs=[];
  piezas.forEach((p,i)=>{ if(esNegra(p)) movimientosLegales(i).forEach(j=>movs.push([i,j])); });
  return movs;
}

function evaluarTablero(tab = piezas){
  let val=0; 
  tab.forEach(p=>{ if(esBlanca(p)) val+=valores[p]||0; if(esNegra(p)) val-=(valores[p]||0); });
  return val;
}

function jugarIA(){
  const nivel=parseInt(nivelIA.value);
  const movs=movimientosIA();
  if(!movs.length) return;
  let movimiento;

  if(nivel===0){
    // Nivel Fácil: Movimiento aleatorio
    movimiento=movs[Math.floor(Math.random()*movs.length)];
  } else if(nivel===1){
    // Nivel Medio: Prioriza capturas sobre otros movimientos
    const capturas = movs.filter(m => esBlanca(piezas[m[1]]));
    if (capturas.length > 0) {
        movimiento = capturas[Math.floor(Math.random() * capturas.length)];
    } else {
        movimiento = movs[Math.floor(Math.random() * movs.length)];
    }
  } else {
    // Nivel Difícil: Busca el mejor movimiento (el que minimiza el valor del tablero para las negras)
    let mejorVal=Infinity;
    let mejoresMovs = [];

    movs.forEach(m => {
        const copia = piezas.slice();
        copia[m[1]] = copia[m[0]];
        copia[m[0]] = "";
        const val = evaluarTablero(copia);
        if (val < mejorVal) {
            mejorVal = val;
            mejoresMovs = [m];
        } else if (val === mejorVal) {
            mejoresMovs.push(m);
        }
    });
    movimiento = mejoresMovs[Math.floor(Math.random() * mejoresMovs.length)];
  }
  
  const piezaCapturada = piezas[movimiento[1]] !== "" ? piezas[movimiento[1]] : null;

  let jaqueEstado = "";
  let tempPiezas = [...piezas];
  tempPiezas[movimiento[1]] = tempPiezas[movimiento[0]];
  tempPiezas[movimiento[0]] = "";
  if (reyEnJaque(tempPiezas, !turnoBlancas)) {
      const posiblesMovs = obtenerMovimientosLegales(true, tempPiezas);
      if (posiblesMovs.length === 0) {
          jaqueEstado = "mate";
      } else {
          jaqueEstado = "jaque";
      }
  }

  const notacion = generarNotacion(movimiento[0], movimiento[1], piezas[movimiento[0]], piezaCapturada, jaqueEstado);
  
  piezas[movimiento[1]] = piezas[movimiento[0]];
  piezas[movimiento[0]] = "";
  
  if(piezas[movimiento[1]]==="♟" && fila(movimiento[1])===7) piezas[movimiento[1]]="♛";

  historial.push({from: movimiento[0], to: movimiento[1], pieza: piezas[movimiento[1]], algebraic: notacion});
  turnoBlancas=true;
  dibujarTablero();
  actualizarChat();
  verificarJaqueYJaqueMate();
}

function nuevoJuego(){ inicializarTablero(); }

inicializarTablero();