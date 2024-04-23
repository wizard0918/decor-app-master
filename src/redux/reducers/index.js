import { combineReducers } from 'redux'
import profileReducers from '../../profile/store'
import AuthReducer from './AuthReducer'
import BrandSlice from './BrandSlice'
import CheckInReducer from './CheckInReducer'
import DesignDetailsReducer from './DesignDetailsReducer'
import DMReducer from './DMReducer'
import createInfiniteFeed from './feedInfiniteSlice'
import FollowingReducer from './FollowingReducer'
import GiftReducer from './GiftReducer'
import InspirationFeedReducer from './InspirationFeedReducer'
import InspirationScrollReducer from './InspirationScrollReducer'
import ItemSlice from './ItemSlice'
import LikeReducer from './LikeReducer'
import MarketProductFeedReducer from './MarketProductFeedReducer'
import NotificationsReducer from './NotificationsReducer'
import PopularHashTagsReducer from './PopularHashTagsReducer'
import PriceTagReducer from './PriceTagReducer'
import ProductDetailsReducer from './ProductDetailsReducer'
import ProductDetailsTabReducer from './ProductDetailsTabReducer'
import QuestReducer from './QuestReducer'
import SaveInspirationReducer from './SaveInspirationReducer'
import SaveProductReducer from './SaveProductReducer'
import ShareReducer from './ShareReducer'
import VerifyModalReducer from './VerifyModalReducer'

const allReducers = Object.assign({}, profileReducers, {
  inspirationFeed: InspirationFeedReducer,
  like: LikeReducer,
  saveInspiration: SaveInspirationReducer,
  saveProduct: SaveProductReducer,
  scroll: InspirationScrollReducer,
  productTab: ProductDetailsTabReducer,
  share: ShareReducer,
  marketProductFeed: MarketProductFeedReducer,
  verificationModal: VerifyModalReducer,
  priceTag: PriceTagReducer,
  popularHashTags: PopularHashTagsReducer,
  checkIn: CheckInReducer,
  gift: GiftReducer,

  auth: AuthReducer,
  designdetails: DesignDetailsReducer,
  productdetails: ProductDetailsReducer,
  follows: FollowingReducer,
  quest: QuestReducer,
  dm: DMReducer,
  notifications: NotificationsReducer,

  item: ItemSlice,
  brand: BrandSlice,
  inspiration: createInfiniteFeed('inspiration', 'userInspirations', 'getUserInspirations5')
})

const rootReducer = combineReducers(allReducers)
export default rootReducer
