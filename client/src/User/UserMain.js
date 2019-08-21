import React, { Component } from "react";
import axios from "axios";
import { UserContextConsumer } from "./User.contenxt";
import ReactHtmlParser from "react-html-parser";
import $ from "jquery";

export default class UserMain extends Component {
  state = {
    isAddContent: false,
    header: "",
    content: "",
    menu: "",
    item: "",
    editContent: "",
    isTrue: true
  };

  toggleEdit = editFrom => {
    $(".editcontent-box.active").removeClass("active");
    const editContent = $(`.editcontent-box[data-edit="${editFrom}"]`).attr(
      "data-value"
    );
    this.setState({
      editContent
    });
    $(`.editcontent-box[data-edit="${editFrom}"]`).addClass("active");
    $(".editcontent-box.active").slideToggle();
  };

  handleAddContent = (activeBook, activePageInfo) => {
    const { header, content } = this.state;
    const { id, menu, menuItem } = activePageInfo;
    const newItemData = {
      contentId: Math.random(),
      content: `<div class="book-content mb-4">
            <div class="border-bottom border-info d-flex justify-content-between mb-2 pb-1">
                <span class="text-capitalize">${header}</span>
            </div>
            <div class="card-body py-0">
                <p class="card-text">
                    ${content}
                </p>
            </div>
            </div>`
    };

    axios
      .put(`/user/book/itemData/${id}`, {
        activeBook,
        menu,
        menuItem,
        newItemData
      })
      .then(res => {
        this.setState({
          isAddContent: false,
          content:'',
          header: ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  editContentSave = (activeBook, activePageInfo, contentId) => {
    const content = this.state.editContent;
    const { id, menu, menuItem } = activePageInfo;
    axios
      .put(`/user/book/update/itemdata/${id}`, {
        activeBook,
        menu,
        menuItem,
        contentId,
        content
      })
      .then(res => {
        this.setState({
          isAddContent: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { userBook } = this.props.match.params;
    const menu = userBook.slice(0, userBook.indexOf("-"));
    const item = userBook.slice(userBook.indexOf("-") + 1);

    return (
      <React.Fragment>
        <UserContextConsumer>
          {UserContext => {
            return (
              <React.Fragment>
                <div className="card border-success">
                  <div className="black border-success card-header white-text">
                    <h3 className="font-weight-normal h3-responsive mb-0 text-uppercase">
                      {menu}
                    </h3>
                  </div>
                  <div className="card-body text-success">
                    {/* main content here */}
                    <h4 className="card-title mb-0 text-capitalize">{item}</h4>
                    <div className="border border-success card-body pt-3">
                      {UserContext.user.books.map((books, index) => {
                        return books.bookOf === UserContext.user.activeBook
                          ? books.book.map((book, index) => {
                              return book.menu ==
                                UserContext.activePageInfo.menu
                                ? book.menuItem.map((item, index) => {
                                    return item.item ==
                                      UserContext.activePageInfo.menuItem
                                      ? item.itemData.map((itemData, index) => {
                                          return (
                                            <React.Fragment>
                                              <div key={index} className="content-box position-relative">
                                                <span
                                                  onClick={e => {
                                                    e.preventDefault();
                                                    this.toggleEdit(
                                                      itemData.contentId
                                                    );
                                                  }}
                                                  className="edit-pen"
                                                >
                                                  <i className="fa fa-pencil hoverEdit" />
                                                </span>
                                                {ReactHtmlParser(
                                                  itemData.content
                                                )}
                                                <div
                                                  data-edit={itemData.contentId}
                                                  data-value={itemData.content}
                                                  className="form-group editcontent-box shadow-textarea mt-4"
                                                >
                                                  <textarea
                                                    onChange={e => {
                                                      this.setState({
                                                        editContent:
                                                          e.target.value
                                                      });
                                                    }}
                                                    rows="20"
                                                    value={
                                                      this.state.editContent
                                                    }
                                                    className="form-control"
                                                    placeholder="Write something here..."
                                                  />
                                                  <div className="d-flex">
                                                    <button
                                                      onClick={e => {
                                                        e.preventDefault();
                                                        this.editContentSave(
                                                          UserContext.user
                                                            .activeBook,
                                                          UserContext.activePageInfo,
                                                          itemData.contentId
                                                        )
                                                        setTimeout(() => {
                                                          UserContext.userbooks(UserContext.user._id);
                                                        }, 1000)
                                                      }}
                                                      className="btn btn-default"
                                                    >
                                                      Save
                                                    </button>
                                                    <button
                                                      onClick={e => {
                                                        e.preventDefault();
                                                        this.toggleEdit(
                                                          itemData.contentId
                                                        );
                                                      }}
                                                      className="btn btn-amber"
                                                    >
                                                      Close
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          );
                                        })
                                      : "";
                                  })
                                : "";
                            })
                          : "";
                      })}
                    </div>
                  </div>
                  <div className="card-footer ">
                    {/* add content form */}
                    {this.state.isAddContent ? (
                      <form
                        autoComplete="off"
                        onSubmit={e => {
                          e.preventDefault();
                          this.handleAddContent(
                            UserContext.user.activeBook,
                            UserContext.activePageInfo
                          );
                          setTimeout(() => {
                            UserContext.userbooks(UserContext.user._id);
                          }, 2000);
                        }}
                      >
                        <div className="card border-success">
                          <div className="card-body text-success">
                            <div className="md-form">
                              <input
                                type="text"
                                id="txtHeader"
                                className="form-control"
                                value={this.state.header}
                                onChange={e => {
                                  this.setState({
                                    header: e.target.value
                                  });
                                }}
                              />
                              <label htmlFor="txtHeader">Header</label>
                            </div>
                            <div className="form-group shadow-textarea">
                              <label htmlFor="txtContent">Content here</label>
                              <textarea
                                rows="5"
                                value={this.state.content}
                                id="txtContent"
                                className="form-control"
                                placeholder="Write something here..."
                                onChange={e => {
                                  this.setState({
                                    content: e.target.value
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="card-footer bg-transparent border-success">
                            <button
                            type='submit'
                              onClick={e => {
                                e.preventDefault();
                                this.handleAddContent(
                                  UserContext.user.activeBook,
                                  UserContext.activePageInfo
                                );
                                setTimeout(() => {
                                  UserContext.userbooks(UserContext.user._id);
                                }, 2000)
                              }}
                              className="btn btn-default waves-effect waves-light"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-transparent border-success text-center">
                        <button
                          onClick={e => {
                            e.preventDefault();
                            this.setState({
                              isAddContent: true
                            });
                          }}
                          className="btn btn-default waves-effect waves-light"
                        >
                          Add Content
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          }}
        </UserContextConsumer>
      </React.Fragment>
    );
  }
}
