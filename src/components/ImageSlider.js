import { arrayOf, string } from 'prop-types';
import React, { Component } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

class ImageSlider extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
  }

  goToPrev = () => {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    const isFirstSlide = currentIndex === 0;
    if (isFirstSlide) {
      this.setState({
        currentIndex: slides.length - 1,
      });
    } else {
      this.setState({
        currentIndex: currentIndex - 1,
      });
    }
    // console.log(slides[currentIndex]);
  };

  goToNext = () => {
    const { currentIndex } = this.state;
    const { slides } = this.props;
    const isLastSlide = currentIndex === slides.length - 1;
    if (isLastSlide) {
      this.setState({
        currentIndex: 0,
      });
    } else {
      this.setState({
        currentIndex: currentIndex + 1,
      });
    }
    // console.log(currentIndex);
  };

  render() {
    const { currentIndex } = this.state;
    const { slides, alternativeText } = this.props;
    return (
      <div id="apart" data-testid="product-detail-image">
        <button onClick={ this.goToPrev } type="button">
          {' '}
          <BsArrowLeftShort />
          {' '}
        </button>
        <img src={ slides[currentIndex] } alt={ alternativeText } />
        <button onClick={ this.goToNext } type="button">
          {' '}
          <BsArrowRightShort />
        </button>
      </div>
    );
  }
}

ImageSlider.propTypes = {
  slides: arrayOf(string).isRequired,
  alternativeText: string.isRequired,
};

export default ImageSlider;
