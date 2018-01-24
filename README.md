# wasm-playground
A Wasm playground with preact as a shell, and assemblyscript as the wasm build tool

Requires assembly script to be manually cloned https://github.com/AssemblyScript/assemblyscript

### How to re-create the project.

**TODO, make this nicer**

Install assembly script.

download preact cli.

`preact create simple <project-name>`.

https://github.com/AssemblyScript/assemblyscript/tree/master/examples/game-of-life .

`npm run dev`.

`npm run wasm:watch`.

### CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# Watch wasm/ folder for changes, and rebuild on changes
npm run wasm:watch

# build for production with minification
npm run build

# Build the wasm into a wasm module
npm run wasm:build

# test the production build locally
npm run serve
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
