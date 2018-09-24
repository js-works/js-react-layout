import React, { CSSProperties, ReactNode } from 'react'
import { defineComponent, isNode, isElementOfType, withChildren } from 'js-react-utils'
import { FlexDirectionProperty, PositionProperty } from 'csstype'
import { Spec } from 'js-spec/dev-only'

type SectorProps = {
  className?: string,
  style?: CSSProperties, // TODO
  children?: ReactNode
}

const
  TopStart = defineSectorComponent('TopStart'),
  TopCenter = defineSectorComponent('TopCenter'),
  TopEnd = defineSectorComponent('MiddleTopEnd'),
  MiddleStart = defineSectorComponent('MiddleStart'),
  MiddleCenter = defineSectorComponent('MiddleCenter'),
  MiddleEnd = defineSectorComponent('MiddleEnd'),
  BottomStart = defineSectorComponent('BottomStart'),
  BottomCenter = defineSectorComponent('BottomCenter'),
  BottomEnd = defineSectorComponent('BottomEnd')

type BorderLayoutProps = {
  className?: string,
  styles?: CSSProperties, // TODO
  children?: ReactNode // TODO 
}

const styles = {
  borderLayout: {
    position: 'absolute' as PositionProperty,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as FlexDirectionProperty,
  },

  top: {
    display: 'flex',
    flexDirection: 'row' as FlexDirectionProperty,
    alignItems: 'stretch'
  },

  middle: {
    flexGrow: 1,
    display: 'flex'as FlexDirectionProperty,
    flexDiretion: 'row',
  },

  bottom: {
    display: 'flex',
    flexDirection: 'row' as FlexDirectionProperty,
  },

  topStart: {
  },

  topCenter: {
    flexGrow: 1
  },

  topEnd: {
  },

  middleStart: {
  },

  middleCenter: {
    flexGrow: 1,
  },

  middleEnd: {
  },

  bottomStart: {
  },

  bottomCenter: {
    flexGrow: 1
  },

  bottomEnd: {
  }
}

const BorderLayout = defineComponent<BorderLayoutProps>({
  displayName: 'BorderLayout',

  properties: {
    className: {
      type: String,
      optional: true
    },

    children: {
      optional: true,
      
      validate: withChildren(isElementOfType([
        TopStart,
        TopCenter,
        TopEnd,
        MiddleStart,
        MiddleCenter,
        MiddleEnd,
        BottomStart,
        BottomCenter,
        BottomEnd
      ])),
    }
  },

  render: ({ children }) => {
    let
      topStart: ReactNode = null,
      topCenter: ReactNode  = null,
      topEnd: ReactNode = null,
      middleStart: ReactNode = null,
      middleCenter: ReactNode = null,
      middleEnd: ReactNode = null,
      bottomStart: ReactNode = null,
      bottomCenter: ReactNode = null,
      bottomEnd: ReactNode = null

    React.Children.forEach(children, sector => {
      const { type, props } = sector as any 

      const content =
        <div className={props.className} style={props.style}>
          {props.children}
        </div>

      if (type === TopStart) {
        topStart = content
      } else if (type === TopCenter) {
        topCenter = content
      } else if (type === TopEnd) {
        topEnd = content
      } else if (type === MiddleStart) {
        middleStart = content; 
      } else if (type === MiddleCenter) {
        middleCenter = content
      } else if (type === MiddleEnd) {
        middleEnd = content
      } else if (type === BottomStart) {
        bottomStart = content
      } else if (type === BottomCenter) {
        bottomCenter = content
      } else if (type === BottomEnd) {
        bottomEnd = content
      }
    })

    return (
      <div style={styles.borderLayout}>
        { (topStart || topCenter || topEnd) && (
          <div style={styles.top}>
            { topStart && (
              <div data-sector="top-start" style={styles.topStart}>
                {topStart}
              </div>)
            }
            { topCenter && (
              <div data-sector="top-center" style={styles.topCenter}>
                {topCenter}
              </div>)
            }
            { topEnd && (
              <div data-sector="top-end" style={styles.topEnd}>
                {topEnd}
              </div>)
            }
          </div>)
        }
        { (middleStart || middleCenter || middleEnd) && (
          <div style={styles.middle}>
            { middleStart && (
              <div data-sector="middle-start" style={styles.middleStart}>
                {middleStart}
              </div>)
            }
            { middleCenter && (
              <div data-sector="middle-center" style={styles.middleCenter}>
                {middleCenter}
              </div>)
            }
            { middleEnd && (
              <div data-sector="middle-end" style={styles.middleEnd}>
                {middleEnd}
              </div>)
            }
          </div>)
        }
        { (bottomStart || bottomCenter || bottomEnd) && (
          <div style={styles.bottom}>
            { bottomStart && (
              <div data-sector="bottom-start" style={styles.bottomStart}>
                {bottomStart}
              </div>)
            }
            { bottomCenter && (
              <div data-sector="bottom-center" style={styles.bottomCenter}>
                {bottomCenter}
              </div>)
            }
            { bottomEnd && (
              <div data-sector="bottom-end" style={styles.bottomEnd}>
                {bottomEnd}
              </div>)
            }
          </div>)
        }
      </div>
    )
  }
})

export default Object.assign(BorderLayout, {
  TopStart,
  TopCenter,
  TopEnd,
  MiddleStart,
  MiddleCenter,
  MiddleEnd,
  BottomStart,
  BottomCenter,
  BottomEnd
})

Object.freeze(BorderLayout)

// ------------------------------------------------------------------

const sectorProperties = {
  className: {
    type: String,
    optional: true
  },

  style: {
    type: Object,
    optional: true
  },

  children: {
    validate: withChildren(Spec.all(isNode)),
    optional: true
  }
}

function defineSectorComponent(displayName: string) {
  return defineComponent<SectorProps>({
    displayName,
    properties: sectorProperties,

    render() {
      throw new Error(`Components of type BorderLayout.${displayName} `
        + 'can only be used as direct children of BorderLayout components')
    }
  })
}
