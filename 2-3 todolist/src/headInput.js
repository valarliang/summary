import React,{Component} from 'react';

class HeadInput extends Component{
	constructor(){
		super();
		this.state={
			val:''
		}
	}
	change=(ev)=>{
		this.setState({val:ev.target.value});
	}
	keyup=(ev)=>{
		let {addData}=this.props;
		if (ev.keyCode===13 && ev.target.value.trim()){
			let obj={
				id:+new Date(),
				txt:this.state.val,
				checked:false
			};
			addData(obj);
			this.setState({val:''});
		}
	}
	render() {
		return(
			<input 
				className="new-todo" 
				placeholder="请输入内容" 
				value={this.state.val} 
				onChange={this.change}
				onKeyUp={this.keyup}
			/>)
	}
}
export default HeadInput;