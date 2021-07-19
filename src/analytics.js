import * as $ from 'jquery'

function createAnalytics() {
  let counter = 0
  let isDestroed = false

  const listener = () => counter++

  $(document).on('click', listener)

  return {
    destroy() {
      $(document).off('click', listener)
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