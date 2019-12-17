const yaml = require('js-yaml')
const fs = require('fs')

try {
	const doc = yaml.safeLoad(fs.readFileSync('./roles.yaml', 'utf8'))
	console.log(doc)
	const namespaces = doc.roles;
	console.log(namespaces)
} catch(e) {
	console.log(e)
}

function* getPermissionsForNode(node) {
	while(true){
		yield 'hello'
	}
}

const permGen = getPermissionsForNode([])
console.log(permGen.next().value)
