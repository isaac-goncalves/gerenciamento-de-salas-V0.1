import React from 'react'
import Avatar from 'react-avatar-edit'

class App extends React.Component {

    constructor(props: any) {
        super(props)
        const src = './example/einshtein.jpg'
        this.state = {
            preview: null,
            src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }

    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview: any) {
        this.setState({ preview })
    }

    onBeforeFileLoad(elem: any) {
        if (elem.target.files[0].size > 71680) {
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    render() {
        return (
            <div>
                <Avatar
                    width={390}
                    height={295}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src}
                />
                <img src={this.state.preview} alt="Preview" />
            </div>
        )
    }
}