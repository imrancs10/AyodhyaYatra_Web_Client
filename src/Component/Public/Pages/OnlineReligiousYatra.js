import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function OnlineReligiousYatra() {
  return (
    <>
      <div className="wrapper banner-wrapper innerBanner">
        <LazyLoadImage effect='blur' src="content/themes/district-theme/images/innerBanner.jpg" alt="" />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {/* <!--<h1>Login or signup Here</h1>
      <p>Login</p>-->   */}
            <div style={{ marginBottom: '2%', marginTop: '2%', width: '100%', display: 'flex', placeContent: 'center' }}>
              <div className="container1">
                <input type="checkbox" id="flip" />
                <div className="cover1">
                  <div className="front">
                    <LazyLoadImage effect='blur' src="uploads/02.jpg" alt="" />
                    {/* <!--  <div className="text">
          <span className="text-1">Every new friend is a <br> new adventure</span>
          <span className="text-2">Let's get connected</span>
        </div>--> */}
                  </div>
                  <div className="back">
                    {/* <!--<LazyLoadImage effect='blur' className="backImg" src="images/backImg.jpg" alt="">--> */}
                  </div>
                </div>
                <div className="forms">
                  <div className="form-content">
                    <div className="login-form">
                      <div className="title">Login</div>
                      <form action="#">
                        <div className="input-boxes">
                          <div className="input-box">

                            <input type="text" placeholder="Enter your email" required />
                          </div>
                          <div className="input-box">

                            <input type="password" placeholder="Enter your password" required />
                          </div>
                          <div className="text"><a href="#">Forgot password?</a></div>
                          <div className="button input-box">
                            <input type="submit" value="Sumbit" />
                          </div>
                          <div className="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
                        </div>
                      </form>
                    </div>
                    <div className="signup-form">
                      <div className="title">Signup</div>
                      <form action="#">
                        <div className="input-boxes">
                          <div className="input-box">
                            {/* <!--<i className="fas fa-user"></i>--> */}
                            <input type="text" placeholder="Enter your name" required />
                          </div>
                          <div className="input-box">

                            <input type="text" placeholder="Enter your email" required />
                          </div>
                          <div className="input-box">

                            <input type="text" placeholder="Enter your mobile number" required />
                          </div>

                          <div className="input-box">

                            <input type="text" placeholder="Enter your address" required />
                          </div>

                          <div className="input-box">

                            <input type="text" placeholder="Enter your purpose" required />
                          </div>

                          <div className="button input-box">
                            <input type="submit" value="Sumbit" />
                          </div>
                          <div className="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
