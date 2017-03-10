import React from 'react';
import {render} from 'react-dom';
import MainContainer from './MainContainer.jsx'

class App extends React.Component {
  render () {
    return (
      <div>
        <MainContainer/>
      </div>
    );
  }
}


render(<App/>, document.getElementById('app'));
