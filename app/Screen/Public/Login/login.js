import React from 'react'

import Login from '../Component/Login'

class PublicLogin extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Login firstLogin={true} />
  }
}

export default (PublicLogin);
