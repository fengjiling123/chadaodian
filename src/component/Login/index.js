import React,{Component} from 'react'
import qs from 'qs'
import './index.scss'
import { Toast} from 'antd-mobile';
import {connect} from 'react-redux'
class Login extends Component{
	constructor(){
		super()
	}
	componentWillMount(){

	}
	render(){
		return <div id='login'>
			<div className='loginheader'>
				<i className='iconfont icon-home2' onClick={this.gohome.bind(this)}></i>
				<span>登陆</span>
				<i className='register' onClick={this.toregister.bind(this)}>注册</i>
			</div>
			<form>
				<div>
					<div>
						<label>账户</label>
						<input type='text' placeholder='用户名/邮箱/已验证手机' ref='username'/>
					</div>
					<div>
						<label>密码</label>
						<input type='password' placeholder='登陆密码' ref='password'/>
					</div>	
				</div>		
				<button onClick={this.login.bind(this)} type='button'>登陆</button>
			</form>
		</div>

	}
	gohome(){
		this.props.history.push(`/home`)
	}
	failToast(info) {
	  Toast.fail(info, 2);
	}
	toregister(){
		this.props.history.push(`/register`)
	}
	successToast(info) {
	  Toast.success(info, 1);
	}
	login(){
		axios.post(`/mobile/index.php?act=login`,
			qs.stringify({username:this.refs.username.value,
			password:this.refs.password.value,
			client:"wap"})).then(res=>{
				if(!res.data.datas.error){
					localStorage.setItem('loginuser',JSON.stringify({'username':res.data.datas.username,'key':res.data.datas.key}))
					
					//this.props.history.push(`/home`)
					Toast.success('登陆成功',1)
					
					history.go(-1)
				}else{
					Toast.fail(res.data.datas.error, 2);
				}
				
				console.log(res.data)

			})
	}
}
export default Login
