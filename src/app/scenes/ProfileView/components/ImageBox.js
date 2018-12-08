import React from 'react';
import { Card,Icon,Avatar} from 'antd';

const { Meta } = Card;
    
export const ImageBox = props => (
    <Card
    cover={<img alt="example" src={props.post.Image} style={{height:260}} className="img-responsive"/>}
    style={{flex:1,maxHeight:400,marginBottom:20}}
    hoverable={true}
    // onClick={()=>props.viewPost(props.post,props.index)}
    actions={[
        <a onClick={()=>props.likePost(props.post,props.index)}>
        <Icon type="heart"  style={{color:props.post.liked?"red":""}} theme={props.post.liked?"filled":""}/>
        <span style={{padding:5}}>{props.post.likes}</span>
        </a>
        , <a onClick={()=>props.editPost(props.post,props.index)}>
        <Icon type="edit"  />
        </a>, 
        <a onClick={()=>props.viewPost(props.post,props.index)}>
        <Icon type="eye" />
        </a>]}    
  >
    <Meta
      avatar={<Avatar src="http://fellowapp.co/chatbot/assets/image/user.png" />}
      title="Hk User"
      onClick={()=>props.viewPost(props.post,props.index)}
      description={props.post.description||new Date(props.post.timestamp).toGMTString()}
    />
    <a 
      onClick={()=>props.deletePost(props.post,props.index)}
      style={{position:"absolute",top:10,right:10,padding:10}}
    >
      <Icon type="delete"  
        style={{fontSize:22,color:"White"}}
        theme="filled"
      />
    </a>
  </Card>
);