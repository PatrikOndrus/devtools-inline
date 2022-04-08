const wall = {
  _listeners: [],
  listen(listener) {
    wall._listeners.push(listener);
  },
  send({ event, payload }) {
    wall._listeners.forEach((listener) => listener({ event, payload }));
  },
};

export default wall;
