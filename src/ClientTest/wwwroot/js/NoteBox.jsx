var data = [
        { id: "1", body: "test" }
];

var NoteBox = React.createClass({
    loadCommentsFromServer: function(){
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    getInitialState: function(){
        return { data: [] }
    },
    componentWillMount: function(){
        this.loadCommentsFromServer();
    },
    render: function () {
        return (
        <div className="noteBox">
            <h1>Notes</h1>
            <NoteList data={this.state.data}/>
        </div>
        );
    }
});

var NoteList = React.createClass({
    render: function () {
        var noteNodes = this.props.data.map(function (note) {
            return (
                <Note key={note.Id }>
                    {note.Body}
                </Note>
                );
        });
        return (
            <div className="noteList">
                {noteNodes}
            </div>
            );
    }
});

var Note = React.createClass({
    render: function () {
        return (
            <div className="note">
                {this.props.children}
            </div>
            );
    }
});

ReactDOM.render(
    <NoteBox url="http://localhost:5001/api/notes" />,
    document.getElementById('content')
);