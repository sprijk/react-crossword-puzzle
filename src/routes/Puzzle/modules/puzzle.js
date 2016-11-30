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
  { word: 'katten',     pivot: [ 0, 15], orientation: 'v', hint: 'Je huisdieren' },
  { word: 'joris',      pivot: [ 1,  0], orientation: 'h', hint: 'De eerstgeboren bink van je gezin'},
  { word: 'skien',      pivot: [ 1,  4], orientation: 'v', hint: 'Je favoriete sport in de winter'},
  { word: 'hockey',     pivot: [ 2,  6], orientation: 'v', hint: 'Balsport met een stockey' },
  { word: 'twee',       pivot: [ 2, 15], orientation: 'h', hint: 'Aantal zussen' },
  { word: 'simon',      pivot: [ 3,  3], orientation: 'h', hint: 'De rots uit het Nieuwe Testament' },
  { word: 'getrouwd',   pivot: [ 3, 13], orientation: 'v', hint: 'Je burgerlijke staat' },
  { word: 'wielewaal',  pivot: [ 4,  9], orientation: 'v', hint: 'In deze straat woon je' },
  { word: 'moeder',     pivot: [ 4, 11], orientation: 'h', hint: 'Dit ben je al ruim 4 jaar' },
  { word: 'zeilen',     pivot: [ 6,  5], orientation: 'h', hint: 'Je favoriete hobby in de zomer' },
  { word: 'verbouwing', pivot: [ 8,  8], orientation: 'h', hint: 'Doorgaande bezigheid aan het huis' },
  { word: 'ram',        pivot: [10,  8], orientation: 'h', hint: 'Je sterrenbeeld' },
  { word: 'wilhelmus',  pivot: [12,  7], orientation: 'h', hint: 'Tweede naam van je mannetje' }
]


// ------------------------------------
// Constants
// ------------------------------------
export const SET_WORD_INPUT = 'SET_WORD_INPUT'

// ------------------------------------
// Helper functions
// ------------------------------------
export const getInitialData = (input) => {
  let data = _.cloneDeep(input)
  data     = _.sortBy(data, [(clue) => clue.pivot[0], (clue) => clue.pivot[1]])
  data     = _.map(data, (clue, i) => _.assign(clue, { nr: i + 1, input: '' }))
  return data
}

export const getLetterInClue = (clue, row, col) => {
  if (! isInWord(clue, row, col)) {
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

export const getNumberInData = (data, row, col) => {
  return _.chain(data)
    .map((clue) =>
      clue.pivot[0] === row && clue.pivot[1] === col
        ? clue.nr
        : null
    )
    .compact()
    .value()[0]
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

  switch(clue.orientation) {
    case 'h':
      let isInRow     = clue.pivot[0] === row
      let isInWordHor = _.some(_.range(clue.pivot[1], clue.pivot[1] + clue.word.length), (i) => i === col)
      result = isInRow && isInWordHor
      break

    case 'v':
      let isInCol     = clue.pivot[1] === col
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
  if (string.length <= index ) {
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

  let inputLetters = _.reduce(data, ((m, clue) => {
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
  }), [])

  return _.first(inputLetters)
}

export const gridFromData = (data) => {
  let rows = data.reduce((m, i) => _.max([i.orientation === 'v' ? i.pivot[0] + i.word.length : 0, m]), 0)
  let cols = data.reduce((m, i) => _.max([i.orientation === 'h' ? i.pivot[1] + i.word.length : 0, m]), 0)

  return _.map (_.range(0, rows), (row) => {
    return _.map (_.range(0, cols), (col) => {
      let letter      = getLetterInData(data, row, col)
      let inputLetter = getInputLetter(data, row, col)
      let clue        = _.find(data, (clue) => clue.pivot[0] === row && clue.pivot[1] === col)

      return {
        letter:      letter,
        inputLetter: inputLetter,
        clue:        clue
      }
    })
  })
}

// ------------------------------------
// Actions
// ------------------------------------
export function setWordInput(nr = 1, value = '') {
  return {
    type:    SET_WORD_INPUT,
    payload: { nr: nr, value: value }
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch(increment(getState().counter))
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
  // increment,
  // doubleAsync,
  setWordInput
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_WORD_INPUT]: (state, action) => {
    let newData = _.cloneDeep(state.data)
    let clue    = _.find(newData, (clue) => clue.nr === action.payload.nr)
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
            }
          })
        })
        break
    }

    return {
      data: newData,
      grid: gridFromData(newData)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

let data = getInitialData(DATA)

const initialState = {
  data: data,
  grid: gridFromData(data)
}

export default function puzzleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
