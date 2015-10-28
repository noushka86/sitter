// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

console.log("jS loaded")

var APP_ID = 'wXCq4PN1u7OGDCjyS4xkWMwTvIMlN8dfJKGkA4DE',
	JS_KEY = 'u3F2jXFkB1WZX44vRiGX7roenlOY8CadeGp4uzwi',
	REST_API_KEY = 'K4WIHPL5Q4eXxKnmyE1W2sqJUaU8E2Bcb8WLLaKI'


Parse.initialize(APP_ID,JS_KEY)

import {SignUpView} from "./SignUpView.js"
import {ParentEventsView} from "./ParentEventsView.js"
import {ParentSittersView} from "./ParentSittersView.js"



var SitterModel=Backbone.Model.extend({
	url: function(){//params>>{email:email}
	// console.log(this)
		return "https://api.parse.com/1/users/?where="+JSON.stringify(this.attributes)
	
	},
	
	defaults: {
		email: ''
	},

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	parse:function(responseData){
		return responseData.results[0]

	}


})


var SitterRouter=Backbone.Router.extend({
	routes:{
		'signup':'showSignUP',
		'parent/upcomingEvents':'showParentEvents',
		'parent/MySitters':'showParentSitters',
		'sitter':'showSitter',
		"parent/sitterSearch/:email":"findSitterByEmail"
	},

	findSitterByEmail: function(email){
		var modelParams={email:email}
		this.sm.set(modelParams)
		var self=this
		this.sm.fetch({
			headers:self.sm.parseHeaders
		})
		this.sm.on("sync change",this.showParentSitters(true))

	},

	showSignUP:function(){
		React.render(<SignUpView sendUserInfo={this.processUserInfo}/>, document.querySelector('#container'))
	},

	showParentEvents:function(){
		React.render(<ParentEventsView/>, document.querySelector('#container'))
	},

	showParentSitters:function(confirm){
		React.render(<ParentSittersView 
						sitterModel={this.sm}
						showConfirm={confirm||false}
						sendInvitation={this.sendInvitation}
						/>,
						 document.querySelector('#container'))
	},

	sendInvitation:function(sitterId,parentId){
		console.log(sitterId,parentId)

		var invitation= new Parse.Object('Invitation')
		invitation.set("sitterId",sitterId)
		invitation.set("parentId",parentId)
		invitation.set("complete",false)

		invitation.save().then(function(){
			alert('nice')
		})

	},

	processUserInfo:function(userInputObj){

		// console.log(userInputObj)
		var newUsr = new Parse.User()
		newUsr.set('username',userInputObj["username"])
		newUsr.set('email',userInputObj["email"])
		newUsr.set('password',userInputObj["password"])
		newUsr.set('type',userInputObj["type"])
		// 
		newUsr.signUp().then(
			function(){
				// console.log(userInputObj["username"] + ' signed up!')	
				location.hash=userInputObj["type"]+"/upcomingEvents"
		})
	},

	// searchSitter:function(email){
	// 	console.log('runnign search sitter')
	// 	var modelParams={email:email}
	// 	this.sm.set(modelParams)
	// 	var self=this
	// 	this.sm.fetch({
	// 		headers:self.sm.parseHeaders
	// 	}).then(function(){
	// 		// console.log(self.sm)
	// 	React.render(<ParentSittersView 
	// 					searchSitter={self.searchSitter.bind(self)}
	// 					sitterModel={self.sm}
	// 					showConfirm={true}
	// 					linkSitter={self.linkSitter.bind(this)}/>,
	// 					 document.querySelector('#container'))
	// 	})
	// },


	initialize:function(){
		this.sm=new SitterModel();
		Backbone.history.start();
	}
})

var router=new SitterRouter();


