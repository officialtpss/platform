import networks from './config/network';
import {connect} from './methods/connect';


const connectInstance = connect(networks.ropsten);

export default connectInstance;
