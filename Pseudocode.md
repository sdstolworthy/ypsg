1. Get user input
  1. Get organization name
  1. Get project name
  1. Get YAML file location (default: ./yaml)
1. Parse the YAML file
  1. Recursively loop over all object keys until you find an array
  1. Each object key represents a class
  1. An object key with an object as a child includes that child as a member of its own class with a member name equal to the child key in Pascal case
  1. An array represents a list of permissions
