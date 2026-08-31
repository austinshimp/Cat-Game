// Express 5 already forwards rejected promises to next() automatically,
// but wrapping handlers explicitly keeps the behavior obvious and makes
// the controllers portable if this ever moves back to Express 4.
export function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
