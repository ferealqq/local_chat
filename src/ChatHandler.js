import React, { Component } from 'react';
import Chat from './Chat';
import { connect } from 'react-redux';
import { fetchChannels,connectDefault } from './actions/channel_actions';
import { Row, Col,Button  } from 'reactstrap';
import { map,find } from 'lodash';

class ChatHandler extends Component {
	componentDidMount(){
		this.props.fetchChannels();
	}
	componentDidUpdate(prevProps){
		if(!this.props.channelReducer.isFetching && prevProps.channelReducer.isFetching){
			this.props.connectDefault();
		}
	}
	render() {
		const { channels } = this.props.channelReducer;  
		return (
			<div>
				<Row className="w-100">
					<Col sm="2">
						{ map(channels,(channelObj)=><Button 
								onClick={()=>this.handleChannelSwitch(channelObj)}> 
									{channelObj.channel} 
								</Button>) 
						}
					</Col>
					<Col sm="8">
						<Chat />
					</Col>
				</Row>
			</div>
		);
	}
}


const mapDispatchToProps = dispatch => ({
	fetchChannels: () => dispatch(fetchChannels()),
	connectDefault: () => dispatch(connectDefault())
});

const mapStateToProps = state => ({
	channelReducer: state.channelReducer,
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatHandler);