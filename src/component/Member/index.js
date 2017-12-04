import React,{Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
import Islogin from '@/component/common/Islogin'
import qs  from 'qs'
class Member extends Component{
	constructor(){
		super();

		
	}
	componentWillMount(){
		//console.log(this.state.unlogin)
		if(!localStorage.getItem('loginuser')){
			//this.props.history.push(`/login`)
			this.props.getuserinfounlogin()
		}else{
			this.props.getuserinfo()
		}
		
	}
	render(){
		return <div id='member'>
			<div className='member_header'>
				<span><i className='iconfont icon-home2' onClick={()=>{this.props.history.push('/home')}}></i></span>
				<div>我的商城</div>
				<span>...</span>
			</div>
			<div className='member_content'>
				<div className='member_top'>

				</div>
				<div className='user'>
					{
						this.props.userinfo?
						<div className='member_top_info login'>
							<img src={this.props.userinfo.member_info.avator}/>
							<p>{this.props.userinfo.member_info.user_name}</p>
						</div>
						:
						<div className='member_top_info unlogin' onClick={this.tologin.bind(this)}>
							<div><img src={require('@/assets/member_w.png')}/></div>
							
							<p>点击登陆</p>
						</div>
						
					}
				</div>
				<div className='member-collect'>
					<span>商品收藏</span>
					<span>店铺收藏</span>
					<span>我的足迹</span>
				</div>
			</div>
			<div className='member_content_center'>
				<div className='top'>
					<div className='title'>
						<span>
							<i className='iconfont icon-caogao1'></i>
							我的订单
						</span>
						<span className='right more'>
							查看全部订单
							<i className='iconfont icon-more'></i>
						</span>
					</div>
					<div className='caozuo'>
						<span><i className='iconfont icon-activity'></i>待付款</span>
						<span><i className='iconfont icon-fabu1'></i>待收货</span>
						<span><i className='iconfont icon-user'></i>待自提</span>
						<span><i className='iconfont icon-koubei'></i>待评价</span>
						<span><i className='iconfont icon-yuanhuantu-'></i>退款/退货</span>
					</div>
					
				</div>
				<div>
					<div className='title'>
						<span>
							<i className='iconfont icon-qiandai'></i>
							我的钱包
						</span>
						<span className='right more'>
							查看全部钱包
							<i className='iconfont icon-more'></i>
						</span>
					</div>
				</div>
				
				<div>
					<div className='title'>
						<span>
							<i className='iconfont icon-jiahao1'></i>
							收货地址管理
						</span>
						
					</div>
					<div className='title'>
						<span>
							<i className='iconfont icon-setup'></i>
							用户设置
						</span>
						
					</div>
				</div>
			</div>
			<Islogin/>
		</div>
	}

	tologin(){
		this.props.history.push('/login')
	}
}
//key:89b8af9db6d89e14b2b47bd95e2ac4da

export default connect(
		(state)=>{
			console.log(state.userinfo)
			return {
				userinfo:state.userinfo
			}
		},
		{
			getuserinfo:()=>{
				if(localStorage.getItem('loginuser'))
				var loginuser=JSON.parse(localStorage.getItem('loginuser'))
				return axios.post(`/mobile/index.php?act=member_index`,
						qs.stringify({key:loginuser.key})
					).then(res=>{
						//console.log(res.data)

						return {
							type:'userinfo',
							payload:res.data.datas
						}
					})
			},
			getuserinfounlogin:()=>{
				return {
					type:'userinfo',
					payload:''
				}
			}
		}
	)(Member)