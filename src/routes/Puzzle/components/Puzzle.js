import React from 'react'
import _ from 'lodash'
import { Modal, Button } from 'react-bootstrap'

// class InputLetter extends React.Component {
//   constructor(props) {
//     super(props)
//     this.focus = this.focus.bind(this)
//   }

//   focus() {
//     this.textInput.focus()
//   }

//   onKeyUp(e) {
//     let value = this.textInput.value
//     value = _.first(value.split('')) || ''
//     this.textInput.value = value
//     this.props.onInput(e, this.props.nr, value)
//   }

//   onFocus() {
//     this.textInput.select()
//   }

//   componentDidMount() {
//     if (this.props.nr === 0) {
//       this.focus()
//     }
//   }

//   render() {
//     let inputLetter = this.props.inputLetter
//     let letter      = this.props.letter
//     let nr          = this.props.nr

//     return (
//       <div
//         style       = {{
//           display:     'block',
//           float:       'left',
//           width:       '32px',
//           height:      '32px',
//           marginRight: '10px',
//           border:      '1px solid black'
//         }}
//       >
//         <input
//           placeholder   = { inputLetter }
//           onKeyUp       = { (e) => this.onKeyUp(e) }
//           onFocus       = { () => this.onFocus() }
//           ref           = { (input) => { this.textInput = input }}
//           name          = { `letter-${ nr }` }
//           style         = {{
//             width:       '32px',
//             height:      '32px',
//             textAlign:   'center'
//           }}
//         />
//       </div>
//     )
//   }
// }

// class InputLetters extends React.Component {
//   letterUpdate = (e, nr, letter) => {
//     let index       = this.props.index
//     let word        = this.props.clue.word
//     let isLetter    = 64 < e.keyCode && e.keyCode < 91
//     let isBackspace = e.keyCode === 8

//     if (isLetter) {
//       if (this.refs[`letter-${nr + 1}`]) {
//         this.refs[`letter-${nr + 1}`].focus()
//       } else {
//         let letters = _.map(word.split(''), (letter, i) =>  this.refs[`letter-${i}`].textInput.value)
//         this.props.onWordDone(index, letters.join(''))
//       }
//     } else if (isBackspace) {
//       if (this.refs[`letter-${nr - 1}`]) {
//         this.refs[`letter-${nr - 1}`].focus()
//       }
//     }
//   }

//   render = () => {
//     let clue        = this.props.clue
//     let inputLetter = clue.input.charAt(i) || ''

//     return (
//       <div>
//         {
//           clue.word.split('').map((letter, i) => {

//             return (
//               <InputLetter
//                 key         = { `letter-${i}` }
//                 ref         = { `letter-${i}` }
//                 nr          = { i }
//                 inputLetter = { inputLetter }
//                 letter      = { letter }
//                 onInput     = { this.letterUpdate }
//               />
//             )
//           }
//           )
//         }
//       </div>
//     )
//   }
// }

// class InputWord extends React.Component {
//   state = { showModal: false }

//   close = (index, value) => {
//     this.setState({ showModal: false })
//     this.props.onWordInput(index, value)
//   }

//   open = () => {
//     this.setState({ showModal: true })
//   }

//   render = () => {
//     let nr    = this.props.nr
//     let data  = this.props.data
//     let clue  = _.find(data, (clue) => clue.nr === nr)
//     let index = _.findIndex(data, (clue) => clue.nr === nr)

//     return (
//       <div>
//         <span
//           style = {{
//             display:    'block',
//             position:   'absolute',
//             top:        '2px',
//             left:       '2px',
//             fontSize:   '10px',
//             lineHeight: '10px'
//           }}
//         >{ nr } </span>
//         <a
//           style={{
//             display:  'block',
//             position: 'absolute',
//             top:      '0px',
//             left:     '0px',
//             width:    '32px',
//             height:   '32px',
//             cursor:   'pointer'
//           }}
//           onClick={ this.open }
//         ></a>

