'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.getLastState = exports.getStore = exports.updateStore = exports.createStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   *  Minimal Store Management using rx
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   *  @author  Avraam Mavridis    <avr.mav@gmail.com>
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   */

var _rx = require('rx');

var _lodash = require('lodash');

var stateSubject = new _rx.BehaviorSubject();
var noop = function noop() {
  return void 0;
};

var createStore = exports.createStore = function createStore(initialState) {
  return stateSubject.onNext(_extends({}, initialState));
};
var updateStore = exports.updateStore = function updateStore(newState) {
  return stateSubject.onNext(_extends({}, stateSubject.value, newState));
};
var getStore = exports.getStore = function getStore() {
  return stateSubject;
};
var getLastState = exports.getLastState = function getLastState() {
  return stateSubject.value;
};

var connect = exports.connect = function connect() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (target) {
    var obj = Object.create(target.prototype);
    var willMount = obj.componentWillMount;
    var willUnmount = obj.componentWillUnmount;

    target.prototype.componentWillMount = function () {
      var _this = this;

      this.stateListener = stateSubject;

      this.stateListener.map(function (state) {
        return args.length ? (0, _lodash.pick)(state, args) : state;
      }).subscribe(function (state) {
        return _this.setState(state);
      });

      willMount ? willMount.call(this) : noop();
    };

    target.prototype.componentWillUnmount = function () {
      try {
        // unsubscribe
        this.stateListener.dispose();
      } catch (e) {
        // listener has already been removed or component is not mounted any more
      }

      willUnmount ? willUnmount.call(this) : noop();
    };

    return target;
  };
};