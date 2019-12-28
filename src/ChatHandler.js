import React, { Component } from 'react';
import Chat from './Chat';
import { connect } from 'react-redux';
import { fetchChannels } from './actions/channel_actions';
import { Row, Col,Button  } from 'reactstrap';
import { map } from 'lodash';
import { newWS } from './handling_data';

class ChatHandler extends Component {
	constructor(props){
		super(props);
		this.handleChannelSwitch = this.handleChannelSwitch.bind(this);
		this.state = {
			websocket: newWS(200),
		}
	}
	componentDidMount(){
		this.props.fetchChannels();
	}
	handleChannelSwitch(channelObj){
		this.setState({
			websocket: newWS(channelObj.port)
		})
	}
	render() {
		const { websocket } = this.state;
		return (
			<div>
				<Row className="w-100">
					<Col sm="2">
						{ map(this.props.channels,(channelObj)=><Button 
								onClick={()=>this.handleChannelSwitch(channelObj)}> 
									{channelObj.channel} 
								</Button>) 
						}
					</Col>
					<Col sm="8">
						<Chat websocket={websocket} />
					</Col>
				</Row>
			</div>
		);
	}
}


const mapDispatchToProps = dispatch => ({
	fetchChannels: () => dispatch(fetchChannels()),
});

const mapStateToProps = state => ({
	channels: state.channelReducer.channels,
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatHandler);