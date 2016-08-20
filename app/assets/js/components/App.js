import React from 'react';
import { Link } from 'react-router';

const dummyLabelNames = ["label1", "label2", "label3"]

const App = ({ children }) => {
  return (
    <section className="row">
      <div id="label-list" className="col-md-4">
        <ul className="list-group">
          {dummyLabelNames.map(labelName =>
            <li className="list-group-item">
              <Link to={"/"+labelName}>
                {labelName}
              </Link>
            </li>
          )}
        </ul>
      </div>
      { children }
    </section>
  )
}

export default App;
