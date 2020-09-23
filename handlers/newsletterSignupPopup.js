import { createNode, addClasses, appendNode } from "../utils"
import { setCookie } from "../utils/cookies.js"

const newsletterSignupPopup = () => {
  const form = `
          <span class="close-popup"><i class="fas fa-window-close"></i></span>
          <p class="optin-get-started">Get practical marketing advice in your inbox</p>
          <p class="optin-join"><strong>Sign up for our free <i>Hints &amp; Tips</i> newsletter for a twice-monthly roundup of our top blog posts, upcoming webinars, and helpful guides so you can take your small business marketing to the next level.</strong></p>
          <div class="clearfix"><form id="subscribe" class="signup-form flex row" accept-charset="utf-8" action="https://cloud.c.constantcontact.com/jmmlsubscriptions/coi_verify" method="GET" target="_blank">
            <input id="subbox" class="item_2_3" maxlength="255" name="email" required="required" type="text" placeholder="Enter email address" />
            <input name="sub" type="hidden" value="1" />
            <input name="method" type="hidden" value="JMML_hints_tips" />
            <input id="page" name="page" type="hidden" value="" />
            <input id="subbutton" class="item_1_3 submit_optin_form" type="submit" value="Sign Up" />
          <p class="optin-privacy">Your privacy is important to us. We will not sell, or rent, your name or email address to anyone.</p>
          </form></div>
          <p><script src="/wp-content/themes/roots/assets/js/ctct-newsletter-iframe.js"></script></p>`

  const popupContainer = createNode("div")
  addClasses(popupContainer, ["optin-overlay", "flex", "col", "afc", "jfc"])
  popupContainer.innerHTML = form
  appendNode("body", popupContainer)

  const closeButton = document.querySelector(".close-popup")
  const submitForm = document.querySelector(".signup-form")
  const closeForm = () => (popupContainer.style.display = "none")
  const exitForm = () => {
    closeForm()
    setCookie("hide-optin", true)
  }
  closeButton.addEventListener("click", exitForm)
  submitForm.addEventListener("submit", exitForm)
}

export default newsletterSignupPopup
