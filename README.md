# Dugong
Minimal State Container for React Apps using RxJS

[![NPM](https://nodei.co/npm/dugong.png?mini=true)](https://nodei.co/npm/dugong/)


![Dugong](https://haydensanimalfacts.files.wordpress.com/2014/12/dugong.jpg)


[![npm version](https://badge.fury.io/js/dugong.svg)](https://badge.fury.io/js/dugong)
[![Build Status](https://travis-ci.org/AvraamMavridis/dugong.svg?branch=master)](https://travis-ci.org/AvraamMavridis/dugong)
[![CocoaPods](https://img.shields.io/cocoapods/l/AFNetworking.svg)]()
[![semantic-versioning](https://img.shields.io/badge/semantic%20-versioning-green.svg)]() [![Greenkeeper badge](https://badges.greenkeeper.io/AvraamMavridis/dugong.svg)](https://greenkeeper.io/)

Dugong is a minimal single-store state container for React that uses RxJS. 
You can use it with Redux/Flux or any other pattern/framework although that is not nessecary.

# Why Dugong?

I made Dugong because I wanted a more clear way to know what every component consumes from the global state. Passing attributes through the props in apps with deep hierarchies many times leads to confusion and decrease the developement speed. Imagine a scenario where you have to inspect the parent of the parent of the parent of a component to know why a property is passed to it and if its value is the same as the value that the parent have or if the parent has manipulate it. Ofcourse you can still pass props from the parents, it is just my opinion that you should avoid it. Also I wanted to be able to have a Store on which I can iterate using reactive programming methods.

# How to pass the data from the Store to the Components

##### Create your Store with its initial state

```js
import { createStore } from 'dugong';

const initialState =  {
  ui: { ... },
  businessLogic: { ... },
  hello: "hello world",
  ...
  ...
};

createStore( initialState );
```

##### Connect your component with the Store and define which parameters of the store you want to listen.

```js
import { connect } from 'dugong';

@connect( 'hello' )
class MyHelloWorldComponent extends Component
{
  render(){
    return <div>{ this.state.hello }</div>;
  }
}
```

##### You can also get the Store and use rxjs methods on it.

```js
import { getStore } from 'dugong';

class MyHelloWorldComponent extends Component
{
  componentWillMount()
  {
    getStore().map( ( { ui } ) => ui.something )
              .filter( something => something.length > 4 )
              .subscribe( something => this.setState( { something } ) );
  }
  render(){
    return <div>{ this.state.something }</div>;
  }
}
```

# How to update the Store

##### Dugong is not opinionated on how to structure your application, you can use `updateStore()` directly inside the components.

```js
import { updateStore } from 'dugong';

class MyComponent extends Component
{
  update( something )
  {
     updateStore( { something } );
  }
  render(){
    return <input onChange={ e => this.updateStore( e.target.value ) }</input>;
  }
}
```

##### You can create services that will update parts of the store and inject them inside your components

```js
// UIService
import { updateStore } from 'dugong';

export const updateSomething = value => updateStore( { something : value } );


// MyComponent
import UIService from 'dugong';

class MyComponent extends Component
{
  update( value )
  {
     UIService.updateSomething( value );
  }
  render(){
    return <input onChange={ e => this.updateStore( e.target.value ) }</input>;
  }
}
```

##### ...or you can even dispatch an action with Redux (or anything similar) and then use updateStore to change the global state of your application. 

## Contributing
Feel free to open issues, make suggestions or send PRs.
This project adheres to the Contributor Covenant [code of conduct](http://contributor-covenant.org/). By participating, you are expected to uphold this code.

## Contact

E-mail : avr.mav@gmail.com

Twitter: [@avraamakis](https://twitter.com/avraamakis)

### License
MIT

