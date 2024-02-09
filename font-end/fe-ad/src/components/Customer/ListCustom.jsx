import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";
import withRouter from "../../helpers/withRouter";
import CustomList from "./CustomList";

export class ListCustom extends Component {
  render() {
    const { navigate } = this.props.router;
    return (
      <>
        <HeaderContent title="List Customers" navigate={navigate} />

        <CustomList></CustomList>
      </>
    );
  }
}

export default withRouter(ListCustom);
