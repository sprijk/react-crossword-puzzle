import React from 'react'
import { Link } from 'react-router'
import './HomeView.scss'

export const HomeView = () => (
  <div className='row' >
    <div className='col-md-offset-2 col-md-10'>
      <div className='verse'>
        <div className='row' >
          <div className='col-xs-12'>
            <h3>Lieve Corine,</h3>
            <p>
              Om de koffer open te kunnen maken,<br />
              zul je eerst de code moeten kraken.
            </p>
            <p>
              Daarvoor zul je binnen bepaalde tijd,<br />
              de puzzel helemaal moeten doen, lieve meid.<br />
            </p>
            <p>
              Je zult snel op het keyboard moeten rossen,<br />
              zodat je toch nog de puzzel op kunt lossen.
            </p>
            <p>
              Is de puzzel helemaal klaar en volbracht,<br />
              open dan de koffer met het cadeau die op jou wacht.
            </p>
            <p>
              Groeten van de Sint
            </p>
          </div>
        </div>
        <div className='row' >
          <div className='col-xs-12'>
            <h3>
              <Link className='goto__link' to={'/puzzle'}>
                <span className='label label-primary'>Naar de puzzel →</span>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default HomeView
