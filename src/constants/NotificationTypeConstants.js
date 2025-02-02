export const NOTIFICATION_TYPES = {
  USER_INSPIRATION_LIKE: 'userInspirationLike',
  USER_INSPIRATION_COMMENT: 'userInspirationComment',
  USER_INSPIRATION_COMMENT_REPLY: 'userInspirationCommentReply',
  USER_INSPIRATION_COMMENT_LIKE: 'userInspirationCommentLike',
  FOLLOW: 'follow',
  PUBLISHED_DESIGN: 'publishedDesign',
  PUBLISHED_DESIGN_GLOBAL: 'publishedDesignGlobal',
  CHALLENGE_ENDED_GLOBAL: 'challengeEndedGlobal',
  CHALLENGE_REMINDER: 'challengeReminder',
  CHALLENGE_ENDED: 'challengeEnded',
  OTHER: 'other',
  DAILY_CHECK_IN: 'dailyCheckIn',
  NEW_CHALLENGE_GLOBAL: 'newChallengeGlobal',
  NEW_PRODUCTS_GLOBAL: 'newProductsGlobal',
  TOP_RANK: 'topRank',
  NEW_USER_TOP_RANK: 'newUserTopRank',
  TOP_INFLUENCER: 'topInfluencer',
  NEW_USER_TOP_INFLUENCER: 'newUserTopInfluencer',
  TOP_VOTES_IN_CHALLENGE: 'topVotesInChallenge',
  NEW_USER_MOST_VOTES_IN_CHALLENGES: 'newUserMostVotesInChallenges',
  EVENT_PROGRESS: 'eventProgress',
  EVENT_COMPLETE: 'eventComplete',
  MOST_VOTES_IN_CHALLENGES: 'mostVotesInChallenges',
  PUBLISHED_DESIGN_MENTION: 'publishedDesignMention',
  COIN_GIFT: 'coinGift',
  ITEM_BUNDLE_SALE_GLOBAL: 'itemBundleSaleGlobal',
  POPULAR_FEED: 'popularFeed',
  DAILY_TASK_REWARD: 'dailyTaskReward',
  LEVEL_UP: 'levelUp',
  BADGE_REWARD: 'badgeReward',
  CHALLENGE_REWARD: 'challengeReward',
  WELCOME_GIFT: 'welcomeGift'
}

export const NOTIFICATION_SECTIONS = {
  YOU: {
    types: [
      NOTIFICATION_TYPES.USER_INSPIRATION_LIKE,
      NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT,
      NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT_REPLY,
      NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT_LIKE,
      NOTIFICATION_TYPES.FOLLOW,
      NOTIFICATION_TYPES.CHALLENGE_REMINDER,
      NOTIFICATION_TYPES.CHALLENGE_ENDED,
      NOTIFICATION_TYPES.TOP_RANK,
      NOTIFICATION_TYPES.NEW_USER_TOP_RANK,
      NOTIFICATION_TYPES.TOP_INFLUENCER,
      NOTIFICATION_TYPES.TOP_VOTES_IN_CHALLENGE,
      NOTIFICATION_TYPES.NEW_USER_MOST_VOTES_IN_CHALLENGES,
      NOTIFICATION_TYPES.EVENT_PROGRESS,
      NOTIFICATION_TYPES.EVENT_COMPLETE,
      NOTIFICATION_TYPES.MOST_VOTES_IN_CHALLENGES,
      NOTIFICATION_TYPES.PUBLISHED_DESIGN_MENTION,
      NOTIFICATION_TYPES.COIN_GIFT,
      NOTIFICATION_TYPES.ITEM_BUNDLE_SALE_GLOBAL,
      NOTIFICATION_TYPES.POPULAR_FEED
    ],
    globalTypes: []
  },
  REWARDS: {
    types: [],
    globalTypes: []
  },
  OFFICIAL: {
    types: [],
    globalTypes: [
      NOTIFICATION_TYPES.NEW_PRODUCTS_GLOBAL,
      NOTIFICATION_TYPES.NEW_CHALLENGE_GLOBAL,
      NOTIFICATION_TYPES.CHALLENGE_ENDED_GLOBAL,
      NOTIFICATION_TYPES.PUBLISHED_DESIGN_GLOBAL
    ]
  },
  FOLLOWING: {
    types: [NOTIFICATION_TYPES.PUBLISHED_DESIGN],
    globalTypes: []
  }
}

export const LOAD_NOTIFICATIONS_LIST = 'LOAD_NOTIFICATIONS_LIST'
export const SET_NOTIFICATION_LOADING = 'SET_NOTIFICATIONS_LOADING'
export const RESET_NOTIFICATIONS_LIST = 'RESET_NOTIFICATIONS_LIST'

export const COMMENT_TYPES = {
  GIFT: 'userInsVirtualGift'
}
