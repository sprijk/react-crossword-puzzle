import _ from 'lodash'

// export const MATRIX = [
// //     0     1     2     3     4     5     6     7     8     9    10    11    12    13    14   15     16    17   18
//   [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'k',  null, null, null ], //  0
//   [  'j',  'o',  'r',  'i',  's', null, null, null, null, null, null, null, null, null, null, 'a',  null, null, null ], //  1
//   [ null, null, null, null,  'k', null,  'h', null, null, null, null, null, null, null, null, 't',  'w',  'e',  'e'  ], //  2
//   [ null, null, null,  's',  'i',  'm',  'o',  'n', null, null, null, null, null, 'g',  null, 't',  null, null, null ], //  3
//   [ null, null, null, null,  'e', null,  'c', null, null, 'w',  null, 'm',  'o',  'e',  'd',  'e',  'r',  null, null ], //  4
//   [ null, null, null, null,  'n', null,  'k', null, null, 'i',  null, null, null, 't',  null, 'n',  null, null, null ], //  5
//   [ null, null, null, null, null, 'z',   'e', 'i',  'l',  'e',  'n',  null, null, 'r',  null, null, null, null, null ], //  6
//   [ null, null, null, null, null, null,  'y', null, null, 'l',  null, null, null, 'o',  null, null, null, null, null ], //  7
//   [ null, null, null, null, null, null, null, null, 'v',  'e',  'r',  'b',  'o',  'u',   'w',  'i',  'n',  'g', null ], //  8
//   [ null, null, null, null, null, null, null, null, null, 'w',  null, null, null, 'w',  null, null, null, null, null ], //  9
//   [ null, null, null, null, null, null, null, null, 'r',  'a',  'm',  null, null, 'd',  null, null, null, null, null ], // 10
//   [ null, null, null, null, null, null, null, null, null, 'a',  null, null, null, null, null, null, null, null, null ], // 11
//   [ null, null, null, null, null, null, null, 'w',  'i',  'l',  'h',  'e',  'l',  'm',  'u',  's',  null, null, null ]  // 12
// ]

//    00  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18
// 00                                               k
// 01  j  o  r  i  s                                a
// 02              k     h                          t  w  e  e
// 03           s  i  m  o  n                 g     t
// 04              e     c        w     m  o  e  d  e  r
// 05              n     k        i           t     n
// 06                 z  e  i  l  e  n        r
// 07                    y        l           o
// 08                          v  e  r  b  o  u  w  i  n  g
// 09                             w           w
// 10                          r  a  m        d
// 11                             a
// 12                       w  i  l  h  e  l  m  u  s

export const PIVOTS = []

export const DATA = [
  { word: 'katten', pivot: [0, 15], orientation: 'v', hint: 'Je huisdieren' },
  { word: 'joris', pivot: [1, 0], orientation: 'h', hint: 'De eerstgeboren bink van je gezin' },
  { word: 'skien', pivot: [1, 4], orientation: 'v', hint: 'Je favoriete sport in de winter' },
  { word: 'hockey', pivot: [2, 6], orientation: 'v', hint: 'Balsport met een stockey' },
  { word: 'twee', pivot: [2, 15], orientation: 'h', hint: 'Aantal zussen' },
  { word: 'simon', pivot: [3, 3], orientation: 'h', hint: 'De rots uit het Nieuwe Testament' },
  { word: 'getrouwd', pivot: [3, 13], orientation: 'v', hint: 'Je burgerlijke staat' },
  { word: 'wielewaal', pivot: [4, 9], orientation: 'v', hint: 'In deze straat woon je' },
  { word: 'moeder', pivot: [4, 11], orientation: 'h', hint: 'Dit ben je al ruim 4 jaar' },
  { word: 'zeilen', pivot: [6, 5], orientation: 'h', hint: 'Je favoriete hobby in de zomer' },
  { word: 'verbouwing', pivot: [ 8, 8], orientation: 'h', hint: 'Doorgaande bezigheid aan het huis' },
  { word: 'ram', pivot: [10, 8], orientation: 'h', hint: 'Je sterrenbeeld' },
  { word: 'wilhelmus', pivot: [12, 7], orientation: 'h', hint: 'Tweede naam van je mannetje' }
]

