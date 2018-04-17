import * as types from "./mutation-types"

const mutations = {
	[types.SET_USERNAME](state,username) {
		state.userName  = username;
	}
}

export default mutations