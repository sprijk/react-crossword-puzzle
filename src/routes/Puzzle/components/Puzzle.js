import React from 'react'
import _ from 'lodash'
import {
  Button,
  Fade,
  Modal,
  ProgressBar,
  Well
} from 'react-bootstrap'
import './Puzzle.scss'

class InputLetter extends React.Component {
  focus = () => {
    this.textInput.focus()
  }

  onKeyUp = (e) => {
    let value = this.textInput.value
    value = _.first(value.split('')) || ''
    this.textInput.value = value
    this.props.onInput(e, this.props.index, value)
  }

  onFocus = () => {
    this.textInput.select()
  }

  componentDidMount() {
    if (this.props.index === 0) {
      this.focus()
    }
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
  letterUpdate = (e, index, letter) => {
    let word        = this.props.clue.word
    let isLetter    = 64 < e.keyCode && e.keyCode < 91
    let isBackspace = e.keyCode === 8

    if (isLetter) {
      if (this.refs[`letter-${index + 1}`]) {
        this.refs[`letter-${index + 1}`].focus()
      } else {
        let letters = _.map(word.split(''), (letter, i) =>  this.refs[`letter-${i}`].textInput.value)
        this.props.onWordDone(this.props.clueIndex, letters.join(''))
      }
    } else if (isBackspace) {
      if (this.refs[`letter-${index - 1}`]) {
        this.refs[`letter-${index - 1}`].focus()
      }
    }
  }

  render = () => {
    return (
      <div>
        {
          _.map(this.props.clue.word.split(''), (letter, i) => {
            return (
              <InputLetter
                key         = { `letter-${i}` }
                ref         = { `letter-${i}` }
                index       = { i }
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

  close = (index, value) => {
    this.setState({ showModal: false })
    this.props.onWordInput(index, value)
  }

  open = () => {
    if (this.props.game === 'started') {
      this.setState({ showModal: true })
    }
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
      <Modal show={this.props.game === 'started' && this.state.showModal} onHide={this.close}>
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
                clueIndex  = { this.props.clueIndex }
                clue       = { this.props.clue }
                onWordDone = { (index, value) => this.close(index, value) }
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
    className = 'grid-cell'
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
                clueIndex   = { props.cell.clueIndex }
                clue        = { props.cell.clue }
                onWordInput = { props.onWordInput }
                game        = { props.game }
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
          key         = { `cell-${props.row}-${i}` }
          row         = { props.row }
          col         = { i }
          cell        = { cell }
          game        = { props.game }
          onWordInput = { props.onWordInput }
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
            key         = { `row-${i}` }
            row         = { i }
            cols        = { cols }
            game        = { props.game }
            onWordInput = { props.onWordInput }
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

let interval = null

class Puzzle extends React.Component {
  onWordInput = (index, value) => {
    this.props.setWordInput(index, value)
  }

  onGo = () => {
    this.props.setGameState('started')
  }

  componentDidMount = () => {
    clearInterval(interval)
    interval = setInterval(() => {
      if(this.props.game === 'started') {
        this.props.incrementTimer()
      }
    }, 1000)
  }

  render = () => {
    return (
      <div style={{ margin: '0 auto' }} >
        <div className='row'>
          <div className='col-md-offset-2 col-md-8' style={{
            minHeight: '140px'
          }}>
            {
              this.props.game === 'started' && !this.props.solved
                ? <div className='row'>
                    <div className='col-xs-12'>
                      <p className='text-center'><em>Overige tijd</em></p>
                      <ProgressBar bsStyle='warning' striped active now={ this.props.timer }  label={`${this.props.timer}%`} />
                    </div>
                  </div>
                : <div>
                    {
                      this.props.solved
                        ? <div>
                            <h4 className='text-center'>Het is je gelukt!! De Code is:</h4>
                            <div className='row'>
                              <div className='col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4'>
                                <pre className='game__code text-center'>{ this.props.code }</pre>
                              </div>
                            </div>
                          </div>
                        : <div>
                            <h4 className='text-center'>{
                              this.props.game === 'over'
                              ? 'Helaas buiten de tijd!! Probeer het nog een keer.'
                              : 'Ben je er klaar voor?'
                            }</h4>
                            <div className='row'>
                              <div className='col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4'>
                                <button onClick={ this.onGo } className="btn btn-primary btn-block btn-lg text-center">Start!</button>
                              </div>
                            </div>
                          </div>
                    }
                  </div>
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-7 col-md-9'>
            <Grid
              game        = { this.props.game }
              grid        = { this.props.grid }
              onWordInput = { this.onWordInput }
            />
          </div>
          <div className='col-lg-5 col-md-3'>
            <Clues data={ this.props.data } />
          </div>
        </div>

      </div>
    )
  }
}

export default Puzzle
