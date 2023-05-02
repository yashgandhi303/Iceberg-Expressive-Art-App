import * as nftActionCreators from './basenft'
import * as userNftActionCreators from './usernft'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ...nftActionCreators,
    ...userNftActionCreators
}