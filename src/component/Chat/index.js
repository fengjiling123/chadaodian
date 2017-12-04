import React,{Component} from 'react'
import {connect} from 'react-redux'
import qs from 'qs'
import './index.scss'
class Chat extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		if(!localStorage.getItem('loginuser')){
			this.props.history.push(`/login`)
			return;
		}
		this.props.getchatlist()

	}
	render(){
		return <div id='chat'>
			<div className='chatheader'>
				<span><i className='iconfont icon-fanhui' onClick={()=>{history.go(-1)}}></i></span>
				<div>消息列表</div>

			</div>
			{
				!this.props.chatlist.length?
				<div className='nochat'>
					<p className='img'><i className='talk_w'></i></p>
					
					<p>您还没有和任何人联系过</p>
					<p className='pp'>对话后可以在此找到最近联系的客服</p>
					
				</div>
				:
				<div>
					我是消息列表
				</div>
			}
		</div>
	}
}
//参数
// key:2baff8ac91caaaae53d1b94ad72a914e
// recent:1
//http://www.chadaodian.com/mobile/index.php?act=member_chat&op=get_user_list
export default connect(
	(state)=>{
		console.log(state.chatlist)
		return {
			chatlist:state.chatlist
		}
	},
	{
		getchatlist:()=>{
			return axios.post(`/mobile/index.php?act=member_chat&op=get_user_list`,
				qs.stringify({key:JSON.parse(localStorage.getItem('loginuser')).key,recent:1})
				).then(res=>{
					//console.log(res.data.datas)
					return {
						type:'chatlist',
						payload:res.data.datas.list
					}
				})
		}
	}
	)(Chat)
