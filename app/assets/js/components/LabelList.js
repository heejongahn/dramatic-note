import React from 'react';

import LabelItem from './LabelItem';

const LabelList = ({ labelNames }) => {
  return (
    <ul className="list-group">
      <LabelItem />
      {labelNames.map(labelName => <LabelItem labelName={labelName} />)}
    </ul>
  )
}

export default LabelList
