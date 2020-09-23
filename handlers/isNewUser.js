const { default: getTimeLeftInSession } = require("./getTimeLeftInSession")
const { default: setTimeLeftInSession } = require("./setTimeLeftInSession")

const isNewUser = () => {
  if (!getTimeLeftInSession() || isNaN(getTimeLeftInSession())) {
    setTimeLeftInSession(120)
  }
}

export default isNewUser
