class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
		};
	}

	reset () {
		this.setState ({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
		this.print();
	}

	pad0 (value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}
	
	print () {
		this.display.innerText = this.format(this.times);
	}

	format () {
		let minutes = this.state.times.minutes;
		let seconds = this.state.times.seconds;
		let miliseconds = this.state.times.miliseconds;
		return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
	}

	start () {
		if (!this.stat.running) {
			this.state.running = `true`;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step () {
		if(!this.state.running) return;
			this.calculate();
	}

	calculate () {
		this.setState({
			times: {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds + 1
			}	
		});
		
		if(this.state.times.miliseconds >= 100){
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds + 1,
					miliseconds: 0
				}
			});
		}
		
		if(this.state.times.seconds >= 60){
			this.setState({
				times: {
					minutes: this.state.times.minutes +1,
					seconds: 0, 
					miliseconds: this.state.times.miliseconds 
				}
			});
		}
	}

	stop () {
		this.setState ({
			running: false,
			watch: null
		});
		clearInterval(this.watch);
	}

	render () {
		const style = this.state.times.miliseconds > 0 || this.state.times.seconds > 0 || this.state.times.minutes > 0 ? {} : { display: 'none' };
		
		return (
			<div className = {'container'}>
					<nav>
						<a href = {'#'} className = {'button'} id = {'start'} onClick = {() => this.start()}>START</a>
						<a href = {'#'} className = {'button'} id = {'stop'} onClick = {() => {this.stop()}}>STOP</a>
						<a href = {'#'} className = {'button'} id = {'reset'} onClick = {() => this.reset()}>RESET</a>
		 			</nav>
		 	</div>
			<Display time={this.format()}></Display>
		);
	}
}


class Display extends React.Component {
	constructor(props) {
		super(props)
	}
	
	static propTypes = {
		time: React.PropTypes.string.isRequired
	}
	
	render () {
		return (
		React.createElement('div', {className: 'stopWatch' }, this.props.time)
		);
	}
}

var element = React.createElement(Stopwatch);

ReactDOM.render(element, document.getElementById('app'));


