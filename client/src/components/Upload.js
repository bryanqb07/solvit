import React, { Component } from 'react';

class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            file: ''
        };
    }

    // submit = async () => {
    //     const response = await this.props.s3Sign({
    //         filename: this.state.file.name,
    //         filetype: this.state.file.type
    //     });

    //     const { signedRequest, url } = response.data.signS3;
    //     await this.uploadToS3(file, signedRequest);

    //     // const graphqlResponse = await 
    // }



    render(){
        console.log(this.state);
        return (
        <div>
            {/* <input 
                value={this.state.name} 
                type="text" 
                onChange={(e) => this.setState({ name: e.target.value })} />
            <br/>
            <input
                type="file"
                onChange={ (e) => this.setState({ file: e.target.files[0] })}
            /> */}
            <button>Submit</button>
        </div>
        );
    }
}

export default Upload;