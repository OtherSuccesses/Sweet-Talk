

INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://media.npr.org/assets/img/2013/09/16/breakingbadformon_sq-22bf65a058ea8a79c43368f6d02ae5583eba0f13-s300-c85.jpg','WalterWhite', 'password','m','f',46,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/billy-bob-thornton-5.jpg','BillyBob', 'password','m','f',58,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://static0.therichestimages.com/wp-content/uploads/Geraldo-Rivera.jpg','GeraldoRivera', 'password','m','f',28,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('http://d3trabu2dfbdfb.cloudfront.net/2/2/2217301_300x300_1.jpeg','Jimbo', 'password','m','m',42,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/butch-patric-2.jpg','Butch', 'password','m','m',56,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://pbs.twimg.com/profile_images/625725471871864832/HDGuGk6K_400x400.jpg','Bearman69', 'password','m','m',27,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.colorado.edu/law/sites/default/files/styles/small/public/attached-files/jensen-roxanne-thumbnail.jpg','Roxanne', 'password','f','m',46,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_80%2Cw_300/MTE1ODA0OTcxOTA3Mzg0ODQ1/tiffany-16549793-1-402.jpg','Tiffany', 'password','f','m',36,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://i.mydramalist.com/V4QKOm.jpg','MarySue', 'password','f','m',25,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_80%2Cw_300/MTE5NTU2MzE2NDM2NTMwNjk5/martha-stewart-9542234-1-402.jpg','Martha', 'password','f','f',41,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/abby-donnelly-3.jpg','Abby', 'password','f','f',18,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/bebe-neuwirth-1.jpg','Bebe', 'password','f','f',51,curdate(),curdate(),'This is the best dating app ever');


CREATE TABLE WalterWhite (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE BillyBob (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE GeraldoRivera (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Jimbo (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Butch (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Bearman69(
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Roxanne (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Tiffany (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE MarySue (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Martha (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Abby (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
);
CREATE TABLE Bebe (
	id INT AUTO_INCREMENT,
	userName VARCHAR(255),
	swiped BOOLEAN,
	PRIMARY KEY (id)
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



