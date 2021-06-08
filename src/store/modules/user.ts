const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userName: '',
  roles: [],
  introduce: ''
}

export default {
  state
}
