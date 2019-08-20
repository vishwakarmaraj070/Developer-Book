import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class UserSidebar extends Component {
    render() {
        return (
            <React.Fragment>

                <div className="sidebar-fixed position-fixed">

                    <Link to="" className="logo-wrapper waves-effect">
                        <img src="https://mdbootstrap.com/img/logo/mdb-email.png" className="img-fluid" alt="image" />
                    </Link>

                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item active waves-effect">
                            <i className="fas fa-chart-pie mr-3"></i>Dashboard</a>
                        <a href="#" className="list-group-item list-group-item-action waves-effect">
                            <i className="fas fa-user mr-3"></i>Profile</a>
                        <a href="#" className="list-group-item list-group-item-action waves-effect">
                            <i className="fas fa-table mr-3"></i>Tables</a>
                        <a href="#" className="list-group-item list-group-item-action waves-effect">
                            <i className="fas fa-map mr-3"></i>Maps</a>
                        <a href="#" className="list-group-item list-group-item-action waves-effect">
                            <i className="fas fa-money-bill-alt mr-3"></i>Orders</a>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
