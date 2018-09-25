import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { Spec } from 'js-spec' // 3rd-party validation library
import { BorderLayout, HBox, VBox } from '../main/js-react-layout'

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
        <BorderLayout.MiddleCenter className="black-color cyan-background with-padding">
          <HBox>
            <HBox.Cell className="yellow-background">
              Cell 1<br/>
              Cell 1<br/>
              Cell 1<br/>
              Cell 1<br/>
            </HBox.Cell>
            <HBox.Cell grow={2} className="orange-background" verticalAlign="bottom" horizontalAlign="end">
              Cell 2
            </HBox.Cell>
            <HBox.Cell className="yellow-background">
              Cell 3
            </HBox.Cell>
            <HBox.Cell className="orange-background" verticalAlign="top">
              Cell 4
            </HBox.Cell>
          </HBox>
          <VBox style={{ width: '200px', height: '100px', border: '1px solid gray', display: 'inline-block' }}>
            <VBox.Cell grow={1} horizontalAlign="start" verticalAlign="bottom">
              xxx
            </VBox.Cell>
            <VBox.Cell grow={1} horizontalAlign="end" verticalAlign="bottom">
               yyy 
            </VBox.Cell>
            <VBox.Cell>
               zzz 
            </VBox.Cell>
          </VBox>
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
