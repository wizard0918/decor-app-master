import styled from 'styled-components'

export const BadgeCounterWrapper = styled.div`
  position: relative;
`

export const Counter = styled.div`
  display: block;
  background: #ff5e6d;
  border-radius: 50%;
  font-size: 8px;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  position: absolute;
  top: -7px;
  right: -7px;
  z-index: 2;
`

export const CounterContent = styled.span`
  margin-right: -1px;
`
