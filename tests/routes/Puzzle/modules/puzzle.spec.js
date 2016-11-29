import {
  getInitialData,
  getLetterInClue,
  getLetterInData,
  getNumberInData,
  isInAnyWord,
  isInWord,
  replaceChar,
  SET_WORD_INPUT,
  setInputLetter,
  setWordInput,
  default as puzzleReducer
} from 'routes/Puzzle/modules/puzzle'

var DATA = [
  { word: 'katten',     pivot: [ 0, 15], orientation: 'v', nr:  1, input: '',       hint: 'Je huisdieren' },
  { word: 'joris',      pivot: [ 1,  0], orientation: 'h', nr:  2, input: 'joris',  hint: 'De eerstgeboren bink van je gezin'},
  { word: 'hockey',     pivot: [ 2,  6], orientation: 'v', nr:  3, input: 'hocker', hint: 'Balsport met een stockey' },
  { word: 'twee',       pivot: [ 2, 15], orientation: 'h', nr:  4, input: '',       hint: 'Aantal zussen' },
  { word: 'simon',      pivot: [ 3,  3], orientation: 'h', nr:  5, input: '',       hint: 'De rots uit het Nieuwe Testament' },
  { word: 'wielewaal',  pivot: [ 4,  9], orientation: 'v', nr:  6, input: '',       hint: 'In deze straat woon je' },
  { word: 'moeder',     pivot: [ 4, 11], orientation: 'h', nr:  7, input: '',       hint: 'Dit ben je al ruim 4 jaar' },
  { word: 'zeilen',     pivot: [ 6,  5], orientation: 'h', nr:  8, input: 'skien',  hint: 'Je favoriete hobby in de zomer' },
  { word: 'verbouwing', pivot: [ 8,  8], orientation: 'h', nr:  9, input: '',       hint: 'Doorgaande bezigheid aan het huis' },
  { word: 'ram',        pivot: [10,  8], orientation: 'h', nr: 10, input: '',       hint: 'Je sterrenbeeld' },
  { word: 'wilhelmus',  pivot: [ 4,  9], orientation: 'h', nr: 11, input: '',       hint: 'Tweede naam van je mannetje' }
]

let data = getInitialData(DATA)

const initialState = {
  counter: 0,
  data:    data,
  rows:    data.reduce((m, i) => Math.max(i.orientation === 'v' ? i.pivot[0] + i.word.length - 1: 0, m), 0),
  cols:    data.reduce((m, i) => Math.max(i.orientation === 'h' ? i.pivot[1] + i.word.length - 1: 0, m), 0)
}

