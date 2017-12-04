import React,{Component} from 'react'
import { Flex, WhiteSpace } from 'antd-mobile';
import './index.scss'
import {NavLink} from 'react-router-dom'
import '@/assets/iconfont/iconfont.css'
class Footer extends Component{
	constructor(){
		super()
	};

	render(){
		return <div id='footer'>
			<div className="flex-container">			   			 
			   <Flex>
			   <Flex.Item>
				   	<NavLink to='/home'>
				   		<i className='iconfont icon-home2'></i>
				   		首页
			   		</NavLink>
		   		</Flex.Item>
		     	<Flex.Item>
		     		<NavLink to='/categroy'>
		     			<i className='iconfont icon-fenlei'></i>
		     			分类
	     			</NavLink>
     			</Flex.Item>
		     	<Flex.Item>
		     		<NavLink to='/chat_list'>
		     			<i className='iconfont icon-caogaoxiang1'></i>
	     				消息
	     			</NavLink>
     			</Flex.Item>
		     	<Flex.Item>
			     	<NavLink to='/cart_list'>
			     		<i className='iconfont icon-gouwuchekong'></i>
			     		购物车
			     	</NavLink>
		     	</Flex.Item>
	      		<Flex.Item><
		      		NavLink to='/member'>
		      			<i className='iconfont icon-wode'></i>
		      			个人中心
		      		</NavLink>
	      		</Flex.Item>
			   </Flex>
		   </div>
		</div>
	}
}

export default Footer