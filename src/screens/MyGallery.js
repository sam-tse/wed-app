import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import Measure from 'react-measure'

try {
  var photos = [
    { src: require('../images/my-6.jpg'), width: 4, height: 3 },
    { src: require('../images/my-13.jpg'), width: 4, height: 3 },
    { src: require('../images/my-2.gif'), width: 4, height: 3 },
    { src: require('../images/my-15.jpg'), width: 4, height: 3 },
    { src: require('../images/my-5.jpg'), width: 4, height: 3 },
    { src: require('../images/my-8.jpg'), width: 3, height: 4 },
    { src: require('../images/my-4.jpg'), width: 3, height: 4 },
    { src: require('../images/my-14.jpg'), width: 3, height: 4 },
    { src: require('../images/my-9.jpg'), width: 3, height: 4 },
    { src: require('../images/my-11.jpg'), width: 3, height: 4 },
    { src: require('../images/my-main.jpg'), width: 4, height: 3 },
    { src: require('../images/my-3.jpg'), width: 3, height: 4 },
  ]
} catch (e) {
  photos = [
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
    { src: 'http://via.placeholder.com/350x150', width: 4, height: 3 },
  ]
}

export default class MyGallery extends React.Component {
  constructor() {
    super()
    this.state = { currentImage: 0 }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
      width: -1,
    })
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  render() {
    const width = this.state.width
    return (
      <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
        <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
          {
            ({ measureRef }) => {
              if (width < 1) {
                return <div ref={measureRef}></div>
              }
              let columns = 1
              if (width >= 480) {
                columns = 1
              }
              if (width >= 1024) {
                columns = 2
              }
              return (
                <div ref={measureRef}>
                  <h1 className="uk-heading-line uk-text-center"><span>Gallery</span></h1>
                  <h2 className="uk-text-center">Pre-Wedding Photos are coming in June!</h2>
                  <Gallery photos={photos} onClick={this.openLightbox} columns={columns} />
                  <Lightbox images={photos}
                    width={1600}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                  />
                </div>
              )
            }
          }
        </Measure>
      </div>
    )
  }
}