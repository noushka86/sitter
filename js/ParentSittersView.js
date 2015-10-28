let fetch = require('./fetcher'),
	React = require('react'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Parse = require('parse')

    import {UpperPanel} from "./UpperPanel.js"



var ParentSittersView=React.createClass({
	
	// componentWillMount:function(){
	// 	// this.props.sitterModel.on("sync",this.forceUpdate.bind(this))
	// 	// Backbone.on("customEvent",this.forceUpdate.bind(this))
	// },

	render:function(){
		console.log(this)
		return(
			<div className="UserStyle">
    				<UpperPanel/>
    				<AddSitter/>
    				<SitterConfirm sitterModel={this.props.sitterModel} show={this.props.showConfirm}
    				sendInvitation={this.props.sendInvitation}/>
    			</div>
			)
	}

})

  // <SittersList showList = {this.props.showList} />


var SitterConfirm=React.createClass({
	_clickHandler:function(event){
		if(event.target.value==='No') return
		
		var SitterId=this.props.sitterModel.attributes.objectId
		var ParentId=Parse.User.current().id

		this.props.sendInvitation(SitterId,ParentId)
		// window.component = this
		// this.props.linkSitter(SitterId)
			

	},


	render:function(){
		
		// console.log(this.props.sitterModel.attributes)
		// console.log("xxx")
		var styleObj={}

		if(this.props.show===true){
			styleObj={
				display:'inline',
				position: 'fixed',
				height:'300px',
				width:'300px',
				border:'2px solid black',
				left: '50%',
                top: '50%',
                transform: "translate(-50%,-50%)",
                'backgroundColor':'#F5F5DC'
			}
		}
		else{
			styleObj={display:'none'}
		}
		return(
			<div style={styleObj}>
				 <p>are you sure you want to add to your sitters?</p>
				 <button onClick={this._clickHandler} value="Yes">Yes</button>
				 <button onClick={this._clickHandler} value="No">No</button>
				

			</div>
			)
	}
})

// <p>are you sure you want to add {this.props.sitterModel.attributes.email}
// 				to your sitters?</p>

var AddSitter=React.createClass({
	
_getSitterInfo:function(event){
			if(event.which===13 && event.target.value!=""){
				// this.props.searchSitter(event.target.value)
				location.hash = 'parent/sitterSearch/' + event.target.value
			}
		},


	render:function(){

		return(
			<div>
				<input onKeyPress={this._getSitterInfo} type="text" placeholder="add sitter by email"/>

			</div>
			)
	}
})


var SittersList=React.createClass({
	render:function(){
		// var showList = 'none'
		// if (this.props.showList) showList = 'block'
		// styleObject = {display: showList}

		return(
			<div></div>
			// <div style={styleObject}>hi</div>
			)
	}
})






    export {ParentSittersView}