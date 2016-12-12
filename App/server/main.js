    messages = new Mongo.Collection("messages");
    messages.insert
    (
        {
            name : "server"
            ,message : ["Bonjour"]
        }
    );
