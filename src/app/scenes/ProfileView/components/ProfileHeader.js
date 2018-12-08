import React from 'react';
import {Icon} from 'antd';
export default (props) => (
<header className="info row" style={{marginBottom:34,marginTop:44}}>
    <div className="col-xs-12 col-sm-4 text-center">
        <div className="" style={{margin:"auto"}}>
            <div className="">
                <a className=" " title="Change Profile Photo">
<img alt="Change Profile Photo" className="img-responsive img-circle" 
    style={{display:"inline-block"}}
    src="https://instagram.fdel1-1.fna.fbcdn.net/vp/f9eab5bd750846c168b0d9e8dee48d9b/5CAB5A20/t51.2885-19/s150x150/15251665_1041259355985058_1534896280797446144_a.jpg"/>
                </a>
                <div className="text-center">
{/* <form encType="multipart/form-data">
    <input accept="image/jpeg,image/png" className="tb_sK" type="file"/>
</form> */}
                </div>
            </div>
        </div>
    </div>
    
<section className="profile-info col-xs-12 col-sm-8 text-left">
    <div className="">
        <h1 className="" 
            style={{
                display: "inline-block",overflow: "hidden",textOverflow:"ellipsis",                  
                whiteSpace: "nowrap",color: "#262626",fontWeight: 300,fontSize:24,margin:5}}>
                himanshu_khosla123</h1>
        <button className="btn btn-default" type="button" style={{margin:5,marginTop:-10,padding:6}}>Edit Profile</button>
        <button className="btn"  style={{border:"none",outline:"none",background:"transparent",margin:5,marginTop:-10}}>
            <Icon type="edit" />
        </button>
    </div>
    
    <ul className="nav navbar-nav">
        <li className="">
            <a className="black">
            <span className="g47SY ">5</span> posts</a>
        </li>
        <li className="">
        <a className="black">
            <span className="g47SY " title="130">130</span> 
            followers
        </a>
        </li>
        <li className="">
            <a className="black">
            <span className="g47SY ">208</span> 
            following</a>
        </li>
    </ul>
    <div className="name">
    <h1 className="col-xs-12"
        style={{margin:5,fontWeight:"bold",fontSize:16}}
    >Himanshu Khosla</h1>
    <br/> 
    </div>
    </section>
</header>
);