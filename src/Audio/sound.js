/**
 * This Sound class plays sounds tones using the Web Context API.
 * The class supports playing multiple simultaneous sounds using
 * one of four different types of waveform: sine, square, triangle
 * and sawtooth.
 * 
 * @param {any} context = the audio context
 * @param {boolean} singleTone = play single or multiple concurrent tones 
 * @class Sound
 */

class Sound {
  constructor(context, singleTone = false) {
    this.context = context
    this.waveformShape = 'triangle'
    this.singleToneMode = singleTone
    this.isPlaying = false
  }
  /**
   * Initialises the Audio Context.
   * This needs to be performed prior to playing a new sound.
   * 
   * @memberof Sound
   */
  init() {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()

    this.oscillator.type = this.waveformShape
    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)
  }
  /**
   * Plays a tone at the given frequency value for the given duration.
   * Note: multiple tones can be played simultaneously.
   * 
   * @param {number} value - the sound frequency 
   * @param {number} [duration=500]  - the playing duration
   * @memberof Sound
   */
  play(value, duration = 600) {
    if (this.singleToneMode && this.isPlaying) return
    this.isPlaying = true
    const now = this.context.currentTime
    this.init()
    this.oscillator.frequency.value = value
    this.gainNode.gain.setValueAtTime(1, now)
    this.oscillator.start(now)

    // Stop the current tone playing
    setTimeout(
      (oscillator, gainNode) => this.stop(oscillator, gainNode),
      duration,
      this.oscillator,
      this.gainNode
    )
  }

  /**
   * Stop playing sound.
   * 
   * Note: to prevent click sound while playing multiple sounds have
   * the volume never quite reach zero before the next sounds begins.
   * 
   * @param {any} oscillator  the context oscillator
   * @param {any} gainNode  the context gain node
   * @memberof Sound
   */
  stop(oscillator, gainNode) {
    const when = this.context.currentTime + 0.1
    gainNode.gain.exponentialRampToValueAtTime(0.001, when)
    oscillator.stop(when)
    this.isPlaying = false
  }

  set waveform(shape) {
    this.waveformShape = shape
  }
}

export default Sound
