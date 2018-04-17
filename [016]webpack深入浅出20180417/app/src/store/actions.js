import * as types from "./mutation-types"

export const setUserName = function({commit},username){
	commit(types.SET_USERNAME,username);
}