/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import './ImageComparisonSlider.scss'

import React, { FC, useEffect, useRef, useState } from 'react'

interface IProps {
  imageLeft: string
  imageRight: string
  blurRightImage?: number
  handleText?: string
  titleLeft?: string
  titleRight?: string
}

const defaultSize = 100

const ImageComparisonSlider: FC<IProps> = (props: IProps) => {
  const { imageLeft, imageRight, blurRightImage, handleText, titleLeft, titleRight } =
    props
  const [isLoad, setIsLoad] = useState(false)
  const handleRef = useRef<HTMLDivElement>(null)
  const leftImgRef = useRef<HTMLImageElement>(null)
  const rightImgRef = useRef<HTMLImageElement>(null)
  const leftTitleRef = useRef<HTMLHeadingElement>(null)
  const rightTitleRef = useRef<HTMLHeadingElement>(null)
  let isMouseDown: boolean = false
  let clientX: number
  let handleWidth: number
  // eslint-disable-next-line no-unused-vars
  let handleHeight: number
  let imgWidth: number
  let imgHeight: number

  const handleStart = (e: any): void => {
    e.stopPropagation()
    clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
    isMouseDown = true
  }

  const handleEnd = (): void => {
    isMouseDown = false
  }

  const handleMove = (e: any): void => {
    if (isMouseDown && handleRef.current && leftImgRef.current) {
      const { width, height } = handleRef.current.getBoundingClientRect()
      const halfHandle = width / 2
      const min = -halfHandle
      const max = leftImgRef.current.getBoundingClientRect().width - halfHandle

      if (e.type === 'mousemove') {
        let left = parseInt(handleRef.current.style.left, 10) + (e.clientX - clientX)
        left = left < min ? min : left > max ? max : left
        handleRef.current.style.left = `${left}px`
        clientX = e.clientX
      } else {
        let left =
          parseInt(handleRef.current.style.left, 10) +
          (Math.round(e.touches[0].clientX) - clientX)
        left = left < min ? min : left > max ? max : left
        handleRef.current.style.left = `${left}px`
        clientX = Math.round(e.touches[0].clientX)
      }

      leftImgRef.current.style.clip = `rect(0px, ${
        width / 2 + parseInt(handleRef.current.style.left, 10)
      }px, ${height}px, 0px)`

      handleTitles()
    }
  }

  const handleTitles = () => {
    const { width: imgWidth } = rightImgRef?.current?.getBoundingClientRect() || {
      width: defaultSize
    }
    const { width } = handleRef?.current?.getBoundingClientRect() || {
      width: defaultSize
    }
    const handlePosition =
      (width / 2 + parseInt(handleRef?.current?.style.left || String(defaultSize), 10)) /
      imgWidth

    if (leftTitleRef.current && rightTitleRef?.current) {
      leftTitleRef.current.style.opacity = String(-0.1 + handlePosition)
      rightTitleRef.current.style.opacity = String(0.9 - handlePosition)
    }
  }

  const handleResize = (): void => {
    if (handleRef.current && leftImgRef.current) {
      handleRef.current.style.left = `${imgWidth / 2 - handleWidth / 2}px`
      leftImgRef.current.style.clip = `rect(0px, ${imgWidth / 2}px, ${imgHeight}px, 0px`
      ;({ width: handleWidth } = handleRef.current.getBoundingClientRect())
      ;({ width: imgWidth, height: imgHeight } =
        leftImgRef.current.getBoundingClientRect())

      handleTitles()
    }
  }

  const handleLoad = () => {
    if (
      handleRef?.current?.getBoundingClientRect() &&
      leftImgRef?.current?.getBoundingClientRect()
    ) {
      ;({ width: handleWidth, height: handleHeight } =
        handleRef?.current?.getBoundingClientRect())
      ;({ width: imgWidth, height: imgHeight } =
        leftImgRef.current.getBoundingClientRect())

      handleRef.current.style.left = `${imgWidth / 2 - handleWidth / 2}px`
      leftImgRef.current.style.clip = `rect(0px, ${imgWidth / 2}px, 999px, 0px)`

      handleTitles()
      setIsLoad(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('mouseup', handleEnd)

    return (): void => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mouseup', handleEnd)
    }
  }, [leftImgRef?.current?.clientWidth])

  return (
    <div className='image-comparison' style={{ opacity: isLoad ? 1 : 0 }}>
      <div
        className='image-comparison__handle'
        ref={handleRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        aria-label='Handler image comparison'
        role='slider'
        tabIndex={0}>
        <div
          className={`image-comparison__icons ${handleText ? '' : 'hide-title'}`}
          data-content={handleText}>
          <i className='icon-chevron-left'>&lt;</i>
          <i className='icon-chevron-right'>&gt;</i>
        </div>
      </div>
      {titleLeft && (
        <h3 className='image-comparison__title-left' ref={leftTitleRef}>
          {titleLeft}
        </h3>
      )}
      {titleRight && (
        <h3 className='image-comparison__title-right' ref={rightTitleRef}>
          {titleRight}
        </h3>
      )}
      <img
        className='image-comparison__img'
        ref={leftImgRef}
        src={imageLeft}
        alt='before comparison'
        onLoad={handleLoad}
      />
      <img
        className='image-comparison__img'
        ref={rightImgRef}
        style={{ filter: `blur(${blurRightImage}px)` }}
        src={imageRight}
        alt='after comparison'
      />
    </div>
  )
}

export default ImageComparisonSlider
