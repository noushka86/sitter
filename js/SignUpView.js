let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

    import {UpperPanel} from "./UpperPanel.js"

    window.Parse = Parse

    var SignUpView=React.createClass({
    	render:function(){

    		return(
    			<div id="SignUpView">
    				<UpperPanel/>
    				<SignUpBox sendUserInfo={this.props.sendUserInfo}/>
    			</div>
    			)
    	}
    })

    var SignUpBox=React.createClass({
		
		getInitialState:function(){
				return {
					username:null,
					email: null,
					password:null,
					type:null
				}
			},

		componentDidMount:function(){
			this.userInput={
				username:null,
				email:null,
				password:null,
				type:null


			}
		},

		_checkValidInput:function(){
			// console.log('f')
			for(var prop in this.userInput){
				if(this.userInput[prop]===null)
				{
					alert('missing')
					return
				}
			}

			this.props.sendUserInfo(this.userInput)
			
		},

    	_getLoginParams:function(){
    		
    		
    		},

    	_validateInput: function(e){
    		// console.log('blurred!')
    		var name=e.target.name, 
    			value=e.target.value
    			this.userInput[name]=value
    			console.log(this.userInput)



    	},


    	render:function(){
    		return(
    			<div id="SignUpBox">
    				<input onBlur={this._validateInput} name="username" type="text" placeholder="User Name"/>
    				<input onBlur={this._validateInput} name="email" type="text" placeholder="Email"/>
    				<input onBlur={this._validateInput} name="password" type="text" placeholder="Password"/>
    				<p>I am:</p>
    				<input onClick={this._validateInput} className="radio" name="type" type="radio" value="parent"/> Parent
    				<input onClick={this._validateInput} className="radio" name="type" type="radio" value="sitter"/> Sitter
    				<button onClick={this._checkValidInput}>Join</button>
    			</div>
    			)
    	}
    })










export {SignUpView}