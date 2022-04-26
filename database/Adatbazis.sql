﻿CREATE DATABASE FoodE
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

use FoodE;

CREATE TABLE foode.user (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  omAzon VARCHAR(255) NOT NULL UNIQUE,
  jelszo VARCHAR(255) NOT NULL,
  nev VARCHAR(255) NOT NULL,
  schoolsId INT(11) NOT NULL,
  osztaly VARCHAR(255) DEFAULT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE foode.roles (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nev VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE foode.orders (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  menuId INT(11) NOT NULL,
  userId INT(11) NOT NULL,
  reggeli BOOLEAN NOT NULL,
  tizorai BOOLEAN NOT NULL,
  ebed BOOLEAN NOT NULL,
  uzsonna BOOLEAN NOT NULL,
  vacsora BOOLEAN NOT NULL,
  ar INT(11) NOT NULL,
  lemondva DATE DEFAULT NULL,
  ebedelt VARCHAR(5) DEFAULT NULL
);

CREATE TABLE foode.days (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  datum DATE NOT NULL UNIQUE  
);

CREATE TABLE foode.menu (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  daysId INT(11) NOT NULL,
  reggeliId INT(11) NOT NULL,
  tizoraiId INT(11) NOT NULL,
  ebedId INT(11) NOT NULL,
  uzsonnaId INT(11) NOT NULL,
  vacsoraId INT(11) NOT NULL
);

CREATE TABLE foode.meal (
  id INT(11) NOT NULL PRIMARY KEY,
  nev VARCHAR(255) NOT NULL,
  energia VARCHAR(100) DEFAULT NULL,
  feherje VARCHAR(100) DEFAULT NULL,
  zsir VARCHAR(100) DEFAULT NULL,
  tZsir VARCHAR(100) DEFAULT NULL,
  szenhidrat VARCHAR(100) DEFAULT NULL,
  cukor VARCHAR(100) DEFAULT NULL,
  so VARCHAR(100) DEFAULT NULL,
  allergenek VARCHAR(100) DEFAULT NULL
);

CREATE TABLE foode.user_role (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT(11) NOT NULL,
  roleId INT(11) NOT NULL
);

CREATE TABLE user_pending (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  omAzon VARCHAR(255) NOT NULL UNIQUE,
  jelszo VARCHAR(255) NOT NULL,
  nev VARCHAR(255) NOT NULL,
  schoolsId INT(11) NOT NULL,
  osztaly VARCHAR(255) DEFAULT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE foode.schools (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nev VARCHAR(255) NOT NULL UNIQUE,
  iskolaOM VARCHAR(255) NOT NULL UNIQUE
);

ALTER TABLE user 
  ADD CONSTRAINT FK_user_schools_id FOREIGN KEY (schoolsId)
    REFERENCES schools(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE foode.user_pending 
  ADD CONSTRAINT FK_user_pending_schools_id FOREIGN KEY (schoolsId)
    REFERENCES foode.schools(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE orders 
  ADD CONSTRAINT FK_orders_user_id FOREIGN KEY (userId)
    REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE orders 
  ADD CONSTRAINT FK_orders_menu_id FOREIGN KEY (menuId)
    REFERENCES menu(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE menu 
  ADD CONSTRAINT FK_menu_days_id FOREIGN KEY (daysId)
    REFERENCES days(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE menu 
  ADD CONSTRAINT FK_menu_meal_reggeliId FOREIGN KEY (reggeliId)
    REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE menu 
  ADD CONSTRAINT FK_menu_meal_tizoraiId FOREIGN KEY (tizoraiId)
    REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE menu 
  ADD CONSTRAINT FK_menu_meal_ebedId FOREIGN KEY (ebedId)
    REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE menu 
  ADD CONSTRAINT FK_menu_meal_uzsonnaId FOREIGN KEY (uzsonnaId)
    REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE menu 
  ADD CONSTRAINT FK_menu_meal_vacsoraId FOREIGN KEY (vacsoraId)
    REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE user_role 
  ADD CONSTRAINT FK_user_role_user_id FOREIGN KEY (userId)
    REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE user_role 
  ADD CONSTRAINT FK_user_role_roles_id FOREIGN KEY (roleId)
    REFERENCES roles(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO roles (nev)
VALUES ('admin'),
       ('user'),
       ('alkalmazott');

INSERT INTO schools (nev, iskolaOM)
VALUES ('Jedlik', 203037),
       ('Alma', 112233);

INSERT INTO user (`omAzon`, `jelszo`, `nev`, `schoolsId`, `osztaly`, `email`)
VALUES ('20303340312','$2a$10$iS0peTuztACfnWELT.WYCucW8n.RN659jfNaJNpLenT4kXPBu2PLe','Admin Isztratív','1',null,'admin@jedlik.eu');

INSERT INTO user_role (userId, roleId) VALUES (1, 1);

INSERT INTO user_pending (`omAzon`, `jelszo`, `nev`, `schoolsId`, `osztaly`, `email`)
VALUES ('1234567891','$2a$10$iS0peTuztACfnWELT.WYCucW8n.RN659jfNaJNpLenT4kXPBu2PLe','Teszt Elek','1', '1D','teszt@jedlik.eu');