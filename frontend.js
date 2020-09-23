import "@babel/polyfill"
import slideHide from "./handlers/slideHide.js"
import showFooterMenu from "./handlers/showFooterMenu.js"
import { getCookie } from "./utils/cookies"
import {
  addHtml,
  createNode,
  runOnWindowWidth,
  runOverWindowWidth,
  addClasses,
  removeClasses,
} from "./utils"

const init = () => {
  const footerMenus = document.querySelectorAll(".footer-menu")
  const showFooterMenus = () => showFooterMenu(footerMenus)
  const desktopMenu = async () => {
    const { default: showSubMenu } = await import("./handlers/showSubMenu")
    showSubMenu()
  }
  const mobileMenu = async () => {
    const { default: showSubMenu } = await import("./handlers/showSubMenu")
    showSubMenu()

    const createSubmenuCloseButton = () => {
      const subMenu = "ul.sub-menu"
      const subMenuNode = document.querySelector(subMenu)
      const subMenuAll = [].slice.call(document.querySelectorAll(subMenu))
      const closeButton = createNode("div")
      const closeSubmenu = () => {
        removeClasses(subMenuNode, ["active"])
      }
      closeButton.innerText = "Back"
      closeButton.addEventListener("click", closeSubmenu)
      addClasses(closeButton, ["close-sub-menu"])
      subMenuAll.forEach(sub => {
        sub.append(closeButton)
      })
    }
    createSubmenuCloseButton()
  }

  runOverWindowWidth("1024", desktopMenu)
  runOnWindowWidth("1024", showFooterMenus)
  runOnWindowWidth("1024", mobileMenu)
  // animation handler for the "Topic Explore" section on the home page
  const topNav = document.querySelector(".topic-nav")
  const topicOpen = document.querySelector(".explore-heading i")

  slideHide(topicOpen, topNav, ["click"])

  // insert phone icon in header
  const insertPhoneIcon = () => {
    const phoneNumber = ".menu-phone"
    const phone = '<i class="fas fa-phone"></i>'
    addHtml(
      {
        el: phoneNumber,
        classes: ["flex", "row"],
      },
      {
        html: phone,
        classes: ["hidden-phone"],
        position: "afterbegin",
        container: "div",
      }
    )
  }
  insertPhoneIcon()

  // mobile menu
  const createMobileCtctNav = async () => {
    const { default: createMobileNav } = await import(
      "./handlers/createMobileNav"
    )
    const { default: createMobileNavButton } = await import(
      "./handlers/createMobileNavButton"
    )
    createMobileNav({
      menus: ["#site-navigation", "#site-cta-menu"],
      container: {
        type: "section",
        classes: ["flex", "col"],
        id: "ctct-mobile-nav",
      },
      domSelector: "body",
    })
    createMobileNavButton({ domSelector: "#site-header" })
  }
  runOnWindowWidth("1024", createMobileCtctNav)

  const showProgressBar = async () => {
    const { default: progressBar } = await import("./handlers/progressBar.js")
    const { checkForModule } = await import("./utils")
    if (checkForModule("body.single")) {
      document.addEventListener("scroll", progressBar, { passive: true })
    }
  }
  showProgressBar()

  const maybeShowOptinForm = async () => {
    if (!getCookie("hide-optin")) {
      const popupSignup = async () => {
        const { default: newsletterSignupPopup } = await import(
          "./handlers/newsletterSignupPopup.js"
        )
        newsletterSignupPopup()
      }
      // check if this user has existing session
      const { default: isNewUser } = await import("./handlers/isNewUser")
      isNewUser()

      // get the time left in session before popup
      const { default: getTimeLeftInSession } = await import(
        "./handlers/getTimeLeftInSession"
      )
      const timeLeft = getTimeLeftInSession()
      console.log(timeLeft)
      // start or continue countdown to popup
      const { default: waitSetTime } = await import("./handlers/waitSetTime")
      waitSetTime(timeLeft, popupSignup)
    }
  }
  maybeShowOptinForm()
}
init()
