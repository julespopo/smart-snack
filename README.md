# Smart Snack

Smart Snack est une application web de recettes, disponible en français et en anglais. Découvrez des idées de repas et collations avec une interface adaptée à l'ordinateur et au téléphone.

**Accéder à l'application :** https://julespopo.github.io/smart-snack/

Le catalogue comprend 50 recettes bilingues, avec des préparations faciles, intermédiaires et avancées pour les cinq moments de la journée. Sur mobile, choisissez le moment, la difficulté et le budget ; recherchez ensuite une recette ou un ingrédient. Favoris et liste de courses sont enregistrés sur l'appareil. La liste peut aussi être téléchargée sous forme de fichier HTML à cocher hors ligne.

Les valeurs nutritionnelles sont des estimations pédagogiques. Les photographies réelles, leurs sources et leurs licences sont répertoriées dans `photos.html` et `CREDITS-PHOTOS.txt`.

Pour tester localement, lancez `python3 -m http.server 8765`, puis ouvrez http://localhost:8765. Aucune installation de dépendances n'est nécessaire. Vérification du catalogue : `node tests/catalog.test.cjs`.
