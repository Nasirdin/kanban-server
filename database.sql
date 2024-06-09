create TABLE IF NOT EXISTS person(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  login VARCHAR(255),
  password VARCHAR(255)
);

create TABLE newTask(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(255),
  status VARCHAR(255) DEFAULT 'new',
  authorId INTEGER,
  FOREIGN KEY (authorId) REFERENCES person (id)
);


