class StopWatch extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		};
	}
	
	reset () {
		this.setState ({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
		});
		this.clear()
	}

	pad0 (value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}
	
	format () {
		let minutes = this.state.times.minutes;
		let seconds = this.state.times.seconds;
		let miliseconds = this.state.times.miliseconds;
		return `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(Math.floor(miliseconds))}`;
	}
	
	start () {
		if(!this.state.running) {
			this.state.running = 'true';
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	
	step () {
		if(!this.state.running) return;
			this.calculate();
	}
	
	calculate () {
		this.setState ({
			times: {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds + 1
			}	
		});
		
		if(this.state.times.miliseconds >= 100) {
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds + 1,
					miliseconds: 0
				}
			});
		}
		
		if(this.state.times.seconds >= 60) {
			this.setState ({
				times: {
					minutes: this.state.times.minutes +1,
					seconds: 0, 
					miliseconds: this.state.times.miliseconds 
				}
			});
		}
	}
	
	stop () {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}

	save() {
		this.setState({
			results: [this.format(this.state.times), ...this.state.results]
		})
	}

	clear() {
		if(this.state.times.miliseconds > 0 || this.state.times.seconds > 0 || this.state.times.minutes > 0) {
	        this.setState({
	            results: [],
	            display: 'none'
	        })
    	}
    }
	
	render () {
			return (
				<div className = {'container'}>
						<nav className = {'controls'}>
							<a href = {'#'} className = {'button'} id = {'start'} onClick = {() => this.start()}>START</a>
							<a href = {'#'} className = {'button'} id = {'stop'} onClick = {() => this.stop()}>STOP</a>
							<a href = {'#'} className = {'button'} id = {'save'} onClick = {() => this.save()}>SAVE RESULT</a>
						</nav>
						<div className = "display">{this.format(this.state.times)}</div>
						<ul className = "results">
						{this.state.results.map((result) => <li>{result}</li>)}
						</ul>
						<div className = {'remove'}>
						<a href = {'#'} className = {'button'} id = {'reset'} onClick = {() => this.reset()}>RESET STOPWATCH</a>
						<a href = {'#'} className = {'button'} id = {'clear'} onClick = {() => this.clear()}>CLEAR RESULTS</a>
						
						</div>
				</div>
			);
	}
}


const element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById('app'));

