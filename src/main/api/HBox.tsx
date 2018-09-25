import Styles from '../internal/types/Styles'
import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec  } from 'js-spec/dev-only'

const styles: Styles = {
  container: {
    display: 'inline-flex',
    flexFlow: 'row nowrap',
  },

  cell: {
  }
}

type CellProps = {
  stretch?: number,
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

  render({ className, style, children }) {
    const
      cells =
        React.Children.map(children, child => {
          const { props } = child as any 

          return (
            <div data-component="HBox.Cell" style={{ flex: `${props.stretch || 1 } 1` }}>
              <div className={props.className} style={props.style}>
                { props.children }
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