// ------------------------------------
// Constants
// ------------------------------------
export const TIMER_MAX = 100
export const TIMER_STEP = 5
export const CODE = '968'
export const SET_WORD_INPUT = 'SET_WORD_INPUT'
export const SET_GAME_STATE = 'SET_GAME_STATE'
export const RESET_TIMER = 'RESET_TIMER'
export const INCEREMENT_TIMER = 'INCEREMENT_TIMER'

// ------------------------------------
// Helper functions
// ------------------------------------
export const getInitialData = (input) => {
  let data = _.cloneDeep(input)
  data = _.sortBy(data, [(clue) => clue.pivot[0], (clue) => clue.pivot[1]])
  data = _.map(data, (clue, i) => _.assign(clue, { nr: i + 1, input: '' }))
  return data
}

export const getLetterInClue = (clue, row, col) => {
  if (!isInWord(clue, row, col)) {
    return
  }

  let letter = ''

  switch (clue.orientation) {
    case 'h':
      letter = clue.word.charAt(col - clue.pivot[1])
      break
    case 'v':
      letter = clue.word.charAt(row - clue.pivot[0])
      break
  }

  return letter
}

export const getLetterInData = (data, row, col) => {
  return _.chain(data)
    .map((clue) => getLetterInClue(clue, row, col))
    .flatten()
    .compact()
    .uniq()
    .value()[0]
}

export const isInWord = (clue, row, col) => {
  let result = false

  switch (clue.orientation) {
    case 'h':
      let isInRow = clue.pivot[0] === row
      let isInWordHor = _.some(_.range(clue.pivot[1], clue.pivot[1] + clue.word.length), (i) => i === col)
      result = isInRow && isInWordHor
      break

    case 'v':
      let isInCol = clue.pivot[1] === col
      let isInWordVer = _.some(_.range(clue.pivot[0], clue.pivot[0] + clue.word.length), (i) => i === row)
      result = isInCol && isInWordVer
      break
  }

  return result
}

export const isInAnyWord = (data, row, col) => {
  return _.some(data, (clue) => isInWord(clue, row, col))
}

export const replaceChar = (string, letter, index) => {
  if (string.length <= index) {
    return string
  }

  return string.substr(0, index) + letter + string.substr(index + 1)
}

export const setInputLetter = (string, letter, index) => {
  if (index < string.length) {
    string = replaceChar(string, letter, index)
  } else {
    while (string.length <= index) { string += ' ' }
    string = replaceChar(string, letter, index)
  }
  return string
}

export const getInputLetter = (data, row, col) => {
  let hasInputs = isInAnyWord(data, row, col)

  if (!hasInputs) { return }

  let inputLetters = _.reduce(data, (m, clue) => {
    if (isInWord(clue, row, col)) {
      let input = clue.input || ''
      let letter
      if (input && clue.orientation === 'h') {
        letter = input.split('')[col - clue.pivot[1]]
      } else if (input && clue.orientation === 'v') {
        letter = input.split('')[row - clue.pivot[0]]
      }
      if (letter) { m.push(letter) }
    }

    return m
  }, [])

  return _.first(inputLetters)
}

