// Simply a ES6 version of the Assembly script game of life demo
// https://github.com/AssemblyScript/assemblyscript/tree/master/examples/game-of-life
import { Component } from 'preact';
import fetch from 'unfetch'

export class Playground extends Component {

  constructor() {
		super();
		// set our state to if we are initialized or not
		this.state = {
			initialized: false
		};
	}

  componentDidMount() {
    console.clear();
    console.log('Playground componentDidMount()');
    this.initialize();
  }

  initialize() {
    // Some hack-y code to test loading the wasm module
    if(this.state.initialized) return;
    this.state.initialized = true;

    // Getting started with wasm
    // http://webassembly.org/getting-started/js-api/

    // Load wasm module with fetch
    fetch('dist/wasm/assemblyscript/index.untouched.wasm')
    .then(response => response.arrayBuffer())
    .then(binary => {

      // Log we got the wasm module loaded
      console.log('Playground wasm instantiated');

      // Create the wasm module, and get it's instance
      const module = new WebAssembly.Module(binary);
      const instance = new WebAssembly.Instance(module, {});

      // Get our memory from our wasm instance
      const memory = instance.exports.memory;

      // Grow our wasm memory to what we need if not already
      console.log('Growing Memory if needed...');
      console.log('Current memory size:', memory.buffer.byteLength);
      if (memory.buffer.byteLength < 0) {
        console.log('Growing memory...')
        memory.grow(1);
        console.log('New memory size:', memory.buffer.byteLength);
      } else {
        console.log('Not growing memory...');
      }

      // Call the initialize function on our wasm instance
      instance.exports.init(10);

      // Testing returning values with wasm
      var returnVal = instance.exports.storeTest();
      console.log('Returning values from storeTest() in wasm: ', returnVal);

      // Get value from memory of wasm
      var wasmMem = new Uint32Array(memory.buffer);
      console.log('Wasm Memory: ', wasmMem);

      // Try to insert into memory from JS, and check it from within wasm
      wasmMem[1] = 24;
      console.log("loadTest()", instance.exports.loadTest());
      console.log("wasmImportsTest()", instance.exports.wasmImportsTest());


      // Show the memory on our canvas
      const canvas = document.querySelector('#canvas').getContext("2d");
      canvas.font = "48px Arial";
      canvas.fillText('wasm-playground', 5, 40);
      canvas.font = "16px Arial";
      canvas.fillText('Please see console for most wasm testing results', 5, 80);
      canvas.fillText('Wasm memory strinigified below:', 5, 115);
      canvas.fillText(JSON.stringify(wasmMem, null, 4), 5, 140);
    });

  }

	render() {
		return (
      <div className="canvas-container">
  			<canvas id="canvas"
          style="border: 1px solid black;"
          width="640"
          height="480">
        </canvas>
      </div>
		);
	}
}
