import {
  createNode,
  addId,
  prependNodeContents,
  appendNode,
  toggleMenu,
} from "../utils/index"

const createMobileNavButton = props => {
  const menuBars =
    "<div class='hamburger'><span id='x-left'></span><span id='x-middle'></span><span id='x-right'></span></div>"
  const button = {
    button: createNode("button"),
    x: menuBars,
    label: "MENU",
  }
  addId(button.button, "menu-open")
  button.button.addEventListener("click", toggleMenu)
  prependNodeContents(button.button, [
    {
      position: "afterbegin",
      content: button.label,
    },
    {
      position: "beforeend",
      content: button.x,
    },
  ])
  appendNode(props.domSelector, button.button)
}

export default createMobileNavButton
