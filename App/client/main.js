if(Meteor.isClient) {
    Session.setDefault('page', 'connexion');

    $(window).bind('beforeunload', function() {
        closingWindow();
        return null;
    });
    closingWindow = function(){
        Meteor.call('deleteUser', id);
    };

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

                id = Users.insert(
                    {
                        name : name
                    }
                );
                Session.set('page', 'tchat');
            }
        }
    );

    Template.tchat.helpers(
        {
            all_messages: function () {
                return Messages.find({$or: [{ destinataire: name}, { destinataire: ''}, { name: name}]});
            },
            users: function () {
                return Users.find();
            }
        }
    );

    Template.tchat.events(
        {
            'click .user_name': function (event) {
                var target = event.target.innerText;
                $('input#message').val('@'+target+' ');
            }
        }
    );

    Template.form.events(
        {
            'submit form': function (event) {
                event.preventDefault();
                var input = event.target.message.value;
                var splited = input.split(" ");

                if (splited[0].includes("@")) {
                    var b = splited[0].split("@");
                    var destinataire = b[1];
                    splited.splice(0,1);
                    var tostring = splited.toString();
                    var message = tostring.replace(/,/g,' ')
                }
                else {
                    var destinataire = '';
                    var message = input;
                }

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