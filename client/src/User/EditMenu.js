import React, { Component } from "react";

export default class EditMenu extends Component {
  state = {
    menuValue: "",
    bookData: ""
  };

  componentDidMount() {
    const { menuValue, bookData } = this.props;
    this.setState({
      bookData,
      menuValue
    });
  }
  EditMenu = () => {
    const { bookData } = this.state;
    bookData.menu = this.state.menuValue;
    this.setState(
      {
        bookData
      },
      () => {
        this.props.BookContent.handleBookEdit(
          this.props.id,
          {menu:this.state.menuValue}
        );
        this.props.isEditMenu();
      }
    );
  };

  render() {
    return (
      <form autoComplete='off' onSubmit={()=>this.EditMenu()} className="edit-form-box">
        <div className="form-group mb-1 mx-2">
          <input
            onChange={e => {
              this.setState({
                menuValue: e.target.value
              });
            }}
            type="text"
            name="txtEdit"
            value={this.state.menuValue}
          />
          <i
            onClick={e => {
              this.EditMenu();
            }}
            className="fa fa-save border-left"
          />
        </div>
      </form>
    );
  }
}
