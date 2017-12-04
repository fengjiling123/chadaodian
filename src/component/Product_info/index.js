import React,{Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
import {NavLink} from 'react-router-dom'
import Islogin from '../common/Islogin'
import { Carousel, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile'
class Product_info extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		console.log(this.props.match.params)
		this.props.getdetaillist(this.props.match.params.id)
	}
	render(){
		return <div id='product_info'>
			{
				this.props.detaillist?
				<div>
				<div dangerouslySetInnerHTML={{__html:this.props.detaillist}}></div>
				</div>: <ActivityIndicator size="large" text="加载中..." className='loading'/>
			}
			 <Islogin/>
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
export default connect(
	(state)=>{
		//console.log(state.detaillist)

		return {
			detaillist:state.detaillist_info
		}
	},
	//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_body&goods_id=100165
	//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_detail&goods_id=100167&key=2baff8ac91caaaae53d1b94ad72a914e
	{
		getdetaillist:(id)=>{
			var loginuser=JSON.parse(localStorage.getItem('loginuser'))
			return axios.get(`/mobile/index.php?act=goods&op=goods_body&goods_id=${id}`)
			.then(res=>{
				//console.log(res.data)
				return {
					type:'detaillist_info',
					payload:res.data

				}
			})
		}
	}

	)(Product_info)