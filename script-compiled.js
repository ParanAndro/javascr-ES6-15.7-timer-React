'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
	_inherits(StopWatch, _React$Component);

	function StopWatch(props) {
		_classCallCheck(this, StopWatch);

		var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		};
		return _this;
	}

	_createClass(StopWatch, [{
		key: 'reset',
		value: function reset() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
			this.clear();
		}
	}, {
		key: 'pad0',
		value: function pad0(value) {
			var result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
		}
	}, {
		key: 'format',
		value: function format() {
			var minutes = this.state.times.minutes;
			var seconds = this.state.times.seconds;
			var miliseconds = this.state.times.miliseconds;
			return this.pad0(minutes) + ':' + this.pad0(seconds) + ':' + this.pad0(Math.floor(miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.state.running = 'true';
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds,
					miliseconds: this.state.times.miliseconds + 1
				}
			});

			if (this.state.times.miliseconds >= 100) {
				this.setState({
					times: {
						minutes: this.state.times.minutes,
						seconds: this.state.times.seconds + 1,
						miliseconds: 0
					}
				});
			}

			if (this.state.times.seconds >= 60) {
				this.setState({
					times: {
						minutes: this.state.times.minutes + 1,
						seconds: 0,
						miliseconds: this.state.times.miliseconds
					}
				});
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.setState({
				running: false
			});
			clearInterval(this.watch);
		}
	}, {
		key: 'save',
		value: function save() {
			this.setState({
				results: [this.format(this.state.times)].concat(_toConsumableArray(this.state.results))
			});
		}
	}, {
		key: 'clear',
		value: function clear() {
			if (this.state.times.miliseconds > 0 || this.state.times.seconds > 0 || this.state.times.minutes > 0) {
				this.setState({
					results: [],
					display: 'none'
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'nav',
					{ className: 'controls' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'start', onClick: function onClick() {
								return _this3.start();
							} },
						'START'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'stop', onClick: function onClick() {
								return _this3.stop();
							} },
						'STOP'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'save', onClick: function onClick() {
								return _this3.save();
							} },
						'SAVE RESULT'
					)
				),
				React.createElement(
					'div',
					{ className: 'display' },
					this.format(this.state.times)
				),
				React.createElement(
					'ul',
					{ className: 'results' },
					this.state.results.map(function (result) {
						return React.createElement(
							'li',
							null,
							result
						);
					})
				),
				React.createElement(
					'div',
					{ className: 'remove' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'reset', onClick: function onClick() {
								return _this3.reset();
							} },
						'RESET STOPWATCH'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'clear', onClick: function onClick() {
								return _this3.clear();
							} },
						'CLEAR RESULTS'
					)
				)
			);
		}
	}]);

	return StopWatch;
}(React.Component);

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById('app'));
