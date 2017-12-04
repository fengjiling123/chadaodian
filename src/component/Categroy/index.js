import React,{Component} from 'react'
import './index.scss'
import { Tabs, WhiteSpace } from 'antd-mobile';
class Categroy extends Component{
	constructor(){
		super()
		this.state={
			tabslist:[],
			recommend_list:[],
			tealist:[],
			active:'pinpai'

		}
	}
	componentWillMount(){
		//获取左侧栏的分类
		axios.get(`/mobile/index.php?act=goods_class`)
		.then(res=>{
			console.log(res.data.datas.class_list)
			this.setState({
				tabslist:res.data.datas.class_list
			})
		})
		//获取右侧的品牌推荐初始值
		this.getrecommendlist()
	}


	getrecommendlist(){
		axios.get(`/mobile/index.php?act=brand&op=recommend_list`)
		.then(res=>{
			console.log(res.data)
			this.setState({
				tealist:[],
				recommend_list:res.data.datas.brand_list,
				active:'pinpai'
			})
		})
	}


	//http://www.chadaodian.com/mobile/index.php?act=goods_class&op=get_child_all&gc_id=1058
	gettealist(id){
		axios.get(`/mobile/index.php?act=goods_class&op=get_child_all&gc_id=${id}`)
		.then(res=>{
			console.log(res.data.datas.class_list)
			this.setState({
				recommend_list:[],
				tealist:res.data.datas.class_list,
				active:id
			})
		})
	}
	render(){
		return <div id='categroy'>
			<div className='search'>
				<div>
					<i className='iconfont icon-fanhui' onClick={()=>{history.go(-1)}}></i>
				</div>
				<div className='inp' onClick={()=>{console.log(111);this.props.history.push('/search')}}>
					<i className='iconfont icon-sousuo'></i>
					请输入关键字
				</div>
				<div className='more clear'>
					<i className='iconfont icon-more2 right'></i>
				</div>
			</div>
			<div className='content'>
				<div className='content-left'>					
					{
						this.state.tabslist.length>0?
						<div>
						<div className='left_item' onClick={this.getrecommendlist.bind(this)}>
							<i className='iconfont icon-wujiaoxing2'></i>
							<span className={this.state.active=='pinpai'?'active':''}>品牌推荐</span>
						</div>
						{
							this.state.tabslist.map(item=>
									<div className='left_item' key={item.gc_id} onClick={this.gettealist.bind(this,item.gc_id)}>
										<img src={item.image}/>
										<span className={this.state.active==item.gc_id?'active':''}>{item.gc_name}</span>
									</div>
								
								)
						}	
						</div>
						:null
						
					}
				</div>
				<div className='content-right'>
					{
						this.state.recommend_list.length?
						<div className='taglistpinpai'>
							{
								this.state.recommend_list.map(item=>
									<div key={item.brand_id} onClick={this.toproduct_list.bind(this,item.brand_id)}>
										<img src={item.brand_pic} alt={item.brand_name}/>
									</div>

									)
							}
						</div>
						:
						<div>
							{
								this.state.tealist.length?
								<div className='teaitem'>
									{
										this.state.tealist.map(teaitem=>
											<div key={teaitem.gc_id} className='item_parent'>
												<div className='top clear' onClick={this.toproduct_list.bind(this,teaitem.gc_id)}>
													<em></em>
													<span>{teaitem.gc_name}</span>
													<i className="iconfont icon-more right"></i>
												</div>
												{
													teaitem.child.length?
													<div className='childitem'>
														{
															teaitem.child.map(childitem=>
																<div key={childitem.gc_id} onClick={this.toproduct_list.bind(this,childitem.gc_id)}>
																	{childitem.gc_name}
																</div>

																)
														}
													</div>
													:null
												}
											</div>

											)
									}
								</div>
								:null
							}
						</div>
						

					}
				</div>
			</div>
		</div>
	}

	 toproduct_list(id){
	 	console.log(id)
	 	this.props.history.push(`/product_list/${id}`)
	 }
	  
}
export default Categroy
