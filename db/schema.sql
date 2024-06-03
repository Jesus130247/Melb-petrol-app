CREATE DATABASE petrol_stations;

CREATE TABLE owners(
    id SERIAL PRIMARY KEY,
    brand_name TEXT
);

CREATE TABLE location(
    id SERIAL PRIMARY KEY,
    address TEXT,
    suburb TEXT,
    lng FLOAT NOT NULL,
    lat FLOAT NOT NULL
);

CREATE TABLE stations(
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    location_id INT NOT NULL,
    station_name TEXT,
    FOREIGN KEY (owner_id) REFERENCES owners (id),
    FOREIGN KEY (location_id) REFERENCES location (id) ON DELETE CASCADE  
);

-- brand_img can be deleted if google provides
--------------------------------------------EDIT UNDER HERE--------------------------------------------------------------


