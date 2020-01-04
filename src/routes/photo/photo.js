import React from 'react';
import { connect } from 'dva';


class photoPage extends React.Component {

  render() {
    return(
      // <SlicerComponent history={history} location = {location}>
        <div>
          this is photo list
        </div>
      // </SlicerComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(photoPage);