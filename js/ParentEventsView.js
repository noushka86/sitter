let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

    import {UpperPanel} from "./UpperPanel.js"




var ParentEventsView=React.createClass({
	render:function(){
		return(
			<div className="UserStyle">
    				<UpperPanel/>

    			</div>
			)
	}
})












    export {ParentEventsView}