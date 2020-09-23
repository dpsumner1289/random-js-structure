export const log = logMessage => {
  console.log(logMessage)
}
export const loop = (times, callback) => {
  for (let i = 0; i < times; i++) {
    callback()
  }
}
export const addClasses = (el, classNames) => {
  classNames.map(className => {
    el.classList.add(className)
  })
}

export const addId = (el, id) => {
  el.id = id
}

export const removeClasses = (el, classNames) => {
  classNames.map(className => {
    el.classList.remove(className)
  })
}

export const applyStyles = (el, styles) => {
  Object.keys(styles).map(property => {
    el.style[property] = styles[property]
  })
}

export const createNode = type => {
  const node = document.createElement(type)
  return node
}

export const getNodeBySelector = el => {
  const node = document.querySelector(el)
  return node
}

export const prependNodeContent = (node, contentProps) => {
  node.insertAdjacentHTML(contentProps.position, contentProps.content)
}

export const prependNodeContents = (node, contents) => {
  contents.map(content =>
    prependNodeContent(node, {
      position: content.position,
      content: content.content,
    })
  )
}

export const checkForModule = module =>
  document.querySelector(module) ? true : false

export const appendNode = (el, node) => {
  const parent = document.querySelector(el)
  parent.appendChild(node)
}

export const deleteNode = node => {
  node.remove()
}

export const extractNodes = selectors => {
  const nodes = []
  selectors.map(selector => {
    nodes.push(document.querySelector(selector))
  })
  return nodes
}

export const containNodes = (containerProps, nodes) => {
  const container = createNode(containerProps.type)

  if (containerProps.classes) {
    addClasses(container, containerProps.classes)
  }
  if (containerProps.id) {
    addId(container, containerProps.id)
  }

  nodes.map(node => container.appendChild(node))
  return container
}

export const addHtml = (elProps, htmlProps) => {
  const markup = createNode(htmlProps.container)
  const el = getNodeBySelector(elProps.el)
  addClasses(markup, htmlProps.classes)
  addClasses(el, elProps.classes)
  prependNodeContent(markup, {
    content: htmlProps.html,
    position: htmlProps.position,
  })
  el.insertBefore(markup, el.childNodes[0])
}

export const isWindowGreaterOrEqual = compareWidth => {
  const width = window.innerWidth
  return compareWidth >= width
}

export const isWindowLessOrEqual = compareWidth => {
  const width = window.innerWidth
  return compareWidth <= width
}

export const runOnWindowWidth = (width, callback) => {
  if (isWindowGreaterOrEqual(width)) {
    callback()
  }
}

export const runOverWindowWidth = (width, callback) => {
  if (isWindowLessOrEqual(width)) {
    callback()
  }
}

export const toggleActiveClass = el => {
  !el.classList.contains("active")
    ? addClasses(el, ["active"])
    : removeClasses(el, ["active"])
}

export const toggleHamburgerActiveClass = el => {
  !el.classList.contains("crossed")
    ? addClasses(el, ["crossed"])
    : removeClasses(el, ["crossed"])
}

export const toggleMenu = () => {
  const menu = getNodeBySelector("#ctct-mobile-nav")
  const hamburger = getNodeBySelector(".hamburger")
  toggleActiveClass(menu)
  toggleHamburgerActiveClass(hamburger)
}

export const scrollToEl = el => {
  el.scrollIntoView(true, { behavior: "smooth" })
}

// AJAX stuff

export const ajaxQuery = props => {
  return {
    action: props.action,
    page: props.page,
    query: {
      tax: props.query.tax,
      term: props.query.term,
    },
  }
}

export const ajaxPost = props => {
  const $ = jQuery
  $.post(props.ajaxUrl, props.query).done(posts => {
    props.callback()
    props.container.html(posts)
    props.postsArea.css("opacity", 1)
    scrollToEl(document.getElementById("featured-articles-heading"))
  })
}
