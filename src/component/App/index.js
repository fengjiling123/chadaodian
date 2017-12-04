import React,{Component} from 'react'
import Footer from '../common/footer'
import 'antd-mobile/dist/antd-mobile.css'; 
import './index.scss'
class App extends Component{
	constructor(){
		super()
	};
	render(){
		return <div>
			{
				this.props.children
			}
			<Footer/>
		</div>
	}
}

export default App