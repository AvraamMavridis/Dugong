import { BehaviorSubject } from 'rx';

import {
  createStore, updateStore, getStore, getLastState
} from '../lib/index.js';

describe('Dugong', () => {
  beforeEach(() => {
    createStore({ something: 5 });
  });

  it('should createStore with initial state', () => {
    expect(getStore().value.something).toEqual(5);
  });

  it('should return a BehaviorSubject on getStore()', () => {
    expect(getStore() instanceof BehaviorSubject).toEqual(true);
  });

  it('should update the store on updateStore()', () => {
    updateStore({ something: 10 });
    expect(getStore().value.something).toEqual(10);
  });

  it('should return the last state on getLastState()', () => {
    updateStore({ something: 100 });
    expect(getLastState().something).toEqual(100);
  });
});
