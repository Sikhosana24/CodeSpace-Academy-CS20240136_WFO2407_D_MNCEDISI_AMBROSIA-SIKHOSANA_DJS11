import localforage from "localforage"

export const getStorageItem = async (key) => {
  try {
    return await localforage.getItem(key)
  } catch (error) {
    console.error("Error getting storage item:", error)
    return null
  }
}

export const setStorageItem = async (key, value) => {
  try {
    await localforage.setItem(key, value)
  } catch (error) {
    console.error("Error setting storage item:", error)
  }
}
