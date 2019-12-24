import React from 'react';
import { connect } from 'dva';
import './lazyLoad.css';
import LazyLoad from 'react-lazyload';

class LazyLoadComponent extends React.Component {

  render() {
    return(
      <div>
        {
          [...new Array(18)].map((item, index) => (
            <LazyLoad height={200}>
                <img src={`http://localhost:3000/static/images/${index + 1}.jpg`} alt="img"/>
            </LazyLoad>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}



export default connect(mapStateToProps)(LazyLoadComponent);