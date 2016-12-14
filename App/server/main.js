Meteor.startup(function () {
    Meteor.methods({
        deleteUser: function(id) {
            console.log(id);
            Users.remove(id);
            return true;
        }
    })
});

