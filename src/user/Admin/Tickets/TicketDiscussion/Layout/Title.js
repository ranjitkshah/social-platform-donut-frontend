import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import EditButton from "@material-ui/icons/EditOutlined";
import SaveButton from "@material-ui/icons/SaveOutlined";
import BadgeElement from "../../TicketContent/BadgeElement";
import CancelButton from "@material-ui/icons/ClearOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: false,
      title: this.props.ticket.title,
    };
  }

  toggleEditor = () => {
    this.setState({
      editor: !this.state.editor,
    });
  };

  setTitle = (evt) => {
    this.setState({
      title: evt.target.value,
    });
  };

  handleSave = () => {
    this.setState({ editor: false }, async () => {
      await this.props.updateTicket({
        type: "title",
        title: this.state.title,
      });
      this.props.singleUpdate(this.props.ticket._id, {
        title: this.state.title,
      });
    });
  };

  render() {
    return (
      <div className="discussion-title">
        <div className="back-icon" onClick={this.props.handleBack}>
          <FaArrowLeft className="fa-icon" />
        </div>
        <div className="ticket-title">
          {!this.state.editor && (
            <React.Fragment>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BadgeElement ticketState={this.props.ticket.status} />
                <span style={{ marginLeft: "16px" }} className="title-text">
                  {this.props.ticket.title}
                </span>
              </div>
              <div>
                {this.props.editsAllowed && (
                  <EditButton onClick={this.toggleEditor} />
                )}
                {this.props.deleteAllowed && (
                  <DeleteOutlineOutlinedIcon
                    onClick={() =>
                      this.props.deleteTicket(this.props.ticket._id)
                    }
                  />
                )}
              </div>
            </React.Fragment>
          )}
          {this.state.editor && (
            <Form style={{ display: "flex", width: "100%" }}>
              <Form.Control
                type="text"
                onChange={this.setTitle}
                value={this.state.title}
              />
              <Button
                variant="light"
                onClick={this.toggleEditor}
                style={{ display: "flex", margin: "0px 16px" }}
              >
                <CancelButton />
                Cancel
              </Button>
              <Button
                disabled={this.props.ticket.title === this.state.title}
                style={{ display: "flex" }}
              >
                <SaveButton onClick={this.handleSave} />
                Save
              </Button>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

export default Title;
