var React = require('react');
var ReactDOM = require('react-dom');

var AddPlant = React.createClass({
	getInitialState: function() {
		return { showResults: false };
	},
	onClick: function() {
		this.setState({ showResults: true});
	},
	render: function() {
		return (
			<div>
                <input type="submit" value="Enter Plant Type" onClick={this.onClick} />
                { this.state.showResults ? <Results /> : null }
            </div>;
			);
	}
});

var Results = React.createClass({
    render: function() {
        return (
            <div id="results" className="search-results">
                Some Results
            </div>
        );
    }
});

ReactDOM.render(<Search />, document.getElementById('secondary-container'));