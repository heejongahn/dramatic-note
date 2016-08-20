import React from 'react';
import { Link } from 'react-router';

const LabelItem = ({ labelName }) => {
  return (
    <li className="list-group-item">
      <Link to={`/${labelName}`}>{labelName}</Link>
    </li>
  )
}

export default LabelItem
