import React from 'react';
import ReactDOM from 'react-dom';
import Informasjon from "./index";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Informasjon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
