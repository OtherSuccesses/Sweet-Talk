

INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('WalterWhite', false, 'password','m','f',46,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('BillyBob', false, 'password','m','f',58,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('GeraldoRivera', false, 'password','m','f',28,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Jimbo', false, 'password','m','m',42,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Butch', false, 'password','m','m',56,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Bearman69', false, 'password','m','m',27,curdate(),curdate());


INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Roxanne', false, 'password','f','m',46,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Tiffany', false, 'password','f','m',36,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('MarySue', false, 'password','f','m',25,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Martha', false, 'password','f','f',41,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Abby', false, 'password','f','f',18,curdate(),curdate());
INSERT INTO users (userName, online, password, gender, seeking, age, createdAt, updatedAt) VALUES ('Bebe', false, 'password','f','f',51,curdate(),curdate());


CREATE TABLE WalterWhite (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE BillyBob (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE GeraldoRivera (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Jimbo (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Butch (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Bearman69(
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Roxanne (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Tiffany (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE MarySue (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Martha (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Abby (
	userName VARCHAR(255),
	swiped BOOLEAN
);
CREATE TABLE Bebe (
	userName VARCHAR(255),
	swiped BOOLEAN
);
INSERT INTO WalterWhite (userName, swiped) VALUES ('Roxanne', true);
INSERT INTO WalterWhite (userName, swiped) VALUES ('Tiffany', true);
INSERT INTO WalterWhite (userName, swiped) VALUES ('MarySue', false);

INSERT INTO BillyBob (userName, swiped) VALUES ('Roxanne', true);
INSERT INTO BillyBob (userName, swiped) VALUES ('Tiffany', false);
INSERT INTO BillyBob (userName, swiped) VALUES ('MarySue', true);

INSERT INTO GeraldoRivera (userName, swiped) VALUES ('Roxanne', false);
INSERT INTO GeraldoRivera (userName, swiped) VALUES ('Tiffany', true);
INSERT INTO GeraldoRivera (userName, swiped) VALUES ('MarySue', true);

INSERT INTO Jimbo (userName, swiped) VALUES ('Butch', true);
INSERT INTO Jimbo (userName, swiped) VALUES ('Bearman69', true);

INSERT INTO Butch (userName, swiped) VALUES ('Jimbo', true);
INSERT INTO Butch (userName, swiped) VALUES ('Bearman69', false);

INSERT INTO Bearman69 (userName, swiped) VALUES ('Butch', false);
INSERT INTO Bearman69 (userName, swiped) VALUES ('Jimbo', true);

INSERT INTO Roxanne (userName, swiped) VALUES ('WalterWhite', true);
INSERT INTO Roxanne (userName, swiped) VALUES ('BillyBob', false);
INSERT INTO Roxanne (userName, swiped) VALUES ('GeraldoRivera', true);

INSERT INTO Tiffany (userName, swiped) VALUES ('WalterWhite', false);
INSERT INTO Tiffany (userName, swiped) VALUES ('BillyBob', true);
INSERT INTO Tiffany (userName, swiped) VALUES ('GeraldoRivera', true);

INSERT INTO MarySue (userName, swiped) VALUES ('WalterWhite', true);
INSERT INTO MarySue (userName, swiped) VALUES ('BillyBob', true);
INSERT INTO MarySue (userName, swiped) VALUES ('GeraldoRivera', false);

INSERT INTO Martha (userName, swiped) VALUES ('Abby', true);
INSERT INTO Martha (userName, swiped) VALUES ('Bebe', false);

INSERT INTO Abby (userName, swiped) VALUES ('Bebe', true);
INSERT INTO Abby (userName, swiped) VALUES ('Martha', true);

INSERT INTO Bebe (userName, swiped) VALUES ('Abby', false);
INSERT INTO Bebe (userName, swiped) VALUES ('Martha', true);



