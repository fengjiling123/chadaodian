import React,{Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
import {NavLink} from 'react-router-dom'
import { List, Stepper ,Toast} from 'antd-mobile';

import qs from 'qs'
import { Carousel, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile'

class Product_detail extends Component{
	
	constructor(){
		super()
		this.state = {
	      animating: false,
	      addtocart:false,
	      val:1
	    }
			
	}
	componentWillMount(){
		if(!localStorage.getItem('loginuser')){
			this.props.history.push(`/login`)
		}else{
			this.props.getdetaillist(this.props.match.params.id)
			this.props.getcartcount()
		}
		console.log(this.props.match.params)		
	}
	render(){
		return <div id='product_detail'>
			{
				this.props.detaillist?
				<div>

					<div>
						<Carousel
				          className="my-carousel"
				          autoplay={false}
				          infinite
				          selectedIndex={0}
				          passiveListeners={false}
				        >
				          {this.props.detaillist.goods_image.split(',').map(item => (
				           
				              <img src={item} key={item}/>
				            
				          ))}
				        </Carousel>

					</div>
					<div className='goods-detail'>
						<div className='goods-detail-name'>{this.props.detaillist.goods_info.goods_name}</div>
						<div className='goods-detail-price'>
							<span className='price1'>直销价：{this.props.detaillist.goods_info.goods_promotion_price}</span>
							<span className='price2'>零售价：{this.props.detaillist.goods_info.goods_marketprice}</span>
							<span className='right salenum'>销量：{this.props.detaillist.goods_info.goods_salenum}</span>
						</div>
						<div className='goods-detail-item'>
							送至<span className='area_name'> {this.props.detaillist.goods_hair_info.area_name}</span>
							<span className='ishave'>{this.props.detaillist.goods_hair_info.if_store_cn}</span><br/>
							<span className='hair'>{this.props.detaillist.goods_hair_info.content}</span>
						</div>
						<div className='select'>
							已选  默认
						</div>
						<div className='goods-detail-comment'>
							<div className='evaltitle clear'>
								商品评价
								<span className='evalcount right'>{this.props.detaillist.goods_eval_list.length}人评论</span>
							</div>
							{
								this.props.detaillist.goods_eval_list.map(item=>(
										<div key={item.geval_id} className='eval'>
											<div className='clear'>
												<div className='left'>评分：{item.geval_scores}</div>
												<div className='right'>{item.geval_frommembername}</div>
											</div>
											<div className='eval-content'>{item.geval_content}</div>
										</div>

									))
							}

						</div>
						
					</div>
					<div className='detail_footer detail_footer_add'>
						<div className='footer'>
							<div className='chat'>客服</div>
							<div className='cart' onClick={()=>{this.props.history.push('/cart_list')}}>购物车<span className='cart_count'>{this.props.cart_count?this.props.cart_count.cart_count:''}</span></div>
							<div className='gobuy'>立即购买</div>
							<div className='add' onClick={this.add.bind(this)}>加入购物车</div>
						</div>
					</div>
					{
						this.state.addtocart?
						<div className='addtocart'>
							<div className='detail_footer'>
								<div className='add_info'>

									{this.props.detaillist?
										<div className='clear add_top'>
											<span className='close' onClick={this.close.bind(this)}>X</span>
											<img src={this.props.detaillist.spec_image[0]} className='left'/>
											<div className='left'>
												<p className='goods_name'>{this.props.detaillist.goods_info.goods_name}</p>
												<div className='goods_price'>
													{this.props.detaillist.goods_info.goods_price}
													<span className='goods_storage right'>库存{this.props.detaillist.goods_info.goods_storage}件</span>
												</div>
											</div>
										</div>:null
										
									}
									
								</div>
								<div className='buycount clear'>

									<span className='left'>购买数量</span>
									<div className='right clear'>
										<span className='left inpjian' onClick={this.numdown.bind(this)}>-</span>
										<div className='left'>{this.state.val}</div>
										<span className='left inpadd' onClick={this.numup.bind(this)}>+</span>
									</div>
								</div>
								<div className='footer'>
									<div className='chat'>客服</div>
									<div className='cart'>购物车<span className='cart_count'>{this.props.cart_count?this.props.cart_count.cart_count:''}</span></div>
									<div className='gobuy'>立即购买</div>
									<div className='add' onClick={this.addtocart.bind(this,this.props.match.params.id)}>加入购物车</div>
								</div>
							</div>
						</div>:null
					}
					
				</div>
				: <ActivityIndicator size="large" text="加载中..." className='loading'/>

             
			}
		</div>
	}
	successToast(info) {
	  Toast.success(info, 1);
	}
	close(){
		this.setState({
			addtocart:false
		})
	}
	numdown(){
		if(this.state.val>1){
			this.setState({
				val:this.state.val-1
			})
		}
	}
	numup(){
		this.setState({
			val:this.state.val+1
		})
	}
	add(){
		console.log(1)
		this.setState({
			addtocart:true
		})
	}
	addtocart(id){
		console.log(2)
		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		axios.post(`/mobile/index.php?act=member_cart&op=cart_add`,
			qs.stringify({
				key:loginuser.key,
				goods_id:id,
				quantity:this.state.val,
			})).then(res=>{
				Toast.success('成功加入购物车',1)
				this.props.getcartcount()
				this.setState({
					addtocart:false
				})
		})
		
	}
}
//加入购物车
//http://www.chadaodian.com/mobile/index.php?act=member_cart&op=cart_add
//key:2baff8ac91caaaae53d1b94ad72a914e
// goods_id:100167
// quantity:2
// 
// 读购物车条数
// http://www.chadaodian.com/mobile/index.php?act=member_cart&op=cart_count
// key:2baff8ac91caaaae53d1b94ad72a914e

export default connect(
	(state)=>{
		console.log(state.detaillist)
		//console.log(state.cart_count)
		return {
			detaillist:state.detaillist,
			cart_count:state.cart_count
		}
	},
	//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_detail&goods_id=100167&key=2baff8ac91caaaae53d1b94ad72a914e
	{
		getdetaillist:(id)=>{
			var loginuser=JSON.parse(localStorage.getItem('loginuser'))
			return axios.get(`/mobile/index.php?act=goods&op=goods_detail&goods_id=${id}&key=${loginuser.key}`)
			.then(res=>{
				//console.log(res.data)
				return {
					type:'detaillist',
					payload:res.data.datas

				}
			})
		},
		getcartcount:()=>{
			var loginuser=JSON.parse(localStorage.getItem('loginuser'))
			return axios.post(`/mobile/index.php?act=member_cart&op=cart_count`,qs.stringify({key:loginuser.key}))
			.then(res=>{
					console.log(res.data.datas)
					return {
						type:'cart_count',
						payload:res.data.datas
					}
				}					
			)
		}
	}
	)(Product_detail)

	//http://upload.chadaodian.com/shop/store/goods/3/3_568f7505na9ad373c_360.jpg,http://upload.chadaodian.com/shop/store/goods/3/3_54d05f3fn723caed8_360.jpg,http://upload.chadaodian.com/shop/store/goods/3/3_0007c0bfaarbehvfagnfkwaaiur250_360.jpg,http://upload.chadaodian.com/shop/store/goods/3/3_0009a8f5edrbehu1ag8loaaamt5798_360.jpg,http://upload.chadaodian.com/shop/store/goods/3/3_0010699d3brbehu1ag-szcaaulm489_360.jpg

