import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { TestComponent } from './reactComponentLib';

class App extends Component {
  render() {
    return (
      <div>
        <TestComponent text="Styled Component from React library" />
      </div>
    );
  }
}

export default App;
