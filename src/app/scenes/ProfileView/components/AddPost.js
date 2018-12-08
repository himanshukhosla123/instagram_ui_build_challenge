import React from 'react';
import { Upload, Icon, Modal,Button,Input,notification  } from 'antd';

export default class AddPost extends React.Component {

 state={
    description:"",
    previewVisible:false,
    previewImage: '',
    fileList:[]
 }

 handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Modal
          title="Add Post"
          centered
          okText="Add Post"
          visible={this.props.addModeOn}
          onOk={() => this.addPost()}
          onCancel={() => this.props.disableAddMode(false)}
        >
            <div className="clearfix">
                <Upload
                    // action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                {fileList.length >=1  ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            <Input 
                placeholder="Enter Description" 
                value={this.state.description}
                onChange={(e)=>{
                    console.log(e)
                    this.setState({description:e.target.value});
                }}
            />
        </Modal>
      </div>
    );
  }

  addPost(){
    let {fileList,description}=this.state;
    if(fileList.length==0){
        notification.error({message:"Please select an image to upalod!"})
    }
    else if(description.trim().length==0){
        notification.error({message:"Please input description of the image!"})
    }
    else {
        let post={
            description,
            Image:fileList[0].url||fileList[0].thumbUrl,
            timestamp:Date.now(),
            likes:0
        }
        console.log("adding post",post);
        this.props.addPost(post);
        this.props.disableAddMode();
    }
    
  }
}
