# Obtenir FS-Editeur-Setup.exe et FS-Editeur.apk — guide pas à pas

Les fichiers d'installation sont fabriqués **gratuitement par GitHub** sur ses serveurs Windows et Linux (GitHub Actions). Vous n'avez rien à installer sur votre ordinateur pour cela. Comptez environ 30 minutes la première fois, puis 2 clics pour chaque nouvelle version.

| Fichier produit | Pour | Technologie |
|---|---|---|
| `FS-Editeur-Setup.exe` | Windows 10 et 11 (64 bits) | Electron (même moteur Chromium que celui des tests) + installeur NSIS |
| `FS-Editeur.apk` | Android 8 et plus (WebView à jour) | Capacitor (WebView Android) |
| Site web installable | Tout navigateur | PWA sur GitHub Pages |

---

## Étape 1 — Créer le dépôt GitHub

1. Créez un compte gratuit sur https://github.com (si ce n'est pas déjà fait).
2. En haut à droite : **+** → **New repository**.
3. Nom : `fs-editeur`. Visibilité : **Public** (recommandé : les mises à jour automatiques de Windows et Android lisent les versions publiées ; voir la note en fin de guide pour un dépôt privé). Cliquez **Create repository**.

## Étape 2 — Envoyer les fichiers du projet

**Méthode la plus simple (GitHub Desktop)**
1. Installez GitHub Desktop : https://desktop.github.com et connectez-vous.
2. **File → Clone repository** → choisissez `fs-editeur` → un dossier vide est créé sur votre ordinateur.
3. Décompressez `fs-editeur.zip` et copiez **le contenu** du dossier `fs-editeur` (les fichiers `package.json`, `src`, `.github`…) dans ce dossier vide.
   ⚠️ Le dossier `.github` est caché sous Windows : activez *Affichage → Éléments masqués* dans l'Explorateur pour vérifier qu'il est bien copié.
4. Dans GitHub Desktop : écrivez « Première version » en bas à gauche → **Commit to main** → **Push origin**.

*Méthode navigateur* : sur la page du dépôt, **Add file → Upload files**, glissez le contenu du dossier (y compris `.github`), puis **Commit changes**.

Vérification : l'onglet **Actions** du dépôt affiche les workflows « 1 · Créer la clé Android » et « 2 · Publier une version ».

## Étape 3 — Créer la clé de signature Android (une seule fois)

Android exige que chaque nouvelle version soit signée avec la même clé que la précédente ; sinon le téléphone refuse la mise à jour.

1. Dépôt → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   - Name : `ANDROID_KEYSTORE_PASSWORD`
   - Secret : un mot de passe solide de votre choix (12 caractères ou plus). **Notez-le dans un endroit sûr.**
2. Onglet **Actions** → **1 · Créer la clé Android (une seule fois)** → **Run workflow** → **Run workflow**.
3. Après environ 1 minute, ouvrez l'exécution terminée (coche verte) → en bas, **Artifacts** → téléchargez `cle-android`.
4. Décompressez-le, ouvrez `ANDROID_KEYSTORE_BASE64.txt` avec le Bloc-notes, sélectionnez tout et copiez.
5. **Settings → Secrets and variables → Actions → New repository secret** :
   - Name : `ANDROID_KEYSTORE_BASE64`
   - Secret : collez le texte copié.
6. Supprimez l'artefact téléchargé (et le fichier sur votre ordinateur, après en avoir gardé une copie de sauvegarde dans un endroit sûr).

> Ne perdez jamais cette clé ni le mot de passe : sans eux, les futures versions ne pourront plus s'installer par-dessus l'application existante.

## Étape 4 (facultative) — Activer la version web

**Settings → Pages → Build and deployment → Source : GitHub Actions.**
Votre PWA sera publiée à l'adresse `https://<votre-nom>.github.io/fs-editeur/`.

## Étape 5 — Publier la version et récupérer les fichiers

1. Onglet **Actions** → **2 · Publier une version** → **Run workflow**.
2. Version : `0.1.0` → **Run workflow**.
3. Attendez environ 15 minutes (les quatre tâches Web, Windows, Android et Publication passent au vert).
4. Page d'accueil du dépôt → à droite, **Releases** → **FS Editeur 0.1.0**. Vous y trouvez :
   - `FS-Editeur-Setup.exe`
   - `FS-Editeur.apk`
   - `FS-Editeur-web.zip`

En cas d'échec (croix rouge), ouvrez la tâche concernée : le message d'erreur s'affiche en rouge. Les erreurs les plus fréquentes sont listées en fin de guide.

---

## Installer sur Windows 10 / 11

1. Téléchargez `FS-Editeur-Setup.exe` depuis la page Releases et ouvrez-le.
2. Windows peut afficher « Windows a protégé votre ordinateur » : l'installeur n'est pas signé par un certificat commercial. Cliquez **Informations complémentaires → Exécuter quand même**.
3. Choisissez le dossier d'installation → **Installer**.
4. Résultat : raccourci **FS Editeur** sur le Bureau et dans le menu Démarrer, avec le logo FS doré.

