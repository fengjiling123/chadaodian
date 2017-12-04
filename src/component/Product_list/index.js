import React,{Component} from 'react'
import './index.scss'

class Product_list extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		if(localStorage.getItem('loginuser')){
			console.log(this.props.match.params.id)
			this.getproductlist()
		}else{
			this.props.history.push('/login')
		}
		//console.log(this.props.match.params.id)
	}
	render(){
		return <div id='product_list'>
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
				详情列表
			</div>
			
		</div>
	}

	getproductlist(){
		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		axios.get(`/mobile/index.php?act=goods&op=goods_list&b_id=${this.props.match.params.id}&page=10&curpage=1&b_id=${this.props.match.params.id}&key=${loginuser.key}`)
		.then(res=>{
			console.log(res.data)
		})
	}
}


//var loginuser=JSON.parse(localStorage.getItem('loginuser'))
//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_list&b_id=364&page=10&curpage=1&b_id=364&key=8f254abceb53795cf7d5a53dab65dd82
export default Product_list
