import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
// import GoogleMapReact from 'google-map-react';
import Script from 'react-load-script';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete';
import { incrementCounter, decrementCounter } from './TestActions';
import { openModal } from '../modals/modalActions';

const mapState = (state) => ({
	data: state.test.data
});

const actions = {
	incrementCounter,
	decrementCounter,
	openModal
};

// const Marker = () => <Icon name="marker" size="big" color="red" />;

class TestComponent extends Component {
	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
	};

	state = {
		address: '',
		scriptLoaded: false
	};

	handleScriptLoad = () => {
		this.setState({ scriptLoaded: true });
	};

	handleFormSubmit = (event) => {
		event.preventDefault();

		geocodeByAddress(this.state.address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => console.log('Success', latLng))
			.catch((error) => console.error('Error', error));
	};

	onChange = (address) => this.setState({ address });

	render() {
		const inputProps = {
			value: this.state.address,
			onChange: this.onChange
		};

		const {
			incrementCounter,
			decrementCounter,
			data,
			openModal
		} = this.props;
		return (
			<div>
				<Script
					url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBiQXzBEpN2fwodZP5H2BvvWyjc9fkcIn4&libraries=places"
					onLoad={this.handleScriptLoad}
				/>
				<h1>Test Area</h1>
				<h3>The answer is: {data}</h3>
				<Button
					onClick={incrementCounter}
					color="green"
					content="Increment"
				/>
				<Button
					onClick={decrementCounter}
					color="red"
					content="Decrement"
				/>
				<Button
					onClick={() =>
						openModal('TestModal', { data: 43 })}
					color="teal"
					content="Open Modal"
				/>
				<br />
				<br />
				<form onSubmit={this.handleFormSubmit}>
					{this.state.scriptLoaded && (
						<PlacesAutocomplete inputProps={inputProps} />
					)}
					<button type="submit">Submit</button>
				</form>
				{/* <div style={{ height: '300px', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{
							key:
								'AIzaSyBiQXzBEpN2fwodZP5H2BvvWyjc9fkcIn4'
						}}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
					>
						<Marker
							lat={59.955413}
							lng={30.337844}
							text="My Marker"
						/>
					</GoogleMapReact>
				</div> */}
			</div>
		);
	}
}

export default connect(mapState, actions)(TestComponent);
