import Styles from '../internal/types/Styles'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec  } from 'js-spec/dev-only'

type CellProps = {
  grow?: number,
  shrink?: number,
  horizontalAlign?: 'start' | 'center' | 'end',
  verticalAlign?: 'top' | 'middle' | 'bottom',
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

const Cell = defineComponent<CellProps>({
  displayName: 'HBox.Cell',

  properties: {
    grow: {
      type: Number,
      optional: true,
      validate: Spec.nonnegativeFloat
    },
    
    shrink: {
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
            <div data-component="HBox.Cell" style={{ flexGrow: props.grow, flexShrink: props.shrink }}>
              <div style={{ ...props.style, height: '100%', display: 'flex', alignItems, justifyContent }} className={props.className}>
                <div>
                  {props.children}
                </div>
              </div>
            </div>
          )
        }),

      container: ReactNode =
        <div style={{ display: 'flex' }}>
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
