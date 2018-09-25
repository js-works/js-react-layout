import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec' // 3rd-party validation library
import { BorderLayout, HBox } from '../main/js-react-layout'

const Demo = defineComponent({
  displayName: 'Demo',

  render() {
    return (
      <BorderLayout className="with-border">
        <BorderLayout.TopCenter className="white-color blue-background with-padding">
          This is is north 
        </BorderLayout.TopCenter>
        <BorderLayout.MiddleStart className="black-color red-background with-padding">
          This is west 
        </BorderLayout.MiddleStart>
        <BorderLayout.MiddleCenter className="black-color green-background with-padding" style={{ width: '100%', border: '2px solid purple' }}>
          <HBox>
            <HBox.Cell className="yellow-background">
              Cell 1
            </HBox.Cell>
            <HBox.Cell stretch={2} className="orange-background">
              Cell 2
            </HBox.Cell>
            <HBox.Cell className="yellow-background">
              Cell 3
            </HBox.Cell>
          </HBox>
        </BorderLayout.MiddleCenter>
        <BorderLayout.MiddleEnd className="black-color red-background with-padding">
          This is east 
        </BorderLayout.MiddleEnd>
        <BorderLayout.BottomCenter className="white-color green-background with-padding">
          This is south 
        </BorderLayout.BottomCenter>
      </BorderLayout>
    )
  }
})

ReactDOM.render(<Demo/>, document.getElementById('main-content'))
