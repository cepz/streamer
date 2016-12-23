import React from 'react';
import Store from '../stores/store.js';
import path from 'path';

export default class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = { files: [] };
    }

    componentDidMount() {
        this.getFiles('');
    }

    play(file) {
        var route = path.join('/api', file);
        this.setState({ audio: route });
    }

    getFiles(file) {
        Store.get(file)
            .then(response => {
                console.log('response:', response);
                return response.json();
            })
            .then(value => {
                console.log(value);
                this.setState({ files: value });
            });
    }

    render() {
        var files = this.state.files.map(f => {
            if (f.isDirectory) {
                return <div
                    style={{ color: 'blue' }}
                    onClick={() => this.getFiles(f.path)}>
                    <span>{f.file}</span>
                </div>
            } else {
                return <div
                    style={{ color: 'black' }}
                    onClick={() => this.play(f.path)}>
                    <span>{f.file}</span>
                </div>
            }
        });

        var player = () => {
            if (!this.state.audio)
                return null;
            else
                return <audio src={this.state.audio} controls />
        }

        return <div>
            {player()}
            {files}
        </div>
    }
}