class Blocco {
	constructor(x, y, d, m, v) {
		this.pos_x = x;
		this.pos_y = y;
		this.dim = d;
		this.massa = m;
		this.vel = v;
		this.colore = color(random(255), random(255), random(255));
	}

	CALCOLA_NUOVA_POSIZIONE() {
		this.pos_x += this.vel;
	}

	CERCA_COLLISIONE_CON_MURO() {
		return this.pos_x < 0;
	}

	CERCA_UNA_COLLISIONE(tizio) {
		return this.pos_x > tizio.pos_x - this.dim && tizio.pos_x + tizio.dim > this.pos_x;
	}

	STAI_COLPENDO(tizio) {
		const v1 = this.vel;
		const v2 = tizio.vel;
		const somma_masse = this.massa + tizio.massa;
		return (this.massa - tizio.massa) / somma_masse * v1 + 2 * tizio.massa / somma_masse * v2;
	}

	DISEGNINO() {
		noStroke();
		fill(this.colore);
		rect(this.pos_x, this.pos_y - this.dim, this.dim, this.dim);
	}
}
