/**
 *  Minimal Store Management using rx
 *
 *  @author  Avraam Mavridis    <avr.mav@gmail.com>
 *
 */

import { BehaviorSubject } from 'rx';
import { pick } from 'lodash';

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
  const willUnmount = obj.componentWillUnmount;

  target.prototype.componentWillMount = function()
  {
    this.stateListener = stateSubject;

    this.stateListener.map( state => args.length ? pick( state, args ) : state )
                      .subscribe( state => this.setState( state ) );

    willMount ? willMount.call( this ) : noop();
  };


  target.prototype.componentWillUnmount = function()
  {
    try
    {
      // unsubscribe
      this.stateListener.dispose();
    }
    catch ( e )
    {
      // listener has already been removed or component is not mounted any more
    }

    willUnmount ? willUnmount.call( this ) : noop();
  };

  return target;
};
