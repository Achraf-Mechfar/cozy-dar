CREATE TABLE user (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(100),
  user_role VARCHAR(20) CHECK (user_role IN ('visitor', 'owner', 'admin')) DEFAULT 'visitor',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_auth (
  user_id INTEGER PRIMARY KEY REFERENCES user(user_id) ON DELETE CASCADE,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone VARCHAR(20) UNIQUE,
);

CREATE TABLE property (
  property_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  property_type VARCHAR(50),
  owner_id INTEGER REFERENCES user(user_id) ON DELETE CASCADE,
    location VARCHAR(255),
lat DECIMAL(9,6),
lng DECIMAL(9,6),
    distance_from_beach DECIMAL(5,2)

);

CREATE TABLE units (
  unit_id SERIAL PRIMARY KEY,
  property_id INTEGER REFERENCES property(property_id) ON DELETE CASCADE,
  price_per_night DECIMAL(10,2),
  rooms INTEGER,
  bathrooms INTEGER,
  image_urls TEXT[],
  virtual_tour_url TEXT,
  available_from DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE amenities (
  amenity_id SERIAL PRIMARY KEY,
  amenity VARCHAR(100) UNIQUE NOT NULL,
  icon_url TEXT
);

CREATE TABLE unit_amenities (
  unit_id INTEGER REFERENCES units(unit_id) ON DELETE CASCADE,
  amenity_id INTEGER REFERENCES amenities(amenity_id) ON DELETE CASCADE,
  PRIMARY KEY (unit_id, amenity_id)
);

CREATE TABLE residence (
    property_id INTEGER PRIMARY KEY REFERENCES property(property_id) ON DELETE CASCADE,
    rooms INTEGER[],
    min_price INTEGER,
    max_price INTEGER,
    image_urls TEXT[]
);

CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user(user_id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES property(property_id) ON DELETE CASCADE,  -- Reference to the property itself
    unit_id INTEGER REFERENCES units(unit_id) ON DELETE CASCADE,  -- Nullable, for house units
    residence_id INTEGER REFERENCES residence(property_id) ON DELETE CASCADE,  -- Nullable, for residence properties
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, unit_id, residence_id)  -- Ensure a user can only favorite either a unit or a residence once
);

CREATE TABLE upcoming_rent (
  rent_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user(user_id) ON DELETE CASCADE,
  unit_id INTEGER REFERENCES units(unit_id) ON DELETE SET NULL,
  strt_date DATE NOT NULL,
  end_date DATE NOT NULL,
  msg TEXT,
  confirmed BOOLEAN DEFAULT FALSE,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rent_history (
  rent_id INTEGER PRIMARY KEY REFERENCES user(user_id),
  user_id INTEGER REFERENCES user(user_id) ON DELETE CASCADE,
  unit_id INTEGER REFERENCES units(unit_id) ON DELETE SET NULL,
  strt_date DATE NOT NULL,
  end_date DATE NOT NULL,
  msg TEXT,
  price DECIMAL(10,2)
);
