import React from 'react';
import {Tabs,Icon} from 'antd';
const TabPane = Tabs.TabPane;
export default (props) => (
<div style={{margin:"20px auto 10px"}} className="text-center">
    <Tabs defaultActiveKey="1" onChange={()=>{}} tabBarStyle={{color:"#262626",borderTop:"1px solid #ccc"}}>
        <TabPane tab={<span><Icon type="android" />Posts</span>} key="1" style={{color:"#262626"}}></TabPane>
        <TabPane tab={<span><Icon type="android" />IGTV</span>} key="2" style={{color:"#262626"}}></TabPane>
        <TabPane tab={<span><Icon type="android" />Saved</span>} key="3" style={{color:"#262626"}}></TabPane>
        <TabPane tab={<a onClick={props.addModeOn}><Icon type="plus" />Add</a>} key="4" style={{color:"#262626"}}></TabPane>
  </Tabs>
</div>
);