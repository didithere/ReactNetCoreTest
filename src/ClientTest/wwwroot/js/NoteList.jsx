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

module.exports = NoteList;