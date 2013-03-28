assert = require "assert"

assert (typeof module.id is "number")
assert (require.main is module)
assert (typeof exports is "object")
console.log "Passed"