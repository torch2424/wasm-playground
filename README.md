# wasm-playground
A Wasm playground with preact as a shell, and assemblyscript as the wasm build tool

Requires assembly script to be manually cloned https://github.com/AssemblyScript/assemblyscript

How to create the project. Install assembly script. download preact cli. `preact create simple <project-name>`. https://github.com/AssemblyScript/assemblyscript/tree/master/examples/game-of-life . `npm run dev`. `npm run wasm:build`

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
