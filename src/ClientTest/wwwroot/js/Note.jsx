var Note = React.createClass({
    render: function () {
        return (
            <div className="note">
                {this.props.children}
            </div>
            );
    }
});

module.exports = Note;