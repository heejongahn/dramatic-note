import React from 'react';
import { Link } from 'react-router';

import LabelList from './LabelList';

const dummyLabelNames = ["label1", "label2", "label3"]

const App = ({ children }) => {
  return (
    <section className="row">
      <div id="label-list" className="col-md-4">
        <LabelList labelNames={dummyLabelNames} />
      </div>
      { children }
    </section>
  )
}

export default App;
