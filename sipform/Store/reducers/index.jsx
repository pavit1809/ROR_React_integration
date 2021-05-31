import * as actionTypes from '../actions';

const initialState ={
	user:null,
}

const reducer = (state = initialState,action) =>{
	switch (action.type) {
		case actionTypes.CHANGE_USER:
		{
			// console.log("user edited")
			return{
				...state,
				user:action.user
			}
		}		
	}
	return state;
};
export default reducer
