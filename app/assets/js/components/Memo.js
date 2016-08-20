import React from 'react'

const Memo = ({ params } ) => {
  if (params.memoId) {
    return <h1>{"Memo id" + params.memoId}</h1>
  } else {
    return null
  }
}


export default Memo
