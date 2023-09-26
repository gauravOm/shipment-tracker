// src/app/app.js
import { Provider } from 'react-redux';
import store from '../app/store'; // Replace with the actual path to your Redux store

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
