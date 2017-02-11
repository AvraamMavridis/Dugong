/**
 * React create Class
 * // DEPRECATED
 */
import React from 'react';

const MYCS = React.createClass({
  render() {
    const { name } = this.props;

    return (
      <div>{ name }</div>
    );
  }
});


/**
 * React class component
 */
import React, {Component} from 'react'

class MYCS extends Component {
  render () {
    const { name } = this.props;

    return (
      <div>{ name }</div>
    )
  }
}
// <MYCS name="mycs" />

/**
 * Functional component
 */
function MYCS(props) {
  return <h1>{props.name}</h1>;
}
// <MYCS name="mycs" />
// https://github.com/thejameskyle/babel-react-optimize



/**
 * Prop Types
 * Wrong ways
 */
import React, {Component, PropTypes} from 'react'

class MYCS extends Component {
  static propTypes = {
    info: PropTypes.object,
    developer: PropTypes.string
  }

  render () {
    const { info : { name } } = this.props;

    return (
      <div>{ name }</div>
    )
  }
}

/**
 * Prop Types
 * Right way
 */
import React, {Component, PropTypes} from 'react'

class MYCS extends Component {
  static propTypes = {
    info: PropTypes.React.PropTypes.shape({
      name: React.PropTypes.string.isRequired
    }).isRequired,
    developer: PropTypes.oneOf(['Ivan', 'Claudio', 'Nicola'])
  }

  render () {
    const { info : { name } } = this.props;

    return (
      <div>{ name }</div>
    )
  }
}


/**
 *
 *  SET STATE
 *
 */

// WITH OBJECT
import React, {Component, PropTypes} from 'react'

class MYCS extends Component {

  getInitialState(){
    return {
      show: this.props.something
    }
  }

  onClick(){
    this.setState({
      show: !this.state.show && this.props.something
    })
  };

  render () {
    const { info : { name } } = this.props;

    return (
      <div onClick={() => this.onClick()}>{ name }</div>
    )
  }
}


// WITH FUNCTION
import React, {Component, PropTypes} from 'react'

class MYCS extends Component {

  getInitialState(){
    return {
      show: this.props.something
    }
  }

  onClick(){
    this.setState((prevState, props) => {
      return {
        show : !prevState.show + props.something
      };
    });
  };

  render () {
    const { info : { name } } = this.props;

    return (
      <div onClick={() => this.onClick()}>{ name }</div>
    )
  }
}


/**
 * High Order Components
 */


// Object Orientated way
class ClickOutside extends Component{
  onClickOutside() {
    //...
  }
}

class MYCS extends ClickOutside{
  render(){
    return <div>MYCS</div>
  }
}


// "REACT" WAY
class ClickOutside extends Component {

      componentDidMount()
      {
            if ( !this.props.onClickOutside ) return;
            clickOutsideEvents.forEach( e => document.addEventListener( e, this.handleClickOutside ) )
      }

      /**
       * Remove the listener in case the props change and there is not ClickAway handler
       * @param  { Object } prevProps
       */
      componentDidUpdate( prevProps )
      {
            if ( prevProps.onClickOutside !== this.props.onClickOutside )
            {
                  clickOutsideEvents.forEach( e => document.removeEventListener( e, this.handleClickOutside ) );

                  if ( this.props.onClickOutside )
                  {
                      clickOutsideEvents.forEach( e => document.addEventListener( e, this.handleClickOutside ) )
                  }
            }
      }

      /**
       * Remove listeners when Component unmount
       */
      componentWillUnmount()
      {
           clickOutsideEvents.forEach( e => document.removeEventListener( e, this.handleClickOutside ) );
      }

      /**
       * Call callback on ClickAway and pass the event
       * @param  event
       */
      handleClickOutside = ( e ) =>
      {
            const el = ReactDOM.findDOMNode( this );

            if ( document.documentElement.contains( e.target ) && !isDescendant( el, e.target ) )
            {
                this.props.onClickOutside( e );
            }
      };

      /**
       * Render the Elements that are Wrapped by the ClickAway
       */
      render()
      {
           return this.props.children;
      }
}

class MYCS extends Component {
  render(){
    return <div>MYCS</div>
  }
}

/**
 * <ClickOutside onClickOutside={ ( e ) => this.handleClickOutside( e ) }>
 *   <MYCS />
 * </ClickOutside>
 */

// FUNCTIONAL WAY

function clickOutside(_class){
  return class extends _class {
    // Implementation details
  }
}

class MYCS extends Component{}

const MYCSWITHCLICKOUTSIDE = clickOutside(MYCS);
/**
 * <MYCSWITHCLICKOUTSIDE />
 */


//DECORATOR
export const clickOutSide = ( ...args ) => ( target ) => {
  const obj = Object.create( target.prototype );
  const willMount = obj.componentWillMount || noop;
  const willUnmount = obj.componentWillUnmount || noop;

  target.prototype.onClickOutside = {
    //...
  }

  // ...
  return target;
}

@clickOutSide('an argument', 'anotherone' )
class MYCS extends Component{
  //..
}

// WHAT HAPPEN IN CASE YOU WANT TO EXTEND MULTIPLE FUNCTIONALLITY

@abstract()
@donscroll()
@clickOutSide('an argument', 'anotherone')
class MYCS extends Component{
  //..
}




// OR






// DECORATOR WITH MULTIPLE EXTEND
class ClickOutside{
  //..
};
class DontScrollBody{
  //..
};

@multiInherit( ClickOutside, DontScrollBody )
class MYCS extends Component {

};





