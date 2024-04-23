import 'firebase/analytics'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { getProductByIds } from '../../redux/actions/ProductDetailsActions'
import { getItemsByIds } from '../../redux/reducers/ItemSlice'
import styles from './details.module.css'
import { ReactComponent as Save } from '../../assets/social/save.svg'
import Product from './Product/Product'
import { MobileDivider } from './MobileDivider';
import { SaveAllProductsBtn } from './SaveAllProductsBtn';

export const Products = ({ data, ...props }) => {
  const dispatch = useDispatch()
  const { items, similar, loading: itemLoading } = useSelector(state => state.item)
  const { savedProductIds } = useSelector(state => state.saveProduct)

  const { data: storeNames } = useSelector(state => state.productdetails)
  const { productId } = useSelector(state => state.priceTag)
  let allIds = [];
  useEffect(() => {
    if (!data) return

    if (data.itemIds && data.itemIds.length > 0) {
      dispatch(getItemsByIds(data.itemIds))
      return
    }

    if (data.idea && data.idea.productsWithPosition) {
      if (data.idea.productsWithPosition.length > 0) {
        const its = data.idea.productsWithPosition
        if (its[0].item) {
          const iids = []
          its.forEach(e => {
            if (e.item) iids.push(e.item.objectId)
          })
          dispatch(getItemsByIds(iids))
          return
        }
      }
    }
    if (data.productIds && data.productIds.length > 0) {
      dispatch(getProductByIds(data.productIds))
      return
    }
  }, [dispatch, data])

  const wrapperRef = useRef(null)

  const closeProductBox = target => {
    if (!target) return

    target.classList.remove(styles.show)
    if (window.innerWidth < 600) document.body.style = 'overflow-y: scroll'
  }

  const clickProducts = e => {
    if (window.innerWidth > 600) return
    if (e.target.classList.contains(styles.show)) {
      closeProductBox(e.target)
      return
    }
  }

  useOutsideAlerter(wrapperRef, closeProductBox)

  if (productId) {
    similar.map((d, i) => {
      allIds.push(d.objectId);
    });
  }
  else {
    items.map((d, i) => {
      allIds.push(d.objectId);
    });
  }

  return (
    <div ref={wrapperRef} id={"products"} className={styles.products} onClick={clickProducts}>
        {!productId && (
          <Product
            title="Current Items"
            loading={itemLoading}
            data={items}
            name="product"
            savedProductIds={savedProductIds}
            allSavedProducts={props.allSavedProducts}
            storeNames={storeNames}
          />
        )}
        {productId && (
          <Product
            title="Similar Items"
            loading={itemLoading}
            data={similar}
            name="product"
            savedProductIds={savedProductIds}
            allSavedProducts={props.allSavedProducts}
            storeNames={storeNames}
          />
        )}
      <SaveAllProductsBtn 
        allIds={allIds} 
        savedProductIds={savedProductIds}
        allSavedProducts={props.allSavedProducts}
      />
    </div>
  )
}
