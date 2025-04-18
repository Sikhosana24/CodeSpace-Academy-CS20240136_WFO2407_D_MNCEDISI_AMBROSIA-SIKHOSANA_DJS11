/**
 * Performs a fuzzy search on a collection of items
 * @param {Array} items - The collection of items to search through
 * @param {String} searchTerm - The search term to match against
 * @param {Array} keys - The keys to search in each item
 * @returns {Array} - The filtered items that match the search term
 */
export const fuzzySearch = (items, searchTerm, keys) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return items
    }
  
    searchTerm = searchTerm.toLowerCase().trim()
    const searchTerms = searchTerm.split(/\s+/)
  
    return items.filter((item) => {
      // Check if any of the search terms match any of the keys
      return searchTerms.some((term) => {
        return keys.some((key) => {
          const value = getNestedValue(item, key)
  
          if (typeof value === "string") {
            // Direct match
            if (value.toLowerCase().includes(term)) {
              return true
            }
  
            // Check for similar words (fuzzy)
            const words = value.toLowerCase().split(/\s+/)
            return words.some((word) => {
              // Levenshtein distance for fuzzy matching
              if (word.length > 3 && term.length > 3) {
                const distance = levenshteinDistance(word, term)
                return distance <= Math.min(2, Math.floor(Math.max(word.length, term.length) / 3))
              }
              return word.includes(term) || term.includes(word)
            })
          } else if (Array.isArray(value)) {
            // If the value is an array (like genres), check each item
            return value.some((v) => typeof v === "string" && v.toLowerCase().includes(term))
          }
          return false
        })
      })
    })
  }
  
  // Helper function to get nested values using dot notation
  const getNestedValue = (obj, path) => {
    const keys = path.split(".")
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj)
  }
  
  // Levenshtein distance calculation for fuzzy matching
  const levenshteinDistance = (a, b) => {
    const matrix = []
  
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j
    }
  
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // deletion
          )
        }
      }
    }
  
    return matrix[b.length][a.length]
  }
  