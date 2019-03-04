AFRAME.registerComponent('position-trigger', {
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
    triggerValue: {
      default: 0,
    },
    triggerAxis: {
      default: 'y',
    },
    compare: {
      default: 'greater',
    }
  },

  init: function() {
    this.hasTriggered = false;

    this.effectTarget = this.data.effectTargetID ? document.querySelector('#' + this.data.effectTargetID) : '';
    this.audio = new Audio();
    if (this.data.effect == 'sound') {
      this.audio.src = this.data.effectTargetID;
    }
  },

  tick: function() {
    const pos = this.el.object3D.position;
    const compareFunc = this.data.compare == 'greater' ? (x1, x2) => x1 > x2 : (x1, x2) => x1 < x2;
  
    if (!this.hasTriggered && compareFunc(pos[this.data.triggerAxis], this.data.triggerValue)) {
      this.hasTriggered = true;
      if (this.data.effect == 'sound') {
        // this.el.components.sound.playSound();
        this.audio.play();
      }
      
      if (this.data.effect == 'show') {
        this.effectTarget.setAttribute('visible', true);
      }
      
      if (this.data.effect == 'hide') {
        this.effectTarget.setAttribute('visible', false);
      }
    }

    if (this.hasTriggered && !compareFunc(pos[this.data.triggerAxis], this.data.triggerValue)) {
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
