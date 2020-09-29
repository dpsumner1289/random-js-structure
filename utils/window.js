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
