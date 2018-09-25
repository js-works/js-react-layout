import Styles from '../internal/types/Styles'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec  } from 'js-spec/dev-only'

const styles: Styles = {
  container: {
    display: 'flex',
    alignItems: 'stretch',
  }
}

type CellProps = {
  stretch?: number,
  horizontalAlign?: 'start' | 'center' | 'end',
  verticalAlign?: 'top' | 'middle' | 'bottom',
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

const Cell = defineComponent<CellProps>({
  displayName: 'HBox.Cell',

  properties: {
    stretch: {
      type: Number,
      optional: true,
      validate: Spec.nonnegativeFloat
    },

    horizontalAlign: {
      type: String,
      optional: true,
      validate: Spec.oneOf('start', 'center', 'end'),
    },

    verticalAlign: {
      type: String,
      optional: true,
      validate: Spec.oneOf('top', 'middle', 'bottom'),
    },

    className: {
      type: String,
      optional: true
    },

    style: {
      type: Object,
      optional: true
    },

    children: {
      optional: true,
      validate: withChildren(Spec.all(isNode))
    },
  },

  render() {
    throw new Error('Components of type HBox.Cell can only '
    + 'be used as direct children of HBox components')
  }
})

type HBoxProps = {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode 
}

const HBox = defineComponent<HBoxProps>({
  displayName: 'HBox',

  properties: {
    className: {
      type: String,
      optional: true
    },

    style: {
      type: Object,
      optional: true
    },

    children: {
      optional: true,
      validate: withChildren(Spec.all(isElementOfType(Cell)))
    }
  },

  render({ className, style, children }: HBoxProps) {
    const
      cells =
        React.Children.map(children, child => {
          const
            { props } = child as any,
            
            justifyContent =
              props.horizontalAlign === 'start'
                ? 'flex-start'
                : props.horizontalAlign === 'end'
                ? 'flex-end'
                : 'center',

            alignItems =
              props.verticalAlign === 'top'
                ? 'flex-start'
                : props.verticalAlign === 'bottom'
                ? 'flex-end'
                : 'center'

          return (
            <div data-component="HBox.Cell" style={{ flexGrow: props.stretch }}>
              <div style={{ ...props.style, height: '100%', xwidth: '100%', display: 'flex', alignItems, justifyContent }} className={props.className}>
                <div style={{ border: '1px solid black' }}>
                  {props.children}
                </div>
              </div>
            </div>
          )
        }),

      container: ReactNode =
        <div style={styles.container}>
          {cells}
        </div>

    return (
      <div data-component="HBox" className={className} style={style}>
        {container}
      </div>
    )
  }
})

export default Object.assign(HBox, {
  Cell
})
