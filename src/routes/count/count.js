import React from 'react';
import { connect } from 'dva';


function Count({count, dispatch}) {
  return (
    <div>
      <div>Highest Record: {count.record}</div>
      <div>{count.current}</div>
      <div>
        <button onClick={() => { dispatch({type: 'count/add', payload: {num: 1}}); }}>+</button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log('state', state)
  return { 
    count: state.count
  };
}

Count.propTypes = {

};

export default connect(mapStateToProps)(Count);
