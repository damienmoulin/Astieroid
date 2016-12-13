if(Meteor.isClient) {
    Session.setDefault('page', 'connexion');

    Template.body.helpers({
        currentPage: function (page) {
            return Session.get('page')
        }
    });

    Template.connexion.events(
        {
            'submit form': function(event) {
                event.preventDefault();
                name = event.target.name.value;
                Session.set('page', 'tchat');
            }
        }
    );

    Template.tchat.helpers(
        {
            all_messages: function () {
                return Messages.find();
            }
        }
    );

    Template.form.events(
        {
            'submit form': function (event) {
                event.preventDefault();
                var message = event.target.message.value;
                Messages.insert(
                    {
                        name: name,
                        message: message
                    }
                )
            }
        }
    );
}