# FOOD-E (A web applikáció)

## Téma:
    Iskolai étkeztetést segítő webalkalmazás
## Készítők:
* [Balázs Martin](https://github.com/phrodo02)
* [Németh Dániel](https://github.com/nemethdaniel0627)
* [Rozs Norbert](https://github.com/rozsnono)

## Front-end: Rozs Norbert + Németh Dániel

   Felhasználóbarát felület, mobil és számítógép nézetre is optimalizálva.
   Főoldalon a felhasználó bejelentkezhet vagy regisztrálhat az adott iskolához. Ezt követően a rendszer automatikusan megnézi, hogy a felhasználó iskolai adminisztrátor vagy nem és ettől függően küldi tovább egy másik oldalra.
         
   Értelemszerűen az egyszerű felhasználót egy olyan oldalra küldi, ahol megnézheti a menüt a következő két hétben, módosíthatja a jelszavát, lemondhatja az étkezést a kiválasztott napon/napokon, természetesen ezek nem vesznek el, ugyanis ezeket a rendszer automatikusan levonja a legközelebb fizetendő összegből, megnézheti, hogy aznap jogosult-e az étkezésre, valamint ezen az oldalon jelenik meg a QR kód, ami a konyhán dolgozók részére könnyíti meg annak az eldöntését, hogy jogosult-e az étkezésre, evett-e már aznap stb. Ezt az oldal bal oldalán található kis lenyíló menüben teheti meg.

   Az adminisztrátort viszont más oldalra küldi a rendszer. Ugyanis az iskolai rendszergazdák egy adminisztratív oldalt kapnak, ahol megtudják tekinteni, törölhetik, valamint módosíthatják az adott iskolában étkező személyek adatait, továbbá ellenőrizhetik a jogosultságaikat. Ezt az oldalt a konyhán is használják, ugyanis itt tudják leolvasni a QR kódot és hogy étkezhet-e az illető.

## Back-end + Adatbázis: Balázs Martin + Németh Dániel

   A webalkalmazáshoz szükséges adatok egy MySQL alapú adatstruktúrában lesznek eltárolva, ami könnyen hozzáférhető a weboldal számára. Természetesen ezek az adatok titkosítottan lesznek eltárolva és elküldve a weboldal részére ezzel is növelve a felhasználók, valamint az iskolák adatainak a biztonságát. A webszerver minden hónap elején küld egy kör e-mailt az oldalt használó felhasználók részére, hogy felhívja a figyelmüket a befizetésre.
            
Front-end terv: https://www.youtube.com/watch?v=Rlfcsn4XfIk&ab_channel=R0Z5N0RB3RT


## FONTOS: NODE VERZIÓ BIZTOS MŰKÖDÉSE v14.15.0

## START SERVERS
### BACK-END: cd server && npm run start
### FRONT-END: npm run start-client

## TESTS
### BACK-END: cd server && npm run test
### FRONT-END: importálás SELENIUM IDE Chrome bővítménybe a gyökérkönyvtárban lévő selenium mappából
