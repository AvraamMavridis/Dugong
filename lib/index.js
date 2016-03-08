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

        target.prototype.componentWillMount = function () {
            var _this = this;

            stateSubject.filter(function (state) {
                return (0, _lodash.isEqual)(state, getLastState());
            }).map(function (state) {
                return args.length ? (0, _lodash.pick)(state, args) : state;
            }).subscribe(function (state) {
                return _this.setState(state);
            });

            willMount ? willMount.call(this) : noop();
        };

        return target;
    };
};