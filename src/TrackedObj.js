// Holds our socket server connection
let socket;
const trackedObjListeners = [];

function initSockets() {
  socket = io('192.168.1.100:8000');

  // Loop through all the obj listeners send them frame data
  socket.on('frame', d => trackedObjListeners.forEach(l => l(d)));
}

// Default shape is a cube
AFRAME.registerComponent('tracked-obj', {
  multiple: true,
  schema: {
    objID: {
      default: 0,
    },
  },

  init: function() {
    trackedObjListeners.push(
      (frameData) => {
        const data = frameData[this.data.objID];
        // How do I calibrate these values. I should probs make them all scaled based on one value passed in
        if (data) {
          if (data.x && data.y && data.z) {
            const mesh = this.el.getObject3D('mesh');
            mesh.position.x = data.x / 700;
            mesh.position.y = data.z / 700;
            mesh.position.z = data.y / 700;
          }
        }
        // Use frame data to set position and rotation
      }
    );
  },

  // There should be something to remove listeners when the obj they are tied to is removed
});
