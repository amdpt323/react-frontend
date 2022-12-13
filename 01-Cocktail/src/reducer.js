const reducer= (state,action) =>{
 if(action.type==='LOADING'){
  return{...state,loading:true}
 }
 if(action.type==='_LOADING'){
  return{...state,loading:false}
 }
 if(action.type==='DISPLAY_ITEMS'){
  return{...state,cocktails:action.payload,loading:false}
 }
 return state
}

export default reducer