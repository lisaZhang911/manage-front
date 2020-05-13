const _logout = () => {
  const sign_time = localStorage.getItem('sign_time')
  const count = localStorage.getItem('count')
  const score = localStorage.getItem('score')
  const isSign = localStorage.getItem('isSign')

  localStorage.clear()
  localStorage.setItem('sign_time',sign_time)
  localStorage.setItem('count',count)
  localStorage.setItem('score',score)
  localStorage.setItem('isSign',isSign)
}

export {
  _logout
}
