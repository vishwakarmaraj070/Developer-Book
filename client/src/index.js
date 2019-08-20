import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserContenxtProvider from './User/User.contenxt';
import "font-awesome/css/font-awesome.min.css"

ReactDOM.render(
<UserContenxtProvider>
    <App />
</UserContenxtProvider>
, document.getElementById('root'));


serviceWorker.unregister();
