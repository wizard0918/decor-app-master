import styled from 'styled-components'

const DEFAULT_SIZE = 148

export const ProfileImageBg = styled.img`
  padding: 2px;
  border-radius: 50%;
`

export const ProfileImageWrapper = styled.div`
  width: ${props => props.size || DEFAULT_SIZE}px;
  height: ${props => props.size || DEFAULT_SIZE}px;
  background-size: cover;
  border-radius: 50%;
  background-color: rgb(245, 245, 245);
  box-shadow: none;
  user-select: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border: 3px solid rgba(229, 229, 229, 1);

  ${ProfileImageBg} {
    width: ${props => (props.size || DEFAULT_SIZE) - 3}px;
    height: ${props => (props.size || DEFAULT_SIZE) - 3}px;
  }
`

export const Level = styled.div`
  margin: 0;
  position: absolute;
  z-index: 2;
  bottom: 3px;
  right: 0;
  border-radius: 10px;
  padding: 2px 12px;
  font-size: 12px;
  font-weight: bold;
  user-select: none;
  color: white;
  background-color: rgb(255, 94, 109);
  width: initial;
`

export const SmallLevel = styled(Level)`
  font-size: 8px;
  padding: 2px 4px;
`
