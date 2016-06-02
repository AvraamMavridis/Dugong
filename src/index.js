/**
 *  Minimal Store Management using rx
 *
 *  @author  Avraam Mavridis    <avr.mav@gmail.com>
 *
 */

 import { BehaviorSubject } from 'rx';
 import pick                from 'lodash/pick';
 import { Component }       from 'react';

 const stateSubject = new BehaviorSubject();
 const noop = () => void( 0 );

 /**
  * Custom Error
  * @param  { Object } settings
  */
 const StoreError = function( settings )
 {
   this.name = 'RxStoreError';
   this.message = settings.message;
   this.context = settings.context;
   this.component = this.context.constructor.name;
   Error.captureStackTrace( this, this.constructor );
 };

 /**
  * Determines if the wrapped component is a React Component
  * @param  {Class or Function} target
  */
 const isReactComponent = function( target, func )
 {
   if ( !target || !( target.prototype instanceof Component ) )
   {
     throw new StoreError( {
       message : 'connect() should wrap a React Component',
       context : Component.prototype,
     } );
   }
   func.call( this, target );
 };

 export const createStore = initialState => stateSubject.onNext( { ...initialState } );
 export const updateStore = newState => stateSubject.onNext( { ...stateSubject.value, ...newState } );
 export const getStore = () => stateSubject;
 export const getLastState = () => stateSubject.value;


 /**
  * Remove all listeners
  */
 export const removeAllListeners = () => stateSubject.dispose();

 /**
  * React decorator, decorates a React component
  * @return {ReactComponent}
  */
 export const connect = ( ...args ) => ( targ ) => isReactComponent( target, ( target ) =>
 {
   const obj = Object.create( target.prototype );
   const willMount = obj.componentWillMount || noop;
   const willUnmount = obj.componentWillUnmount || noop;
   const onComplete = obj.onComplete || noop;
   const onError = obj.onError || ( stg => { throw new StoreError( stg ); } );

   /**
   * It is called when the Subjects stops pushing values
   */
   target.prototype.onComplete = function()
   {
     onComplete.call( this );
   };

   /**
   * It is called when an error happens on the store
   * @param  {Error object} err
   */
   target.prototype.onError = function( err )
   {
     /* isStopped is passed by rx and means that the stream has
     stopped due to an error, in that case err.message is not so
     meaningfull and its better to pass the stack as message,
     that can could change in the future */
     const message = this.isStopped ? err.stack : err.message;

     const settings = {
       ...err,
       message : message || 'An error in your store.',
       context : this,
     };

     onError.call( this, settings );
   };

   /**
   * Set the listener on componentWillMount
   * Listener will setState
   */
   target.prototype.componentWillMount = function()
   {
     this.__subscription = stateSubject
                            .map( state => args.length ? pick( state, args ) : state )
                            .subscribe( state => this.setState( state ),
                                        this.onError,
                                        this.onComplete );

     willMount.call( this );
   };

   /**
   * Remove subscriber on componentWillUnmount
   */
   target.prototype.componentWillUnmount = function()
   {
     this.unsubscribe();
     willUnmount.call( this );
   };

   /**
   * Provide an unsubscribe function to the underline component
   */
   target.prototype.unsubscribe = function()
   {
     try
     {
       this.__subscription.dispose();
     }
     catch ( err )
     {
       this.onError( err );
     }
   };

   return target;
 } );
