import * as nftActionCreators from './base-nft';
import * as userNftActionCreators from './user-nft';
import * as createActionCreators from './create-nft';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...nftActionCreators,
  ...createActionCreators,
  ...userNftActionCreators,
}