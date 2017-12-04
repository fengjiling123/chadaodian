import React,{Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
import {NavLink} from 'react-router-dom'
class Product_eval extends Component{
	constructor(){
		super()
	}
	
	render(){
		return <div id='product_eval'>
			我是评价页
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
export default Product_eval