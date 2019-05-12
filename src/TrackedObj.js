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
      default: 2,
    },
    xMult: {
      default: 1,
    },
    yMult: {
      default: 1,
    },
    zMult: {
      default: 1,
    },
  },

  init: function() {
    trackedObjListeners.push(
      (frameData) => {
        const data = frameData[this.data.objID];

        // How do I calibrate these values.
        // I should probs make them all scaled based on one value passed in
        if (data) {
          if (data.x && data.y && data.z) {
            this.el.object3D.position.x = data.x / 700;
            this.el.object3D.position.y = data.z / 700;
            this.el.object3D.position.z = -data.y / 700;
          }

          if (data.xRot && data.yRot && data.zRot) {
            this.el.object3D.rotation.set(
              data.xRot / 180 * Math.PI * this.data.xMult,
              data.zRot / 180 * Math.PI * this.data.yMult,
              data.yRot / 180 * Math.PI * this.data.zMult,
              'XZY'
            );
          }
        }
      }
    );
  },

  // There should be something to remove listeners when the obj they are tied to is removed
});
