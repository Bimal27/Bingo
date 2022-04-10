import React from 'react'

const User = ({history,user,setUser}) => {

    const submitForm = () => {
        if (user) {
          history.push('/home')
        }
  };

  return (
    <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>User</h3>
              <div className="form-group">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Please enter your name..."
                  value={user}
                  onChange={(e) =>setUser(e.target.value)}
                  onKeyDown={e => {
                     if(e.key === 'Enter'){
                    submitForm()
                   }
                 }}
                />
              </div>
                <button type="submit" onClick={submitForm} className="btn btn-primary btn-block mt-3">
                    Submit
                </button>
            </form>
          </div>
        </div>
  )
}

export default User