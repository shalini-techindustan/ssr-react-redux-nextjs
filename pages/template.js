import React, { Component } from 'react';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import initStore from 'root/store';
import Layout from 'components/Layout';


class NEWPAGE extends Component {
  static async getInitialProps() {
  }
  componentWillMount() {

  }
  componentDidMount() {

  }


  render() {
    return (
      <Layout>
        <Head title="NEWPAGE" />
        <Nav />
        <div style={{width:'50%'}}>
          Use this as a template to add new pages.
       <p>Change "template" name with your file name, same do in routes, replace '/template' with your your route. </p>
          <p>Note: The name of the Route and name of the Component File should be the same. Otherwise component will not be rendered, As in ssr file name act as a route.</p>

        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default withRedux(initStore, mapStateToProps = null, mapDispatchToProps = null)(withMui(NEWPAGE));
