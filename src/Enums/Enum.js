// A basic Enum constructor function
const Enum = (...values) => {
  let newEnum = {}
  for (const value of values) {
    Object.assign(newEnum, {
      [value]: value,
    })
  }
  return newEnum
}

export default Enum
