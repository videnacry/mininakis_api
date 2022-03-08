module.exports = {
    /**
     * increase the "count" property of an object passed as pCounter, by one for each time a "false" boolean value is passed to the function this function returns
     * @param {Object} counter object with "count" number property
     * @returns {Function} function to increase "count" property in the pCounter
     */
    increaseByBool: (pCounter) => {
      function count (pBoolean) {
        if (pBoolean) pCounter.count++
        return count
      }
      return count
    }
}