# Dugong
Minimal State Container for React Apps using RxJS

Dugong is a minimal state single-store container for React that uses RxJS. 
You can use it with Redux/Flux or any other pattern/framework although that is not nessecary.

# Why Dugong?

I made Dugong because I wanted a more clear way to know what every component consumes from the global state. Passing attributes through the props in apps with deep hierarchies many times leads to confusion and decrease the developement speed. Imagine a scenario where you have to inspect the parent of the parent of the parent of a component to know why a property is passed to it and if its value is the same as the value that the parent have or if the parent has manipulate it. Ofcourse you can still pass props from the parents, it is just my opinion that you should avoid it. Also I wanted to be able to have a Store on which I can iterate using reactive programming methods.

# How to use it

### Create your Store with its initial state

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

### Connect your component with the Store and define which parameters of the store you want to listen.

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

### You can also get the Store and the rxjs methods on it.

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

