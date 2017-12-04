import react,{Component} from 'react'
import './index.scss'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
class Islogin extends Component{
	constructor(){
		super();
	}
	
	render(){
		return <div id='islogin' key={localStorage.getItem('loginuser')}>
			{
				localStorage.getItem('loginuser')?
				<div>
					<div className='content'>
						<NavLink to='/member'>我的账号</NavLink>
						<NavLink to='/' onClick={this.logout.bind(this)}>安全退出</NavLink>
						<NavLink to='/member'>反馈</NavLink>
						<a onClick={this.totop.bind(this)}>返回顶部</a>					
					</div>
				</div>:
				<div>
					<div  className='content'>
						<NavLink to='/login'>登陆</NavLink>
						<NavLink to='/register'>注册</NavLink>
						<NavLink to='/member'>反馈</NavLink>
						<a onClick={this.totop.bind(this)}>返回顶部</a>	
					</div>
				</div>
			}
		</div>
	}
	logout(){
		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		localStorage.removeItem('loginuser')
		axios.get(`/mobile/index.php?act=logout&username=${loginuser.username}&key=${loginuser.key}&s=&r=&is_pop=1&client=wap`).then(res=>{				
				//console.log(localStorage.getItem('loginuser'))
				scrollTo(0,0)
			})
	}
	totop(){
		console.log(111)
		scrollTo(0,0)
	}

}

export default Islogin