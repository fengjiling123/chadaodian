import React,{Component} from 'react'
import qs from 'qs'
import './index.scss'
import { Toast} from 'antd-mobile';

class Register extends Component{
	constructor(){
		super()
	}
	render(){
		return <div id='register'>
			<div className='registerheader'>
				<i className='iconfont icon-back' onClick={this.back}></i>
				<span>注册</span>
				<i className='login' onClick={this.tologin.bind(this)}>登陆</i>
			</div>
			<form>
				<div>
					<div>

						<label>手机号</label>
						<input type='text' placeholder='请输入手机号' ref='username'/>
					</div>
					<div>
						<label>动态码</label>
						<input type='text' placeholder='请输入短信动态验证码' ref='captcha' className='captcha'/>
						<a onClick={this.sendcode.bind(this)}>短信获取</a>
					</div>	
					<div>
						<label>密码</label>
						<input type='password' placeholder='请输入6-24位密码' ref='password'/>
					</div>	
				</div>		
				<button onClick={this.register.bind(this)} type='button'>注册</button>
			</form>


		</div>

	}
	back(){
		history.go(-1)
	}
	failToast(info) {
	  Toast.fail(info, 2);
	}
	successToast(info) {
	  Toast.success(info, 2);
	}
	tologin(){
		this.props.history.push(`/login`)
	}
	sendcode(){
		console.log(11)
		axios.get(`/mobile/index.php?act=connect&op=get_sms_captcha&type=1&phone=${this.refs.username.value}`).then(res=>{
				if(res.data.datas.error!=1){
					this.failToast(res.data.datas.error)
				}else{
					this.successToast('验证码已发送')
				}
				
				console.log(res.data)

			})
	}
	register(){
		//http://www.chadaodian.com/mobile/index.php?act=connect&op=sms_register
		axios.post(`/mobile/index.php?act=connect&op=sms_register`,
			qs.stringify({
			phone:this.refs.username.value,
			captcha:this.refs.captcha.value,
			password:this.refs.password.value,
			client:"wap"
			})).then(res=>{
				if(res.data.datas.error){
					this.failToast(res.data.datas.error)
				}else{
					this.successToast('注册成功请登录')
					this.props.history.push(`/member`)
				}				
				console.log(res.data)

			})
	}
}
export default Register