export const gridFromData = (data) => {
  let rows = data.reduce((m, i) => _.max([i.orientation === 'v' ? i.pivot[0] + i.word.length : 0, m]), 1)
  let cols = data.reduce((m, i) => _.max([i.orientation === 'h' ? i.pivot[1] + i.word.length : 0, m]), 1)

  return _.map(_.range(0, rows), (row) => {
    return _.map(_.range(0, cols), (col) => {
      let letter = getLetterInData(data, row, col)
      let inputLetter = getInputLetter(data, row, col)
      let clue = _.find(data, (clue) => clue.pivot[0] === row && clue.pivot[1] === col)
      let clueIndex = _.findIndex(data, clue)

      return {
        letter:      letter,
        inputLetter: inputLetter,
        clue:        clue,
        clueIndex:   clueIndex
      }
    })
  })
}

// ------------------------------------
// Actions
// ------------------------------------
// export function setTimer(value = 0) {
//   return {
//     type:    SET_TIMER,
//     payload: value
//   }
// }

export function incrementTimer () {
  return {
    type: INCEREMENT_TIMER
  }
}

export function resetTimer () {
  return {
    type: RESET_TIMER
  }
}

export function setWordInput (index = 0, value = '') {
  return {
    type:    SET_WORD_INPUT,
    payload: { index: index, value: value }
  }
}

export function setGameState (value = 'stopped') {
  return {
    type:    SET_GAME_STATE,
    payload: value
  }
}

export const actions = {
  incrementTimer,
  resetTimer,
  setGameState,
  setWordInput
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RESET_TIMER]: (state) => {
    return _.assign({}, state, { timer: TIMER_MAX })
  },

  [INCEREMENT_TIMER]: (state) => {
    let game = state.game
    let timer = state.timer - TIMER_STEP
    if (timer < 0) { timer = 0 }
    if (timer === 0) {
      game = 'over'
    }
    return _.assign({}, state, { timer: timer, game: game })
  },

  [SET_GAME_STATE]: (state, action) => {
    let game = action.payload
    let timer = state.timer
    let newData = _.cloneDeep(state.data)

    switch (game) {
      case 'started':
        timer = TIMER_MAX
        break
      case 'stopped':
        break
    }

    newData = _.map(data, (clue) => {
      clue.input = ''
      return clue
    })

    let grid = gridFromData(newData)

    return _.assign({}, state, { game: game, timer: timer, data: data, grid: grid })
  },

  [SET_WORD_INPUT]: (state, action) => {
    let newData = _.cloneDeep(state.data)
    let clue = newData[action.payload.index]
    let correct = false
    let timer = state.timer
    let row, col

    [row, col] = clue.pivot

    // clue.input = action.payload.value
    switch (clue.orientation) {
      case 'h':
        _.each(action.payload.value.split(''), (letter, i) => {
          _.each(newData, (clue) => {
            if (isInWord(clue, row, col + i)) {
              let offset
              switch (clue.orientation) {
                case 'h':
                  offset = col + i - clue.pivot[1]
                  break
                case 'v':
                  offset = row - clue.pivot[0]
                  break
              }
              clue.input = setInputLetter(clue.input, letter, offset)
              clue.correct = clue.input === clue.word
              correct = clue.correct
            }
          })
        })
        break
      case 'v':
        _.each(action.payload.value.split(''), (letter, i) => {
          _.each(newData, (clue) => {
            if (isInWord(clue, row + i, col)) {
              let offset
              switch (clue.orientation) {
                case 'h':
                  offset = col - clue.pivot[1]
                  break
                case 'v':
                  offset = row + i - clue.pivot[0]
                  break
              }
              clue.input = setInputLetter(clue.input, letter, offset)
              clue.correct = clue.input === clue.word
              correct = clue.correct
            }
          })
        })
        break
    }

    if (correct) { timer = TIMER_MAX }

    return _.assign({}, state, {
      timer:  timer,
      data:   newData,
      grid:   gridFromData(newData),
      solved: _.every(newData, (clue) => clue.correct)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

let data = getInitialData(DATA)

const initialState = {
  code:    CODE,
  solved:  false,
  game:    'stopped',
  timer:   TIMER_MAX,
  data:    data,
  grid:    gridFromData(data)
}

export default function puzzleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
