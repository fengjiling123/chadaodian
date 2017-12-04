import React,{Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
import {NavLink} from 'react-router-dom'
import { Tabs, WhiteSpace } from 'antd-mobile';
// <NavLink to={`/detail/${this.props.match.params.id}/product_detail`} activeClassName='active'>商品</NavLink>
// 					<NavLink to={`/detail/${this.props.match.params.id}/product_info`} activeClassName='active'>详情</NavLink>
// 					<NavLink to={`/detail/${this.props.match.params.id}/product_eval`} activeClassName='active'>评价</NavLink>

class Detail extends Component{
	constructor(){
		super()
		this.state={
			hash:window.location.hash.split('/')[2]
		}
		console.log(window.location.hash.split('/')[2])
	}
	componentWillMount(){
		
		
		console.log()
		console.log(this.props)
		// this.props.getdetaillist(this.props.match.params.id)
	}
	render(){

		return <div id='detail'>
			<div className='detailheader'>
				<span>
					<i className='iconfont icon-fanhui' onClick={()=>{history.go(-1)}}></i>
				</span>
				<div>
					<NavLink to={`/detail/${this.state.hash}/product_detail`} activeClassName='active'>商品</NavLink>
					<NavLink to={`/detail/${this.state.hash}/product_info`} activeClassName='active'>详情</NavLink>
					<NavLink to={`/detail/${this.state.hash}/product_eval`} activeClassName='active'>评价</NavLink>

				</div>
				<span>
					<i className='iconfont icon-more2'></i>
				</span>
			</div>
			<div className='detailcontent'>
				{
					this.props.children
				}

			</div>
			
		</div>
	}
}
//商品
//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_detail&goods_id=100156&key=2baff8ac91caaaae53d1b94ad72a914e
//详情
//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_body&goods_id=100156
////全部评价
//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=100156&curpage=1&page=10
////好评
///http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=100156&type=1&curpage=1&page=10
///中评
///http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=100156&type=2&curpage=1&page=10
///差评
///http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=100156&type=3&curpage=1&page=10
///订单晒图
///http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_evaluate&goods_id=100156&type=4&curpage=1&page=10
export default Detail

