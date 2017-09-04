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
  }
  play = sound => {
    this.Tones[sound].play()
  }
}

export default Player
