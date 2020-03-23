import React, { Component } from "react";
import { connect } from "react-redux";
import { postBook, resetErrors } from "./redux/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: "red",
    authors: [this.props.author.id]
  };
  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
    console.log(this.state.authors);
  };

  render() {
    const { errors } = this.props;
    const colors = [
      "red",
      "green",
      "yellow",
      "black",
      "white",
      "purple",
      "blue",
      "gray"
    ];
    const colorSelection = colors.map(color => (
      <option value={color}>{color}</option>
    ));
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              className="custom-select"
              name="color"
              onChange={this.textChangeHandler}
            >
              {colorSelection}
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postBook: (book, closeModal) => dispatch(postBook(book, closeModal)),
    resetErrors: () => dispatch(resetErrors())
  };
};
const mapStateToProps = state => {
  return {
    errors: state.errorsState.errors
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
