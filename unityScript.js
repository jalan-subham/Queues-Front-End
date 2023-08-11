ds= new DaveService("https://test.iamdave.ai", "student_test", {"signup_apikey": "c3R1ZGVudF90ZXN0MTY4NjY0MjA3OC40Mw__"});
var eng_id;
function loadGame() {

  ds.postRaw("/conversation/deployment_queuess/" + ds.user_id   ,{}, (data) => {eng_id = data.engagement_id}, () => {}, true);
  document.getElementById("landingForm").style.display = "none";
    document.getElementById("jsonForm").classList.add("active");
}


var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");
      var fullscreenButton = document.querySelector("#unity-fullscreen-button");
      var warningBanner = document.querySelector("#unity-warning");

      // Shows a temporary message banner/ribbon for a few seconds, or
      // a permanent error message on top of the canvas if type=='error'.
      // If type=='warning', a yellow highlight color is used.
      // Modify or remove this function to customize the visually presented
      // way that non-critical warnings and error messages are presented to the
      // user.
      function unityShowBanner(msg, type) {
        function updateBannerVisibility() {
          warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
        }
        var div = document.createElement('div');
        div.innerHTML = msg;
        warningBanner.appendChild(div);
        if (type == 'error') div.style = 'background: red; padding: 10px;';
        else {
          if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
          setTimeout(function() {
            warningBanner.removeChild(div);
            updateBannerVisibility();
          }, 5000);
        }
        updateBannerVisibility();
      }

      var buildUrl = "Build";
      var loaderUrl = buildUrl + "/UnityBuilds.loader.js";
      var config = {
        dataUrl: buildUrl + "/UnityBuilds.data",
        frameworkUrl: buildUrl + "/UnityBuilds.framework.js",
        codeUrl: buildUrl + "/UnityBuilds.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "q_project",
        productVersion: "0.1",
        showBanner: unityShowBanner,
      };

      // By default Unity keeps WebGL canvas render target size matched with
      // the DOM size of the canvas element (scaled by window.devicePixelRatio)
      // Set this to false if you want to decouple this synchronization from
      // happening inside the engine, and you would instead like to size up
      // the canvas DOM size and WebGL render target sizes yourself.
      // config.matchWebGLToCanvasSize = false;

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:

        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        container.className = "unity-mobile";
        canvas.className = "unity-mobile";

        // To lower canvas resolution on mobile devices to gain some
        // performance, uncomment the following line:
        // config.devicePixelRatio = 1;

        unityShowBanner('WebGL builds are not supported on mobile devices.');
      } else {
        // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

        canvas.style.width = "960px";
        canvas.style.height = "600px";
      }

      loadingBar.style.display = "block";

      var script = document.createElement("script");
      script.src = loaderUrl;
      document.body.appendChild(script);
      var myUnityInstance;
      var jsonText;
      function loadUnityInstance() {
        jsonText = document.getElementById("jsonTextInput").value;
        document.getElementById("jsonForm").classList.remove("active");
        document.getElementById("conversation_form").classList.add("active");

        container.style.visibility = "visible";
        
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          myUnityInstance = unityInstance;
          loadingBar.style.display = "none";
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }).catch((message) => {
          alert(message);
        });
        
        
      }

      
      function gameLoaded() {
        myUnityInstance.SendMessage("GameManager", "signedIn");
        myUnityInstance.SendMessage("GameManager", "LoadLevel", jsonText);


      }

      function postDaveService(data, model) {
        ds.post(model, data, () => {console.log("Success")}, () => {console.log("ERROR")}, false);
    }

      container.style.visibility = "hidden";

      
        // Get a reference to the input element
        const input = document.getElementById('customer_response');
        // Get a reference to the status paragraph

        // Function to be triggered when input is clicked inside
        function handleInputFocus() {
            // You can add more code here to perform specific actions
            var canvas = document.getElementById("unity-canvas");
      if(canvas) {
        canvas.setAttribute("tabindex", "1");
      } 
        }

        // Function to be triggered when input is clicked outside
        function handleInputBlur() {
            // You can add more code here to perform specific actions
            var canvas = document.getElementById("unity-canvas");
if (canvas) {
  canvas.setAttribute("tabindex", "0");
    canvas.blur();  // Remove focus from the canvas
}
        }

        // Add event listeners for the focus and blur events
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);

 
