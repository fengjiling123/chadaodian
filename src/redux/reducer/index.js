const reducer=(state=[],info)=>{
	//console.log(info.type=='hometoplist')
	//console.log(info.payload)
	switch(info.type){
		case 'hometoplist':
			return info.payload
		default:
			return state
	}
}

const recommondlistreducer=(state=[],info)=>{
	switch(info.type){
		case 'homerecommondlist':
			return info.payload

		default:
			return state
	}
}

const detaillistreducer=(state=null,info)=>{
	switch(info.type){
		case 'detaillist':
			return info.payload
		default:
			return state
	}
}

const detaillist_inforeducer=(state=null,info)=>{
	switch(info.type){
		case 'detaillist_info':
			return info.payload
		default:
			return state
	}
}
const chatlistreducer=(state=[],info)=>{
	//console.log(info.type=='hometoplist')
	//console.log(info.payload)
	switch(info.type){
		case 'chatlist':
			return info.payload
		default:
			return state
	}
}

const searchlistreducer=(state=null,info)=>{
	//console.log(info.type=='hometoplist')
	//console.log(info.payload)
	switch(info.type){
		case 'searchlist':
			return info.payload
		default:
			return state
	}
}


const cart_countreducer=(state='',info)=>{
	switch(info.type){
		case 'cart_count':
			return info.payload
		default:
			return state
	}
}

const cart_listreducer=(state='',info)=>{
	switch(info.type){
		case 'cart_list':
			return info.payload
		default:
			return state
	}
}

const userinforeducer=(state='',info)=>{
	switch(info.type){
		case 'userinfo':
			return info.payload
		default:
			return state
	}
}


export {
	cart_countreducer,
	reducer,
	recommondlistreducer,
	detaillistreducer,
	chatlistreducer,
	detaillist_inforeducer,
	searchlistreducer,
	cart_listreducer,
	userinforeducer
}