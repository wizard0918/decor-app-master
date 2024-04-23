import React from 'react'
import { FollowButtonStyled } from './FollowButton.styles'

export const FollowButton = ({ onClick, isFollowed }) => {
  return (
    <FollowButtonStyled isFollowed={isFollowed} onClick={onClick}>
      {isFollowed ? 'Following' : 'Follow'}
    </FollowButtonStyled>
  )
}
