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
                return Messages.find({$or: [{ destinataire: name}, { destinataire: ''}, { name: name}]});
            }
        }
    );

    Template.tchat.events(
        {
            'click .user_name': function (event) {
                var target = event.target.innerText;
                $('input#dest').val(target);
            }
        }
    );

    Template.form.events(
        {
            'submit form': function (event) {
                event.preventDefault();
                var message = event.target.message.value;
                var destinataire = event.target.destinataire.value;
                Messages.insert(
                    {
                        destinataire : destinataire,
                        name: name,
                        message: message
                    }
                );
                event.target.message.value = '';
            }
        }
    );
}