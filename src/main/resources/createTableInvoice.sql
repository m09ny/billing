CREATE TABLE INVOICE(
	id SERIAL PRIMARY KEY,
	orders_id BIGINT,
	lungime REAL, 
	latime REAL, 
	profilareL1 REAL, 
	profilareL2 REAL, 
	profilareLstg REAL, 
	profilareLdr REAL, 
	picuratorL1 REAL, 
	picuratorL2 REAL, 
	picuratorLstg REAL, 
	picuratorLdr REAL, 
	nrBuc REAL, 
	taiereML REAL,
	profilare REAL,
	picurator REAL,
	suprafata REAL
);