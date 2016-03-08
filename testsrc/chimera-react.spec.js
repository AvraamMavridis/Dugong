import { connect, createStore, updateStore } from '../lib/index.js';
import { expect }                            from 'chai';
import React, { Component }                  from 'react';
import { shallow }                           from 'enzyme';


createStore( { something : 10 } );

@connect( 'something' )
class Test extends Component
{
    render()
    {
        return <div></div>;
    }
}


describe('<Test /> @connect', () => {

  it('should get the right initial state with @connect', () => {
    const wrapper = shallow(<Test />);
    expect( wrapper.state( 'something' ) ).to.equal( 10 );
  });

  it('should update components state when the store is updated', () => {
    const wrapper = shallow(<Test />);
    updateStore( { something : 100 } )
    expect( wrapper.state( 'something' ) ).to.equal( 100 );
  });

});
