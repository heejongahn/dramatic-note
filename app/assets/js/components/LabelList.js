// TODO: 라벨 추가 버튼, 모달

// TODO     : redux store와 연결
// state    : labels => LabelItem 인자로 (id, label) 던진다
// dispatch : createLabel (라벨 추가 모달)

// TODO: App에서 받은 selectedLabelId LabelItem 으로 넘기기

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
