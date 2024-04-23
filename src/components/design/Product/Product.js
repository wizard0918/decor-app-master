import React from 'react'
import styled from 'styled-components'

import { LoadingIndicator2 } from '../../feeds/LoadingIndicator'
import NoItems from '../../../assets/noitems.png'
import ProductCard from './ProductCard'
import { MobileDivider } from '../MobileDivider';

import style from '../details.module.css'

const Title = styled.div`
  padding: 18px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  @media only screen and (max-width: 1034px) {
    background-color: white;
    text-align: center;
    margin-bottom: 10px;
  }
`

const FeedContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 18px;
  padding-left: 18px;
  @media only screen and (min-width: 768px) and (max-width: 1034px) {
    gap: 30px;
    padding: 0 18px;
  }
  @media only screen and (max-width: 768px) {
    justify-content: space-around;
    padding: 0 18px;
  }
  @media only screen and (min-width: 400px) and (max-width: 600px) {
    zoom: 0.8;
  }
  @media only screen and (max-width: 400px) {
    zoom: 0.6;
  }
`

const ContentContainer = styled.div`
  height: 720px;
  overflow-y: auto;
  @media only screen and (max-width: 1034px) {
    height: 435px
  }
`

const Arrow = styled.div`
  visibility: hidden;
  width: 0;
  height: 0;
  @media only screen and (min-width: 768px) and (max-width: 1034px) {
    text-align: center;
    height: 16px;
    visibility: visible;
  }
`

const ProductContainer = ({ title, children, ...props }) => {
  return (
    <>
      <div className={style.currentItemHeader}>
        <MobileDivider />
        <Title id={"currentItem"}>
          {title}
        </Title>
      </div>
      <ContentContainer {...props}>{children}</ContentContainer>
    </>
  )
}

export const Product = ({ title, loading, data, ...props }) => {
  if (loading)
    return (
      <ProductContainer className={style.product_list} title={title}>
        <LoadingIndicator2 loading={loading} />
      </ProductContainer>
    )
  if (data && data.length === 0)
    return (
      <ProductContainer className={style.product_list} title={title} style={{ textAlign: 'center' }}>
        <img src={NoItems} alt={'no-items'} width="70%" /> <p>NO ITEMS YET</p>
      </ProductContainer>
    )
  return (
    <ProductContainer className={style.product_list} title={title}>
      <FeedContainer>
        {data.map((d, i) => (
          <ProductCard id={d.objectId} key={d.objectId + i} data={d} {...props} />
        ))}
      </FeedContainer>
    </ProductContainer>
  )
}

export default Product
