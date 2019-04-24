p5.disableFriendlyErrors = true;

let blocco1;
let blocco2;

let contatore;
let cifre;
let sotto_passaggi;
let naa;
let suono;
let suono_consentito;

let geometria;
let old_pox;
let old_posy;

function preload() {
	suono = loadSound('medias/hit.mp3');
}

function setup() {
	createCanvas(windowWidth - 50, 400);
	geometria = createGraphics(400, 400);
	geometria.clear();
	geometria.stroke(230);
	geometria.strokeWeight(3);
	geometria.noFill();
	geometria.ellipse(geometria.width / 2, geometria.height / 2, 300, 300);
	INIZIALIZZA_SIMULAZIONE();
}

function draw() {
	background(51);
	for (let passaggio = 0; passaggio < sotto_passaggi; passaggio++) {
		blocco1.CALCOLA_NUOVA_POSIZIONE();
		blocco2.CALCOLA_NUOVA_POSIZIONE();

		if (blocco1.CERCA_COLLISIONE_CON_MURO()) {
			AGGIORNA_CONTATORE();
			blocco1.vel *= -1;
		}
		if (blocco1.CERCA_UNA_COLLISIONE(blocco2)) {
			AGGIORNA_CONTATORE();
			const nuova_vel1 = blocco1.STAI_COLPENDO(blocco2);
			const nuova_vel2 = blocco2.STAI_COLPENDO(blocco1);
			blocco1.vel = nuova_vel1;
			blocco2.vel = nuova_vel2;
		}
	}
	blocco1.DISEGNINO();
	blocco2.DISEGNINO();
	ABBIAMO_FINITO();
	geometria.push();
	geometria.translate(geometria.width / 2, geometria.height / 2);
	geometria.rotate(-HALF_PI);
	geometria.stroke(255, 200, 30);
	geometria.strokeWeight(1);
	geometria.line(old_pox, old_posy, sqrt(blocco1.massa) * blocco1.vel * 150, sqrt(blocco2.massa) * blocco2.vel * 150);
	old_pox = sqrt(blocco1.massa) * blocco1.vel * 150;
	old_posy = sqrt(blocco2.massa) * blocco2.vel * 150;
	geometria.stroke(200, 255, 30);
	geometria.strokeWeight(6);
	geometria.point(old_pox, old_posy);
	geometria.pop();

	image(geometria, width - 400, 0);
}

function INIZIALIZZA_SIMULAZIONE() {
	contatore = 0;
	cifre = 2;
	sotto_passaggi = 10 ** (cifre - 1);
	blocco1 = new Blocco(100, 400, 50, 1, 0);
	blocco2 = new Blocco(300, 400, 150, 100 ** (cifre - 1), -1 / sotto_passaggi);
	loop();
}

function ABBIAMO_FINITO() {
	if (blocco1.vel >= 0 && blocco2.vel >= 0 && blocco1.vel <= blocco2.vel) {
		noLoop();
	}
}

function AGGIORNA_CONTATORE() {
	contatore++;
	if (suono.isPlaying() == false) {
		suono.play();
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 50, 400);
}
