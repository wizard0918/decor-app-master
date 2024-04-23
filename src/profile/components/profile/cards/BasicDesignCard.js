import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 294px;
  height: 294px;
  border-radius: 16px;
  background-size: cover;
  cursor: pointer;

  @media screen and (max-width: 630px) {
    width: 95vw;
    height: 95vw;
  }
`

const BasicDesignCard = ({ refFn, data, onClick }) => {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (!data) return

    const idea = data.idea ? data.idea : data
    if (idea.thumbImageFile) {
      setImage(idea.thumbImageFile.url)
    } else if (idea.cfThumbImageUrl) {
      setImage(idea.cfThumbImageUrl)
    } else if (data.cfImageUrl) {
      setImage(data.cfImageUrl)
    } else if (data.feedImageFile) {
      setImage(data.feedImageFile.url)
    }
  }, [data])

  return (
    <Container
      ref={refFn}
      style={{ backgroundImage: `url(${image})` }}
      onClick={e => onClick(data)}
    />
  )
}

export default BasicDesignCard
