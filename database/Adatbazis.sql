CREATE DATABASE FoodE CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

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

ALTER TABLE
  user
ADD
  CONSTRAINT FK_user_schools_id FOREIGN KEY (schoolsId) REFERENCES schools(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
  foode.user_pending
ADD
  CONSTRAINT FK_user_pending_schools_id FOREIGN KEY (schoolsId) REFERENCES foode.schools(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
  orders
ADD
  CONSTRAINT FK_orders_user_id FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  orders
ADD
  CONSTRAINT FK_orders_menu_id FOREIGN KEY (menuId) REFERENCES menu(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  menu
ADD
  CONSTRAINT FK_menu_days_id FOREIGN KEY (daysId) REFERENCES days(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  menu
ADD
  CONSTRAINT FK_menu_meal_reggeliId FOREIGN KEY (reggeliId) REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  menu
ADD
  CONSTRAINT FK_menu_meal_tizoraiId FOREIGN KEY (tizoraiId) REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  menu
ADD
  CONSTRAINT FK_menu_meal_ebedId FOREIGN KEY (ebedId) REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  menu
ADD
  CONSTRAINT FK_menu_meal_uzsonnaId FOREIGN KEY (uzsonnaId) REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  menu
ADD
  CONSTRAINT FK_menu_meal_vacsoraId FOREIGN KEY (vacsoraId) REFERENCES meal(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  user_role
ADD
  CONSTRAINT FK_user_role_user_id FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE
  user_role
ADD
  CONSTRAINT FK_user_role_roles_id FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO
  roles (nev)
VALUES
  ('admin'),
  ('user'),
  ('alkalmazott');

INSERT INTO
  schools (nev, iskolaOM)
VALUES
  ('Jedlik', 203037),
  ('Alma', 112233);

INSERT INTO
  user (
    `omAzon`,
    `jelszo`,
    `nev`,
    `schoolsId`,
    `osztaly`,
    `email`
  )
VALUES
  (
    '20303340312',
    '$2a$10$iS0peTuztACfnWELT.WYCucW8n.RN659jfNaJNpLenT4kXPBu2PLe',
    'Admin Isztratív',
    '1',
    null,
    'admin@jedlik.eu'
  );

INSERT INTO
  user_role (userId, roleId)
VALUES
  (1, 1);

INSERT INTO
  user_pending (
    `omAzon`,
    `jelszo`,
    `nev`,
    `schoolsId`,
    `osztaly`,
    `email`
  )
VALUES
  (
    '1234567891',
    '$2a$10$iS0peTuztACfnWELT.WYCucW8n.RN659jfNaJNpLenT4kXPBu2PLe',
    'Teszt Elek',
    '1',
    '1D',
    'teszt@jedlik.eu'
  );

INSERT INTO
  user (
    `omAzon`,
    `jelszo`,
    `nev`,
    `schoolsId`,
    `osztaly`,
    `email`
  )
VALUES
  (
    '1234567892',
    '$2a$10$iS0peTuztACfnWELT.WYCucW8n.RN659jfNaJNpLenT4kXPBu2PLe',
    'Winch Eszter',
    '1',
    '1D',
    'winch@jedlik.eu'
  ),
  (
    '1234567893',
    '$2a$10$iS0peTuztACfnWELT.WYCucW8n.RN659jfNaJNpLenT4kXPBu2PLe',
    'Kis Pista',
    '1',
    '1D',
    'kis@jedlik.eu'
  );

INSERT INTO
  user_role (userId, roleId)
VALUES
  (2, 2),
  (3, 2);

INSERT INTO
  meal(
    id,
    nev,
    energia,
    feherje,
    zsir,
    tZsir,
    szenhidrat,
    cukor,
    so,
    allergenek
  )
VALUES
  (
    202205301,
    'Erdei gyümölcstea Natúr sajtkrémes Zsemle\nCsirkemell sonkával Kaliforniai Paprikával Túró Rudi',
    '599.23 Kcal / 2,504.78 Kj',
    '22.86 g',
    '20.57 g',
    '11.52 g',
    '79.70 g',
    '15.00 g',
    '2.35 g',
    '1.7'
  ),
  (
    202205302,
    'Kenőmájas\nZsemle',
    '411.96 Kcal / 1,721.99 Kj',
    '14.72 g',
    '11.53 g',
    '4.30 g',
    '61.83 g',
    '0.00 g',
    '1.47 g',
    '1,(6),(7),(10)'
  ),
  (
    202205303,
    'Brokkoli krémleves Levesgyönggyel Bácskai rizseshús Céklasalátával Alma',
    '912.95 Kcal / 3,816.13 Kj',
    '37.53 g',
    '27.35 g',
    '6.42 g',
    '127.04 g',
    '8.29 g',
    '3.27 g',
    '1,3,7,9,15,(12)'
  ),
  (
    202205304,
    'Margarinos Korpás kenyér Toast felvágottal Jégcsapretekkel',
    '395.81 Kcal / 1,654.49 Kj',
    '17.36 g',
    '11.40 g',
    '2.98 g',
    '55.93 g',
    '6.24 g',
    '1.93 g',
    '1,(7)'
  ),
  (
    202205305,
    'Citromos tea Kifli\nPaprikás szalámival Kockasajttal Paprikával',
    '557.44 Kcal / 2,330.10 Kj',
    '20.41 g',
    '22.37 g',
    '10.86 g',
    '67.86 g',
    '19.99 g',
    '3.02 g',
    '1.7'
  ),
  (
    202205311,
    'Citromos tea Margarinos Graham kenyér Párizsival Paradicsommal Sajtos rúd',
    '498.89 Kcal / 2,085.36 Kj',
    '16.21 g',
    '16.39 g',
    '6.86 g',
    '71.12 g',
    '19.99 g',
    '3.07 g',
    '1,7,(3),(6),(8),(11),(12)'
  ),
  (
    202205312,
    'Zöldfűszeres vajkrémes Zsemle',
    '425.12 Kcal / 1,777.00 Kj',
    '10.40 g',
    '16.70 g',
    '7.99 g',
    '57.80 g',
    '0.00 g',
    '1.03 g',
    '1.7'
  ),
  (
    202205313,
    'Magyaros csipetkeleves Burgonyafőzelék Stefánia vagdalttal Félbarna kenyérrel',
    '1,103.19 Kcal / 4,611.33 Kj',
    '42.73 g',
    '48.03 g',
    '11.38 g',
    '123.15 g',
    '0.02 g',
    '9.77 g',
    '1,3,7,9'
  ),
  (
    202205314,
    'Mogyorókréms\nKifli',
    '432.78 Kcal / 1,809.02 Kj',
    '10.12 g',
    '12.96 g',
    '0.47 g',
    '68.40 g',
    '19.20 g',
    '0.82 g',
    '1,5,6,7,8'
  ),
  (
    202205315,
    'Barackos tea Pizzaszelet',
    '703.17 Kcal / 2,939.25 Kj',
    '25.60 g',
    '20.26 g',
    '6.08 g',
    '103.87 g',
    '20.19 g',
    '2.19 g',
    '1,3,7'
  ),
  (
    202206011,
    'Barackos tea Margarinos Rozskenyér Csirkemell sonkával Paprikával Vajas\nKifli',
    '599.06 Kcal / 2,504.07 Kj',
    '17.37 g',
    '17.63 g',
    '10.76 g',
    '91.91 g',
    '36.19 g',
    '2.06 g',
    '1.7'
  ),
  (
    202206012,
    'Sajtkrémes rúd',
    '328.00 Kcal / 1,371.04 Kj',
    '15.98 g',
    '4.62 g',
    '7.22 g',
    '66.56 g',
    '0.00 g',
    '3.38 g',
    '1.7'
  ),
  (
    202206013,
    'Csontleves Bologna spagetti Reszelt sajttal',
    '826.15 Kcal / 3,453.31 Kj',
    '41.97 g',
    '35.23 g',
    '10.52 g',
    '84.26 g',
    '5.04 g',
    '6.87 g',
    '1,3,7,9'
  ),
  (
    202206014,
    'Lekváros bukta',
    '819.18 Kcal / 3,424.17 Kj',
    '9.06 g',
    '43.86 g',
    '11.68 g',
    '95.98 g',
    '43.62 g',
    '1.62 g',
    '1,7,(3),(6),(12)'
  ),
  (
    202206015,
    'Csipkebogyó tea Túrógombóc Tejföllel Porcukorral',
    '865.29 Kcal / 3,616.91 Kj',
    '35.76 g',
    '36.86 g',
    '15.38 g',
    '96.49 g',
    '39.24 g',
    '1.59 g',
    '1,3,7'
  ),
  (
    202206021,
    'Tej Margarinos Zsemle\nOlasz felvágottal Jégcsapretekkel Gabonagolyó',
    '646.02 Kcal / 2,700.36 Kj',
    '22.99 g',
    '23.76 g',
    '8.71 g',
    '84.46 g',
    '6.24 g',
    '3.78 g',
    '1,7,(3),(5)'
  ),
  (
    202206022,
    'Gyümölcsös joghurt\nKifli',
    '384.67 Kcal / 1,607.92 Kj',
    '13.11 g',
    '6.35 g',
    '3.33 g',
    '68.05 g',
    '12.99 g',
    '1.31 g',
    '1.7'
  ),
  (
    202206023,
    'Karfiolleves Mézes mustáros pulykamell Párolt rizzsel',
    '670.53 Kcal / 2,802.82 Kj',
    '34.75 g',
    '21.60 g',
    '3.43 g',
    '94.08 g',
    '4.09 g',
    '3.97 g',
    '7,9,10,(12)'
  ),
  (
    202206024,
    'Magyaros vajkrémes Korpás zsemle Uborkával',
    '429.82 Kcal / 1,796.65 Kj',
    '10.80 g',
    '16.74 g',
    '7.99 g',
    '58.48 g',
    '0.00 g',
    '1.04 g',
    '1.7'
  ),
  (
    202206025,
    'Erdei gyümölcstea\nGyros',
    '584.96 Kcal / 2,445.13 Kj',
    '31.00 g',
    '27.99 g',
    '8.77 g',
    '51.61 g',
    '12.12 g',
    '4.38 g',
    '7,(1),(10)'
  ),
  (
    202206031,
    'Vaníliás tej Kalács Margarinnal Gyümölcslekvárral',
    '820.43 Kcal / 3,429.40 Kj',
    '22.86 g',
    '20.57 g',
    '11.52 g',
    '79.70 g',
    '15.00 g',
    '2.35 g',
    '1,3,7,(12)'
  ),
  (
    202206032,
    'Csokoládékrémes rúd',
    '730.66 Kcal / 3,054.16 Kj',
    '23.42 g',
    '52.92 g',
    '20.14 g',
    '39.32 g',
    '0.00 g',
    '2.76 g',
    '1,7,(3),(6),(8),(11),(12)'
  ),
  (
    202206033,
    'Tojásleves Káposztás tészta Porcukorral',
    '516.01 Kcal / 2,156.92 Kj',
    '15.71 g',
    '8.86 g',
    '1.19 g',
    '92.49 g',
    '15.00 g',
    '3.12 g',
    '1,3,9'
  ),
  (
    202206034,
    'Margarinos Graham kenyér Paprikás szalámival',
    '488.21 Kcal / 2,040.72 Kj',
    '16.04 g',
    '18.16 g',
    '5.22 g',
    '64.86 g',
    '0.00 g',
    '2.92 g',
    '1,(7)'
  ),
  (
    202206035,
    'Ásványvíz, Májkrém,\nZsemle',
    '411.96 Kcal / 1,721.99 Kj',
    '14.72 g',
    '11.53 g',
    '4.30 g',
    '61.83 g',
    '0.00 g',
    '1.55 g',
    '1,(6),(7),(10)'
  ),
  (
    202206041,
    'Citromos tea Hot-dog Ketchuppal Mustárral',
    '661.75 Kcal / 2,766.12 Kj',
    '24.99 g',
    '26.63 g',
    '9.39 g',
    '79.64 g',
    '24.19 g',
    '5.48 g',
    '1,7,10,(9),(12)'
  ),
  (
    202206042,
    'Pizzás csiga Körte',
    '377.05 Kcal / 1,576.07 Kj',
    '5.26 g',
    '21.03 g',
    '5.44 g',
    '41.08 g',
    '0.00 g',
    '1.83 g',
    '1,7,(3),(9)'
  ),
  (
    202206043,
    'Burgonyagombóc\nleves\nMexikói húsos\nbabragu\nFélbarna kenyérrel',
    '900.74 Kcal / 3,765.09 Kj',
    '41.32 g',
    '35.88 g',
    '8.80 g',
    '102.39 g',
    '0.01 g',
    '5.42 g',
    '1,3,9'
  ),
  (
    202206044,
    'Sült húskrémes Félbarna kenyér Paprikával',
    '460.26 Kcal / 1,923.89 Kj',
    '15.09 g',
    '15.41 g',
    '6.44 g',
    '64.75 g',
    '0.00 g',
    '2.63 g',
    '1,7,10,(12)'
  ),
  (
    202206045,
    'Ásványvíz Tonhalkrémes Félbarna kenyérrel',
    '454.74 Kcal / 1,900.81 Kj',
    '13.39 g',
    '16.09 g',
    '7.18 g',
    '63.50 g',
    '0.00 g',
    '2.51 g',
    '1,4,7'
  ),
  (
    202206061,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206062,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206063,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206064,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206065,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206071,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206072,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206073,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206074,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206075,
    'ünnep',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
  (
    202206081,
    'Meggyes tea Margarinos Korpás kenyér\nPulykamell sonkával Sajt szelettel Paradicsommal Paprikával',
    '596.83 Kcal / 2,494.75 Kj',
    '25.75 g',
    '19.61 g',
    '9.05 g',
    '78.52 g',
    '19.99 g',
    '3.16 g',
    '1.7'
  ),
  (
    202206082,
    'Margarinos Félbarna kenyér Reszelt füstölt sajttal',
    '528.49 Kcal / 2,209.09 Kj',
    '22.84 g',
    '20.24 g',
    '9.14 g',
    '63.40 g',
    '0.00 g',
    '3.43 g',
    '1.7'
  ),
  (
    202206083,
    'Kerti zöldségleves Székelykáposzta Tejföllel\nFélbarna kenyérrel\nMini desszert',
    '913.50 Kcal / 3,818.43 Kj',
    '33.86 g',
    '52.70 g',
    '18.55 g',
    '75.08 g',
    '8.92 g',
    '4.40 g',
    '1,3,7,8,9,(5),(12)'
  ),
  (
    202206084,
    'Vajas pogácsa\nAlma',
    '417.18 Kcal / 1,743.81 Kj',
    '5.52 g',
    '26.80 g',
    '7.16 g',
    '37.46 g',
    '0.00 g',
    '1.60 g',
    '1,7,(6),(12)'
  ),
  (
    202206085,
    'Citromos tea Meleg szendvics Túró Rudi',
    '670.16 Kcal / 2,801.27 Kj',
    '33.09 g',
    '16.63 g',
    '8.23 g',
    '96.01 g',
    '25.61 g',
    '4.55 g',
    '1,7,(9)'
  ),
  (
    202206091,
    'Csipkebogyó tea Sült húskrémes Rozskenyér Jégcsapretekkel Uborkával Kakaós csiga',
    '574.83 Kcal / 2,402.79 Kj',
    '12.63 g',
    '27.00 g',
    '15.00 g',
    '69.62 g',
    '29.01 g',
    '1.32 g',
    '1,7,10,(3),(12)'
  ),
  (
    202206092,
    'Mogyorókrémes\nKifli',
    '432.78 Kcal / 1,809.02 Kj',
    '10.12 g',
    '12.96 g',
    '0.47 g',
    '68.40 g',
    '19.20 g',
    '0.82 g',
    '1,5,6,7,8'
  ),
  (
    202206093,
    'Karalábé leves Paradicsomos húsgombóc Főtt burgonyával',
    '789.75 Kcal / 3,301.16 Kj',
    '28.92 g',
    '40.27 g',
    '12.01 g',
    '77.30 g',
    '15.04 g',
    '3.39 g',
    '1,3,7,9'
  ),
  (
    202206094,
    'Gyümölcsös joghurt\nKifli',
    '384.67 Kcal / 1,607.92 Kj',
    '13.11 g',
    '6.35 g',
    '3.33 g',
    '68.05 g',
    '12.99 g',
    '1.31 g',
    '1.7'
  ),
  (
    202206095,
    'Erdei gyümölcstea Stroganoff sertésragu Főtt tésztával',
    '622.49 Kcal / 2,602.01 Kj',
    '35.21 g',
    '15.07 g',
    '4.41 g',
    '85.61 g',
    '12.00 g',
    '2.47 g',
    '1,7,15,(3),(12)'
  ),
  (
    202206101,
    'Kakaó Vajas Korpás kifli Pizzás csiga Alma',
    '577.92 Kcal / 2,415.71 Kj',
    '17.09 g',
    '23.74 g',
    '8.89 g',
    '72.76 g',
    '12.99 g',
    '1.82 g',
    '1,7,(3),(9)'
  ),
  (
    202206102,
    'Margarinos Félbarna kenyér Diákcsemegével',
    '437.78 Kcal / 1,829.92 Kj',
    '14.80 g',
    '14.04 g',
    '3.81 g',
    '62.82 g',
    '0.00 g',
    '3.09 g',
    '1,(7)'
  ),
  (
    202206103,
    'Szárazbableves csipetkével Túrós tészta Porcukorral',
    '871.00 Kcal / 3,640.78 Kj',
    '34.27 g',
    '27.86 g',
    '9.91 g',
    '119.63 g',
    '10.00 g',
    '2.49 g',
    '1,3,7,9'
  ),
  (
    202206104,
    'Sajtkrémes rúd',
    '328.00 Kcal / 1,371.04 Kj',
    '15.98 g',
    '4.62 g',
    '7.22 g',
    '66.56 g',
    '0.00 g',
    '3.38 g',
    '1.7'
  ),
  (
    202206105,
    'Ásványvíz Korpás kifli\nPaprikás szalámival\nKockasajttal',
    '501.51 Kcal / 2,096.31 Kj',
    '22.96 g',
    '23.20 g',
    '10.80 g',
    '49.62 g',
    '0.00 g',
    '3.40 g',
    '1.7'
  );

INSERT INTO
  days(datum)
VALUES
  ('2022-05-30'),
  ('2022-05-31'),
  ('2022-06-01'),
  ('2022-06-02'),
  ('2022-06-03'),
  ('2022-06-04'),
  ('2022-06-06'),
  ('2022-06-07'),
  ('2022-06-08'),
  ('2022-06-09'),
  ('2022-06-10');

INSERT INTO
  menu(
    daysId,
    reggeliId,
    tizoraiId,
    ebedId,
    uzsonnaId,
    vacsoraId
  )
VALUES
  (
    1,
    202205301,
    202205302,
    202205303,
    202205304,
    202205305
  ),
  (
    2,
    202205311,
    202205312,
    202205313,
    202205314,
    202205315
  ),
  (
    3,
    202206011,
    202206012,
    202206013,
    202206014,
    202206015
  ),
  (
    4,
    202206021,
    202206022,
    202206023,
    202206024,
    202206025
  ),
  (
    5,
    202206031,
    202206032,
    202206033,
    202206034,
    202206035
  ),
  (
    6,
    202206041,
    202206042,
    202206043,
    202206044,
    202206045
  ),
  (
    7,
    202206061,
    202206062,
    202206063,
    202206064,
    202206065
  ),
  (
    8,
    202206071,
    202206072,
    202206073,
    202206074,
    202206075
  ),
  (
    9,
    202206081,
    202206082,
    202206083,
    202206084,
    202206085
  ),
  (
    10,
    202206091,
    202206092,
    202206093,
    202206094,
    202206095
  ),
  (
    11,
    202206101,
    202206102,
    202206103,
    202206104,
    202206105
  );

INSERT INTO
  orders(
    menuId,
    userId,
    reggeli,
    tizorai,
    ebed,
    uzsonna,
    vacsora,
    ar,
    lemondva,
    ebedelt
  )
VALUES
  (1, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (2, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (3, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (4, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (5, 2, 1, 1, 1, 1, 1, 1000, "2022-05-31", NULL),
  (6, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (7, 2, 1, 1, 1, 1, 1, 1000, "2022-05-31", NULL),
  (8, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (9, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (10, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL),
  (11, 2, 1, 1, 1, 1, 1, 1000, NULL, NULL);