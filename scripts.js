/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"fbkYedhhh7IxNpJk","label":"school","bookmarks":[{"id":"BJx1xLiHipaitf1x","label":"neptun","url":"https://neptun.elte.hu"},{"id":"raGUrzF2IxxgaN8G","label":"canvas","url":"https://canvas.elte.hu/belepes/"}]},{"id":"48io5kY6yZpj4wvE","label":"socials","bookmarks":[{"id":"7DmILhp9zPdbwbHz","label":"facebook","url":"https://www.facebook.com"},{"id":"O4RIADB7XjUwb9AR","label":"youtube","url":"https://www.youtube.com"},{"id":"RGsyBiEUptQdcpvx","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"oVO2oqezMXXgyJdI","label":"twitch","url":"https://www.twitch.tv"}]},{"id":"T9kwLE0lgzoer035","label":"torrents","bookmarks":[{"id":"p3DEX6YVrdKJsiBu","label":"ncore","url":"https://ncore.pro"},{"id":"7WZpK281SzwjEgx8","label":"transmission","url":"http://192.168.0.82:9091/"}]},{"id":"bToJixWTOhV7jROK","label":"server","bookmarks":[{"id":"5HdPkNXfObXQkvdS","label":"omv","url":"http://192.168.0.82:90/"},{"id":"d8qrmdKWS7OzDwBo","label":"portainer","url":"http://192.168.0.82:9000/"},{"id":"yidmQPSet4OvtH64","label":"transmission","url":"http://192.168.0.82:9091/"},{"id":"Li7xhEFT4qW2AbyJ","label":"plex","url":"http://192.168.0.82:32400/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
