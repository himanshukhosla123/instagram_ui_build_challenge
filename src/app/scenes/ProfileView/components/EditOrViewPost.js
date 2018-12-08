import React from 'react';
import { Upload, Icon, Modal,Button,Input,notification,Card,Avatar,Comment,Form,  } from 'antd';

const {Meta}=Card;
const TextArea = Input.TextArea;

export default class EditOrViewPost extends React.Component {

 state={
    description:"",
    Image:"",
    currentComment:""
 }

 componentWillReceiveProps(nextProps){
     let {currentPost}=nextProps;
     if(currentPost && ((currentPost.description 
        && currentPost.description!=this.state.description) 
        ||(currentPost.Image 
            && currentPost.Image!=this.state.Image 
        ) 
        )
     ){
         this.setState({
             description:currentPost.description,
             Image:currentPost.Image,
             currentComment:""
         })
     }
 }

  handleChange = ({ fileList }) => this.setState({ fileList })


  render() {
    let {editMode,currentPost} =this.props;
    if(!currentPost)
    return null ;

    return (
      <div>
        <Modal
          title={editMode?"Edit Post":"View Post"}
          centered
          width={window.innerWidth<768?window.innerWidth:850}
          okText={editMode?"Update Post":"Edit"}
          visible={this.props.showEditOrViewModal}
          onOk={() => {
            if(!editMode)
            this.props.setEditMode();
            else  
            this.editOrView()
        }}
          onCancel={() => this.props.disableEditOrViewMode(false)}
        >
            <div className="row">
                <div className="col-xs-12 col-sm-6" style={{padding:0,margin:"auto"}}>
                    <img src={currentPost.Image} alt="User"
                        className="img-responsive"
                        style={{width:"100%",height:"100%",minHeight:300,margin:"auto",verticalAlign:"center",display:"inline-block"}}
                    />
                </div> 
                <div className="col-sm-6 col-xs-12" style={{paddingTop:15}}>
                    <Meta
                    avatar={<Avatar src="http://fellowapp.co/chatbot/assets/image/user.png" />}
                    title="Hk User"
                    description={new Date(currentPost.timestamp).toGMTString()}
                    />   
                    <div className="nav navbar-nav col-xs-12 row" style={{margin:10,marginTop:30}}>
                        <a style={{display:"block"}} className="col-xs-4 text-center black"
                            onClick={()=>this.props.likePost(currentPost)}>
                            <Icon type="heart"  style={{color:currentPost.liked?"red":""}} theme={currentPost.liked?"filled":""}/>
                            <span style={{padding:5}}>{currentPost.likes}</span>
                        </a>
                        <a style={{display:"block"}} className="col-xs-4 text-center black"
                            >
                            <Icon type="wechat" />
                            {/* <span style={{padding:5}}>{currentPost.likes}</span> */}
                        </a>
                        <a style={{display:"block"}} className="col-xs-4 text-center black">
                            <Icon type="book" />
                            {/* <span style={{padding:5}}>{currentPost.likes}</span> */}
                        </a>             
                    </div>

                    <hr/>
                    <Input 
                        placeholder="Enter Description" 
                        disabled={!editMode}
                        value={this.state.description}
                        onChange={(e)=>{
                            this.setState({description:e.target.value});
                        }}
                    />
                    <hr/>
                    <div style={{maxHeight:400,overflowY:"auto"}}>
                    {currentPost.comments && Array.isArray(currentPost.comments)?(
                        currentPost.comments.map((obj,index)=>(
                           <ExampleComment
                           key={index}
                           comment={obj}
                           />     
                        ))
                    ):null}
                            
                    </div>

                     <div>

                            <Comment
                            author="Hk User"
                            avatar={(
                                <Avatar
                                src="http://fellowapp.co/chatbot/assets/image/user.png"
                                alt="Han Solo"
                                />
                            )}
                            >
                           <Form.Item>
                                <TextArea rows={2} 
                                onChange={(e)=>{this.setState({currentComment:e.target.value})}} 
                                value={this.state.currentComment}/>
                            </Form.Item>
                            <Form.Item>
                            <Button
                                htmlType="submit"
                                onClick={()=>this.addComment()}
                                type="primary"
                            >
                                Add Comment
                            </Button>
                            </Form.Item>
                            </Comment>
     
                    </div>

                </div>
            
            </div>
        </Modal>
      </div>
    );
  }

  editOrView(){
    let {Image,description}=this.state;
    let {currentPost}=this.props
    if(!currentPost)
    {this.props.setEditMode();
        return ;
    }
    else {

    if(!Image){
        notification.error({message:"Please select an image to upalod!"})
    }
    else if(description.trim().length==0){
        notification.error({message:"Please input description of the image!"})
    }
    else {
        currentPost.description=description;
        // TODO
        currentPost.Image=Image;
        console.log("updating post",currentPost);
        this.props.updatePost(currentPost);
        notification["success"]({
            message: 'Successfully Updated Post!',
        });
        this.props.disableEditMode();
    }

    }
    
  }

  addComment(){
    let {currentComment}=this.state;
    if(currentComment.trim().length==0){
        notification.error({message:"Please input comment to post!"})
    }
    else {
        let comment={
            author:"Hk User",
            message:currentComment,
            timestamp:Date.now()
        }
        console.log("adding comment",comment);
        this.props.addComment(comment);
        this.setState({currentComment:""});
    }
    }
}


const ExampleComment = ({ children,comment }) => (
    <Comment
      author={<a>Hk User</a>}
      avatar={(
        <Avatar
          src="http://fellowapp.co/chatbot/assets/image/user.png"
          alt="Han Solo"
        />
      )}
      content={<p>{comment.message}</p>}
    >
      {/* <p>{new Date(comment.timestamp).toGMTString()}</p>  */}
    </Comment>
  );