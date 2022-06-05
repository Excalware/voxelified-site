import { Provider } from 'react-redux';

import store from '../lib/store';

import '/voxeliface/src/index.css';
export default function App({ Component, pageProps }) {
    return <Provider store={store}>
        <Component {...pageProps}/>
    </Provider>;
};