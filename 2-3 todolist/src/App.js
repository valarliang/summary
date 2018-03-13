import React, { Component } from 'react';
import './App.css';
import HeadInput from './headInput';
import List from './list';
import FooterM from './footer';

class App extends Component {
	constructor(){
		super();
		this.state={
			route:'all',
			arr:[
				{
					id:0,
					txt:'第一件事',
					checked:false
				}
			]
		}
	}

	addData=(obj)=>{
		let {arr}=this.state;
			arr.unshift(obj);
			this.setState({arr});
	}
	changeTgl=(id)=>{
		let {arr}=this.state;
		arr.forEach(e=>{
			if (e.id===id) e.checked=!e.checked;
		})
		this.setState({arr});
	}
	modify=(id,ctxt)=>{
		let {arr}=this.state;
		arr.forEach(e=>{
			if (e.id===id) e.txt=ctxt;
		})
		this.setState({arr});
	}
	changeAlltgl=(ev)=>{
		let {checked}=ev.target;
		let {arr}=this.state;
		arr.forEach(e=>e.checked=checked)
		this.setState({arr});
	}
	del=(id)=>{
		let {arr}=this.state;
		arr=arr.filter(e=>e.id!==id);
		this.setState({arr});
	}
	changeRoute=(route)=>{
		this.setState({route});
	}
	rmDone=()=>{
		let {arr}=this.state;
		this.setState({arr:arr.filter(e=>!e.checked)})
	}
	render() {
		let {arr,route}=this.state;
		let list=arr.filter(e=>{
			switch(route){
				case 'completed': return e.checked; break;
				case 'active': return !e.checked; break;
				default: return e;
			}
		})
		list=list.map((e,i)=>{
		let obj={
			key:i,
			id:e.id,
			txt:e.txt,
			checked:e.checked,
			changeTgl:this.changeTgl,
			del:this.del,
			modify:this.modify
		};
				return <List {...obj}/>;
			});
		let len=arr.filter(e=>!e.checked).length;
		let checkAll=arr.every(e=>e.checked) && arr.length? true:false;
		return (
			<section className="todoapp">
					<div>
							<header className="header" >
									<h1>todos</h1>
									<HeadInput {...{addData:this.addData}}/>
							</header>
							<section className="main">
									<input 
											className="toggle-all" 
											type="checkbox" 
											checked={checkAll}
											onChange={this.changeAlltgl}
									/>
									<ul className="todo-list">
											{list}
									</ul>
							</section>
							<FooterM num={len} 
							changeRoute={this.changeRoute} 
							rmDone={this.rmDone}
							/>
					</div>
			</section>
		)
	}
}

export default App;
