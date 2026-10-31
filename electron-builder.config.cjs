// Configuration de l'installeur Windows (electron-builder).
// GITHUB_REPOSITORY (« propriétaire/dépôt ») est fourni automatiquement par GitHub Actions : il indique où
// l'application installée cherche ses mises à jour.
const [owner, repo] = (process.env.GITHUB_REPOSITORY || 'proprietaire/fs-editeur').split('/');
module.exports = {
  appId: 'com.fseditor.app',
  productName: 'FS Editeur',
  copyright: 'FS Editeur',
  directories: { output: 'release', buildResources: 'build' },
  files: ['dist/**/*', 'electron/**/*', 'build/icon.ico', 'package.json'],
  asar: true,
  win: {
    target: [{ target: 'nsis', arch: ['x64'] }],
    icon: 'build/icon.ico',
    artifactName: 'FS-Editeur-Setup.${ext}',
    // Signature de code facultative : définir les secrets CSC_LINK et CSC_KEY_PASSWORD (certificat .pfx).
  },
  nsis: {
    oneClick: false, perMachine: false, allowToChangeInstallationDirectory: true,
    createDesktopShortcut: 'always', createStartMenuShortcut: true, shortcutName: 'FS Editeur',
    installerIcon: 'build/icon.ico', uninstallerIcon: 'build/icon.ico', installerLanguages: ['fr_FR'],
    uninstallDisplayName: 'FS Editeur', language: '1036', runAfterFinish: true,
    deleteAppDataOnUninstall: false, // les projets de l'utilisateur sont conservés après désinstallation
  },
  publish: [{ provider: 'github', owner, repo, releaseType: 'release' }],
};
