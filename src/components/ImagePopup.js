function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_type_image`  + (card !== null && ' popup_opened')}>
    <figure className="popup__image-container">
      <img
        src={card !== null ? card.link : '#'}
        alt={card !== null ? card.name : '#'}
        className="popup__image" />
      <figcaption className="popup__image-caption">{card !== null ? card.name : '#'}</figcaption>
      <button
        className="popup__cancel-button"
        type="button"
        aria-label="Закрыть окно"
        onClick={onClose}></button>
    </figure>
  </div>
  );
}

export default ImagePopup;
