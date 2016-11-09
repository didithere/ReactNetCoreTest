var Note = React.createClass({
    render: function () {
        return (
            <div className="note">
                {this.props.body}
            </div>
            );
    }
})

module.exports = Note;