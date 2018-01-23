import './style';
import { Component } from 'preact';
import { Playground } from './playground';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Wasm Playground</h1>
				<Playground></Playground>
			</div>
		);
	}
}
