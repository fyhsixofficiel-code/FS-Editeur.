# FS Editeur

Studio de création **vidéo, photo, typographie animée et audio** — application web progressive (PWA) installable sur Windows, Android, iPhone/iPad et tout navigateur moderne. Les médias restent sur l'appareil : aucun envoi serveur sans action explicite.

![Logo](public/icons/fs-logo.png)

## Démarrage

```bash
npm install          # Node 20+
npm run dev          # http://localhost:5173
npm run build        # production → dist/
npm run preview      # sert dist/ localement
npm test             # tests unitaires (Vitest)
npm run test:e2e     # test de bout en bout (Chromium + ffmpeg requis)
```

> Pour `test:e2e` : `npx playwright install chromium`, ffmpeg/ffprobe dans le PATH, puis générer les médias de test (voir `tests/e2e/README.md`).

## Ce qui fonctionne dans cette version (0.1.0)

| Module | Contenu |
|---|---|
| **Montage vidéo** | Timeline multipiste (vidéo, image, texte, effets, audio), glisser-déposer, découpe (S), division, fusion, duplication, copier/coller, groupes, verrouillage, masquage, sourdine, sélection multiple et au lasso, magnétisme, marqueurs, zoom, vitesse, images clés avec courbes (linéaire, ease-in/out, retour, élastique, rebond), manipulation directe dans le moniteur (déplacer, redimensionner, tourner, guides d'alignement, grille, marges de sécurité). |
| **Effets vidéo** | 51 effets (mouvement, visuels, lumineux, temporels) — combinables, paramétrables, animables, avec fenêtre de début/durée et opacité. |
| **Transitions** | 40 transitions (classiques, dynamiques, créatives) avec durée, direction, intensité, courbe. Aperçu animé au survol. |
| **Texte** | 15 animations d'entrée, 13 continues, 10 de sortie réglées séparément ; 20 effets de texte (doré, argent, rose gold, métal, néon, 3D, reflet, arc, cercle, vertical, texture, masque vidéo, bordure animée, particules…). |
| **Polices** | 28 polices libres (OFL/Apache) classées, aperçu, recherche, favoris, import TTF/OTF/WOFF. |
| **Filtres** | 29 filtres + réglages manuels (exposition, contraste, saturation, vibrance, température, teinte, ombres, hautes lumières, netteté, vignettage, grain), courbes RVB, LUT `.cube`, filtres personnalisés enregistrables. Rendu GPU (WebGL). |
| **Retouche photo** | Calques (image, peinture, texte, sticker, forme), masques non destructifs, pinceau, gomme, correcteur d'imperfections, baguette magique, lasso, recadrage/redimensionnement/rotation, suppression d'arrière-plan (MediaPipe, local), remplacement de fond, débruitage, lissage de peau, restauration, agrandissement ×2, cadres, export PNG/JPG/WebP. |
| **Audio** | Volume animable, fondus, égaliseur 3 bandes, réverbération, écho, effet robot, pitch indépendant (AudioWorklet), réduction de bruit + porte, voix off (micro), 18 effets sonores générés libres de droits, détection de rythme + calage des coupes, licences des musiques. |
| **Export** | MP4 (H.264 + AAC ou Opus) et WebM (VP9 + Opus) image par image via WebCodecs, avec **le même moteur de rendu que l'aperçu** ; 480p → 4K selon les capacités réelles de l'appareil (vérifiées) ; 24–60 i/s ; qualité ; estimation de taille ; progression ; annulation. Repli MediaRecorder si WebCodecs absent. Image fixe PNG/JPG/WebP. |
| **Projets** | Sauvegarde automatique (IndexedDB), annuler/rétablir (150 étapes), récents, favoris, renommer, dupliquer, corbeille récupérable, export/import portable `.fsproj` (ZIP + manifeste), relier un fichier manquant, restauration après interruption. |
| **Modèles** | 14 modèles (mariage, fiançailles, anniversaire, baptême, événement, publicité, produit, TikTok, Reels, Shorts, générique, diaporama, entreprise, formation) entièrement modifiables. |
| **IA** | Locale : suppression de fond, amélioration auto, détection de scènes, recadrage auto, synchro musique, suggestions. Via API compatible OpenAI (clé de l'utilisateur) : sous-titres, traduction, synthèse vocale, génération d'images. Import/export SRT/VTT gratuit. |

Le détail ligne par ligne (« opérationnel », « simplifié », « en développement », « API », « non pris en charge ») est dans **[FEATURES.md](FEATURES.md)** et dans l'application (À propos › Tableau de suivi).

## Tests réalisés

* `npm test` — 18 tests unitaires : images clés et courbes, inventaire complet des bibliothèques, remappage temporel, courbes/LUT, SRT/VTT, ZIP portable (dont protection contre les chemins malveillants), détection de rythme, multiplexeurs MP4/WebM.
* `npm run test:e2e` — dans Chromium : import réel (vidéo VP9+Opus, PNG, WAV), montage complet (texte doré animé, glitch, crossfade, filtre, zoom, musique), détection de rythme, lecture, découpe + annuler, sauvegarde IndexedDB, **export MP4 et WebM vérifiés par ffprobe/ffmpeg** (codec, 1280×720, 240 images, durée, décodage complet), **comparaison aperçu ↔ export** par PSNR à 3 instants, affichage mobile 390 px.

## Architecture

Voir **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**. En bref :

```
src/
  core/      modèle de projet, store + historique, IndexedDB, médias, actions d'édition, modèles, projet portable
  engine/    compositeur (aperçu = export), effets, transitions, texte, filtres, WebGL, audio, export, muxers MP4/WebM, photo
  ai/        fonctions IA (locales + fournisseur compatible OpenAI)
  ui/        interface React (accueil, éditeur, timeline, inspecteur, bibliothèques, photo, IA, paramètres, à propos)
public/      manifest PWA, service worker, icônes générées depuis le logo
```

Ajouter un effet = ajouter une entrée `def({...})` dans `src/engine/effects.ts` (idem pour transitions, filtres, polices, modèles) : il apparaît automatiquement dans la bibliothèque, l'inspecteur, l'aperçu et l'export.

## Applications Windows et Android

**→ Suivez [GUIDE-INSTALLATION.md](GUIDE-INSTALLATION.md)** : GitHub Actions produit `FS-Editeur-Setup.exe` (Electron + installeur NSIS, raccourcis Bureau/Démarrer, mises à jour automatiques), `FS-Editeur.apk` (Capacitor, signé) et la PWA (GitHub Pages).

```
electron/            fenêtre Windows, protocole app://, mises à jour (electron-updater)
electron-builder.config.cjs   installeur FS-Editeur-Setup.exe
capacitor.config.json         application Android
scripts/android-setup.mjs     icônes, permissions, version, signature Android
resources/android/            icônes et écran de démarrage Android (logo FS)
src/platform.ts               enregistrement galerie/fichiers, bouton retour, mises à jour
.github/workflows/            1 · clé Android · 2 · publier une version · vérification
```

## Déploiement web

Voir **[docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)** : GitHub + Cloudflare Pages (gratuit), installation PWA, génération APK/EXE.

## Logo

Le logo officiel est `public/icons/fs-logo-source.png`. Toutes les icônes sont générées par `npm run icons` (redimensionnement seul, proportions conservées). Pour des icônes plus nettes en 512 px et au-delà, remplacez ce fichier par une version haute définition (1024 px ou plus) puis relancez `npm run icons`.

## Licence

Code : propriété du titulaire de FS Editeur. Polices : SIL OFL 1.1 / Apache 2.0. MediaPipe Tasks Vision : Apache 2.0 (chargé à la demande).
