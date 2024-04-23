import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './details.module.css'
import { Main } from './Main'
import { Products } from './Products'
import { getDetailsById } from '../../redux/actions/DesignDetailsAction'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowList } from '../../redux/actions/FollowingActions'
import { GetAllSavedProducts } from '../../redux/actions/SaveProductAction'
import { useHistory } from 'react-router-dom'
import { getFeedByCatId } from '../../redux/actions/InspirationFeedAction'
import HelmetDesignDetails from '../helmet/HelmetDesignDetails'
import PureCarousel from './PureCarousel'
import { LoadingIndicator2 } from '../feeds/LoadingIndicator'
import { PriceTagClear } from '../../redux/actions/PriceTagActions'
import { batch } from 'react-redux'

const Details = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = props.id ? props.id : props.match.params.id

  useEffect(() => {
    batch(() => {
      dispatch(getDetailsById(id))
      dispatch(PriceTagClear())

      //went directly to this page, so need to grab data/like data
      if (history.action === 'POP') {
        dispatch(getFeedByCatId(''))
      }

      dispatch(GetAllSavedProducts())
      dispatch(getFollowList())
    })
  }, [])

  return (
    <>
      <DetailsContainer {...props} />
    </>
  )
}

const DetailsContainer = props => {
  const id = props.id ? props.id : props.match.params.id
  const { data: mainData, loading, likes: active, numLikes, } = useSelector(
    state => state.designdetails
  )
  const { allSavedProducts } = useSelector(state => state.saveProduct) // all saved products with objectids
  const [zoom, setZoom] = useState(1);
  const [show, setShow] = useState(true)
  
  function showDiv(e) {
    if(e.target.id == "currentItem" || e.target.id == "currentArrow" || e.target.parentNode.id == "currentArrow") {
      if(show) {
        setShow(false)
        document.getElementById("products").style.height = "auto";
        document.getElementById('showall').style.display = "block";
      }
      else {
        setShow(true)
        document.getElementById("products").style.height = "85px"
        document.getElementById('showall').style.display = "none";
      }
    }
  }

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth >= 1034 && window.innerWidth <= 1376) {
        document.getElementById("products").style.height = "800px";
        document.getElementById('showall').style.display = "block";
        setZoom(window.innerWidth / 1366);
      }
      else if(window.innerWidth >= 1376) {
        document.getElementById("products").style.height = "800px";
        document.getElementById('showall').style.display = "block";
        setZoom(1);
      }
      else {
        document.getElementById("products").style.height = "85px";
        document.getElementById('showall').style.display = "none";
        setZoom(1);
      }
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  useEffect(() => {
    /*
    console.log(mainData)
    if(mainData.idea && mainData.idea.productsWithPosition) {
      const m = mainData.idea.productsWithPosition
      console.log(m)
      m.forEach(e => {
        if(e.item && e.item.type === "item") {
          
          if(e.item.productRecommendation.length > 0) console.log(e.item.productRecommendation.length)
        }
      });
    }
    */
  }, [mainData])

  return (
    <>
      <LoadingIndicator2 loading={loading} />

      {!loading && (
        <div 
          className={`${styles.detailContainer} ${styles.noModal}`} 
          style={{zoom: zoom}}
          onClick={showDiv}
        >
          <HelmetDesignDetails data={mainData} />
          <Main id={id} active={active} data={mainData} numLikes={numLikes} />
          <Products id={id} data={mainData} allSavedProducts={allSavedProducts} />
          {/* <PureCarousel data={mainData} /> */}
        </div>
      )}
    </>
  )
}

export default Details
