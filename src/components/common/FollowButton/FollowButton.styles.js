import styled from 'styled-components'

export const FollowButtonStyled = styled.button`
  height: 36px;
  padding: 0 11px;
  border: 2px solid #ef6971;
  border-radius: 32px;
  font-family: Helvetica Neue;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  background-color: #ffffff;
  color: #ef6971;
  transition: all 0.5s;

  ${props =>
    props.isFollowed &&
    `
  color: rgb(139, 139, 139);
  background-color: rgb(237, 237, 237);
  border-color: rgb(237, 237, 237);
  `}
`
