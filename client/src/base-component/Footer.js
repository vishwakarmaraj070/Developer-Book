import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
           <React.Fragment>
<section className="section-cta py-5 theme-bg-primary text-white">
		<div className="container">
			<div className="text-center">
				<img className="profile-small d-inline-block mx-auto rounded-circle mb-2"
					src={require(`../profile.jpg`)} alt="profile" />
			</div>
			<h3 className="section-title font-weight-bold text-center mb-2">
				Interested in hiring me for your project?
			</h3>
			<div className="section-intro mx-auto text-center mb-3">
				Looking for an experienced full-stack developer to build your web app
				or ship your software product? To start an initial chat, just drop me
				an email at
				<a className="link-on-bg mx-2" href="mailto:vishwakarmaraj070@gmail.com">vishwakarmaraj070@gmail.com</a>
				or use the
				<a className="link-on-bg mx-2" href="http://rajv-portfolio.herokuapp.com/contact">form on the
					contact page</a>.
			</div>
			<div className="text-center">
				<a className="theme-btn-on-bg btn" href="http://rajv-portfolio.herokuapp.com/talk">Let's
					Talk</a>
			</div>
		</div>
	</section>

	<footer className="footer text-light text-center py-2 theme-bg-primary-darken">
		<small className="copyright">All right reserved to ©
			<a className="text-light" href="http://rajv-portfolio.herokuapp.com/">Raj vishwakarma</a></small>
	</footer>
           </React.Fragment>
        )
    }
}
