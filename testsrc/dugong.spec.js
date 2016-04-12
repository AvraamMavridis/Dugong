import { createStore, updateStore, connect, getStore, getLastState } from '../lib/index.js';
import { expect } from 'chai';
import { BehaviorSubject } from 'rx';
import React, { Component } from 'react';

describe( 'Chimera', function () {

    beforeEach( function () {
        createStore( { something : 5 } );
    } );

    it( 'should createStore with initial state', function () {
        expect( getStore().value.something ).to.equal( 5 );
    } );

    it( 'should return a BehaviorSubject on getStore()', function () {
        expect( getStore() instanceof BehaviorSubject ).to.equal( true );
    } );

    it( 'should update the store on updateStore()', function () {
        updateStore( { something : 10 } );
        expect( getStore().value.something ).to.equal( 10 );
    } );

    it( 'should return the last state on getLastState()', function () {
        updateStore( { something : 100 } );
        expect( getLastState().something ).to.equal(  100 );
    } );

});
