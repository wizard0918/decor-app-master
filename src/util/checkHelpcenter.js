const hidePages = ['help-center', 'terms', 'policy', 'about', 'login']

export const isHelpCenterLink = () => {
  return showMobileFooter()
}

export const showMobileFooter = () => {
  return hidePages.some(e => {
    return (
      !window.location.pathname.includes(e) &&
      navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    )
  })
}
