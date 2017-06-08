let users = [
  {
    login: 'liza@gmail.com',
    password: '1234',
    id: 1,
    name: 'Liza'
  },
  {
    login: 'alex@gmail.com',
    password: '12345',
    id: 2,
    name: 'alex'
  },
  {
    login: 'pasha@gmail.com',
    password: '1234',
    id: 3,
    name: 'pasha'
  }
];

let posts = [
  {
    id: 1,
    userId: 1,
    image: 'https://68.media.tumblr.com/9ad5a95f3348dd7a611f15b4730df0a1/tumblr_oqvy5jN7Jj1tv4hrso1_1280.jpg',
    text: 'Neist Point, Scotland',
    comments: [
      {
        userId: 1,
        id: 1,
        text: 'So beautiful'
      },
      {
        userId: 3,
        id: 2,
        text: 'Amazing!'
      }
    ]
  },
  {
    id: 2,
    userId: 1,
    image: 'https://68.media.tumblr.com/56b88597dd8ea0eceb0be7727c07b468/tumblr_oqvwywlp1c1vqj7a8o1_540.jpg',
    text: 'Night lights',
    comments: [
      {
        userId: 3,
        id: 1,
        text: 'So cute'
      }
    ]
  },
  {
    id: 3,
    userId: 2,
    image: 'https://68.media.tumblr.com/d9cec45ceb3949146559967dead54a30/tumblr_oo3qdqhSI11swv52bo1_1280.jpg',
    text: '09/2017 - Aeroport del Prat, Barcelona',
    comments: [
      {
        userId: 1,
        id: 1,
        text: 'I\'ve never been there'
      },
      {
        userId: 2,
        id: 1,
        text: 'Like this photo'
      }
    ]
  }
];

export const getUsers = () => dispatch => {
  dispatch({type: 'SET_USERS', users});
  return Promise.resolve();
};

export const getPosts = (data) => {
  data && localStorage.setItem('POSTS', JSON.stringify(data));
  let post = JSON.parse(localStorage.getItem('POSTS')) || posts;
  return Promise.resolve(post);
};

export const sendComment = ({userId, postId, comment}) => {

  let post = JSON.parse(localStorage.getItem('POSTS')) || posts;

  post.map((item) => {
    if (item.id === postId) {
      return item.comments = [
        ...item.comments,
        {
        userId,
        id: item.comments.pop().id + 1,
        text: comment
      }];
    }
  });
  return Promise.resolve(post);
};


export const signIn = (login, password) => (dispatch, getState) => {

  let users = getState().users;
  let account = users.find((user) => {
    return user.login === login
  });
  if (account && account.password === password) {
    dispatch(setProfile(account));
    return Promise.resolve();
  }
  return Promise.reject();
};

export const setProfile = (data) => (dispatch) => {
  data && localStorage.setItem('PROFILE', JSON.stringify(data));

  let profile = (localStorage.getItem('PROFILE') && JSON.parse(localStorage.getItem('PROFILE'))) || null;

  dispatch({type: 'SET_PROFILE', profile});
  return Promise.resolve();
};


export const logout = () => (dispatch) => {
  localStorage.setItem('PROFILE', '');
  dispatch({type: 'RESET_PROFILE'});
  return Promise.resolve();
};

