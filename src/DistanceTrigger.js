AFRAME.registerComponent('distance-trigger', {
  multiple: true,
  schema: {
    targetID: {
      default: '',
    },
    effect: {
      default: '',
    },
    triggerDistance: {
      default: 0,
    },

  },

  init: function() {
    if (this.data.targetID !== '') {
      this.target = document.querySelector('#' + this.data.targetID);
    }
  },

  tick: function() {
    const pos = this.el.object3D.position;
    const targetPos = this.target.object3D.position;

    if (pos.distanceTo(targetPos) <= this.data.triggerDistance) {
      console.log('trigger');
      // Figure Out effect Stuff Tomorrow
    }
  }

  // There should be something to remove listeners when the obj they are tied to is removed
});