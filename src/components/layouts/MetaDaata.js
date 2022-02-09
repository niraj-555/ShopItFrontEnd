import React from "react";
import { Helmet } from "react-helmet";

const MetaDaata = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - ShopIt`}</title>
    </Helmet>
  );
};

export default MetaDaata;
