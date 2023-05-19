(function() {


    async function generateSMSOTP(options) {

        return new Promise(function(resolve, reject) {

            request({ url: 'https://www.fast2sms.com/dev/bulkV2', qs: options }, function(err, response, body) {
                log("Response From SMS FAST2SMS");
                response.body = JSON.parse(response.body);
                log(response.body);


                if (err) {
                    log("Error Respone/SMS Rejected");
                    reject({
                        message: 'Unable To Send SMS',
                        status: false,
                        isOTPGenerated: false
                    });

                }


                if (response.body.return) {
                    log("OTP generated And Response Sent");
                    resolve({
                        message: response.body.message,
                        status: true,
                        data: response.body,
                        isOTPGenerated: true

                    });
                } else {
                    log("OTP Rejected And Response Sent");
                    reject({
                        message: response.body.message,
                        status: false,
                        data: response.body,
                        isOTPGenerated: false
                    });
                }

            });
        });
    };

    async function generateOTPUsingWATI(watiNumber, watiOTP) {

        return new Promise(function(resolve, reject) {

            log("Generate OTP Via WATI");
            log("OTP  Is : " + watiOTP);
            log("Mobile : " + watiNumber);
            var returnObject = WATIAPI.sendOTP(watiNumber, watiOTP, function(success) {

                log("ResponseFrom WATI For OTP Delivery");
                log(success);
                if (success.status) {
                    resolve({
                        message: success.message,
                        status: true,
                        isOTPGenerated: true,
                        data: success
                    });

                } else {
                    reject({
                        message: success.message,
                        status: false,
                        isOTPGenerated: false,
                        data: success
                    });

                }

            }, function(error) {
                log('Error Occured :');
                log(error);
                reject({
                    message: 'Unable To Send OTP Via WATI As Error Occured',
                    status: false,
                    isOTPGenerated: false,
                    data: error
                });
            });
        });
    }


    app.get("/get/auth/otp/generate", function(req, resp) {
        log("/get/auth/otp/generate");
        var tuple = req.query.tuple || req.body.tuple || req.params["tuple"];
        tuple = JSON.parse(tuple);
        log(tuple);
        var mobile = tuple.mobile;
        var countryData = tuple.countryData;

        var generatedOTP = generateOTP(6);
        log("Generated OTP : " + generatedOTP);
        var otpNumberWATI = mobile.split("+91")[1];
        log("Mobile Number For WATI : " + otpNumberWATI);

        options = {};
        options.route = 'otp';
        options.language = 'english';
        //options.flash = 0;
        options.authorization = process.env.FAST_2_SMS_APIKEY;
        options.variables_values = 'OTP For Automobile  is ' + generatedOTP;
        options.numbers = mobile.split("+91")[1];;
        log(options);


        ProfileModel.findOne({ mobile: mobile }, function(errFound, found) {
            if (errFound) {
                resp.send({ message: 'Error Occured', status: false });

            }

            if (found) {
                // update with new OTP and send OTP Again
                ProfileModel.update({ mobile: mobile }, { otp: generatedOTP }, { upsert: true }, function(errUpdate, updated) {
                    if (errUpdate) {
                        resp.send({ message: 'Error Occured', status: false, isOTPGenerated: false, data: [] });
                    }

                    if (updated) {
                        var promise = [];
                        promise.push(generateSMSOTP(options));
                        promise.push(generateOTPUsingWATI(otpNumberWATI, generatedOTP));

                        Promise.all(promise).then(function(promiseResolved) {

                                log("Sending Response From Promise :");
                                log(promiseResolved);

                                if (promiseResolved[0].status) {

                                    resp.send({
                                        status: true,
                                        message: 'OTP generated',
                                        isOTPGenerated: true,
                                        data: promiseResolved
                                    });
                                } else {
                                    resp.send({
                                        message: 'Unable To Send OTP',
                                        status: false,
                                        isOTPGenerated: false,
                                        data: promiseResolved
                                    });
                                }
                            })
                            .catch(function(promiseError) {
                                resp.send(promiseError);
                            });


                    } else {
                        log("Sending Response From Promise With Defer :");
                        resp.send({
                            message: 'Unable To Send OTP',
                            status: false,
                            isOTPGenerated: false,
                            data: []
                        });
                    }

                });

            } else {
                var model = ProfileModel({
                    mobile: mobile,
                    otp: generatedOTP,
                    countryData: countryData
                });

                model.save(function(errSave, saved) {
                    if (errSave) {
                        resp.send({ message: 'Error Occured', status: false, isOTPGenerated: false, data: [] });
                    }

                    var promise = [];
                    promise.push(generateSMSOTP(options));
                    promise.push(generateOTPUsingWATI(otpNumberWATI, generatedOTP));

                    Promise.all(promise).then(function(promiseResolved) {

                            log("Sending Response From Promise :");

                            if (promiseResolved[0].status) {

                                resp.send({
                                    status: true,
                                    message: 'OTP generated',
                                    isOTPGenerated: true,
                                    data: promiseResolved
                                });
                            } else {
                                resp.send({
                                    message: 'Unable To Send OTP',
                                    status: false,
                                    isOTPGenerated: false,
                                    data: promiseResolved
                                });
                            }
                        })
                        .catch(function(promiseError) {
                            resp.send(promiseError);
                        });
                });
            }

        });

    });


})()




// fast2sms.sendMessage(options).then(function(respOtp) {
//     log(respOtp);
//     resp.send(respOtp);
// });