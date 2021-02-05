import React from 'react';
import classes from './CreateProject.module.css';
import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class CreateProject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tags : [],
            imageHashes: [],
            imgBuffers: [],
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    
    onSubmit = () => {
        console.log(this.state);
    }

    captureFile = (e) => {
        console.log("CAPTURING FILE")
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader();
    
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
            let imgBuffers = this.state.imgBuffers;
            imgBuffers.push(Buffer(reader.result))
            this.setState({imgBuffers}, () => {
                console.log(this.state.imgBuffers)
                this.uploadImages();
            })
        };
    }
    
    uploadImages = async () => {
        // Takes all image buffers in state and uploads them to to ipfs, storing the hashes in state.
        let imgHashes = [];
        for(const imgBuffer of this.state.imgBuffers){
            await ipfs.add(imgBuffer)
                    .then((result, error) => {
                        if(!error){
                            imgHashes.push(result.path)
                        } else {
                            console.log(error)
                        }
                    })
        }
        this.setState({imgHashes});
    }

    render(){
        return (
            <div className={classes.CreateProject}>
                <div className={classes.Box}>
                    <h2>[ Create New Project ]</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu eros est. Aliquam et odio efficitur, sodales mi id, pretium nisl. Donec suscipit ultrices ligula, in volutpat est pulvinar in. Praesent eu rhoncus felis. Cras odio nibh, faucibus eu sapien vel, faucibus placerat felis. Nullam ultrices faucibus lobortis. Vestibulum a iaculis diam, et tempor augue. Vestibulum fermentum feugiat dui, blandit fringilla risus feugiat a. Cras sed nisi accumsan, rutrum risus nec, porttitor velit. Proin ultricies ornare dui eget mollis.</p>
                </div>
                <div className={classes.Box}>
                    <h3>Title</h3>
                    <input
                        type='text'
                        placeholder="Project Title"
                        name="title"
                        onChange={this.onChange}
                    />
                </div>
                <div className={classes.Box}>
                    <h3>Description</h3>
                    <textarea
                        placeholder = "Project Description"
                        name = "description"
                        onChange={this.onChange}
                    />
                </div>
                <div className={classes.Box}>
                    <h3>Contribution Tiers</h3>
                    <div className={classes.Tiers}>
                        <div className={classes.Tier}>
                            <h4>Tier 1</h4>
                            <textarea
                                placeholder="Tier Rewards Description"
                                name="t1rewards"
                                onChange={this.onChange}
                            />
                            <input
                                type='number'
                                placeholder="Minimum funding"
                                name="t1funding"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={classes.Tier}>
                            <h4>Tier 2</h4>
                            <textarea
                                placeholder="Tier Rewards Description"
                                name="t2rewards"
                                onChange={this.onChange}
                            />
                            <input
                                type='number'
                                placeholder="Minimum funding"
                                name="t2funding"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={classes.Tier}>
                            <h4>Tier 3</h4>
                            <textarea
                                placeholder="Tier Rewards Description"
                                name="t3rewards"
                                onChange={this.onChange}
                            />
                            <input
                                type='number'
                                placeholder="Minimum funding"
                                name="t3funding"
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.Box}>
                    <h3>Upload Some Images</h3>
                    <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.captureFile} />
                </div>
                <div className={classes.Box}>
                    <h3>Add Some Tags</h3>
                    <input
                        type='text'
                        placeholder="Separate your tags with a comma"
                        name="tags"
                        onChange={this.onChange}
                    />
                </div>
                <div className={classes.SubmitContainer}>
                    <div 
                        className={classes.SubmitButton}
                        onClick={this.onSubmit}
                    >Submit</div>
                </div>
            </div>
        )
    }
    
}

export default CreateProject;