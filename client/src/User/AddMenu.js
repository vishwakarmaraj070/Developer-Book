import React, { Component } from "react";

export default class AddMenu extends Component {
  state = {
    menu: "",
    menuItem: "",
    bookData: []
  };
  componentDidMount() {
    this.setState({
      bookData: this.props.bookData
    });
  }

  handleOnSubmit = () => {
    const { menu, menuItem, bookData } = this.state;
    let newBookData = {
      menu: menu,
      menuItem: [
        {
          item: menuItem,
          isEditItem: false,
          itemData: []
        }
      ]
    };

    this.props.BookContent.handleBookAdd(newBookData);
    this.props.toggleAddMenu();
  };
  render() {
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleOnSubmit}
          autoComplete="off"
          className="add-form-box"
        >
          <div className="input-box mx-3">
            <input
              onChange={e => {
                this.setState({
                  menu: e.target.value
                });
              }}
              type="text"
              className="form-control mb-1"
              name="menu"
              placeholder="Enter menu"
              value={this.state.menu}
            />
            <input
              onChange={e => {
                this.setState({
                  menuItem: e.target.value
                });
              }}
              type="text"
              className="form-control"
              name="menuItem"
              placeholder="Enter menu item"
              value={this.state.menuItem}
            />
            <button
              onClick={e => {
                e.preventDefault();
                this.handleOnSubmit();
              }}
              className="btn btn-default btn-sm"
              disabled={this.state.menu === "" ? true : this.state.menuItem === ""? true: false }
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
