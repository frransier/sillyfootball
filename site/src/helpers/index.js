export function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function dynamicSort(property) {
  var sortOrder = 1
  if (property[0] === "-") {
    sortOrder = -1
    property = property.substr(1)
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}
