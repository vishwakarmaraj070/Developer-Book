import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SidebarMenu extends Component {
  state = {
    isAddMenuItem: false,
    newMenuValue: "",
    isEditMenu: false,
    newItemValue: "",
    editMenuValue: ''
  };

  handSideMenuToggle = e => {
    $("#slide-out .collapsible-body").slideUp();
    if (e.target.tagName === "A") {
      $(e.target).toggleClass("active");
      $(".collapsible-header.active")
        .siblings()
        .slideDown();
    }
  };

  addNewMenu = (activeBook, menu, id) => {
    const { newMenuValue } = this.state;
    const newMenu = {
      item: newMenuValue,
      isEditItem: false,
      itemData: []
    };
    if(newMenuValue.length > 0){
    axios
      .put(`/user/book/add/item/${id}`, { activeBook, menu, newMenu })
      .then(res => {
        this.props.userbooks(id);
        this.setState({
          newMenuValue: ''
        })
      })
      .catch(err => {
      });
    }
  };

  setEditItem =(item)=>{
    $(`.editItemForm`).slideUp()
    $(`.editLink`).slideDown()
    const editForm = $(`.editItemForm[data-item="${item}"]`)
    const editLink = $(`.editLink[data-item="${item}"]`)
    $(editLink).slideUp();
    $(editForm).slideDown()
    this.setState({
      newItemValue: item
    })
  }

  updateItem = (activeBook, menu, id, item) => {
    const newItem = this.state.newItemValue;
    $(`.editItemForm`).slideUp()
    $(`.editLink`).slideDown()

    if(newItem.length > 0){
    axios.put(`/user/book/update/menuItem/${id}`,{activeBook, menu, id, item, newItem})
      .then(res => {
        this.props.userbooks(id);
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  updateMenu = (id, menu, activeBook)=>{
    const newMenu = this.state.editMenuValue
    if(newMenu.length > 0){
    axios.put( `/user/book/update/menu/${id}`,{menu, activeBook, newMenu})
      .then(res => {
        this.props.userbooks(id);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    const { menu, user, getActiveBookPageInfo, userbooks } = this.props;
    return (
      <React.Fragment>
        <li>
          {
            !this.state.isEditMenu ? (
          <a
            onClick={e => {
              e.preventDefault();
              this.handSideMenuToggle(e);
            }}
            className="collapsible-header waves-effect arrow-r text-uppercase"
          >
            {menu.menu}
            <span className="absolute-top-center sidebar-icon-right">
              <i onClick={(e)=>{
                e.preventDefault();
                this.setState({
                  isEditMenu: true,
                  editMenuValue: menu.menu
                })
              }} className="fas fa-pencil-alt hoverEdit mx-1 px-1" />
              <i className="fa fa-angle-down px-1 mx-1" />
            </span>
          </a>
          ): (
            <div className="input-group d-flex m-0 md-form px-3">
            <input
              onChange={e => {
                this.setState({
                  editMenuValue: e.target.value
                });
              }}
              type="text"
              value={this.state.editMenuValue}
              className="form-control white-text"
              placeholder="item here"
              aria-label="Recipient's username"
              aria-describedby="MaterialButton-addon2"
            />
            <div className="input-group-append">
              <button
                onClick={(e)=>{
                  e.preventDefault();
                  this.updateMenu(user._id, menu.menu,user.activeBook )
                  this.setState({
                    isEditMenu: false
                  })
                }} 
                className="btn btn-sm btn-secondary m-0 px-3"
                type="button"
                id="MaterialButton-addon2"
              >
                <i className="fa fa-save" />
              </button>
            </div>
          </div>
          )
        }
          <div className="collapsible-body">
            <ul>
              {menu.menuItem.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={e => {
                      e.preventDefault();
                      getActiveBookPageInfo(user._id, menu.menu, item.item);
                      userbooks(user._id);
                    }}
                  >
                    <Link
                    data-item={item.item}
                      to={`/${user.firstName}-book/${user.activeBook}/${
                        menu.menu
                      }-${item.item}`}
                      className="waves-effect editLink position-realtive text-capitalize"
                    >
                      {item.item}
                      <span className="absolute-top-center sidebar-icon-right">
                        <i
                          onClick={e => {
                            e.preventDefault();
                            this.setEditItem(item.item)
                          }}
                          className="fas fa-pencil-alt hoverEdit mx-1 px-1"
                        />
                      </span>
                    </Link>
                        <div data-item={item.item} className="editItemForm">
                    <div  className="input-group d-flex  m-0 md-form px-3">
                      <input
                        onChange={e => {
                          this.setState({
                            newItemValue: e.target.value
                          });
                        }}
                        type="text"
                        value={this.state.newItemValue}
                        className="form-control white-text"
                        placeholder="item here"
                        aria-label="Recipient's username"
                        aria-describedby="MaterialButton-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          onClick={e => {
                            e.preventDefault();
                            this.updateItem(
                              user.activeBook,
                              menu.menu,
                              user._id,
                              item.item
                            );
                          }}
                          className="btn btn-sm btn-secondary m-0 px-3"
                          type="button"
                          id="MaterialButton-addon2"
                        >
                          <i className="fa fa-save" />
                        </button>
                      </div>
                    </div>
                    </div>
                  </li>
                );
              })}

              {/* add menu item here */}
              <li>
                {this.state.isAddMenuItem ? (
                  <div className="input-group m-0 md-form px-3">
                    <input
                      onChange={e => {
                        this.setState({
                          newMenuValue: e.target.value
                        });
                      }}
                      type="text"
                      value={this.state.newMenuValue}
                      className="form-control white-text"
                      placeholder="menu here"
                      aria-label="Recipient's username"
                      aria-describedby="MaterialButton-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        onClick={e => {
                          e.preventDefault();
                          this.addNewMenu(user.activeBook, menu.menu, user._id);
                          this.setState({
                            isAddMenuItem: false
                          });
                        }}
                        className="btn btn-sm btn-secondary m-0 px-3"
                        type="button"
                        id="MaterialButton-addon2"
                      >
                        <i className="fa fa-save" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <a
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        isAddMenuItem: true
                      });
                    }}
                    className="waves-effect position-realtive text-capitalize"
                  >
                    Add Menu
                    <span className="absolute-top-center sidebar-icon-right">
                      <i className="fa fa-plus hoverPlus px-1 mx-1" />
                    </span>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </li>
      </React.Fragment>
    );
  }
}
