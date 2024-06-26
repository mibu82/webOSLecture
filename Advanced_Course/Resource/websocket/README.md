# How to use

1. Install node modules.

    ``` bash
    npm install
    ```

2. Package and install this folder to your webOS OSE device.

    ``` bash
    ares-package websocket
    ares-install -d YOUR_OSE_DEVICE com.sample.websocket_1.0.0_all.ipk
    ```

3. Copy this folder to your webOS OSE device.

4. Go to the copied folder and run a server.

    ``` bash
    node server
    ```

5. Launch the installed app (App name: WebSocket Sample) on your webOS OSE device.