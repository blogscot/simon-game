import Sound from './sound'

import Color from '../Enums/PanelColor'

/**
 * Player plays audio sounds for the four game panels
 * 
 * @export class
 * @class Player
 */
export default class Player {
  constructor() {
    // Setup Audio Context
    const context = new (window.AudioContext || window.webkitAudioContext)()
    this.sound = new Sound(context, true)

    this.Tones = {
      [Color.Red]: this.redTone,
      [Color.Blue]: this.blueTone,
      [Color.Yellow]: this.yellowTone,
      [Color.Green]: this.greenTone,
    }
  }
  playToneFor = sound => {
    this.Tones[sound]()
  }
  redTone = () => this.sound.play(233.08)
  yellowTone = () => this.sound.play(246.94)
  blueTone = () => this.sound.play(261.63)
  greenTone = () => this.sound.play(293.66)
  wrongButton = () => {
    this.sound.waveform = 'square'
    this.sound.play(196.0, 1000)
    this.sound.waveform = 'triangle'
  }
}
