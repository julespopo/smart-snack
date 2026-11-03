# Smart Snack 🥗

Application web bilingue français / anglais, réalisée pour un projet de BTS diététique avec des élèves de BTS commerce.

## Utiliser l’application

- **Version mobile :** ouvrir `mobile.html`.
- **Version classique :** ouvrir `index.html` (sur un téléphone, redirection automatique vers la version mobile).
- Pour forcer la version classique depuis un téléphone : `index.html?desktop=1`.

Aucune installation, aucun compte et aucune clé API ne sont nécessaires pour la version locale. Il suffit de télécharger le dépôt, de le décompresser et d’ouvrir un fichier HTML dans un navigateur.

Pour un serveur local, depuis le dossier du projet :

```sh
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000/mobile.html>.

## Fonctionnalités

- Parcours mobile : **moment de la journée → difficulté → budget → recettes**.
- 30 recettes : petit déjeuner, déjeuner, goûter, dîner et collation.
- Version classique : recherche par recette ou ingrédient, filtres, tri et recette surprise.
- Fiches recettes avec ingrédients, étapes et quantités ajustées au nombre de personnes.
- Favoris et liste de courses enregistrés dans le navigateur.
- Confirmation animée lors de l’ajout aux courses.
- Export d’une liste HTML interactive : cases à cocher, progression, masquage des articles cochés et sauvegarde locale des coches.
- Mode cuisine étape par étape, sans minuteur.
- Navigation mobile par la barre du bas, sans boutons flottants.
- Interface français / anglais.

## Fichiers principaux

| Fichier | Rôle |
| --- | --- |
| `index.html`, `style.css` | Interface classique |
| `mobile.html`, `mobile.css`, `mobile.js` | Parcours mobile simplifié |
| `app.js` | Recettes, filtres, favoris et courses |
| `data.js` | Recettes, ingrédients et estimations nutritionnelles |
| `photos.js` | Correspondance entre recettes, photographies et crédits |
| `photos.html`, `CREDITS-PHOTOS.txt` | Auteurs, sources et licences des photographies |
| `assets/photos/` | Photographies incluses pour le fonctionnement hors ligne |

## Données et fonctionnement hors ligne

L’application est écrite en HTML, CSS et JavaScript, sans framework ni serveur applicatif. Les photographies et les recettes sont incluses. Les polices Google nécessitent une connexion ; des polices de remplacement sont prévues hors ligne.

Les favoris et les courses utilisent `localStorage` : ils restent sur le navigateur et l’appareil utilisés. La liste HTML téléchargée est une copie indépendante de la liste du site. Sur téléphone, ouvrir cette liste dans un navigateur plutôt que dans un aperçu de fichier pour utiliser les cases à cocher.

## Projet pédagogique

Les valeurs nutritionnelles sont des estimations à partir de moyennes génériques, à valider avec l’enseignant. Les photographies réelles montrent des suggestions de présentation ou des ingrédients ; elles ne garantissent pas les quantités ni tous les éléments de la recette.

## Photographies et licences

Les photographies conservent leurs licences respectives. Les crédits et liens de licence sont indiqués dans `photos.html` et `CREDITS-PHOTOS.txt`. Les photos ont été redimensionnées et sont recadrées à l’affichage, avec une légère harmonisation des couleurs en CSS. Les images sous CC BY-SA restent soumises à cette licence.
