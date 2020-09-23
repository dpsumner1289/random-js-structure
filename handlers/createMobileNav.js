import {
  applyStyles,
  appendNode,
  containNodes,
  extractNodes,
} from "../utils/index"

const createMobileNav = props => {
  const menus = extractNodes(props.menus)
  const menuContainer = containNodes(
    {
      type: props.container.type,
      classes: props.container.classes,
      id: props.container.id,
    },
    menus
  )
  const topOffset = document.querySelector("#site-header").offsetHeight
  const baseStyles = {
    position: "absolute",
    top: `${topOffset}px`,
    width: "100%",
    right: "-100%",
    background: "white",
    height: "100vh",
    zIndex: "999999",
  }
  applyStyles(menuContainer, baseStyles)
  appendNode(props.domSelector, menuContainer)
}
export default createMobileNav
