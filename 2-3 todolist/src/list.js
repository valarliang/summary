import React,{Component} from 'react';

class List extends Component{
	constructor(props){
		super(props);
		this.state={
			ondbl:false,
			ctxt:this.props.txt
		}
	}
	change=()=>{
		let {id,changeTgl}=this.props;
		changeTgl(id);
	}
	dbl=()=>{
		let {txt}=this.props;
		this.setState({ondbl:true,ctxt:txt},()=>{
			let {edited}=this.refs;
			edited.selectionStart=edited.value.length;
			edited.focus();
		});
	}
	blur=()=>{
		let {modify,id}=this.props;
		let {ctxt}=this.state;
		if (ctxt.trim()) modify(id,ctxt);
		this.setState({ondbl:false,ctxt})
	}
	keyup=(ev)=>{
		if (ev.keyCode===13) this.blur();
	}
	txtChange=(ev)=>{
		this.setState({ctxt:ev.target.value})
	}
	del=()=>{
		let {id,del}=this.props;
		del(id);
	}
	render(){
		let {txt,checked}=this.props;
		let {ondbl,ctxt}=this.state;
		let classn=checked?'completed':'';
		if (ondbl) classn+=' editing';
		return(
			<li className={classn} onDoubleClick={this.dbl}>
					<div className="view">
							<input 
									className="toggle" 
									type="checkbox" 
									checked={checked}
									onChange={this.change} />
							<label>{txt}</label>
							<button className="destroy" onClick={this.del}></button>
					</div>
					<input className="edit"
						value={ctxt} 
						onChange={this.txtChange}
						ref='edited'
						onBlur={this.blur}
						onKeyUp={this.keyup}
						/>
			</li>
		)
	}
}

export default List;