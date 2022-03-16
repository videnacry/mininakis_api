
/**
 * increase the "count" property of an object passed as pCounter, by one for each time a "false" boolean value is passed to the function this function returns
 * @param {Object} counter object with "count" number property
 * @returns {Function} function to increase "count" property in the pCounter
 */
 const increaseByBool = (pCounter) => {
  function count (pBoolean) {
    if (pBoolean) pCounter.count++
    return count
  }
  return count
}

/**
 * throws an error if not only one property from pParams is between pMin and pMax
 * @param {Object} pParams properties to check if only one of them is between pMin and pMax, if undefined, counts as not between pMin and pMax
 * @param {Number} pMin integer value the property must be bigger than it
 * @param {Number} pMax integer value the property must be smaller than it
 */
const onlyOneOptionBetween = (pParams, pMin, pMax) => {
  const entries = Object.entries(pParams)
  let count = 0
  for (const [index, value] of entries ) {
      if ((value <= pMin || value >= pMax || !value)) continue
      count++
      if (count <= 1) continue
      throwError()
  }
  if (count === 0) throwError()

  function throwError() {
    let errorMessage = entries.reduce((prev, curr) => {
      return prev + ` ${curr[0]},`
    },'Please give a value to only one of the arguments:')
    errorMessage += `and make sure it is an integer between ${pMin} and ${pMax}`
    throw new Error(errorMessage)
  }
}

module.exports = {
  increaseByBool, onlyOneOptionBetween
}