import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec' // 3rd-party validation library
import { BorderLayout } from '../main/js-react-layout'

const Demo = defineComponent({
  displayName: 'Demo',

  render() {
    return (
      <BorderLayout className="with-border">
        <BorderLayout.TopCenter className="white-color blue-background with-padding">
          North 
        </BorderLayout.TopCenter>
        <BorderLayout.MiddleStart className="black-color orange-background with-padding">
          West 
        </BorderLayout.MiddleStart>
        <BorderLayout.MiddleEnd className="black-color red-background with-padding">
          East 
        </BorderLayout.MiddleEnd>
        <BorderLayout.BottomCenter className="white-color green-background with-padding">
          South 
        </BorderLayout.BottomCenter>
      </BorderLayout>
    )
  }
})

ReactDOM.render(<Demo/>, document.getElementById('main-content'))
