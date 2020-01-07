const yaml = require('js-yaml');
const fs = require('fs');
class PermissionClass {
  name = '';
  classes = [];
  permissions = [];
  scope = '';
  constructor(name, children, scope, isTerminal = false) {
    if (isTerminal) {
      this.permissions = children;
    } else {
      this.classes = children;
    }
    this.name = name;
    this.scope = scope;
  }
}

class Permission {
  name = '';
  value = '';
}

const templateExtensions = {
  python: 'py',
  typescript: 'ts',
};

async function getTemplateFolders() {
  return await new Promise((resolve, reject) =>
    fs.readdir(process.cwd() + '/templates', (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    }),
  );
}
function writePermissionTreeToSDK(permissionTree, language) {
  const languageDir = `${process.cwd()}/build/${language}`;
  fs.mkdirSync(languageDir, {recursive: true});
  permissionTree.map(permissionClass => {
    const scopeFolder = `${languageDir}/${permissionClass.name}`
    fs.mkdir(scopeFolder, () => {
      fs.writeFileSync(`${scopeFolder}/index.${templateExtensions[language]}`, '')
    });
  });
}
const templateFoldersPromise = getTemplateFolders();
try {
  const doc = yaml.safeLoad(fs.readFileSync('./roles.yaml', 'utf8'));
  const namespaces = doc.roles;
  const permissionTree = getPermissionsForNode(doc.roles);
  templateFoldersPromise.then(folders => {
    folders.map(f => writePermissionTreeToSDK(permissionTree, f));
  });
} catch (e) {
  console.log(e);
}

function getPermissionsForNode(node, currentScope = '') {
  if (!node || !(typeof node === 'object')) {
    return;
  }

  if (Array.isArray(node)) {
    return node.map(n => ({
      name: n,
      value: currentScope ? currentScope + '.' + n : n,
    }));
  }
  return Object.keys(node).map(
    k =>
      new PermissionClass(
        k,
        getPermissionsForNode(
          node[k],
          currentScope ? currentScope + '.' + k : k,
        ),
        currentScope,
        Array.isArray(node[k]),
      ),
  );
}
