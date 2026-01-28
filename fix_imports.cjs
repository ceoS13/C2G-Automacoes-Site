
const fs = require('fs');
const path = require('path');

const sectionsDir = './components/sections';
const files = fs.readdirSync(sectionsDir);

files.forEach(file => {
    if (!file.endsWith('.tsx')) return;

    const filePath = path.join(sectionsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Substituições comuns:
    // ./ui -> ../ui
    content = content.replace(/from '\.\/ui\//g, "from '../ui/");
    // ./widgets -> ../widgets
    content = content.replace(/from '\.\/widgets\//g, "from '../widgets/");
    // ../lib -> ../../lib
    content = content.replace(/from '\.\.\/lib\//g, "from '../../lib/");

    // Para Partners.tsx que importa de constants localmente
    content = content.replace(/from '\.\/lib\/constants'/g, "from '../../lib/constants'");

    // Alguns arquivos podem ter imports diretos de ./constants se houver bagunça, mas o padrão é ../lib/constants na raiz dos components.
    // Como movemos para sections/, antes era ../lib (pois estava em components/), agora é ../../lib.

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