describe('(Redux Module) Puzzle', () => {
  it('Should export a constant SET_WORD_INPUT.', () => {
    expect(SET_WORD_INPUT).to.equal('SET_WORD_INPUT')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(puzzleReducer).to.be.a('function')
    })
  })

  describe('(helper fn) replaceChar', () => {
    it('should return a new string with the character at `index` replaces', () => {
      expect(replaceChar('simon', 'b', 0)).to.equal('bimon')
      expect(replaceChar('simon', 'b', 1)).to.equal('sbmon')
      expect(replaceChar('simon', 'b', 2)).to.equal('sibon')
      expect(replaceChar('simon', 'b', 3)).to.equal('simbn')
      expect(replaceChar('simon', 'b', 4)).to.equal('simob')
      expect(replaceChar('simon', 'b', 5)).to.equal('simon')
    })
  })

  describe('(helper fn) setInputLetter', () => {
    it('should return a new string with the character at `index` added or replaces', () => {
      expect(setInputLetter('simon', 'b', 0)).to.equal('bimon')
      expect(setInputLetter(   'si', 'b', 1)).to.equal('sb')
      expect(setInputLetter('', 'b',      2)).to.equal('  b')
      expect(setInputLetter('  h  ', 'b', 3)).to.equal('  hb ')
      expect(setInputLetter('  h  ', 'b', 7)).to.equal('  h    b')
      expect(setInputLetter(     '', 'b', 0)).to.equal('b')
      expect(setInputLetter(   'si', 'b', 0)).to.equal('bi')
    })
  })

  describe('(helper fn) isInWord', () => {
    describe('horizontal words', () => {
      let clue = { word: 'hockey', pivot: [ 2,  6], orientation: 'h' }

      it('should return true if inside a horizontal word', () => {
        expect(isInWord(clue, 2,  6)).to.equal(true)
        expect(isInWord(clue, 2,  7)).to.equal(true)
        expect(isInWord(clue, 2, 11)).to.equal(true)
      })
      it('should return false if outside a horizontal word', () => {
        expect(isInWord(clue, 1, 12)).to.equal(false)
        expect(isInWord(clue, 2, 12)).to.equal(false)
        expect(isInWord(clue, 4, 6)).to.equal(false)
        expect(isInWord(clue, 4, 7)).to.equal(false)
      })
    })
    describe('vertical words', () => {
      let clue = { word: 'hockey', pivot: [ 2,  6], orientation: 'v' }

      it('should return true if inside a vertical word', () => {
        expect(isInWord(clue, 2, 6)).to.equal(true)
        expect(isInWord(clue, 3, 6)).to.equal(true)
        expect(isInWord(clue, 7, 6)).to.equal(true)
      })
      it('should return false if outside a vertical word', () => {
        expect(isInWord(clue, 3, 7)).to.equal(false)
        expect(isInWord(clue, 2, 12)).to.equal(false)
        expect(isInWord(clue, 0, 0)).to.equal(false)
      })
    })
  })

  describe('(helper fn) isInAnyWord', () => {
    it('should work!', () => {
      expect(isInAnyWord(DATA, 0, 0)).to.equal(false)
      expect(isInAnyWord(DATA, 2, 6)).to.equal(true)
    })
  })

  describe('(helper fn) getLetterInClue', () => {
    describe('horizontal', () => {
      let clue = { word: 'hockey', pivot: [2,  6], orientation: 'h' }
      it('should get the right letter in a word', () => {
        expect(getLetterInClue(clue, 2,  5)).to.equal(undefined)
        expect(getLetterInClue(clue, 2,  6)).to.equal('h')
        expect(getLetterInClue(clue, 2,  7)).to.equal('o')
        expect(getLetterInClue(clue, 2,  8)).to.equal('c')
        expect(getLetterInClue(clue, 2,  9)).to.equal('k')
        expect(getLetterInClue(clue, 2, 10)).to.equal('e')
        expect(getLetterInClue(clue, 2, 11)).to.equal('y')
        expect(getLetterInClue(clue, 2, 12)).to.equal(undefined)
      })
    })
    describe('vertical', () => {
      let clue = { word: 'hockey', pivot: [2,  6], orientation: 'v' }
      it('should get the right letter in a word', () => {
        expect(getLetterInClue(clue, 1, 6)).to.equal(undefined)
        expect(getLetterInClue(clue, 2, 6)).to.equal('h')
        expect(getLetterInClue(clue, 3, 6)).to.equal('o')
        expect(getLetterInClue(clue, 4, 6)).to.equal('c')
        expect(getLetterInClue(clue, 5, 6)).to.equal('k')
        expect(getLetterInClue(clue, 6, 6)).to.equal('e')
        expect(getLetterInClue(clue, 7, 6)).to.equal('y')
        expect(getLetterInClue(clue, 8, 6)).to.equal(undefined)
      })
    })
  })

  describe('(helper fn) getLetterInClue', () => {
    it('should work!', () => {
      expect(getLetterInData(DATA, 2, 6)).to.equal('h')
      expect(getLetterInData(DATA, 0, 0)).to.equal(undefined)
    })
  })

  // describe('(helper fn) getProjectedInput', () => {
  //   it('should work!', () => {
  //     expect(getProjectedInput(DATA, 1)).to.equal('h')
  //     expect(getProjectedInput(DATA, 2)).to.equal('h')
  //     expect(getProjectedInput(DATA, 3)).to.equal('h')
  //     expect(getProjectedInput(DATA, 4)).to.equal('h')
  //     expect(getProjectedInput(DATA, 5)).to.equal('h')
  //     expect(getProjectedInput(DATA, 6)).to.equal('h')
  //     expect(getProjectedInput(DATA, 7)).to.equal('h')
  //   })
  // })

})



