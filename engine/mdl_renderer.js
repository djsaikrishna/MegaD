$("#newDownload").on("click", async function () {
    //window.api.send("toMain", "działa");

    // Use sweetalert2 to show full-screen input alert
    const {value: url} = await Swal.fire({
        input: 'url',
        inputLabel: 'URL address',
        inputPlaceholder: 'Enter the URL'
    })

    // When alert returns that user confirmed it
    if (url) {
        // Swal.fire(`Entered URL: ${url}`)
        console.log(url);
        //if(url.length > 10)
        // Create package with newDownload request ID and url typed by user
        var pkg = ["newDownload", url];
        // Send package to API
        window.api.send("engine", pkg);
    }
});

// Handle exit button onClick
$("#exit").on("click", async function(){
    // Send exit request to API
    window.api.send("engine", "exitApp");
});