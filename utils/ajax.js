import { scrollToEl } from "./index.js"
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
