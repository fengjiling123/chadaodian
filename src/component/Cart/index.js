import React,{Component} from 'react'
import './index.scss'
import {connect} from 'react-redux'
import qs from 'qs'
import { Modal, Button} from 'antd-mobile';
import {ActivityIndicator,Toast } from 'antd-mobile'
import {NavLink} from 'react-router-dom'
class Cart extends Component{
	constructor(){
		super()

	}
	componentWillMount(){
		if(localStorage.getItem('loginuser')){
			this.props.getcratlist()
		}else{
			this.props.history.push(`/login`)
		}
	}
	render(){
		const alert = Modal.alert
		return <div id='cart'>
			<div className='cart_header'>
				<span><i className='iconfont icon-fanhui' onClick={()=>{history.go(-1)}}></i></span>
				<div>购物车</div>
				<span><i className='iconfont icon-more2'></i></span>
			</div>
			<div className='cartcontent'>
				{
					this.props.cart_list?
					<div>
						{
							this.props.cart_list.cart_count?
							<div>
								{
									this.props.cart_list.cart_list.map(item=>
											<div className='store' key={item.store_id}>
												<div className='store_name'>{item.store_name}</div>
												{
													item.goods.map(goodsitem=>
														<div className='goodsitem clear' key={goodsitem.goods_id}>
															<div className='pro_img left'>
																<img src={goodsitem.goods_image_url}/>
															</div>
															<div className='left pro_info'>
																<div className='clear'>
																	<span className='left goods_name'>{goodsitem.goods_name}</span>
																	<span className='right delete'>
																	<i className='iconfont icon-delete' onClick={() => alert('','确认删除吗?', [
																	     { text: '确认', onPress: () => {this.pro_delete.call(this,goodsitem.cart_id)} },
																	     { text: '取消', onPress: () => console.log('取消') },
																	   ])}></i>
																	</span>
																	
																</div>
																<div className='pro_info_bot clear'>
																	<span className='pro_price left'>￥{goodsitem.goods_price}</span>
																	<div className='right clear changenum'>
																		<span className='left inpjian' onClick={this.cutcartnum.bind(this,goodsitem.cart_id,goodsitem.goods_num)}>-</span>
																		<div className='left' ref='goods_name'>{goodsitem.goods_num}</div>
																		<span className='left inpadd' onClick={this.addcartnum.bind(this,goodsitem.cart_id,goodsitem.goods_num)}>+</span>
																	</div>
																</div>
															</div>


														</div>

														)
												}
											</div>

										)
								}
								<div className='clear heji'>
									<div className='right'>
										<div className='totalprice'>
											合计总金额：￥<span></span>
										</div>
										<div className='queren'>确认信息</div>
									</div>
								</div>
							</div>
							:
							<div className='empty'>
								<p>您的购物车还是空的</p>
								<p>去挑一些中意的商品吧</p>
								<NavLink to='/home'>随便逛逛</NavLink>
								
							</div>
						}
					</div>
					:<ActivityIndicator size="large" text="加载中..." className='loading'/>
				}
			</div>
		</div>




	}
	//http://www.chadaodian.com/mobile/index.php?act=member_cart&op=cart_del
	pro_delete(id){
		this.loadingToast(1)
		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		axios.post(`/mobile/index.php?act=member_cart&op=cart_del`,
				qs.stringify({key:loginuser.key,
						cart_id:id})
			).then(res=>{
				console.log(res.data)
				this.props.getcratlist()
			})
	}

	//http://www.chadaodian.com/mobile/index.php?act=member_cart&op=cart_edit_quantity
	//key:8f254abceb53795cf7d5a53dab65dd82
	// cart_id:11778
	// quantity:3
	cutcartnum(id,num){
		if(num==1){
			return
		}
		this.changenum(id,parseInt(num)-1)
		
		
	}

	addcartnum(id,num){
		this.changenum(id,parseInt(num)+1)
		
	}

	changenum(id,num){
		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		axios.post(`/mobile/index.php?act=member_cart&op=cart_edit_quantity`,
				qs.stringify({
					key:loginuser.key,
					cart_id:id,
					quantity:num
				})
			).then(res=>{
				this.props.getcratlist()	
				this.loadingToast(2)		
				console.log(res.data)
			})
	}

	loadingToast(time) {
	  Toast.loading('购物车数据加载中', time);
	}


}
//<ActivityIndicator size="large" text="加载中..." className='loading'/>
//var loginuser=JSON.parse(localStorage.getItem('loginuser'))
//http://www.chadaodian.com/mobile/index.php?act=member_cart&op=cart_list
//key:2baff8ac91caaaae53d1b94ad72a914e
export default connect(
	(state)=>{
		console.log(state.cart_list)
		return {
			cart_list:state.cart_list
		}
	},
	{
		getcratlist:()=>{
			var loginuser=JSON.parse(localStorage.getItem('loginuser'))
			return axios.post(`/mobile/index.php?act=member_cart&op=cart_list`,qs.stringify({key:loginuser.key}))
			.then(res=>{
				//console.log(res.data.datas)
				return {
					type:'cart_list',
					payload:res.data.datas
				}
			})
		}
	}

	)(Cart)
