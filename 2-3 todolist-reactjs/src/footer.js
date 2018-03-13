import React,{Component} from 'react';

class FooterM extends Component{
	constructor(){
		super();
		this.state={
			select:'all',
			list:[
        {
            route:'all',
            txt:'全部'
        },
        {
            route:'active',
            txt:'未完成'
        },
        {
            route:'completed',
            txt:'已完成'
        }
    	]
		}
	}
	click=(route)=>{
		this.props.changeRoute(route);
	}
	clean=()=>{
		this.props.rmDone();
	}
	render() {
		let {list,select}=this.state;
		list=list.map((e,i)=>{
			return (
				<li key={i}>
					<a href={`#${e.route}`}
						onClick={this.click.bind(this,e.route)}
						className={e.route===select?'selected':''}
					>{e.txt}</a>
				</li>
				)
		})
		return (
			<footer className="footer">
        <span className="todo-count">
        	<strong>{this.props.num}</strong>
        	<span>条未选中</span>
        </span>
        <ul className="filters">
            {list}
        </ul>
        <button className="clear-completed" onClick={this.clean}>清除完成项</button>
      </footer>
		);
	}
}
export default FooterM;