//         <Modal show={this.state.showModal} onHide={this.close}>
//           <Modal.Header closeButton>
//             <Modal.Title>Vul antwoord in voor:</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <blockquote>
//               <p>{ clue.hint }</p>
//             </blockquote>
//             <div className='row'>
//               <div className='col-xs-12'>
//                 <InputLetters
//                   index      = { index }
//                   clue       = { clue }
//                   onWordDone = { (index, value) => this.close(index, value) }
//                 />
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//           </Modal.Footer>
//         </Modal>
//       </div>

//     )
//   }
// }

// class Cell extends React.Component {
//   render = () => {
//     let row          = this.props.row
//     let col          = this.props.col
//     let data         = this.props.data
//     let onWordInput  = this.props.onWordInput
//     let nr           = getNumberInData(data, row, col)
//     let hasInputs    = isInAnyWord(data, row, col)
//     let inputLetters = []
//     let inputLetter  = `${row},${col}`

//     if (hasInputs) {
//       inputLetters = _.reduce(data, ((m, clue) => {
//         if (isInWord(clue, row, col)) {
//           let input = clue.input || ''
//           let letter
//           if (input && clue.orientation === 'h') {
//             letter = input.split('')[col - clue.pivot[1]]
//           } else if (input && clue.orientation === 'v') {
//             letter = input.split('')[row - clue.pivot[0]]
//           }
//           if (letter) {
//             console.log(clue.nr, clue.word, clue.input, letter)
//             m.push(letter)
//           }
//         }

//         return m
//       }), [])
//     }

//     inputLetter = _.first(inputLetters) || ''

//     return (
//       <div
//         className = "gird-cell"
//         style     = {{
//           position:   'relative',
//           width:      32,
//           height:     32,
//           float:      'left',
//           textAlign:  'center',
//           lineHeight: '32px',
//           border: isInAnyWord(data, row, col)
//             ? '1px solid black'
//             : '',
//           backgroundColor: nr
//             ? '#d9edf7'
//             : '#ffffff'
//         }}
//       >
//         {
//           <div>
//             <div>{ inputLetter }</div>
//             {
//               nr
//                 ? <InputWord
//                     nr          = { nr }
//                     data        = { data }
//                     onWordInput = { onWordInput }
//                   />
//                 : ''
//             }
//           </div>
//         }
//       </div>
//     )
//   }
// }

const Row = (props) => (
  <div className='grid-row' style={{
    clear: 'both'
  }}>
    {
      // _.range(0, props.cols).map((cell, i) => <Cell
      //   key          = { i }
      //   row          = { props.row }
      //   col          = { i }
      //   data         = { props.data }
      //   onWordInput  = { props.onWordInput }
      // /> )
    }
  </div>
)

const Grid = (props) => (
  <div className='grid-main'>
    {
      _.range(0, props.rows).map((row, i) => <Row
          key         = { i }
          row         = { i }
          cols        = { props.cols }
          data        = { props.data }
          onWordInput = { props.onWordInput }
        />
      )
    }
  </div>
)

const Clue = (props) => (
  <div>
    <dt style={{ width: 50 }}>{ props.clue.nr }</dt>
    <dd style={{ marginLeft: 70 }}>{ props.clue.hint }</dd>
  </div>
)

const ClueList = (props) => (
  <div>
    <dl className='dl-horizontal'>
      {
        _.chain(props.clues)
          .map((clue, i) => clue.orientation === props.type ? <Clue key={ clue.nr } clue={ clue } /> : null)
          .compact()
          .value()
      }
    </dl>
  </div>
)

class Clues extends React.Component {
  render = () => {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h4>Horizontaal</h4>
          <ClueList type='h' clues={this.props.data} />
        </div>
        <div className='col-xs-12'>
          <h4>Verticaal</h4>
          <ClueList type='v' clues={this.props.data} />
        </div>
      </div>
    )
  }
}

class Puzzle extends React.Component {
  onWordInput = (index, input) => {
    this.props.setWordInput(index, input)
  }

  render() {
    let rows        = this.props.rows
    let cols        = this.props.cols
    let data        = this.props.data
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Los de puzzel op!</h2>
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <Grid
              rows        = { rows }
              cols        = { cols }
              onWordInput = { this.onWordInput }
              data        = { data }
            />
          </div>
          <div className="col-lg-5 col-md-3">
            <Clues data={ this.props.data } />
          </div>
        </div>
      </div>
    )
  }
}

export default Puzzle
