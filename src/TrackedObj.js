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
  },

  init: function() {
    trackedObjListeners.push(
      (frameData) => {
        const body = frameData[this.data.objID];

        // How do I calibrate these values.
        // I should probs make them all scaled based on one value passed in
        if (body) {
          if (body.x && body.y && body.z) {
            this.el.object3D.position.x = body.x / 700;
            this.el.object3D.position.y = body.z / 700;
            this.el.object3D.position.z = -body.y / 700;
          }

          if (body.xRot && body.yRot && body.zRot) {
            this.el.object3D.rotation.set(
              body.xRot / 180 * Math.PI,
              (body.zRot / 180 * Math.PI),
              body.yRot / 180 * Math.PI * -1,
              'XZY'
            );
          }
        } else {
          console.warn('Missing Tracked Object at ID', this.data.objID)
        }
      }
    );
  },

  // There should be something to remove listeners when the obj they are tied to is removed
});
