// TODO: LabelList 에서 받은 id, label 로 프로퍼티 대체
// TODO: LabelList 에서 받은 selectedLabelId 보고 active 처리해주기
// TODO: 해당되는 메모 개수 추가

// TODO: 이름 변경은 여기 들어가야 할 것 같다

import React from 'react';
import { Link } from 'react-router';

const LabelItem = ({ labelName }) => {
  let selectLabelLink;
  if (!labelName) {
    selectLabelLink = <Link to="/">모든 라벨 보기</Link>;
  } else {
    selectLabelLink = <Link to={`/${labelName}`}>{labelName}</Link>
  }
  return (
    <li className="list-group-item">
      {selectLabelLink}
    </li>
  )
}

export default LabelItem