**Exports** : une fenêtre « Enregistrer sous » s'ouvre dans votre dossier Vidéos (ou Images pour les photos).
**Mises à jour** : à chaque nouvelle version publiée (étape 5), l'application la télécharge seule au démarrage et propose « Redémarrer maintenant ». Menu **Aide → Rechercher des mises à jour** pour vérifier à la main.
**Désinstallation** : Paramètres Windows → Applications → FS Editeur. Vos projets sont conservés.

## Installer sur Android

1. Sur le téléphone, ouvrez la page Releases du dépôt dans Chrome et touchez `FS-Editeur.apk`.
2. Ouvrez le fichier téléchargé. Android demande d'autoriser l'installation depuis Chrome (ou votre gestionnaire de fichiers) : **Paramètres → Autoriser**, puis revenez et touchez **Installer**.
3. Si Play Protect affiche un avertissement (application hors Play Store) : **Plus de détails → Installer quand même**.
4. L'icône FS dorée apparaît sur l'écran d'accueil.

**Importer** : bouton *Importer des médias* → choisissez dans la Galerie ou les Fichiers (vidéos, photos, musiques).
**Exporter** : les vidéos vont dans `Movies/FS Editeur` et les photos dans `Pictures/FS Editeur` ; elles apparaissent dans la Galerie. Les projets `.fsproj` vont dans `Documents/FS Editeur`. Si le téléphone refuse l'accès, la feuille de partage Android s'ouvre (Galerie, Drive, WhatsApp…).
**Voix off** : Android demande l'autorisation du micro la première fois.
**Mises à jour** : au démarrage, FS Editeur signale une nouvelle version et propose de télécharger l'APK ; installez-le par-dessus, vos projets sont conservés.

## Version web (PWA)

Ouvrez l'adresse GitHub Pages dans Chrome ou Edge → bouton **Installer** dans FS Editeur. Sur iPhone : Safari → Partager → **Sur l'écran d'accueil**.

---

## Publier les futures mises à jour

1. Modifiez le projet (vous-même ou avec Claude) et envoyez les changements sur GitHub (étape 2 : *Commit* puis *Push*).
2. **Actions → 2 · Publier une version → Run workflow** avec un numéro **supérieur** au précédent (`0.1.1`, `0.2.0`…).
3. Windows se met à jour automatiquement ; Android affiche une notification ; la version web se met à jour à la prochaine ouverture.

## Fonctionnement hors ligne

Dans les applications Windows et Android, l'interface, les 28 polices (intégrées au moment de la compilation), le montage, les effets, la retouche photo, l'audio, l'export vidéo et la sauvegarde fonctionnent **sans Internet**. Nécessitent une connexion : la suppression d'arrière-plan (au premier usage, pour télécharger le modèle), les fonctions IA par API et la vérification des mises à jour.

## Sauvegarde des projets

Les projets sont enregistrés automatiquement dans l'application (Windows : dossier de données de l'utilisateur ; Android : stockage privé de l'application). Ils survivent aux mises à jour. Pour les transférer d'un appareil à l'autre ou en garder une copie : **Exporter → Projet portable (.fsproj)**, puis sur l'autre appareil **Accueil → Ouvrir un projet**.

⚠️ Sur Android, désinstaller l'application efface ses données : exportez vos projets en `.fsproj` avant.

---

## Problèmes fréquents

| Symptôme | Solution |
|---|---|
| L'onglet Actions ne montre pas les workflows | Le dossier `.github` n'a pas été envoyé : refaites l'étape 2 en affichant les fichiers cachés. |
| « Créez d'abord le secret ANDROID_KEYSTORE_PASSWORD » | Étape 3.1 non faite ou mot de passe de moins de 8 caractères. |
| Avertissement « APK de TEST » dans la tâche Android | Le secret `ANDROID_KEYSTORE_BASE64` manque : terminez l'étape 3, puis relancez l'étape 5. |
| Release non créée : « tag already exists » | Ce numéro de version existe déjà : utilisez un numéro supérieur. |
| Android : « Application non installée » lors d'une mise à jour | L'ancienne version a été signée avec une autre clé (APK de test) : exportez vos projets, désinstallez, puis installez la nouvelle. |
| Windows : l'antivirus bloque l'installeur | Faux positif fréquent pour les installeurs non signés : autorisez le fichier, ou signez l'application (ci-dessous). |

## Options avancées

* **Signature Windows** (supprime l'avertissement SmartScreen) : achetez un certificat de signature de code, puis ajoutez les secrets `WINDOWS_CERTIFICATE_BASE64` (fichier .pfx en base64) et `WINDOWS_CERTIFICATE_PASSWORD`. Le workflow l'utilise automatiquement.
* **Google Play Store** : l'APK signé convient pour un test ; le Play Store demande un fichier `.aab` (`./gradlew bundleRelease`) et un compte développeur (25 $ une fois).
* **Dépôt privé** : la compilation fonctionne, mais les applications installées ne peuvent pas lire les versions d'un dépôt privé. Dans ce cas, publiez les Releases dans un second dépôt public, ou installez chaque nouvelle version manuellement.
* **Compiler sur votre ordinateur** (développeurs) : `npm install`, puis `npm run dist:win` (sous Windows) ou `npm run android:init` puis `npm run android:apk` (Android Studio + JDK 21).
