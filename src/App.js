import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Registration from './components/registration'

// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }
class App extends React.Component {
    render() {
        return ( <
            Router >
            <
            Switch >
            <
            Route path = "/registration"
            component = { Registration }
            /> < /
            Switch > <
            /Router> 
        )
    }
}

export default App;