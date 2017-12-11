USE sweet_talk_db;

INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://media.npr.org/assets/img/2013/09/16/breakingbadformon_sq-22bf65a058ea8a79c43368f6d02ae5583eba0f13-s300-c85.jpg','WalterWhite', false, 'password','m','f',46,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/billy-bob-thornton-5.jpg','BillyBob', false, 'password','m','f',58,curdate(),curdate(), 'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://static0.therichestimages.com/wp-content/uploads/Geraldo-Rivera.jpg','GeraldoRivera', false, 'password','m','f',28,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('http://d3trabu2dfbdfb.cloudfront.net/2/2/2217301_300x300_1.jpeg','Jimbo', false, 'password','m','m',42,curdate(),curdate(), 'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/butch-patric-2.jpg','Butch', false, 'password','m','m',56,curdate(),curdate(), 'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://pbs.twimg.com/profile_images/625725471871864832/HDGuGk6K_400x400.jpg','Bearman69', false, 'password','m','m',27,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.colorado.edu/law/sites/default/files/styles/small/public/attached-files/jensen-roxanne-thumbnail.jpg','Roxanne', false, 'password','f','m',46,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_80%2Cw_300/MTE1ODA0OTcxOTA3Mzg0ODQ1/tiffany-16549793-1-402.jpg','Tiffany', false, 'password','f','m',36,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://i.mydramalist.com/V4QKOm.jpg','MarySue', false, 'password','f','m',25,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_80%2Cw_300/MTE5NTU2MzE2NDM2NTMwNjk5/martha-stewart-9542234-1-402.jpg','Martha', false, 'password','f','f',41,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/abby-donnelly-3.jpg','Abby', false, 'password','f','f',18,curdate(),curdate(),'This is the best dating app ever');
INSERT INTO users (img, userName, OnLine, password, gender, seeking, age, createdAt, updatedAt, bio) VALUES ('https://www.famousbirthdays.com/headshots/bebe-neuwirth-1.jpg','Bebe', false, 'password','f','f',51,curdate(),curdate(),'This is the best dating app ever');


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



