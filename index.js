import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './src/app/routes';
import {Layout} from 'antd';
import Header from './src/app/components/Header.js';
import Footer from './src/app/components/Footer';
const { Content} = Layout;


function App() {
  return (  
  <Layout>
      <Header />
        <Content style={{minHeight: 280}} className="container">
          <Routes />
        </Content>
      <Footer />  
  </Layout>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));