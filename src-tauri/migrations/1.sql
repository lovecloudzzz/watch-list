CREATE TABLE IF NOT EXISTS Lists (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS Franchises (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Tags (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Titles (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    series INTEGER,
    duration INTEGER,
    urlPoster VARCHAR(255),
    yearRelease INTEGER,
    type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Ratings (
       id INTEGER PRIMARY KEY,
       title_id INTEGER,
       score INTEGER,
       FOREIGN KEY (title_id) REFERENCES Titles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TitlesList (
      list_id INTEGER,
      title_id INTEGER,
      FOREIGN KEY (list_id) REFERENCES Lists(id) ON DELETE CASCADE,
      FOREIGN KEY (title_id) REFERENCES Titles(id) ON DELETE CASCADE,
      PRIMARY KEY (list_id, title_id)
);

CREATE TABLE IF NOT EXISTS TitleFranchise (
      franchise_id INTEGER,
      title_id INTEGER,
      FOREIGN KEY (franchise_id) REFERENCES Franchises(id) ON DELETE CASCADE,
      FOREIGN KEY (title_id) REFERENCES Titles(id) ON DELETE CASCADE,
      PRIMARY KEY (franchise_id, title_id)
);

CREATE TABLE IF NOT EXISTS TitleTags (
     title_id INTEGER,
     tag_id INTEGER,
     FOREIGN KEY (title_id) REFERENCES Titles(id) ON DELETE CASCADE,
     FOREIGN KEY (tag_id) REFERENCES Tags(id) ON DELETE CASCADE,
     PRIMARY KEY (title_id, tag_id)
);

