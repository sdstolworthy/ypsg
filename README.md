# Permission SDK Generator
--------------------------
The YAML Permission SDK Generator generates simple SDK's for hardcoded permission strings in several languages. This can be used as a part of CI/CD to create easy to use permission packages for your development language.

YPSG is designed to solve a simple problem: repeating hard-coded strings across various parts of the application. Many applications require simple permission checks the verify authorization to perform an action. Instead of writing hardcoded strings across your application, you can generate a simple SDK that will give typeahead completion for each of the permissions defined in the yaml.

## Installation
```
npm install -g yaml-permission-sdk-generator
```

## Usage
YPSG reads in a YAML file and produces sdk templates for the specified languages. 
