import React from 'react';
import { connect } from 'dva';
import SlicerComponent from '../../components/slider/slider';

class photoPage extends React.Component {

  render() {
    const {history, location} = this.props;
    return(
      <SlicerComponent history={history} location = {location}>
        <div>
          this is photo list
        </div>
      </SlicerComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(photoPage);