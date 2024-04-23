import React from 'react'
import { Level, ProfileImageBg, ProfileImageWrapper, SmallLevel } from './ProfileImage.styles'

export const ProfileImage = ({ user, userLevel = user.level, small, ...props }) => {
  let userImage

  if (user.pic) userImage = user.pic
  if (user.thumbProfileImageFile) userImage = user.thumbProfileImageFile.url
  if (user.cfTbImageUrl) userImage = user.cfTbImageUrl
  // TODO: replace with a constant
  if (!userImage)
    userImage = 'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'

  userLevel = Math.floor(userLevel)

  return (
    <ProfileImageWrapper {...props}>
      <ProfileImageBg src={userImage} alt="" />
      {!small && <Level>L {userLevel}</Level>}
      {small && <SmallLevel size={props.size}>L {userLevel}</SmallLevel>}
    </ProfileImageWrapper>
  )
}
