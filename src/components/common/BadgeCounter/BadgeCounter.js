import React from 'react'
import { BadgeCounterWrapper, Counter, CounterContent } from './BadgeCounter.styles'

export const BadgeCounter = ({ count = 0, children }) => {
  if (count === 0) return children
  count = count > 99 ? 99 : count

  return (
    <BadgeCounterWrapper>
      <Counter>
        <CounterContent>{count}</CounterContent>
      </Counter>
      {children}
    </BadgeCounterWrapper>
  )
}
