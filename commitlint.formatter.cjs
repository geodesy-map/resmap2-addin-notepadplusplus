const frenchMessages = {
    'type-empty': 'Le type ne peut pas être vide\n\n Exemples valides:\n  • feat: ajout de la fonction de connexion\n  • fix: correction du bug de validation\n  • docs: mise à jour du README\n',
    'subject-empty': 'La description ne peut pas être vide\n\n Exemples valides:\n  • feat: ajout de la fonction de connexion\n  • fix: correction du bug de validation\n  • refactor: restructuration du composant utilisateur\n',
    'type-enum': 'Type invalide. Types autorisés: build, ci, docs, feat, fix, perf, refactor, style, test\n\n Exemples valides:\n  • feat: ajout de nouvelles fonctionnalités\n  • fix: correction de bugs\n  • docs: modifications de documentation\n  • style: formatage, points-virgules manquants, etc.\n  • refactor: refactorisation du code\n  • test: ajout de tests\n  • perf: améliorations de performance\n  • build: changements du système de build\n  • ci: changements de configuration CI\n',
    'header-max-length': 'Le message ne doit pas dépasser 100 caractères\n\n Conseil: Soyez concis et précis\n  ✅ feat: ajout authentification utilisateur\n  ❌ feat: ajout du système complet d\'authentification des utilisateurs avec validation des emails\n',
    'subject-full-stop': 'La description ne doit pas se terminer par un point\n\n Exemples valides:\n  ✅ feat: ajout de la fonction de connexion\n  ❌ feat: ajout de la fonction de connexion.\n',
    'type-case': 'Le type doit être en minuscules\n\n Exemples valides:\n  ✅ feat: nouvelle fonctionnalité\n  ❌ FEAT: nouvelle fonctionnalité\n',
    'scope-case': 'Le scope doit être en minuscules\n\n Exemples valides:\n  ✅ feat(auth): ajout de la connexion\n  ❌ feat(AUTH): ajout de la connexion\n'
};

module.exports = (report) => {
    let output = '';

    if (report && report.results && Array.isArray(report.results)) {
        report.results.forEach(result => {
            if (result.input) {
                output += `⚠  input: ${result.input}\n`;
            }

            if (result.errors && result.errors.length > 0) {
                result.errors.forEach((error, index) => {
                    const message = frenchMessages[error.name] || error.message;
                    output += `✖  ${message} [${error.name}]`;

                    // Ajouter deux lignes vides entre chaque erreur
                    if (index < result.errors.length - 1) {
                        output += '\n\n';
                    } else {
                        output += '\n';
                    }
                });
            }

            if (result.warnings && result.warnings.length > 0) {
                result.warnings.forEach((warning, index) => {
                    const message = frenchMessages[warning.name] || warning.message;
                    output += `⚠  ${message} [${warning.name}]`;

                    if (index < result.warnings.length - 1) {
                        output += '\n\n';
                    } else {
                        output += '\n';
                    }
                });
            }
        });

        if (report.errorCount > 0) {
            output += `\n✖  found ${report.errorCount} problems, ${report.warningCount} warnings\n`;
            output += 'ⓘ  Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint\n';
        }
    }

    return output;
};