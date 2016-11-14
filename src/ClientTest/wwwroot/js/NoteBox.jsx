var NoteBox = React.createClass({
    setListState: function (list) {
        console.log('set list state');
        console.log('list length: ' + list.length);
        this.setState({ data: list });
        console.log('state data length: ' + this.state.data.length);
    },
    loadCommentsFromServer: function () {
        console.log('load comment from server');
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setListState(data);
        }.bind(this);
        xhr.send();
    },
    getInitialState: function () {
        console.log('initial state notebox');
        return { data: [] }
    },
    componentWillMount: function () {
        console.log('component will mount notebox');
        this.loadCommentsFromServer();
    },
    functionB: function(obj){
        console.log(obj);
        this._form.setTextState(obj);
    },
    render: function () {
        console.log('render notebox');
        return (
        <div className="noteBox">
            <h1>Notes</h1>
            <NoteList data={this.state.data} refreshData={this.setListState} passObject={this.functionB}/>
            <NoteForm url={this.props.url} data={this.state.data} refreshData={this.setListState}
                      ref={(form) => { this._form = form; }}/>
        </div>
        );
    }
});

var NoteList = React.createClass({
    removeByAttr: function (value) {
        var temp = this.props.data.filter(function (item) {
            return item.Id !== value;
        });
        console.log('props data length after remove is ' + temp.length);
        this.props.refreshData(temp);
    },
    functionA: function(obj){
        this.props.passObject(obj);
    },
    render: function () {
        console.log('render notelist');
        var noteNodes = this.props.data.map(function (note) {
            return (
                <Note key={note.Id} id={note.Id} removeItem={this.removeByAttr} passObject={this.functionA}>
                    {note.Body}
                </Note>
                );
        }.bind(this));
        return (
            <div className="noteList">
                {noteNodes}
            </div>
            );
    }
});

var Note = React.createClass({
    deleteRequestToServer: function () {
        console.log('delete request');
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:5001/api/notes/" + this.props.id;
        xhr.open('DELETE', url, false);
        xhr.onload = function () {
            this.props.removeItem(this.props.id);
        }.bind(this);
        xhr.send();
    },
    updateButtonClicked: function () {
        console.log('update btn clicked');
        var item = { id: this.props.id, text: this.props.children };
        this.props.passObject(item);
    },
    render: function () {
        console.log('render note');
        return (
            <div className="note">
                {this.props.children}
                <button onClick={this.updateButtonClicked}>Update</button>
                <button onClick={this.deleteRequestToServer}>Remove</button>
            </div>
            );
    }
});

var NoteForm = React.createClass({
    getInitialState: function () {
        console.log('initial state noteform');
        return { text: '', isUpdate: false, id: '' };
    },
    handleNoteChange: function (e) {
        console.log('handle note change');
        this.setState({ text: e.target.value });
    },
    sendRequestToServer: function (params, id) {
        console.log('post request');
        if (typeof (id) === 'undefined') id = '';

        var xhr = new XMLHttpRequest();
        if (!this.state.isUpdate) {
            xhr.open('post', this.props.url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                var response = JSON.parse(xhr.responseText);
                this.props.data.push(response);
                this.props.refreshData(this.props.data);
                console.log('props data length: ' + this.props.data.length);
            }.bind(this);
        }
        else {
            xhr.open('put', this.props.url + '/' + id, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                this.props.data.forEach(function (obj) {
                    if (obj.Id === id) {
                        console.log(id + ',' + params);
                        obj.Body = params;
                    }
                });
                console.log(this.props.data);
                this.props.refreshData(this.props.data);
            }.bind(this);
        }
        xhr.send(JSON.stringify(params));
    },
    handleSubmit: function (e) {
        console.log('post clicked');
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
            return;
        }
        if (!this.state.isUpdate) {
            this.sendRequestToServer(text);
        }
        else {
            var id = this.state.id;
            this.sendRequestToServer(text, id);
        }
        this.setState({ text: '', id: '', isUpdate: false });
    },
    setTextState: function (obj) {
        console.log('set text state');
        this.setState({ text: obj.text, isUpdate: true, id: obj.id });
    },
    render: function () {
        console.log('render noteform');
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Type something..."
                  value={this.state.text}
                  onChange={this.handleNoteChange}
                />
                <input type="submit" value="Post" />
            </form>
            );
    }
})

ReactDOM.render(
    <NoteBox url="http://localhost:5001/api/notes" />,
    document.getElementById('content')
);