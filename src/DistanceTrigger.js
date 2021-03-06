AFRAME.registerComponent('distance-trigger', {
  multiple: true,
  schema: {
    targetID: {
      default: '',
    },
    effect: {
      default: '',
    },
    effectTargetID: {
      default: '',
    },
    triggerDistance: {
      default: 0,
    },
  },

  init: function() {
    this.hasTriggered = false;

    if (this.data.targetID !== '') {
      this.triggerTarget = document.querySelector('#' + this.data.targetID);

      this.audio = new Audio();
      if (this.data.effect == 'sound') {
        this.audio.src = this.data.effectTargetID;
      } else {
        this.effectTarget = this.data.effectTargetID ? document.querySelector('#' + this.data.effectTargetID) : '';
      }
    }
  },

  tick: function() {
    const pos = this.el.object3D.position;
    const targetPos = this.triggerTarget.object3D.position;

    if (!this.hasTriggered && pos.distanceTo(targetPos) <= this.data.triggerDistance) {
      this.hasTriggered = true;
      if (this.data.effect == 'sound') {
        this.audio.play();
      }
      
      if (this.data.effect == 'show') {
        this.effectTarget.setAttribute('visible', true);
      }
      
      if (this.data.effect == 'hide') {
        this.effectTarget.setAttribute('visible', false);
      }
    }

    if (this.hasTriggered && pos.distanceTo(targetPos) > this.data.triggerDistance) {
      this.hasTriggered = false;
      
      if (this.data.effect == 'show') {
        this.effectTarget.setAttribute('visible', false);
      }
      
      if (this.data.effect == 'hide') {
        this.effectTarget.setAttribute('visible', true);
      }
    }
  }
  // There should be something to remove listeners when the obj they are tied to is removed
});
