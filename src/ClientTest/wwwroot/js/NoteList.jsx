var NoteList = React.createClass({
    render: function () {
        var noteNodes = this.props.data.map(function(note){
            return (
                <Note key={note.id}>
                    {note.body}
                </Note>
                );
            });
        return (
            <div className="noteList">
                {noteNodes}
            </div>
            );
    }
})

module.exports = NoteList;