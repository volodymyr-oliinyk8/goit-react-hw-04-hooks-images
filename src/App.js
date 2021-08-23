import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import apiService from './components/api/apiService';
import './App.css';

import Searchbar from './components/Searchbar/Searcbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal/Modal';

function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nothingMessege, setNothingMessege] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setIsLoading(true);
    apiService
      .featchImage(search, currentPage)
      .then(images => {
        if (images.length === 0) {
          setNothingMessege(true);
        }
        setImages(prevImages => [...prevImages, ...images]);
        handleScroll();
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, currentPage]);

  const hamdelSearchSubmit = search => {
    setSearch(search);
    setCurrentPage(1);
    setImages([]);
  };
  const handleMoreImages = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const onClickImage = largeImage => {
    setLargeImage(largeImage);
    setShowModal(true);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Searchbar onSubmit={hamdelSearchSubmit} />
      {nothingMessege && (
        <p>Nothing was found for this query... specify the request, please.</p>
      )}
      {error && <p>Ooops... Something went wrong! Try again.</p>}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onClickImage={onClickImage} />

          <Button onClick={handleMoreImages} />
        </>
      )}
      {isLoading && (
        <Loader
          type="Oval"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
        />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </>
  );
}

export default App;
