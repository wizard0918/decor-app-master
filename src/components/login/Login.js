import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ReactComponent as Close } from '../../assets/close.svg'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { AuthModalContainer } from '../common/ModalContainers'
//import FacebookLogin from 'react-facebook-login';
import styles from './lo.module.css'
import LoginForm from './LoginForm'
import NewPasswordForm from './NewPasswordForm'

const returnPreviousPage = (history, previous) => {
  if (typeof previous !== 'undefined' && previous !== '') {
    history.push(previous)
  } else {
    history.push('/')
  }
}

const Container = props => {
  return (
    <div className={styles.ov}>
      <div className={styles.low}>
        <div ref={props.wrapperRef}>
          <div className={styles.lo}>
            <div className={styles.inw}>
              <div className={styles.cl}>
                <button className={styles.clb} onClick={props.onClose}>
                  <Close className={styles.cli} />
                </button>
              </div>
              <div className={styles.in}>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

const Login = props => {
  const { previous } = props
  const history = useHistory()
  /*
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const onAuthenticated = () => {
    if (isAuthenticated === true) {
      returnPreviousPage(history, previous)
    }
  }
  useEffect(onAuthenticated, [isAuthenticated])
*/
  const challenge = useSelector(state => state.auth.challenge)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => {
    returnPreviousPage(history, previous)
  })

  const onClose = () => {
    returnPreviousPage(history, previous)
  }

  if (challenge === 'new_password')
    return (
      <Container
        title="Update a New Password"
        description=""
        wrapperRef={wrapperRef}
        onClose={onClose}
      >
        <NewPasswordForm />
      </Container>
    )
  return (
    <AuthModalContainer
      title="Hi there, welcome back!"
      description="Get inspired, shop your favorite furniture stores and connect
      with millions of decor lovers all in the DecorMatters
      community."
      wrapperRef={wrapperRef}
      onClose={onClose}
    >
      <LoginForm onClose={onClose} />
    </AuthModalContainer>
  )
}

Login.propTypes = {}

export default Login
/*
<Container
      title="Hi there, welcome back!"
      description="Get inspired, shop your favorite furniture stores and connect
      with millions of decor lovers all in the DecorMatters
      community."
      wrapperRef={wrapperRef}
      onClose={onClose}
    >
      <LoginForm onClose={onClose}/>
    </Container>
    */
