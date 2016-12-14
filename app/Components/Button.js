var React = require('react');
var ReactDOM = require('react-dom');

var buttonStyle = {
	margin: '10px 10px 10px 0'
};

var Button = React.createClass({
	render: function(){
		return (
			<div>Hello</div>
			<button 
				className="btn btn-default"
				style={buttonStyle}
				onClick={this.props.handleClick}>{this.props.label}</button>
			);
	}
});

ReactDOM.render(
	<Button />,
	document.getElementById('button')
);

// module.exports = Button;