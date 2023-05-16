import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // импортируем Routes, Route и Navigate

import Loader from './Loader.js';

import ProtectedRouteElement from '../components/ProtectedRoute.js'; // импортируем HOC
import Register from '../components/Register.js';
import Login from '../components/Login.js';
import PageNotFound from './PageNotFound.js';

import Header from '../components/Header.js';
import Page from '../components/Page.js';

import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup.js';
import InfoTooltip from './InfoTooltip.js';
import ImagePopup from '../components/ImagePopup.js';

import * as auth from '../utils/auth.js';
import api from '../utils/api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);
  const [isDeletePopupLoading, setIsDeletePopupLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    function handleAutoCloseMenu() {
      window.onresize = () => {
        setIsMobileMenuOpen(false);
      };
    }

    if (isMobileMenuOpen) {
      window.addEventListener('resize', handleAutoCloseMenu);
      return () => window.removeEventListener('resize', handleAutoCloseMenu);
    }
  }, [isMobileMenuOpen]);

  const tokenCheck = useCallback(() => {
    // если пользователь авторизован,
    // эта функция проверит, есть ли данные в req.user._id на сервере 
    const authorized = localStorage.getItem('authorized')
    if (authorized) {
      // проверим, есть ли данные в req.user._id
      auth
        .getContent()
        .then((userData) => {
          if (userData.email) {
            // авторизуем пользователя
            setLoggedIn(true);
            setUserEmail(userData.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    }, [navigate]);

  useEffect(() => {
    tokenCheck();
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
  }, [loggedIn, tokenCheck]);

  function handleRegister(values) {
    setIsRegisterLoading(true);
    const { password, email } = values;
    return auth
      .register(password, email)
      .then((res) => {
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsRegisterSuccess(false);
        setErrorText(err);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsRegisterLoading(false);
        }, 1500);
      });
  }

  const handleLogin = (values) => {
    setIsLoginLoading(true);
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.password, values.email)
      .then((data) => {
        if (data.message) {
          setLoggedIn(true);
          setUserEmail(values.email);
          localStorage.setItem('authorized', 'true');
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setErrorText(err);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoginLoading(false);
        }, 1500);
      });
  };

  function handleSignOut() {
    auth
      .signout()
      .then(() => {
        localStorage.removeItem('authorized')
        setLoggedIn(false);
        navigate('sign-in', { replace: true });
        setUserEmail('');
        setErrorText('');
        setIsMobileMenuOpen(false);
  })
     .catch((err) => { 
       console.log(err);
  });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsEditProfilePopupLoading(true);
    api
      .editProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsEditProfilePopupLoading(false);
        }, 1500);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsEditAvatarPopupLoading(true);
    api
      .addNewAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsEditAvatarPopupLoading(false);
        }, 1500);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlacePopupLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsAddPlacePopupLoading(false);
        }, 1500);
      });
  }

  function handleCardDelete(card) {
    setIsDeletePopupLoading(true);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsDeletePopupLoading(false);
        }, 1500);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(true);
  }

  function handleCloseMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {loading ? (
        <Loader />
      ) : (
        <div className='body'>
          <div className='page'>
            <Header
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              userEmail={userEmail}
              isOpen={isMobileMenuOpen}
              onMobileMenu={handleMobileMenuClick}
              onClose={handleCloseMobileMenu}
              isLoading={loading}
            />

            <>
              <Routes>
                <Route
                  path='/sign-up'
                  element={
                    <Register
                      name='register'
                      onRegister={handleRegister}
                      isLoading={isRegisterLoading}
                    />
                  }
                />
                <Route
                  path='/sign-in'
                  element={<Login name='login' onLogin={handleLogin} isLoading={isLoginLoading} />}
                />
                <Route
                  path='/'
                  element={
                    <ProtectedRouteElement
                      element={Page}
                      loggedIn={loggedIn}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteCardClick}
                      cards={cards}
                    />
                  }
                />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isEditProfilePopupLoading}
              name='profile'
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isAddPlacePopupLoading}
              name='card'
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isEditAvatarPopupLoading}
              name='new-avatar'
            />

            <ConfirmDeletePopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              card={cardToDelete}
              onCardDelete={handleCardDelete}
              isLoading={isDeletePopupLoading}
              name='delete-card'
            />

            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              name='register'
              isSuccess={isRegisterSuccess}
              errorText={errorText}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} name='image' />
          </div>
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
