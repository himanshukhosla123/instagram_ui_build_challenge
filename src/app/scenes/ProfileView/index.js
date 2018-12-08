import React,{ Component } from "react";
import {ImageBox} from './components/ImageBox';
import AddPost from './components/AddPost';
import EditOrViewPost from './components/EditOrViewPost';
import ProfileHeader from './components/ProfileHeader';
import TabsPane from './components/TabsPane';
import {StrToJSON,objCopy} from './../../../utils/parseUtils';
import postsDump from './postsDump';
import {notification} from 'antd'; 
class ProfileView extends Component{

    constructor(props){
        super(props);
        this.state={
            loading:true,
            posts:[],
            editMode:false,
            currentPost:null,
            addModeOn:false,
            showEditOrViewModal:false
        };
    }

    render(){
        return (
            <div>
                <ProfileHeader/>
                <TabsPane
                    addModeOn={()=>this.setState({addModeOn:true})}
                />
                <div className="row">
                {this.groupIntoThree(this.state.posts).map((obj,idx)=>{
                    return (
                    <div className="row" style={{marginBottom:0}} key={idx}>
                      {obj.map((object,index)=>(<div className="col-xs-12 col-sm-4"  key={index}>
                          <ImageBox 
                            post={object}
                            index={index}
                            likePost={(obj,index)=>this.likePost(obj,index)}
                            editPost={(obj,index)=>this.editPost(obj,index)}
                            viewPost={(obj,index)=>this.viewPost(obj,index)}
                            deletePost={(obj,index)=>this.deletePost(obj,index)}
                          />
                      </div>))}
                    </div>
                    );
                    
                })}
                </div>
                <AddPost 
                    addModeOn={this.state.addModeOn}
                    addPost={this.addPost}
                    disableAddMode={()=>this.setState({addModeOn:false})}
                />
                <EditOrViewPost
                    editMode={this.state.editMode}
                    setEditMode={()=>this.setState({editMode:true})}
                    disableEditMode={()=>this.setState({editMode:false})}
                    disableEditOrViewMode={()=>this.setState({editMode:false,showEditOrViewModal:false,currentPost:null})}
                    currentPost={this.state.currentPost}
                    showEditOrViewModal={this.state.showEditOrViewModal}
                    updatePost={this.updatePost}
                    likePost={this.likePost}
                    addComment={(obj)=>this.addComment(obj)}
                />
            </div>
        )
    }

    groupIntoThree(data){
        let arr=[];
        data=JSON.parse(JSON.stringify(data));
        while(Array.isArray(data) && data.length>0){
          arr.push(data.splice(0,3));
        }
        return arr;
    }

    likePost=(obj,index=this.index)=>{
        let posts=objCopy(this.state.posts);
        if(posts && posts[index]){
            if(posts[index].liked)
            {
                posts[index].liked=false;
                posts[index].likes=posts[index].likes!=undefined?posts[index].likes-1:0;                
            }
            else {
                posts[index].liked=true;
                posts[index].likes=posts[index].likes!=undefined?posts[index].likes+1:1;                
                
            }
            this.setState({posts:posts,currentPost:posts[index]});
        }
    }

    editPost=(obj,index)=>{
        let posts=objCopy(this.state.posts);
        this.index=index;
        if(posts && posts[index]){
            this.setState({
                editMode:true,
                currentPost:obj,
                showEditOrViewModal:true
            });
        }
    }

    viewPost=(obj,index)=>{
        let posts=objCopy(this.state.posts);
        this.index=index;
        if(posts && posts[index]){
            this.setState({
                editMode:false,
                currentPost:obj,
                showEditOrViewModal:true
            });
        }
    
    }

    updatePost=(obj,index=this.index)=>{
        let posts=objCopy(this.state.posts);
        if(posts && posts[index]){
            posts[index]=obj;
            this.setState({posts:posts});
        }
    }

    addPost=(obj)=>{
        let posts=objCopy(this.state.posts);
        if(obj){
            posts.unshift(obj);
            this.setState({
                posts
            });
        }
    }

    deletePost=(obj,index)=>{
        let posts=objCopy(this.state.posts);
        if(obj && posts[index]){
            posts.splice(index,1);
            this.setState({
                posts
            });
        }
    }

    addComment(obj,index=this.index){
        let posts=objCopy(this.state.posts);
        if(posts && posts[index]){
            if(posts[index].comments &&  Array.isArray(posts[index].comments))
            {   
                posts[index].comments.push(obj);
            }
            else 
            posts[index].comments=[obj];
            this.setState({posts:posts,currentPost:posts[index]});
        }
    }

    componentWillMount(){
      let posts=window.localStorage.getItem("posts");

        fetch("http://starlord.hackerearth.com/insta")
        .then(response=>response.json())
        .then(response=>{
            console.log(response);
            // alert("done");
            if(response && Array.isArray(response)){
              if(StrToJSON(posts) && Array.isArray(StrToJSON(posts)) && StrToJSON(posts).length>0)
              response=StrToJSON(posts);
              // debugger;
              this.setState({posts:response,loading:false});
            }
            notification["success"]({
                message: 'Successfully Loaded Posts!',
            });
        })
        .catch(err=>{
            console.log(err);
            if(StrToJSON(posts) && Array.isArray(StrToJSON(posts)) && StrToJSON(posts).length>0)
              posts=StrToJSON(posts);
            // PS:- posts dump as got CORS error while calling api 
            // debugger;
            this.setState({loading:false,
            posts:posts||postsDump
            });
            notification["error"]({
                message: 'Error loading your Posts!',
                description: 'Showing stored images! Please try again after some time.',
              });
        })
    }

    componentDidUpdate(){
      console.log(this.state)
      localStorage.setItem("posts",JSON.stringify(this.state.posts));
    }

}

export default ProfileView;