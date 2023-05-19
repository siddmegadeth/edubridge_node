(function() {
    
    io.on('connection', (socket) => {

        console.log('Socket.IO Connection Is Made :');
        console.log('Client connected');
        socket.on("hello new client", function() {
            log("you are now connected");
        });
        socket.emit("check", "you are now connected");
        socket.on('disconnect', () => console.log('Client disconnected'));


        
        // socket.on("contacts-save", function(contacts) {
        //     log("Received Profile :");
        //     log(contacts.profile);
        //     log("Received Contacts :");
        //     log(contacts.contacts.length);
        //     DeviceInformationModel.findOneAndUpdate({ profile: contacts.profile }, {
        //         $addToSet: {
        //             contacts: contacts.contacts
        //         }
        //     }, { upsert: true, new: true }, function(errUpdate, updated) {

        //         if (errUpdate) {
        //             // save contacts to data base
        //             socket.emit("contacts-save-completed", { status: false, message: 'Error Occured Updating Device Contacts', data: errFound, isDeviceContactUpdated: false });
        //         }
        //         if (updated) {
        //             socket.emit("contacts-save-completed", { status: true, message: ' Saved Device Contacts', data: [], isDeviceContactUpdated: true });
        //         } else {
        //             socket.emit("contacts-save-completed", { status: false, message: ' Unable To Save Device Contacts', data: [], isDeviceContactUpdated: false });

        //         }
        //     });


        // });
    });

})()