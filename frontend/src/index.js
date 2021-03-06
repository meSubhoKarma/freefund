import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dapp from './components/Dapp/Dapp';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './firebase/index';
import reducer from './store/reducer';


// This breaks so much stuff I'm removing it for now

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if(serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     return undefined;
//   }
// };

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState);
//   } catch (e) {

//   }
// };

const debug = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const peristedState = loadState();
const store = createStore(reducer);

// store.subscribe(() => {
//   saveState(store.getState());
// });


ReactDOM.render(
  <Provider store ={store}> 
    <FirebaseContext.Provider value = {new Firebase()}>
      <Router>
        <Dapp />
      </Router>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);
