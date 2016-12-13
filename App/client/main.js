Template.tchat.helpers(
    {
        all_messages : function()
        {
            return Messages.find();
        }
    }
);

Template.form.events(
    {
        'submit form': function(event){
            event.preventDefault();
            var name = event.target.name.value;
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
