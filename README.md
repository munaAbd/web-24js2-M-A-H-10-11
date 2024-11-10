# webb24-js2-slutprojekt-muna-hassan

Projektet inleddes med en planeringsfas där målen definierades:

Skapa en produktsida för att visa produkter hämtade från Firebase.
Implementera en varukorgsfunktionalitet för att lägga till, uppdatera och visa produkter.
Bygga en kassasida för att visa köpsammanfattning och möjliggöra köp.
En Firebase-projektinstans skapades, och Realtime Database aktiverades för att hantera produktdata i realtid.
Komponenten Product.jsx skapades för att hämta och visa alla produkter från Firebase.

Produktsidan visar namn, pris, lagersaldo och bild.
En "Köp nu"-knapp lades till för att minska lagersaldo lokalt och i Firebase.
omponent skapades för att hantera varukorgen.
En addToCart-funktion i App.js hanterar produkter i varukorgen och justerar kvantiteter.
Varukorgen beräknar automatiskt totalt antal varor och pris.
