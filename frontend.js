import "@babel/polyfill"
import showFooterMenu from "./handlers/showFooterMenu"
import { getCookie } from "./utils/cookies"
import getPostType from "./utils/meta"
import {
  runOnWindowWidth,
  runOverWindowWidth,
  runBetweenWidths,
  runIfPastElandBeforeEl2,
} from "./utils/window"
import {
  addHtml,
  createNode,
  addClasses,
  removeClasses,
  getNodeBySelector,
  checkForModule,
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
      const closeSubmenu = () => {
        removeClasses(subMenuNode, ["active"])
      }
      subMenuAll.forEach(sub => {
        const closeButton = createNode("div")
        closeButton.innerText = "Back"
        closeButton.addEventListener("click", closeSubmenu)
        addClasses(closeButton, ["close-sub-menu"])
        sub.append(closeButton)
      })
    }
    createSubmenuCloseButton()
  }
  const addCtaMenuToMobileHeader = async () => {
    if (checkForModule(".secondary-cta")) {
      return
    }
    const { default: copyCtaNav } = await import("./handlers/copyCtaNav")
    const secondaryCtaNav = copyCtaNav()
    if (secondaryCtaNav) {
      const header = getNodeBySelector("#site-header")
      header.append(secondaryCtaNav)
    }
  }
  runOverWindowWidth("1400", desktopMenu)
  runOnWindowWidth("1024", showFooterMenus)
  runOnWindowWidth("1400", mobileMenu)
  runBetweenWidths({ min: "775", max: "1400" }, addCtaMenuToMobileHeader)

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
  runOnWindowWidth("1400", createMobileCtctNav)

  const showProgressBar = async () => {
    if (getPostType() !== "single") {
      return
    }
    const { default: progressBar } = await import("./handlers/progressBar")
    document.addEventListener("scroll", progressBar, { passive: true })
  }
  showProgressBar()

  const secondarySocialShare = async () => {
    if (getPostType() !== "single") {
      return
    }
    const { default: positionSocialSharingSide } = await import(
      "./handlers/positionSocialSharingSide"
    )
    positionSocialSharingSide()
  }
  secondarySocialShare()

  const maybeShowOptinForm = async () => {
    if (!getCookie("hide-optin")) {
      const popupSignup = async () => {
        const { default: newsletterSignupPopup } = await import(
          "./forms/newsletterSignupPopup"
        )
        const { default: submitEmailSignupAction } = await import(
          "./forms/submitEmailSignupAction"
        )
        newsletterSignupPopup()
        submitEmailSignupAction()
      }
      // check if this user has existing session
      const { default: isNewUser } = await import("./session-methods/isNewUser")
      isNewUser()

      // get the time left in session before popup
      const { default: getTimeLeftInSession } = await import(
        "./session-methods/getTimeLeftInSession"
      )
      const timeLeft = getTimeLeftInSession()
      // start or continue countdown to popup
      const { default: waitSetTime } = await import("./handlers/waitSetTime")
      waitSetTime(timeLeft, popupSignup)
    }
  }
  maybeShowOptinForm()
}
init()
