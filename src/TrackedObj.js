// Holds our socket server connection
let socket;
const trackedObjListeners = [console.log];

function initSockets() {
  socket = io('192.168.1.125:8000');
  console.log(socket);

  // Loop through all the obj listeners send them frame data
  socket.on('frame', d => trackedObjListeners.forEach(l => l(d)));
}

// Default shape is a cube
AFRAME.registerGeometry('tracked-obj', {
  schema: {
    objId: {
      default: 0,
    },
  },

  init: (data) => {
    trackedObjListeners.push(
      (frameData) => {
        console.log(frameData[data.objId]);
        // Use frame data to set position and rotation
      }
    );
  },

  // There should be something to remove listeners when the obj they are tied to is removed
});
