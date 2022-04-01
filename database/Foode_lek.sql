-- SELECT id FROM meal WHERE id LIKE 20211121;

-- SELECT nev FROM meal WHERE FLOOR(id/10) = 20211202;


DELETE FROM menu;

ALTER TABLE menu AUTO_INCREMENT = 1;

DELETE FROM meal;

DELETE FROM days;

ALTER TABLE days AUTO_INCREMENT = 1;

DELETE FROM user;

ALTER TABLE user AUTO_INCREMENT = 1;

DELETE FROM orders;

ALTER TABLE orders AUTO_INCREMENT = 1;


-- SELECT id FROM days WHERE datum = "2021-12-1";

-- INSERT INTO meal (id,nev) VALUES (202111221, "Hagyma");

INSERT INTO orders (menuId, userId, reggeli, tizorai, ebed, uzsonna, vacsora, ar)
  VALUES (1, 4, 1, 1, 1, 1, 1, 3000), (2, 4, 1, 1, 1, 1, 1, 3000), (3, 4, 1, 1, 1, 1, 1, 3000), (4, 4, 1, 1, 1, 1, 1, 3000), (5, 4, 1, 1, 1, 1, 1, 3000);
