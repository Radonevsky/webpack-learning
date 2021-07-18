function createAnalytics() {
  let counter = 0
  let isDestroed = false

  const listener = () => counter++

  document.addEventListener('click', listener)

  return {
    destroy() {
      document.removeEventListener('click', listener)
      isDestroed = true
    },

    getClicks() {
      if (isDestroed) {
        return 'Analytics destroed. Total click: ${counter}'
      }
      return counter
    }
  }
}

window.analytics = createAnalytics()