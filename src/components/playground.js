// Simply a ES6 version of the Assembly script game of life demo
// https://github.com/AssemblyScript/assemblyscript/tree/master/examples/game-of-life
import { h, Component } from 'preact';
import fetch from 'unfetch'

export default class Playground extends Component {

  constructor() {
		super();
		// set initial time:
		this.state = {
			initialized: false
		};
	}

  componentDidMount() {
    console.log('Playground Component did mount');
    this.initialize();
  }

  initialize() {

    if(this.state.initialized) return;
    this.state.initialized = true;

    fetch('wasm/dist/playground.untouched.wasm')
    .then(response => response.arrayBuffer())
    .then(binary => {

        console.log('Playground wasm instantiated');

        // Instantiate the module
        var module = new WebAssembly.Module(binary);
        var instance = new WebAssembly.Instance(module, { /* no imports */ });
        // Set up the canvas with a 2D rendering context
        var cnv = document.getElementById("canvas");
        var ctx = cnv.getContext("2d");
        var w = cnv.width,
            h = cnv.height,
            s = w * h, // memory required to store either input or output
            S = s + s; // total memory required to store input and output
        // Grow the (exported) memory if its size isn't sufficient
        var memory = instance.exports.memory;
        if (memory.buffer.byteLength < S)
          memory.grow(Math.ceil((S - memory.buffer.byteLength) / 65536));
        // Initialize with width and height
        instance.exports.init(w, h);
        // Fill input at [0, s-1] with random live cells
        var mem = new Uint8Array(memory.buffer);
        for (var y = 0; y < h; ++y)
          for (var x = 0; x < w; ++x)
            mem[y * w + x] = Math.random() > 0.1 ? 0 : 1;
        // Update about 30 times a second
        (function update() {
          setTimeout(update, 33);
          instance.exports.step();
          mem.set(mem.subarray(s, S), 0); // copy output -> input
        })();
        // Keep rendering the output at [s, 2*s-1]
        (function render() {
          requestAnimationFrame(render);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = "#333";
          for (var y = 0; y < h; ++y)
            for (var x = 0; x < w; ++x)
              if (mem[s + y * w + x])
                ctx.fillRect(x, y, 1, 1);
        })();
      }).catch(err => {
        throw err;
      });
  }

	render() {
		return (
      <div>
        <br/>
        <br/>
        <h1>Wasm Playground</h1>
  			<canvas id="canvas" width="640" height="480">
        </canvas>
      </div>
		);
	}
}
