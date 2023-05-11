import Main from "../components/Main.js";
import Footer from "../components/Footer.js";

function Page({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  return (
    <>
      <Main
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        cards={cards}
      />
      <Footer />
    </>
  );
}

export default Page;
