import Sound1 from './Sound1.mp3'
import Sound2 from './Sound2.mp3'
import Sound3 from './Sound3.mp3'
import Sound4 from './Sound4.mp3'

import Color from '../Enums/PanelColor'

class Player {
  constructor() {
    this.Tones = {
      [Color.Red]: new Audio(Sound1),
      [Color.Blue]: new Audio(Sound2),
      [Color.Yellow]: new Audio(Sound3),
      [Color.Green]: new Audio(Sound4),
    }
    this.isPlaying = false
  }
  play = sound => {
    // Don't play when a sequence is playing
    if (!this.isPlaying) {
      this.Tones[sound].play()
    }
  }
  stop = () => {
    if (this.isPlaying) {
      this.toneTimers.forEach(timer => clearTimeout(timer))
    }
  }
  /* 
     Note: if the delay is made is too short not all tones
     will be played as they interfere with each other.

     While the tones are playing prevent further button 
     presses (except power switch)
  */
  playSequence = (tones, delay = 600) => {
    this.isPlaying = true
    this.toneTimers = tones.map((tone, index) => {
      return setTimeout(() => this.Tones[tone].play(), delay * index)
    })
    // Clear isPlaying when sequence finishes
    setTimeout(() => (this.isPlaying = false), delay * tones.length)
  }
  isPlaying = () => this.isPlaying
}

export default Player
