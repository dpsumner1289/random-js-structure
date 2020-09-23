const progressBar = () => {
  const scrollTop =
    document.documentElement["scrollTop"] || document.body["scrollTop"]
  const scrollBottom =
    (document.documentElement["scrollHeight"] ||
      document.body["scrollHeight"]) - document.documentElement.clientHeight
  const scrollPercent = (scrollTop / scrollBottom) * 100 + "%"
  document
    .getElementById("_progress")
    .style.setProperty("--scroll", scrollPercent)
}

export default progressBar
