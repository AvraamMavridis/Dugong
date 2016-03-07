/**
 *  Minimal Store Management using rx
 *
 *  @author  Avraam Mavridis    <avr.mav@gmail.com>
 *
 */

import { BehaviorSubject } from 'rx';
import { pick, isEqual }   from 'lodash';

const stateSubject = new BehaviorSubject();
const noop = () => void 0;

export const createStore = initialState => stateSubject.onNext( { ...initialState } );
export const updateStore = newState => stateSubject.onNext( { ...stateSubject.value, ...newState } );
export const getStore = () => stateSubject;
export const getLastState = () => stateSubject.value;

export const connect = ( ...args ) => ( target ) =>
{
    const obj = Object.create( target.prototype );
    const willMount = obj.componentWillMount;

    target.prototype.componentWillMount = function()
    {
        stateSubject
            .filter( state => isEqual( state, getLastState() ) )
            .map( state => args.length ? pick( state, args ) : state )
            .subscribe( state => this.setState( state ) );

        willMount ? willMount.call( this ) : noop();
    };

    return target;
};
