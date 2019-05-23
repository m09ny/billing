CREATE TABLE MATERIALE(
	id SERIAL PRIMARY KEY,
	tip VARCHAR(50),
	denumire VARCHAR(50),
	grosimeCm VARCHAR(50),
	tipo VARCHAR(50),
	finisaj VARCHAR(50),
	pretFaraTva REAL,
	pretCuTva REAL,
	material VARCHAR(250)	
);