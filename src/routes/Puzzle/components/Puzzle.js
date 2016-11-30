import React from 'react'
import _ from 'lodash'
import { Modal, Button } from 'react-bootstrap'

class InputLetter extends React.Component {
  focus() {
    this.textInput.focus()
  }

  onKeyUp(e) {
    let value = this.textInput.value
    value = _.first(value.split('')) || ''
    this.textInput.value = value
    this.props.onInput(e, this.props.nr, value)
  }

  onFocus() {
    // this.textInput.select()
  }

  componentDidMount() {
    // if (this.props.nr === 0) {
    //   this.focus()
    // }
  }

  render() {
    return (
      <div
        style = {{
          display:     'block',
          float:       'left',
          width:       '32px',
          height:      '32px',
          marginRight: '10px',
          border:      '1px solid black'
        }}
      >
        <input
          placeholder   = { this.props.inputLetter }
          onKeyUp       = { (e) => this.onKeyUp(e) }
          onFocus       = { () => this.onFocus() }
          ref           = { (input) => { this.textInput = input }}
          name          = { `letter-${ this.props.clue.nr }` }
          style         = {{
            width:       '32px',
            height:      '32px',
            textAlign:   'center'
          }}
        />
      </div>
    )
  }
}

class InputLetters extends React.Component {
  letterUpdate(e, nr, letter) {
    // let index       = this.props.index
    // let word        = this.props.clue.word
    // let isLetter    = 64 < e.keyCode && e.keyCode < 91
    // let isBackspace = e.keyCode === 8

    // if (isLetter) {
    //   if (this.refs[`letter-${nr + 1}`]) {
    //     this.refs[`letter-${nr + 1}`].focus()
    //   } else {
    //     let letters = _.map(word.split(''), (letter, i) =>  this.refs[`letter-${i}`].textInput.value)
    //     this.props.onWordDone(index, letters.join(''))
    //   }
    // } else if (isBackspace) {
    //   if (this.refs[`letter-${nr - 1}`]) {
    //     this.refs[`letter-${nr - 1}`].focus()
    //   }
    // }
  }

  render() {
    return (
      <div>
        {
          _.map(this.props.clue.word.split(''), (letter, i) => {
            return (
              <InputLetter
                key         = { `letter-${i}` }
                ref         = { `letter-${i}` }
                inputLetter = { this.props.clue.input.charAt(i) || '' }
                clue        = { this.props.clue }
                onInput     = { this.letterUpdate }
              />
              )
          })
        }
      </div>
    )
  }
}

class InputWord extends React.Component {
  state = { showModal: false }

  close = (value) => {
    this.setState({ showModal: false })
    // this.props.setWordInput(this.props.clue.nr, value)
  }

  open = () => {
    this.setState({ showModal: true })
  }

  render = () => (
    <div>
      <span
        style = {{
          display:    'block',
          position:   'absolute',
          top:        '2px',
          left:       '2px',
          fontSize:   '10px',
          lineHeight: '10px'
        }}
      >{ this.props.clue.nr } </span>
      <a
        style={{
          display:  'block',
          position: 'absolute',
          top:      '0px',
          left:     '0px',
          width:    '32px',
          height:   '32px',
          cursor:   'pointer'
        }}
        onClick={ this.open }
      ></a>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Vul antwoord in voor:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <blockquote>
            <p>{ this.props.clue.hint }</p>
          </blockquote>
          <div className='row'>
            <div className='col-xs-12'>
              <InputLetters
                clue       = { this.props.clue }
                onWordDone = { (value) => this.close(value) }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const Cell = (props) => (
  <div
    className = "grid-cell"
    style     = {{
      position:        'relative',
      width:           32,
      height:          32,
      float:           'left',
      textAlign:       'center',
      lineHeight:      '32px',
      border:          props.cell.letter ? '1px solid black' : '',
      backgroundColor: props.cell.clue ? '#d9edf7' : '#ffffff'
    }}
  >
    {
      <div>
        <div>{ props.cell.inputLetter }</div>
        {
          props.cell.clue
            ? <InputWord
                clue         = { props.cell.clue }
                setWordInput = { props.setWordInput }
              />
            : ''
        }
      </div>
    }
  </div>
)

const Row = (props) => (
  <div className='grid-row' style={{
    clear: 'both'
  }}>
    {
      _.map(props.cols, (cell, i) =>
        <Cell
          key          = { `cell-${props.row}-${i}` }
          row          = { props.row }
          col          = { i }
          cell         = { cell }
          setWordInput = { props.setWordInput }
        />
      )
    }
  </div>
)

const Grid = (props) => {
  return (
    <div className='grid-main'>
      {
        _.map(props.grid, (cols, i) => <Row
            key          = { `row-${i}` }
            row          = { i }
            cols         = { cols }
            setWordInput = { props.setWordInput }
          />
        )
      }
    </div>
  )
}

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

const Clues = (props) => (
  <div className='row'>
    <div className='col-xs-12'>
      <h4>Horizontaal</h4>
      <ClueList type='h' clues={props.data} />
    </div>
    <div className='col-xs-12'>
      <h4>Verticaal</h4>
      <ClueList type='v' clues={props.data} />
    </div>
  </div>
)

const Puzzle = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Los de puzzel op!</h2>
    <div className="row">
      <div className="col-lg-7 col-md-9">
        <Grid
          grid         = { props.grid }
          setWordInput = { props.setWordInput }
        />
      </div>
      <div className="col-lg-5 col-md-3">
        <Clues data={ props.data } />
      </div>
    </div>
  </div>
)

export default Puzzle
